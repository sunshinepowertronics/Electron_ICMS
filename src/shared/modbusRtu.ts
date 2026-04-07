export function crc16Modbus(data: Uint8Array): number {
  let crc = 0xffff
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i]
    for (let j = 0; j < 8; j++) {
      if (crc & 1) crc = (crc >>> 1) ^ 0xa001
      else crc >>>= 1
    }
  }
  return crc & 0xffff
}

export function parseSlaveByte(slaveIdStr: string): number {
  const s = slaveIdStr.trim()
  if (!s) return 1
  const n = /^0x/i.test(s) ? parseInt(s, 16) : parseInt(s, 10)
  if (!Number.isFinite(n) || n < 0 || n > 247) return 1
  return n
}

function isCrcPlaceholderToken(t: string): boolean {
  return /^crc16m[Oo]dbus$/i.test(t)
}

/**
 * Builds an RTU frame from a products.json template.
 * - `slave_id` is replaced with the connection slave address (decimal or 0x hex).
 * - `crc16MOdbus` / `crc16Modbus`: append CRC over preceding bytes (LSB first).
 * - Otherwise: all tokens are hex pairs; last two bytes are treated as CRC and
 *   recomputed after stamping the first byte with the selected slave id.
 */
export function buildModbusRtuFrame(template: string, slaveIdStr: string): Uint8Array | null {
  const raw = template.trim()
  if (!raw) return null

  const tokens = raw.split(/\s+/).filter(Boolean)
  const bytes: number[] = []
  let i = 0
  let sawSlaveKeyword = false

  while (i < tokens.length) {
    const t = tokens[i]
    if (t === 'slave_id') {
      sawSlaveKeyword = true
      bytes.push(parseSlaveByte(slaveIdStr))
      i++
      continue
    }
    if (isCrcPlaceholderToken(t)) {
      i++
      if (i < tokens.length) return null
      if (bytes.length < 2) return null
      const crc = crc16Modbus(new Uint8Array(bytes))
      return new Uint8Array([...bytes, crc & 0xff, (crc >> 8) & 0xff])
    }
    if (!/^[0-9a-fA-F]{2}$/.test(t)) return null
    bytes.push(parseInt(t, 16))
    i++
  }

  if (bytes.length < 4) return null
  const body = bytes.slice(0, -2)
  if (!sawSlaveKeyword) body[0] = parseSlaveByte(slaveIdStr)
  const crc = crc16Modbus(new Uint8Array(body))
  return new Uint8Array([...body, crc & 0xff, (crc >> 8) & 0xff])
}

function appendCrc(body: number[]): Uint8Array {
  const crc = crc16Modbus(new Uint8Array(body))
  return new Uint8Array([...body, crc & 0xff, (crc >> 8) & 0xff])
}

export function buildWriteSingleRegisterRtu(slaveIdStr: string, regAddr: number, valueU16: number): Uint8Array | null {
  if (!Number.isFinite(regAddr) || regAddr < 0 || regAddr > 0xffff) return null
  const v = Math.round(valueU16) & 0xffff
  const slave = parseSlaveByte(slaveIdStr)
  const hi = (regAddr >> 8) & 0xff
  const lo = regAddr & 0xff
  const vhi = (v >> 8) & 0xff
  const vlo = v & 0xff
  return appendCrc([slave, 0x06, hi, lo, vhi, vlo])
}

export function buildWriteSingleCoilRtu(slaveIdStr: string, coilAddr: number, on: boolean): Uint8Array | null {
  if (!Number.isFinite(coilAddr) || coilAddr < 0 || coilAddr > 0xffff) return null
  const slave = parseSlaveByte(slaveIdStr)
  const hi = (coilAddr >> 8) & 0xff
  const lo = coilAddr & 0xff
  const vhi = on ? 0xff : 0x00
  const vlo = 0x00
  return appendCrc([slave, 0x05, hi, lo, vhi, vlo])
}
