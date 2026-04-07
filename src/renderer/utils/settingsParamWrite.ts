import { buildWriteSingleCoilRtu, buildWriteSingleRegisterRtu } from '../../shared/modbusRtu'
import type { MonitorQueryKey } from './monitorParamsFromProduct'
import {
  clampInt16ToU16,
  firstRegisterIndexFromSpec,
  registerRangeFromSpec,
} from './settingsParamSpec'

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
    return window.icms.writeSerialBytes([...f], logTx)
  }

  const f = buildWriteSingleRegisterRtu(slaveId, addr, on ? 1 : 0)
  if (!f) return { ok: false, error: 'Could not build write register frame' }
  return window.icms.writeSerialBytes([...f], logTx)
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
  return window.icms.writeSerialBytes([...f])
}

export async function writeSettingsAsciiRegisters(
  slaveId: string,
  spec: unknown[],
  text: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const range = registerRangeFromSpec(spec[2])
  const start = range?.start ?? firstRegisterIndexFromSpec(spec[2])
  if (start === null) return { ok: false, error: 'Invalid register range in spec' }
  const maxLen = range ? range.end - range.start + 1 : 64
  const chars = [...text].slice(0, Math.max(0, maxLen))
  for (let i = 0; i < chars.length; i++) {
    const code = chars[i].charCodeAt(0) & 0xffff
    const f = buildWriteSingleRegisterRtu(slaveId, start + i, code)
    if (!f) return { ok: false, error: 'Could not build write register frame' }
    const res = await window.icms.writeSerialBytes([...f])
    if (!res.ok) return res
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
