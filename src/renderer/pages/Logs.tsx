import { useEffect, useMemo, useRef, useState } from 'react'
import * as XLSX from 'xlsx'
import {
  MdCallReceived,
  MdCheckCircle,
  MdErrorOutline,
  MdGetApp,
  MdHourglassEmpty,
  MdInfoOutline,
  MdSend,
  MdFormatListNumbered,
  MdSync,
  MdTableChart,
} from 'react-icons/md'
import { useDisplayView } from '../context/DisplayViewContext'
import { crc16Modbus, parseSlaveByte } from '../../shared/modbusRtu'

const LOG_LIMITS = [10, 50, 100, 500, 1000] as const
const RECEIVE_WINDOW_MS: Record<(typeof LOG_LIMITS)[number], number> = {
  10: 3000,
  50: 5000,
  100: 7000,
  500: 10000,
  1000: 15000,
}
const RECEIVE_IDLE_GAP_MS = 900
const RECEIVE_EXTEND_MAX_MS: Record<(typeof LOG_LIMITS)[number], number> = {
  10: 2000,
  50: 5000,
  100: 6000,
  500: 8000,
  1000: 10000,
}
const RECEIVE_POLL_MS = 120

const ALARM_BYTE_1_BITS = ['FAN1 INT FL', 'FAN2 INT FL', 'FAN1 EXT FL', 'FAN2 EXT FL', 'RSVD', 'TCAB FAIL', 'TAMB FAIL', 'HRT'] as const
const ALARM_BYTE_2_BITS = ['LCT', 'USYS HG', 'USYS LW', 'DOOR', 'SMOKE', 'RSVD', 'FAN1 INT STATUS', 'FAN2 INT STATUS'] as const
const ALARM_BYTE_3_BITS = ['FAN1 EXT STATUS', 'FAN2 EXT STATUS', 'MACHINE STATUS', 'RSVD', 'SPARE', 'SPARE', 'SPARE', 'SPARE'] as const

function hexToAscii(hex: string): string {
  const parts = hex.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  let out = ''
  for (const p of parts) {
    if (!/^[0-9a-fA-F]{2}$/.test(p)) continue
    const n = parseInt(p, 16)
    out += n >= 32 && n <= 126 ? String.fromCharCode(n) : '.'
  }
  return out
}

function splitCsvCells(text: string): string[] {
  const cells = text
    .split(',')
    .map((c) => c.trim().replace(/^\.+/, ''))
  while (cells.length > 0 && cells[cells.length - 1] === '') cells.pop()
  return cells
}

function parseByteValue(value: string): number {
  const s = value?.trim() ?? ''
  if (!s) return 0
  try {
    if (/^0x[0-9a-fA-F]+$/.test(s)) return Math.max(0, Math.min(255, parseInt(s, 16)))
    if (/^[0-9a-fA-F]{2}$/.test(s)) return Math.max(0, Math.min(255, parseInt(s, 16)))
    const n = parseInt(s, 10)
    return Number.isFinite(n) ? Math.max(0, Math.min(255, n)) : 0
  } catch {
    return 0
  }
}

function filterUsefulBits(bits: readonly string[]): { names: string[]; indexes: number[] } {
  const names: string[] = []
  const indexes: number[] = []
  bits.forEach((name, idx) => {
    const k = name.trim().toLowerCase()
    if (k === 'rsvd' || k === 'spare') return
    names.push(name)
    indexes.push(idx)
  })
  return { names, indexes }
}

function isAlarmByteColumn(col: string, n: 1 | 2 | 3): boolean {
  const raw = col.trim().toLowerCase()
  const compact = raw.replace(/[\s_-]+/g, '')
  return compact.includes('alarm') && compact.includes('byte') && compact.includes(String(n))
}

function bifurcateAlarmBytes(headers: string[], rows: string[][]): { headers: string[]; rows: string[][] } {
  let b1 = -1
  let b2 = -1
  let b3 = -1

  headers.forEach((h, idx) => {
    if (isAlarmByteColumn(h, 1)) b1 = idx
    else if (isAlarmByteColumn(h, 2)) b2 = idx
    else if (isAlarmByteColumn(h, 3)) b3 = idx
  })

  if (b1 < 0 && b2 < 0 && b3 < 0) return { headers, rows }

  const byte1 = filterUsefulBits(ALARM_BYTE_1_BITS)
  const byte2 = filterUsefulBits(ALARM_BYTE_2_BITS)
  const byte3 = filterUsefulBits(ALARM_BYTE_3_BITS)

  const nextHeaders: string[] = []
  headers.forEach((h, idx) => {
    if (idx === b1) nextHeaders.push(...byte1.names)
    else if (idx === b2) nextHeaders.push(...byte2.names)
    else if (idx === b3) nextHeaders.push(...byte3.names)
    else nextHeaders.push(h)
  })

  const nextRows = rows.map((row) => {
    const out: string[] = []
    row.forEach((value, idx) => {
      if (idx === b1) {
        const n = parseByteValue(value)
        byte1.indexes.forEach((bit) => out.push(((n >> bit) & 1).toString()))
      } else if (idx === b2) {
        const n = parseByteValue(value)
        byte2.indexes.forEach((bit) => out.push(((n >> bit) & 1).toString()))
      } else if (idx === b3) {
        const n = parseByteValue(value)
        byte3.indexes.forEach((bit) => out.push(((n >> bit) & 1).toString()))
      } else {
        out.push(value ?? '')
      }
    })
    while (out.length < nextHeaders.length) out.push('')
    if (out.length > nextHeaders.length) return out.slice(0, nextHeaders.length)
    return out
  })

  return { headers: nextHeaders, rows: nextRows }
}

const ALARM_BIT_COLUMN_SET: Set<string> = new Set(
  [...ALARM_BYTE_1_BITS, ...ALARM_BYTE_2_BITS, ...ALARM_BYTE_3_BITS].filter((name) => {
    const k = name.trim().toLowerCase()
    return k !== 'rsvd' && k !== 'spare'
  }),
)

function parseLogsTable(text: string): { headers: string[]; rows: string[][] } | null {
  const segments = text
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean)

  if (segments.length === 0) return null

  const headers = splitCsvCells(segments[0])
  if (headers.length === 0) return null

  const dataCells = splitCsvCells(segments.slice(1).join(','))
  if (dataCells.length === 0) return { headers, rows: [] }

  const rowWidth = headers.length
  if (rowWidth <= 0) return null

  const dateColIdx = headers.findIndex((h) => h.trim().toLowerCase() === 'date')
  const isDateToken = (v: string) => /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(v.trim())

  const rows: string[][] = []
  if (dateColIdx >= 0) {
    const startIndexes: number[] = []
    for (let i = 0; i < dataCells.length; i++) {
      if (isDateToken(dataCells[i])) startIndexes.push(i)
    }

    for (let i = 0; i < startIndexes.length; i++) {
      const start = startIndexes[i]
      const end = i + 1 < startIndexes.length ? startIndexes[i + 1] : dataCells.length
      const slice = dataCells.slice(start, end)
      if (slice.length === 0) continue
      const row = slice.slice(0, rowWidth)
      while (row.length < rowWidth) row.push('')
      rows.push(row)
    }
  } else {
    for (let i = 0; i < dataCells.length; i += rowWidth) {
      const chunk = dataCells.slice(i, i + rowWidth)
      if (chunk.length === rowWidth) rows.push(chunk)
    }
  }

  return bifurcateAlarmBytes(headers, rows)
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function exportLogsTableToExcel(headers: string[], rows: string[][]) {
  const aoa: (string | number)[][] = [
    ['Sr No.', ...headers],
    ...rows.map((row, i) => [i + 1, ...headers.map((_, j) => row[j] ?? '')]),
  ]
  const ws = XLSX.utils.aoa_to_sheet(aoa)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Logs')
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')
  downloadBlob(blob, `logs-${stamp}.xlsx`)
}

export default function Logs() {
  const { serialConnected, serialSlaveId } = useDisplayView()

  const [limit, setLimit] = useState<(typeof LOG_LIMITS)[number]>(LOG_LIMITS[0])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [txHex, setTxHex] = useState<string | null>(null)
  const [rxAscii, setRxAscii] = useState('')
  const [busyDots, setBusyDots] = useState('')
  const parsedTable = useMemo(() => parseLogsTable(rxAscii), [rxAscii])
  const reqIdRef = useRef(0)
  const unsubscribeRef = useRef<(() => void) | null>(null)
  const rxBufferRef = useRef('')
  const lastRxAtRef = useRef(0)

  useEffect(() => {
    return () => {
      unsubscribeRef.current?.()
      unsubscribeRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!busy) {
      setBusyDots('')
      return
    }
    const t = window.setInterval(() => {
      setBusyDots((prev) => (prev.length >= 3 ? '' : `${prev}.`))
    }, 280)
    return () => window.clearInterval(t)
  }, [busy])

  const handleGetLogs = async () => {
    reqIdRef.current += 1
    const reqId = reqIdRef.current

    setError(null)
    setTxHex(null)
    setRxAscii('')
    rxBufferRef.current = ''
    lastRxAtRef.current = 0

    if (!serialConnected) {
      setError('Not connected. Use the toolbar Connect button first.')
      return
    }
    if (!serialSlaveId?.trim()) {
      setError('Missing slave ID.')
      return
    }

    const count = Math.max(0, Math.min(65535, Number(limit) || 0)) & 0xffff
    const slave = parseSlaveByte(serialSlaveId)
    const hi = (count >> 8) & 0xff
    const lo = count & 0xff
    const body = [slave, 0x85, 0x00, 0x01, hi, lo]
    const crc = crc16Modbus(new Uint8Array(body))
    const frameArr = [...body, crc & 0xff, (crc >> 8) & 0xff]
    setTxHex(frameArr.map((b) => b.toString(16).padStart(2, '0').toUpperCase()).join(' '))

    setBusy(true)
    try {
      unsubscribeRef.current?.()
      unsubscribeRef.current = window.icms.onSerialRawData(({ hex }) => {
        if (reqIdRef.current !== reqId) return
        const ascii = hexToAscii(hex)
        const part = ascii || hex.toUpperCase()
        rxBufferRef.current += part
        lastRxAtRef.current = Date.now()
      })

      const res = await window.icms.writeSerialBytes(frameArr, { logTx: 'LOGS/GET' })
      if (!res.ok) {
        setError(res.error)
        unsubscribeRef.current?.()
        unsubscribeRef.current = null
        return
      }
      const listenMs = RECEIVE_WINDOW_MS[limit] ?? 2000
      await new Promise<void>((resolve) => window.setTimeout(resolve, listenMs))
      if (reqIdRef.current !== reqId) return
      const extendDeadline = Date.now() + (RECEIVE_EXTEND_MAX_MS[limit] ?? 5000)
      while (reqIdRef.current === reqId && Date.now() < extendDeadline) {
        const lastRxAt = lastRxAtRef.current
        if (!lastRxAt) break
        if (Date.now() - lastRxAt >= RECEIVE_IDLE_GAP_MS) break
        await new Promise<void>((resolve) => window.setTimeout(resolve, RECEIVE_POLL_MS))
      }
      if (reqIdRef.current !== reqId) return
      setRxAscii(rxBufferRef.current)
      unsubscribeRef.current?.()
      unsubscribeRef.current = null
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      if (reqIdRef.current === reqId) setBusy(false)
    }
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <div />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginLeft: 'auto' }}>
          <label
            className="connect-modal-label"
            htmlFor="logs-limit"
            style={{
              margin: 0,
              whiteSpace: 'nowrap',
              lineHeight: 1.2,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            No. of Logs
          </label>
          <select
            id="logs-limit"
            className="connect-modal-select"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value) as (typeof LOG_LIMITS)[number])}
            style={{
              width: '5.25rem',
              minWidth: 0,
              padding: '0.45rem 2.1rem 0.45rem 0.7rem',
              fontSize: '0.85rem',
            }}
          >
            {LOG_LIMITS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="connect-modal-btn connect-modal-btn--secondary"
            onClick={handleGetLogs}
            disabled={busy}
            style={{
              minHeight: '2.1rem',
              padding: '0.35rem 0.85rem',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            {busy ? (
              <MdHourglassEmpty style={{ fontSize: '1.05rem', flexShrink: 0 }} aria-hidden />
            ) : (
              <MdGetApp style={{ fontSize: '1.05rem', flexShrink: 0 }} aria-hidden />
            )}
            {busy ? 'Getting…' : 'Get Logs'}
          </button>

          <button
            type="button"
            className="connect-modal-btn connect-modal-btn--secondary"
            onClick={() => parsedTable && exportLogsTableToExcel(parsedTable.headers, parsedTable.rows)}
            disabled={!parsedTable?.rows.length}
            style={{
              minHeight: '2.1rem',
              padding: '0.35rem 0.85rem',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <MdTableChart style={{ fontSize: '1.05rem', flexShrink: 0 }} aria-hidden />
            Export to Excel
          </button>
        </div>
      </div>

      <section className="serial-readout" aria-label="Logs response" style={{ marginTop: '1rem' }}>
        {/* <div className="serial-readout-bar">
          <p className="serial-readout-summary">
            {error ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <MdErrorOutline style={{ fontSize: '1.05rem', flexShrink: 0, color: '#ff7b72' }} aria-hidden />
                <strong>{error}</strong>
              </span>
            ) : txHex && busy ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <MdSync style={{ fontSize: '1.05rem', flexShrink: 0, opacity: 0.9 }} aria-hidden />
                <span>
                  Request sent - receiving data{busyDots}
                </span>
              </span>
            ) : txHex ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <MdCheckCircle style={{ fontSize: '1.05rem', flexShrink: 0, color: '#3fb950', opacity: 0.95 }} aria-hidden />
                Receive window completed.
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <MdInfoOutline style={{ fontSize: '1.05rem', flexShrink: 0, opacity: 0.85 }} aria-hidden />
                Ready.
              </span>
            )}
          </p>
        </div> */}
        <div className="serial-readout-log" role="log" aria-live="polite">
          {txHex ? (
            <div
              className="serial-readout-line"
              style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem', flexWrap: 'wrap' }}
            >
              <MdSend style={{ fontSize: '0.95rem', opacity: 0.75, flexShrink: 0 }} title="Transmit" aria-hidden />
              <span style={{ wordBreak: 'break-all' }}>{txHex}</span>
            </div>
          ) : null}
          {rxAscii && parsedTable?.rows.length ? (
            <div
              style={{
                overflowX: 'auto',
                border: '1px solid rgba(240, 246, 252, 0.08)',
                borderRadius: '10px',
                background: 'rgba(13, 17, 23, 0.7)',
              }}
            >
              <table style={{ width: '100%', height: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '0.82rem' }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: 'center',
                        padding: '0.55rem 0.65rem',
                        borderBottom: '1px solid rgba(240, 246, 252, 0.1)',
                        borderRight: '1px solid rgba(240, 246, 252, 0.08)',
                        whiteSpace: 'nowrap',
                        background: 'rgba(22, 27, 34, 0.95)',
                        color: '#a9b4c1',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        position: 'sticky',
                        top: 0,
                      }}
                    >
                      Sr No.
                    </th>
                    {parsedTable.headers.map((h, idx) => (
                      <th
                        key={`${idx}-${h}`}
                        style={{
                          textAlign: 'center',
                          padding: '0.55rem 0.65rem',
                          borderBottom: '1px solid rgba(240, 246, 252, 0.1)',
                          borderRight: '1px solid rgba(240, 246, 252, 0.08)',
                          whiteSpace: 'nowrap',
                          background: 'rgba(22, 27, 34, 0.95)',
                          color: '#a9b4c1',
                          fontWeight: 600,
                          letterSpacing: '0.02em',
                          position: 'sticky',
                          top: 0,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parsedTable.rows.map((row, rowIdx) => (
                    <tr
                      key={`row-${rowIdx}`}
                      style={{
                        background: rowIdx % 2 === 0 ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.03)',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.48rem 0.65rem',
                          borderBottom: '1px solid rgba(240, 246, 252, 0.06)',
                          borderRight: '1px solid rgba(240, 246, 252, 0.05)',
                          whiteSpace: 'nowrap',
                          color: '#9fb0c0',
                          textAlign: 'center',
                        }}
                      >
                        {rowIdx + 1}
                      </td>
                      {parsedTable.headers.map((_, colIdx) => (
                        <td
                          key={`cell-${rowIdx}-${colIdx}`}
                          style={{
                            padding: '0.48rem 0.65rem',
                            borderBottom: '1px solid rgba(240, 246, 252, 0.06)',
                            borderRight: '1px solid rgba(240, 246, 252, 0.05)',
                            whiteSpace: 'nowrap',
                            textAlign: 'center',
                            color:
                              ALARM_BIT_COLUMN_SET.has(parsedTable.headers[colIdx]) && (row[colIdx] ?? '') === '1'
                                ? '#ff5c5c'
                                : ALARM_BIT_COLUMN_SET.has(parsedTable.headers[colIdx]) && (row[colIdx] ?? '') === '0'
                                  ? '#58d68d'
                                  : '#d0d7de',
                          }}
                        >
                          {row[colIdx] ?? ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : rxAscii ? (
            <div
              className="serial-readout-line"
              style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem', flexWrap: 'wrap' }}
            >
              <MdCallReceived
                style={{ fontSize: '0.95rem', opacity: 0.75, flexShrink: 0 }}
                title="Receive (ASCII)"
                aria-hidden
              />
              <span style={{ wordBreak: 'break-all' }}>{rxAscii}</span>
            </div>
          ) : txHex && !busy && !error ? (
            <p
              className="serial-readout-placeholder"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <MdInfoOutline style={{ fontSize: '1rem', flexShrink: 0, opacity: 0.75 }} aria-hidden />
              No valid logs response frame received.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  )
}