const ASCII_TYPES = new Set(['ascii', '8bit', '16bit', 'concat2'])

export function normalizeParamKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[()]/g, '')
    .replace(/[-/]/g, '_')
    .trim()
}

export function firstRegisterIndexFromSpec(spec2: unknown): number | null {
  const s = String(spec2 ?? '').trim().split(/\s+/)[0]
  if (!s) return null
  const n = parseInt(s, 10)
  return Number.isFinite(n) && n >= 0 ? n : null
}

export function registerRangeFromSpec(spec2: unknown): { start: number; end: number } | null {
  const parts = String(spec2 ?? '')
    .trim()
    .split(/\s+/)
    .map((x) => parseInt(x, 10))
    .filter((n) => Number.isFinite(n))
  if (parts.length >= 2) {
    const a = parts[0]
    const b = parts[1]
    return { start: Math.min(a, b), end: Math.max(a, b) }
  }
  return null
}

function looksLikeRangeToken(s: string): boolean {
  const t = s.trim().toLowerCase()
  return t.includes('-') || /\bto\b/.test(t)
}

export function getParameterRangeLabel(spec: unknown[]): string | null {
  if (!Array.isArray(spec) || spec.length < 5) return null
  for (const idx of [4, 5]) {
    if (idx >= spec.length) continue
    const rv = spec[idx]
    if (typeof rv === 'string' && looksLikeRangeToken(rv)) return rv.trim()
  }
  return null
}

export function parseRangeBounds(rangeStr: string): { min: number; max: number } | null {
  const lower = rangeStr.trim().toLowerCase()
  let segments: string[]
  if (/\bto\b/.test(lower)) {
    segments = lower.split(/\bto\b/).map((p) => p.trim())
  } else {
    segments = lower.split('-').map((p) => p.trim()).filter((p) => p.length > 0)
  }
  if (segments.length < 2) return null
  const min = parseFloat(segments[0])
  const max = parseFloat(segments[segments.length - 1])
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null
  return min <= max ? { min, max } : { min: max, max: min }
}

export function getDecimalMultiplierFromSpec(spec: unknown[]): number | null {
  if (!Array.isArray(spec) || spec.length < 4) return null
  const m = parseFloat(String(spec[3]))
  if (!Number.isFinite(m) || m <= 0 || m >= 1) return null
  return m
}

export function isAsciiLikeSpec(spec: unknown[]): boolean {
  if (!Array.isArray(spec) || spec.length < 5) return false
  const t4 = String(spec[4]).toLowerCase().trim()
  const t5 = spec.length > 5 ? String(spec[5]).toLowerCase().trim() : ''
  if (ASCII_TYPES.has(t4)) return true
  if (t5 && ASCII_TYPES.has(t5)) return true
  return false
}

export function getSpecNumericMode(spec: unknown[]): 'int16' | 'uint16' {
  const t5 = spec.length > 5 ? String(spec[5]).toLowerCase().trim() : ''
  const t4 = spec.length > 4 ? String(spec[4]).toLowerCase().trim() : ''
  if (t5 === 'int16' || t4 === 'int16') return 'int16'
  return 'uint16'
}

export function clampInt16ToU16(n: number): number {
  const r = Math.round(n)
  const c = Math.max(-32768, Math.min(32767, r))
  return c & 0xffff
}
