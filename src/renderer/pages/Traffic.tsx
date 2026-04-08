import { useEffect, useRef } from 'react'

type TrafficProps = {
  connected: boolean
  path: string
  baudRate: number
  slaveId: string
  lines: string[]
  onClear: () => void
}

type TrafficRowKind = 'tx' | 'rx' | 'log'

function parseTrafficPayload(text: string): { kind: TrafficRowKind; query?: string; hex: string } {
  const t = text.trim()
  if (t.startsWith('[RX] ')) {
    return { kind: 'rx', hex: t.slice(5).trim() }
  }
  const txFail = t.match(/^\[TX\s+(\S+)\s+failed\]\s*(.*)$/)
  if (txFail) {
    return { kind: 'log', hex: `TX ${txFail[1]} failed · ${txFail[2].trim()}` }
  }
  const txOk = t.match(/^\[TX\s+(.+?)\]\s+(.+)$/)
  if (txOk) {
    return { kind: 'tx', query: txOk[1].trim(), hex: txOk[2].trim() }
  }
  if (t.startsWith('[error]')) {
    return { kind: 'log', hex: t }
  }
  return { kind: 'rx', hex: t }
}

export default function Traffic({ connected, path, baudRate, slaveId, lines, onClear }: TrafficProps) {
  const logRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = logRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [lines])

  return (
    <section className="serial-readout traffic-view" aria-label="Serial traffic">
      <div className="serial-readout-bar">
        <span
          className={connected ? 'serial-readout-dot' : 'serial-readout-dot serial-readout-dot--idle'}
          aria-hidden="true"
        />
        <p className="serial-readout-summary">
          Traffic —{' '}
          {connected ? (
            <>
              <strong>{path}</strong>
              <span className="serial-readout-sep" aria-hidden="true" />
              Baudrate: {baudRate}
              <span className="serial-readout-sep" aria-hidden="true" />
              Slave ID: <strong>{slaveId || '—'}</strong>
            </>
          ) : (
            <strong>Not connected</strong>
          )}
        </p>
        <button
          type="button"
          className="serial-readout-clear-btn"
          onClick={onClear}
          disabled={lines.length === 0}
        >
          Clear
        </button>
      </div>
      <div ref={logRef} className="serial-readout-log" role="log" aria-live="polite">
        {!connected ? (
          <p className="serial-readout-placeholder">
            Use the toolbar Connect button to open a port and view traffic.
          </p>
        ) : lines.length === 0 ? (
          <p className="serial-readout-placeholder">No frames yet — waiting for bytes on the wire…</p>
        ) : (
          lines.map((row, index) => {
            const tab = row.indexOf('\t')
            const rowKey = tab >= 0 ? row.slice(0, tab) : String(index)
            const text = tab >= 0 ? row.slice(tab + 1) : row
            const { kind, query, hex } = parseTrafficPayload(text)
            const tagLabel = kind === 'tx' ? 'TX' : kind === 'rx' ? 'RX' : '—'
            return (
              <div key={`${rowKey}-${index}`} className="serial-readout-line traffic-view-line">
                <span className={`traffic-view-tag traffic-view-tag--${kind}`}>{tagLabel}</span>
                <span className="traffic-view-payload traffic-view-hex">{hex}</span>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}
