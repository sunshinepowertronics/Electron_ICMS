import { crc16Modbus } from '../../shared/modbusRtu'
import {
  dualBitHighLowNormal,
  getAlarmMapping,
  getBitIn24,
  getFanStatusDisplay,
  internalExternalFanDisplay,
  INTERNAL_EXTERNAL_FAN_NAMES,
  parseAlarmBit,
  type AlarmDisplay,
} from './alarmDisplay'
import type {
  MonitorDashboardConfig,
  MonitorQueryKey,
  SettingsDashboardConfig,
} from './monitorParamsFromProduct'

type ModbusLiveDisplayConfig = {
  groups: Partial<Record<string, Record<string, unknown[]>>>
  queryMapping: Partial<Record<string, MonitorQueryKey>>
  alarmDiscreteByteIndices: [number, number, number] | null
  alarmHoldingBitBaseRegister: number | null
}

export type ModbusLiveDisplayOptions = {
  /** Settings page: alarm rows show Enabled (bit 1) / Disabled (bit 0) instead of monitor alarm labels. */
  settingsAlarmsEnabledDisabled?: boolean
}

function settingsEnabledDisabledCell(bit: 0 | 1): MonitorLiveCell {
  return bit ? { value: 'Enabled', color: '#00ff00' } : { value: 'Disabled', color: '#888888' }
}

export type MonitorRegisterSnapshots = {
  holdingWords: number[] | null
  discreteBytes: Uint8Array | null
}

export type MonitorLiveCell = { value: string; color?: string; nameMuted?: boolean }

function hexStringToBytes(hex: string): number[] | null {
  const parts = hex.trim().split(/\s+/).filter(Boolean)
  const out: number[] = []
  for (const p of parts) {
    if (!/^[0-9a-fA-F]{2}$/.test(p)) return null
    out.push(parseInt(p, 16))
  }
  return out
}

function modbusCrcOk(bytes: number[]): boolean {
  if (bytes.length < 4) return false
  const body = new Uint8Array(bytes.slice(0, -2))
  const c = crc16Modbus(body)
  return (c & 0xff) === bytes[bytes.length - 2] && ((c >> 8) & 0xff) === bytes[bytes.length - 1]
}

function parseReadResponse(bytes: number[]): { func: number; data: Uint8Array } | null {
  if (bytes.length < 5 || !modbusCrcOk(bytes)) return null
  const func = bytes[1]
  if (func & 0x80) return null
  if (func !== 1 && func !== 2 && func !== 3 && func !== 4) return null
  const bc = bytes[2]
  if (bytes.length < 5 + bc) return null
  return { func, data: Uint8Array.from(bytes.slice(3, 3 + bc)) }
}

function wordsFrom03or04(data: Uint8Array): number[] {
  const words: number[] = []
  for (let i = 0; i + 1 < data.length; i += 2) {
    words.push(((data[i] << 8) | data[i + 1]) & 0xffff)
  }
  return words
}

function int16FromWord(u16: number): number {
  const u = u16 & 0xffff
  return u > 0x7fff ? u - 0x10000 : u
}

function formatMinutesToHm(totalMinutes: number): string {
  if (!Number.isFinite(totalMinutes) || totalMinutes < 0) return 'N/A'
  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.floor(totalMinutes % 60)
  const hh = String(hours).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')
  return `${hh} hrs ${mm} min`
}

function extractLineText(row: string): string {
  const tab = row.indexOf('\t')
  return tab >= 0 ? row.slice(tab + 1) : row
}

export type SerialPollPrefix = 'monitor' | 'settings'

export function parsePollSerialSnapshots(serialLines: string[], prefix: SerialPollPrefix): MonitorRegisterSnapshots {
  let pending: MonitorQueryKey | null = null
  let holdingWords: number[] | null = null
  let discreteBytes: Uint8Array | null = null
  const txQ1 = `[TX ${prefix}/q1]`
  const txQ2 = `[TX ${prefix}/q2]`

  for (const row of serialLines) {
    const text = extractLineText(row).trim()

    if (text.startsWith(txQ1)) {
      pending = 'query1'
      continue
    }
    if (text.startsWith(txQ2)) {
      pending = 'query2'
      continue
    }

    if (!text.startsWith('[RX] ') || !pending) continue

    const hex = text.slice(5).trim()
    const bytes = hexStringToBytes(hex)
    if (!bytes) continue

    const parsed = parseReadResponse(bytes)
    if (!parsed) continue

    if (pending === 'query1' && (parsed.func === 3 || parsed.func === 4)) {
      holdingWords = wordsFrom03or04(parsed.data)
      pending = null
      continue
    }

    if (pending === 'query2' && (parsed.func === 1 || parsed.func === 2)) {
      discreteBytes = parsed.data
      pending = null
    }
  }

  return { holdingWords, discreteBytes }
}

export function parseMonitorSerialSnapshots(serialLines: string[]): MonitorRegisterSnapshots {
  return parsePollSerialSnapshots(serialLines, 'monitor')
}

function formatScaledNumber(n: number): string {
  if (!Number.isFinite(n)) return '—'
  const abs = Math.abs(n)
  const digits = abs >= 100 ? 2 : abs >= 10 ? 3 : 4
  let s = n.toFixed(digits)
  s = s.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')
  return s
}

function parseRegIndices(spec2: unknown): number[] {
  const s = String(spec2 ?? '').trim()
  if (!s) return []
  return s
    .split(/\s+/)
    .map((x) => parseInt(x, 10))
    .filter((n) => Number.isFinite(n))
}

function firstRegToken(spec2: unknown): number | null {
  const s = String(spec2 ?? '').trim().split(/\s+/)[0]
  if (!s) return null
  const n = parseInt(s, 10)
  return Number.isFinite(n) ? n : null
}

function readBitFromCoilByte(coils: Uint8Array, physByte: number, bitInByte: number): number | null {
  if (physByte < 0 || physByte >= coils.length || bitInByte < 0 || bitInByte > 7) return null
  return (coils[physByte] >> bitInByte) & 1
}

function resolveAlarmBitFromTriple(
  regTok: number[],
  coils: Uint8Array,
  triple: [number, number, number],
): number | null {
  if (regTok.length >= 2 && regTok[0] >= 0 && regTok[0] <= 2 && regTok[1] >= 0 && regTok[1] <= 7) {
    const phys = triple[regTok[0]]
    return readBitFromCoilByte(coils, phys, regTok[1])
  }
  if (regTok.length === 1) {
    const k = regTok[0]
    if (k >= 0 && k <= 23) {
      const seg = k >> 3
      const bit = k & 7
      const phys = triple[seg]
      return readBitFromCoilByte(coils, phys, bit)
    }
  }
  return null
}

function resolveCoilByteAndBit(regTok: number[], coilBytes: Uint8Array): { bi: number; bj: number } | null {
  const maxB = coilBytes.length
  if (maxB <= 0 || regTok.length === 0) return null
  if (regTok.length === 1) {
    const n = regTok[0]
    const bi = Math.floor(n / 8)
    const bj = n % 8
    if (bi < 0 || bi >= maxB) return null
    return { bi, bj }
  }
  const byteIdx = regTok[0]
  const bitIdx = regTok[1]
  if (bitIdx >= 0 && bitIdx <= 7 && byteIdx >= 0 && byteIdx < maxB) {
    return { bi: byteIdx, bj: bitIdx }
  }
  const linear = regTok[0] * 16 + regTok[1]
  const bi = Math.floor(linear / 8)
  const bj = linear % 8
  if (bi < 0 || bi >= maxB) return null
  return { bi, bj }
}

const KNOWN_SPEC_TYPES = new Set([
  'int16',
  'float',
  'bit',
  'hide',
  'uint16',
  'ascii',
  '8bit',
  '16bit',
  'string',
  'uint32',
  'concat2',
  'mmdd',
])

function getSpecMode(spec: unknown[]): string {
  if (spec.length >= 6) {
    const t = String(spec[5]).toLowerCase().trim()
    if (KNOWN_SPEC_TYPES.has(t)) return t === 'hide' ? 'uint16' : t
  }
  if (spec.length >= 4) {
    const t = String(spec[4]).toLowerCase().trim()
    if (KNOWN_SPEC_TYPES.has(t)) return t === 'hide' ? 'uint16' : t
  }
  return ''
}

function scalarFromSpec(
  paramName: string,
  spec: unknown[],
  words: number[] | null,
  coils: Uint8Array | null,
  alarmDiscreteTriple: [number, number, number] | null,
): string | null {
  if (spec.length < 4) return null
  const mode = getSpecMode(spec) || (!words && coils ? 'bit' : '')
  const mult = parseFloat(String(spec[3]))
  if (!Number.isFinite(mult)) return null
  const regTok = parseRegIndices(spec[2])
  if (regTok.length === 0) return null

  if (mode === 'bit') {
    if (!coils?.length) return null
    if (alarmDiscreteTriple) {
      const fromTriple = resolveAlarmBitFromTriple(regTok, coils, alarmDiscreteTriple)
      if (fromTriple !== null) return fromTriple ? 'On' : 'Off'
    }
    const addr = resolveCoilByteAndBit(regTok, coils)
    if (!addr) return null
    const bitVal = (coils[addr.bi] >> addr.bj) & 1
    return bitVal ? 'On' : 'Off'
  }

  if (!words?.length) return null

  if (mode === 'float' && regTok.length >= 2) {
    const i = regTok[0]
    const j = regTok[1]
    if (i < 0 || j < 0 || i >= words.length || j >= words.length) return null
    const u32 = ((words[i] & 0xffff) << 16) | (words[j] & 0xffff)
    const buf = new ArrayBuffer(4)
    new DataView(buf).setUint32(0, u32 >>> 0, false)
    const f = new DataView(buf).getFloat32(0, false)
    if (!Number.isFinite(f)) return '—'
    return formatScaledNumber(f * mult)
  }

  if (mode === 'ascii' || mode === '8bit' || mode === '16bit' || mode === 'string') {
    const start = regTok[0]
    const end = regTok.length >= 2 ? regTok[1] : regTok[0]
    if (start < 0 || end < 0) return null
    const a = Math.min(start, end)
    const b = Math.max(start, end)
    const bytes: number[] = []
    for (let i = a; i <= b; i++) {
      if (i < 0 || i >= words.length) continue
      const w = words[i] & 0xffff
      bytes.push((w >> 8) & 0xff, w & 0xff)
    }
    const filtered = bytes.filter((x) => x !== 0)
    if (filtered.length === 0) return 'N/A'
    let s = ''
    for (const c of filtered) {
      if (c >= 32 && c <= 126) s += String.fromCharCode(c)
    }
    s = s.trim()
    return s.length ? s : 'N/A'
  }

  if (mode === 'mmdd') {
    const ri = regTok[0]
    if (ri < 0 || ri >= words.length) return null
    const v = words[ri] & 0xffff
    const month = Math.floor(v / 100)
    const day = v % 100
    const mm = String(month).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    return `${mm}-${dd}`
  }

  if (mode === 'concat2' && regTok.length >= 2) {
    const i = regTok[0]
    const j = regTok[1]
    if (i < 0 || j < 0 || i >= words.length || j >= words.length) return null
    return `${words[i] & 0xffff}${words[j] & 0xffff}`
  }

  if (mode === 'uint32' && regTok.length >= 2) {
    const i = regTok[0]
    const j = regTok[1]
    if (i < 0 || j < 0 || i >= words.length || j >= words.length) return null
    const u32 = (((words[i] & 0xffff) << 16) | (words[j] & 0xffff)) >>> 0
    const scaled = u32 * mult
    return formatScaledNumber(scaled)
  }

  // Python parity: special multi-register formatting used by some configs.
  if (regTok.length >= 2) {
    const i = regTok[0]
    const j = regTok[1]
    if (i >= 0 && j >= 0 && i < words.length && j < words.length) {
      if (paramName === 'Time') {
        const hh = String(words[i] & 0xffff).padStart(2, '0')
        const mm = String(words[j] & 0xffff).padStart(2, '0')
        return `${hh}:${mm}`
      }
      if (paramName === 'Hex Running' || paramName === 'Run Hours of Only Hex') {
        const totalMinutes = (((words[i] & 0xffff) << 16) | (words[j] & 0xffff)) >>> 0
        return formatMinutesToHm(totalMinutes)
      }
    }
  }

  if (regTok.length >= 3) {
    const [i, j, k] = regTok
    if (i >= 0 && j >= 0 && k >= 0 && i < words.length && j < words.length && k < words.length) {
      if (paramName === 'Installation Date' || paramName === "Controller's Date") {
        const dd = String(words[i] & 0xffff).padStart(2, '0')
        const mm = String(words[j] & 0xffff).padStart(2, '0')
        const yy = String(words[k] & 0xffff).padStart(2, '0')
        return `${dd}-${mm}-${yy}`
      }
    }
  }

  const ri = regTok[0]
  if (ri < 0 || ri >= words.length) return null
  const u = words[ri] & 0xffff
  const raw = mode === 'int16' ? int16FromWord(u) : u
  return formatScaledNumber(raw * mult)
}

function cell(d: AlarmDisplay): MonitorLiveCell {
  return { value: d.value, color: d.color }
}

function parseRegTripleFromSpec(spec: unknown[], fallback: [number, number, number]): [number, number, number] {
  const raw = spec[5]
  if (!Array.isArray(raw) || raw.length < 3) return fallback
  const nums = raw.map((x) => (typeof x === 'number' ? x : parseInt(String(x), 10)))
  if (!nums.every((n) => Number.isFinite(n) && n >= 0)) return fallback
  return [Math.floor(nums[0]), Math.floor(nums[1]), Math.floor(nums[2])]
}

function readTripleBytes(coils: Uint8Array, triple: [number, number, number]): [number, number, number] {
  return [
    triple[0] < coils.length ? coils[triple[0]] : 0,
    triple[1] < coils.length ? coils[triple[1]] : 0,
    triple[2] < coils.length ? coils[triple[2]] : 0,
  ]
}

function parseIntFromLiveScalar(s: string): number | null {
  const digits = s.replace(/\D/g, '')
  if (digits.length > 0) {
    const n = parseInt(digits, 10)
    return Number.isFinite(n) ? n : null
  }
  const n = parseInt(s.trim(), 10)
  return Number.isFinite(n) ? n : null
}

function parseNumberOfFans(
  config: ModbusLiveDisplayConfig,
  snap: MonitorRegisterSnapshots,
): number | null {
  const { groups, queryMapping, alarmDiscreteByteIndices } = config
  for (const groupKey of Object.keys(groups)) {
    const block = groups[groupKey]
    const spec = block?.number_of_fans
    if (!block || !Array.isArray(spec)) continue
    const q = queryMapping[groupKey]
    if (!q) continue
    const words = q === 'query1' ? snap.holdingWords : null
    const coils = q === 'query2' ? snap.discreteBytes : null
    const triple = groupKey === 'alarm_params' ? alarmDiscreteByteIndices : null
    const raw = scalarFromSpec('number_of_fans', spec, words, coils, triple)
    if (raw === null) continue
    const n = parseIntFromLiveScalar(raw)
    if (n !== null && n >= 0) return n
  }
  return null
}

function applyNumberOfFansOverrides(out: Record<string, MonitorLiveCell>, numFans: number | null): void {
  if (numFans === null || numFans < 0) return
  const cap = Math.min(6, Math.floor(numFans))
  const muted: MonitorLiveCell = { value: 'N/A', color: '#888888', nameMuted: true }
  for (let i = cap + 1; i <= 6; i++) {
    out[`Fan ${i} Status`] = { ...muted }
    out[`Fan ${i} Run Hour`] = { ...muted }
  }
}

function applyFanStatusBlock(
  block: Record<string, unknown[]>,
  coils: Uint8Array,
  defaultTriple: [number, number, number],
  out: Record<string, MonitorLiveCell>,
  settingsAlarmsBinary: boolean,
): boolean {
  const fanOnSpec = block['Fan On']
  if (!Array.isArray(fanOnSpec) || fanOnSpec.length < 6 || String(fanOnSpec[5]).trim() !== 'fan_status') {
    return false
  }
  const fanOnPos = firstRegToken(fanOnSpec[2])
  if (fanOnPos === null || fanOnPos < 0) return false
  const triple = parseRegTripleFromSpec(fanOnSpec, defaultTriple)
  const [b0, b1, b2] = readTripleBytes(coils, triple)
  const fanOn = getBitIn24(b0, b1, b2, fanOnPos)
  for (let i = 1; i <= 6; i++) {
    const key = `Fan ${i} Status`
    const sp = block[key]
    if (!Array.isArray(sp)) continue
    const p = firstRegToken(sp[2])
    if (p === null || p < 0) continue
    const st = getBitIn24(b0, b1, b2, p)
    out[key] = settingsAlarmsBinary ? settingsEnabledDisabledCell(st) : cell(getFanStatusDisplay(fanOn, st))
  }
  return true
}

function alarmDisplayFromQuery1(
  paramName: string,
  spec: unknown[],
  words: number[],
  alarmWordBase: number | null,
): AlarmDisplay | null {
  if (spec.length < 4) return null
  const mode = getSpecMode(spec)
  const mult = parseFloat(String(spec[3]))
  if (!Number.isFinite(mult)) return null
  const bitPos = firstRegToken(spec[2])
  if (mode === 'bit' && bitPos !== null && bitPos >= 0) {
    let bitVal: 0 | 1
    if (alarmWordBase !== null) {
      if (alarmWordBase >= words.length || bitPos > 15) return null
      bitVal = ((words[alarmWordBase] >> bitPos) & 1) as 0 | 1
    } else {
      const regIdx = Math.floor(bitPos / 16)
      const bitIn = bitPos % 16
      if (regIdx < 0 || regIdx >= words.length) return null
      bitVal = ((words[regIdx] >> bitIn) & 1) as 0 | 1
    }
    return getAlarmMapping(paramName, bitVal)
  }
  if (mode === 'bit') return null
  const ri = firstRegToken(spec[2])
  if (ri === null || ri < 0 || ri >= words.length) return null
  const u = words[ri] & 0xffff
  const raw = mode === 'int16' ? int16FromWord(u) : u
  const scaled = raw * mult
  const bit = (scaled !== 0 ? 1 : 0) as 0 | 1
  return getAlarmMapping(paramName, bit)
}

function alarmBitFromQuery1(
  spec: unknown[],
  words: number[],
  alarmWordBase: number | null,
): 0 | 1 | null {
  if (spec.length < 4) return null
  const mode = getSpecMode(spec)
  const mult = parseFloat(String(spec[3]))
  if (!Number.isFinite(mult)) return null
  const bitPos = firstRegToken(spec[2])
  if (mode === 'bit' && bitPos !== null && bitPos >= 0) {
    if (alarmWordBase !== null) {
      if (alarmWordBase >= words.length || bitPos > 15) return null
      return ((words[alarmWordBase] >> bitPos) & 1) as 0 | 1
    }
    const regIdx = Math.floor(bitPos / 16)
    const bitIn = bitPos % 16
    if (regIdx < 0 || regIdx >= words.length) return null
    return ((words[regIdx] >> bitIn) & 1) as 0 | 1
  }
  if (mode === 'bit') return null
  const ri = firstRegToken(spec[2])
  if (ri === null || ri < 0 || ri >= words.length) return null
  const u = words[ri] & 0xffff
  const raw = mode === 'int16' ? int16FromWord(u) : u
  const scaled = raw * mult
  return (scaled !== 0 ? 1 : 0) as 0 | 1
}

export function buildModbusLiveDisplayMap(
  config: ModbusLiveDisplayConfig,
  snap: MonitorRegisterSnapshots,
  liveOptions?: ModbusLiveDisplayOptions,
): Record<string, MonitorLiveCell> {
  const out: Record<string, MonitorLiveCell> = {}
  const { groups, queryMapping, alarmDiscreteByteIndices, alarmHoldingBitBaseRegister } = config
  const defaultDiscreteTriple: [number, number, number] = alarmDiscreteByteIndices ?? [0, 1, 2]
  const settingsAlarmBits = liveOptions?.settingsAlarmsEnabledDisabled === true

  for (const groupKey of Object.keys(groups)) {
    const block = groups[groupKey]
    if (!block) continue
    const q = queryMapping[groupKey]
    if (!q) continue

    const words = q === 'query1' ? snap.holdingWords : null
    const coils = q === 'query2' ? snap.discreteBytes : null

    if (groupKey === 'alarm_params' && q === 'query2' && coils?.length) {
      const fanStatusApplied = applyFanStatusBlock(
        block,
        coils,
        defaultDiscreteTriple,
        out,
        settingsAlarmBits,
      )

      for (const [paramName, spec] of Object.entries(block)) {
        if (!Array.isArray(spec)) continue
        if (fanStatusApplied && (paramName === 'Fan On' || /^Fan [1-6] Status$/.test(paramName))) {
          continue
        }

        const regTok = parseRegIndices(spec[2])
        const mode = getSpecMode(spec)
        const isBit = mode === 'bit' || (!mode && !words)

        if (!isBit) continue

        const tripleForParam = parseRegTripleFromSpec(spec, defaultDiscreteTriple)
        const [db0, db1, db2] = readTripleBytes(coils, tripleForParam)

        if (paramName === 'Usys' && regTok.length >= 2) {
          const a = getBitIn24(db0, db1, db2, regTok[0])
          const b = getBitIn24(db0, db1, db2, regTok[1])
          out[paramName] = settingsAlarmBits
            ? settingsEnabledDisabledCell(a)
            : cell(dualBitHighLowNormal(a, b))
          continue
        }

        if (paramName === 'Cabinet Temperature' && regTok.length >= 2) {
          const a = getBitIn24(db0, db1, db2, regTok[0])
          const b = getBitIn24(db0, db1, db2, regTok[1])
          out[paramName] = settingsAlarmBits
            ? settingsEnabledDisabledCell(a)
            : cell(dualBitHighLowNormal(a, b))
          continue
        }

        if (INTERNAL_EXTERNAL_FAN_NAMES.has(paramName) && Array.isArray(spec[5]) && spec[5].length >= 3) {
          const failP = firstRegToken(spec[2])
          const runP = firstRegToken(spec[3])
          if (failP !== null && runP !== null && failP >= 0 && runP >= 0) {
            const failB = getBitIn24(db0, db1, db2, failP)
            const runB = getBitIn24(db0, db1, db2, runP)
            out[paramName] = settingsAlarmBits
              ? settingsEnabledDisabledCell(runB)
              : cell(internalExternalFanDisplay(failB, runB))
            continue
          }
        }

        if (regTok.length === 1 && regTok[0] >= 0 && regTok[0] <= 23) {
          const bit = getBitIn24(db0, db1, db2, regTok[0])
          out[paramName] = settingsAlarmBits
            ? settingsEnabledDisabledCell(bit)
            : cell(parseAlarmBit(db0, db1, db2, regTok[0], paramName))
          continue
        }

        if (regTok.length >= 2 && regTok[0] >= 0 && regTok[0] <= 2 && regTok[1] >= 0 && regTok[1] <= 7) {
          const k = regTok[0] * 8 + regTok[1]
          const bit = getBitIn24(db0, db1, db2, k)
          out[paramName] = settingsAlarmBits
            ? settingsEnabledDisabledCell(bit)
            : cell(parseAlarmBit(db0, db1, db2, k, paramName))
          continue
        }

        const addr = resolveCoilByteAndBit(regTok, coils)
        if (addr) {
          const bitVal = ((coils[addr.bi] >> addr.bj) & 1) as 0 | 1
          out[paramName] = settingsAlarmBits
            ? settingsEnabledDisabledCell(bitVal)
            : cell(getAlarmMapping(paramName, bitVal))
        }
      }
      continue
    }

    if (groupKey === 'alarm_params' && q === 'query1' && words?.length) {
      for (const [paramName, spec] of Object.entries(block)) {
        if (!Array.isArray(spec)) continue
        if (settingsAlarmBits) {
          const bit = alarmBitFromQuery1(spec, words, alarmHoldingBitBaseRegister)
          if (bit !== null) out[paramName] = settingsEnabledDisabledCell(bit)
        } else {
          const ad = alarmDisplayFromQuery1(paramName, spec, words, alarmHoldingBitBaseRegister)
          if (ad) out[paramName] = cell(ad)
        }
      }
      continue
    }

    const alarmTriple = groupKey === 'alarm_params' ? alarmDiscreteByteIndices : null
    for (const [paramName, spec] of Object.entries(block)) {
      if (!Array.isArray(spec)) continue
      const v = scalarFromSpec(paramName, spec, words, coils, alarmTriple)
      if (v !== null) out[paramName] = { value: v }
    }
  }

  applyNumberOfFansOverrides(out, parseNumberOfFans(config, snap))

  return out
}

export function buildMonitorLiveDisplayMap(
  config: MonitorDashboardConfig,
  snap: MonitorRegisterSnapshots,
): Record<string, MonitorLiveCell> {
  return buildModbusLiveDisplayMap(config, snap, undefined)
}

export function computeMonitorLiveValues(
  serialLines: string[],
  config: MonitorDashboardConfig | null,
): Record<string, MonitorLiveCell> {
  if (!config) return {}
  const snap = parsePollSerialSnapshots(serialLines, 'monitor')
  return buildModbusLiveDisplayMap(config, snap)
}

export function computeSettingsLiveValues(
  serialLines: string[],
  config: SettingsDashboardConfig | null,
): Record<string, MonitorLiveCell> {
  if (!config) return {}
  const snap = parsePollSerialSnapshots(serialLines, 'settings')
  return buildModbusLiveDisplayMap(config, snap, { settingsAlarmsEnabledDisabled: true })
}
