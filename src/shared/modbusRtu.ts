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

function parseSlaveByte(slaveIdStr: string): number {
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
