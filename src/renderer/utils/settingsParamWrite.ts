import { buildWriteSingleCoilRtu, buildWriteSingleRegisterRtu } from '../../shared/modbusRtu'
import type { MonitorQueryKey } from './monitorParamsFromProduct'
import {
  clampInt16ToU16,
  firstRegisterIndexFromSpec,
  getAsciiStringMode,
  registerRangeFromSpec,
} from './settingsParamSpec'
import { appendTrafficTx, appendTrafficTxFailed } from './trafficLog'

function hexToBytes(hex: string): number[] | null {
  const parts = hex.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return null
  const out: number[] = []
  for (const p of parts) {
    if (!/^[0-9a-fA-F]{2}$/.test(p)) return null
    out.push(parseInt(p, 16))
  }
  return out
}

function registerIndicesFromSpec(spec2: unknown): number[] {
  return String(spec2 ?? '')
    .trim()
    .split(/\s+/)
    .map((x) => parseInt(x, 10))
    .filter((n) => Number.isFinite(n) && n >= 0)
}

function createWriteEchoWaiter(expectedPrefix: number[], timeoutMs: number): { promise: Promise<void>; cancel: () => void } {
  let off: (() => void) | null = null
  let t: number | null = null
  let finished = false
  const cancel = () => {
    if (finished) return
    finished = true
    if (off) off()
    if (t !== null) window.clearTimeout(t)
  }
  const promise = new Promise<void>((resolve, reject) => {
    const finishOk = () => {
      if (finished) return
      finished = true
      if (off) off()
      if (t !== null) window.clearTimeout(t)
      resolve()
    }
    const finishErr = (err: Error) => {
      if (finished) return
      finished = true
      if (off) off()
      if (t !== null) window.clearTimeout(t)
      reject(err)
    }

    off = window.icms.onSerialData((payload) => {
      const bytes = hexToBytes(payload.hex)
      if (!bytes || bytes.length !== 8) return
      for (let i = 0; i < expectedPrefix.length; i++) {
        if ((bytes[i] & 0xff) !== (expectedPrefix[i] & 0xff)) return
      }
      finishOk()
    })

    t = window.setTimeout(() => {
      finishErr(new Error('Timed out waiting for device write echo'))
    }, timeoutMs)
  })
  return { promise, cancel }
}

async function sendWriteAndWaitEcho(
  req: number[],
  timeoutMs: number,
  meta?: { logTx?: string },
): Promise<{ ok: true } | { ok: false; error: string }> {
  const expectedPrefix = req.slice(0, 4)
  const waiter = createWriteEchoWaiter(expectedPrefix, timeoutMs)
  appendTrafficTx(req, meta?.logTx ?? 'settings/write')
  const res = await window.icms.writeSerialBytes(req, meta)
  if (!res.ok) {
    appendTrafficTxFailed(meta?.logTx ?? 'settings/write', res.error)
    waiter.cancel()
    return res
  }
  try {
    await waiter.promise
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

async function sendWriteWithOptionalEcho(
  req: number[],
  timeoutMs: number,
  meta?: { logTx?: string },
): Promise<{ ok: true } | { ok: false; error: string }> {
  const res = await sendWriteAndWaitEcho(req, timeoutMs, meta)
  if (res.ok) return res
  if (res.error === 'Timed out waiting for device write echo') {
    return { ok: true }
  }
  return res
}

export async function writeSettingsAlarmBool(
  slaveId: string,
  query: MonitorQueryKey | undefined,
  spec: unknown[],
  on: boolean,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const addr = firstRegisterIndexFromSpec(spec[2])
  if (addr === null) return { ok: false, error: 'Invalid coil/register address in spec' }

  const logTx = { logTx: 'settings-alarm' as const }
  if (query === 'query2') {
    const f = buildWriteSingleCoilRtu(slaveId, addr, on)
    if (!f) return { ok: false, error: 'Could not build write coil frame' }
    return sendWriteAndWaitEcho([...f], 2500, logTx)
  }

  const f = buildWriteSingleRegisterRtu(slaveId, addr, on ? 1 : 0)
  if (!f) return { ok: false, error: 'Could not build write register frame' }
  return sendWriteAndWaitEcho([...f], 2500, logTx)
}

export async function writeSettingsHoldingUInt16(
  slaveId: string,
  spec: unknown[],
  valueU16: number,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const addr = firstRegisterIndexFromSpec(spec[2])
  if (addr === null) return { ok: false, error: 'Invalid register address in spec' }
  const v = Math.round(valueU16) & 0xffff
  const f = buildWriteSingleRegisterRtu(slaveId, addr, v)
  if (!f) return { ok: false, error: 'Could not build write register frame' }
  return sendWriteWithOptionalEcho([...f], 2500)
}

export async function writeSettingsAsciiRegisters(
  slaveId: string,
  spec: unknown[],
  text: string,
  onProgress?: (p: { writtenRegisters: number; totalRegisters: number; writtenChars: number; totalChars: number }) => void,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const range = registerRangeFromSpec(spec[2])
  const start = range?.start ?? firstRegisterIndexFromSpec(spec[2])
  if (start === null) return { ok: false, error: 'Invalid register range in spec' }
  const end = range?.end ?? start
  const numRegs = Math.max(0, end - start + 1)
  const mode = getAsciiStringMode(spec) ?? '8bit'

  const cleaned = String(text ?? '').replaceAll('\x00', '').trim()
  const asciiBytes: number[] = []
  for (let i = 0; i < cleaned.length; i++) {
    const code = cleaned.charCodeAt(i)
    asciiBytes.push(code >= 0 && code <= 0x7f ? code : 0x3f)
  }

  const bytesPerReg = mode === '16bit' ? 2 : 1
  const maxBytes = numRegs * bytesPerReg
  const dataByteLen = Math.min(asciiBytes.length, maxBytes)
  const data = asciiBytes.slice(0, maxBytes)
  while (data.length < maxBytes) data.push(0)

  onProgress?.({
    writtenRegisters: 0,
    totalRegisters: numRegs,
    writtenChars: 0,
    totalChars: dataByteLen,
  })
  await new Promise<void>((resolve) => window.setTimeout(resolve, 0))
  for (let r = 0; r < numRegs; r++) {
    let regVal = 0
    if (mode === '16bit') {
      const hi = data[r * 2] ?? 0
      const lo = data[r * 2 + 1] ?? 0
      regVal = ((hi & 0xff) << 8) | (lo & 0xff)
    } else {
      regVal = data[r] ?? 0
    }
    const f = buildWriteSingleRegisterRtu(slaveId, start + r, regVal & 0xffff)
    if (!f) return { ok: false, error: 'Could not build write register frame' }
    const req = [...f]
    const res = await sendWriteAndWaitEcho(req, 2500)
    if (!res.ok) return res
    onProgress?.({
      writtenRegisters: r + 1,
      totalRegisters: numRegs,
      writtenChars: Math.min((r + 1) * bytesPerReg, dataByteLen),
      totalChars: dataByteLen,
    })
    await new Promise<void>((resolve) => window.setTimeout(resolve, 0))
  }
  return { ok: true }
}

export async function writeSettingsNumericRegister(
  slaveId: string,
  spec: unknown[],
  rawRegisterInt: number,
  mode: 'int16' | 'uint16',
): Promise<{ ok: true } | { ok: false; error: string }> {
  const v = mode === 'int16' ? clampInt16ToU16(rawRegisterInt) : Math.max(0, Math.min(65535, Math.round(rawRegisterInt)))
  return writeSettingsHoldingUInt16(slaveId, spec, v)
}

export async function writeEics141DateTimeSync(
  slaveId: string,
  _controllerDateSpec: unknown[],
  _timeSpec: unknown[],
  now: Date = new Date(),
): Promise<{ ok: true } | { ok: false; error: string }> {
  const target = new Date(now.getTime() + 5000)
  const sidRaw = String(slaveId ?? '').trim()
  const sidParsed = sidRaw.toLowerCase().startsWith('0x') ? parseInt(sidRaw, 16) : parseInt(sidRaw, 10)
  const sid = Number.isFinite(sidParsed) ? Math.max(0, Math.min(255, sidParsed)) : 1

  const frame = [
    sid & 0xff,
    0x61,
    target.getDate() & 0xff,
    (target.getMonth() + 1) & 0xff,
    (target.getFullYear() % 100) & 0xff,
    target.getHours() & 0xff,
    target.getMinutes() & 0xff,
    target.getSeconds() & 0xff,
  ]

  appendTrafficTx(frame, 'settings-datetime-sync')
  const res = await window.icms.writeSerialBytes(frame, { logTx: 'settings-datetime-sync' })
  if (!res.ok) {
    appendTrafficTxFailed('settings-datetime-sync', res.error)
    return res
  }
  return { ok: true }
}
