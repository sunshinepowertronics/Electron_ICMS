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

export function modbusRtuCrcOk(u: Uint8Array, start = 0, end = u.length): boolean {
  if (end - start < 4) return false
  const c = crc16Modbus(u.subarray(start, end - 2))
  return (c & 0xff) === u[end - 2]! && ((c >> 8) & 0xff) === u[end - 1]!
}

/**
 * FC01/FC02 response length. Some devices reply with a fixed short frame where byte 2
 * is payload (not a Modbus byte count); fall back to the shortest CRC-valid length.
 */
export function modbusRtuCoilReadResponseLength(u: Uint8Array, off = 0): number | null {
  if (u.length - off < 3) return null
  const func = u[off + 1]!
  if (func !== 1 && func !== 2) return null
  const bc = u[off + 2]!
  const standardLen = 5 + bc
  if (bc <= 250 && u.length - off >= standardLen && modbusRtuCrcOk(u, off, off + standardLen)) {
    return standardLen
  }
  const maxTry = Math.min(252, u.length - off)
  for (let len = 5; len <= maxTry; len++) {
    if (modbusRtuCrcOk(u, off, off + len)) return len
  }
  return null
}

/** Payload bytes from an FC01/FC02 response (standard or compact). */
export function modbusRtuReadCoilDiscretePayload(frame: Uint8Array): Uint8Array | null {
  if (frame.length < 5 || !modbusRtuCrcOk(frame)) return null
  const func = frame[1]!
  if (func !== 1 && func !== 2) return null
  const bc = frame[2]!
  const standardLen = 5 + bc
  if (bc <= 250 && frame.length === standardLen) {
    return frame.subarray(3, 3 + bc)
  }
  // Some firmwares emit a bogus byte-count value (e.g. 0x16 where it should be
  // 0x02) but still keep the standard layout. When the declared byte count
  // claims more bytes than physically present, treat byte 2 as a corrupt
  // byte-count and return the bytes between it and the CRC instead of falling
  // back to compact decoding (which would otherwise leak the bad count byte
  // into the coil data and shift every bit position by 8).
  if (bc > frame.length - 5) {
    return frame.subarray(3, frame.length - 2)
  }
  return frame.subarray(2, frame.length - 2)
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
