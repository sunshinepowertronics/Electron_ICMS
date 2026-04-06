import productsData from './products.json'

export type ParamGroupKey = 'cooling_params' | 'power_params' | 'alarm_params' | 'version_params'

export const PARAM_SECTION_ORDER: ParamGroupKey[] = [
  'cooling_params',
  'power_params',
  'alarm_params',
  'version_params',
]

export const PARAM_MATRIX_RENDER_ORDER: ParamGroupKey[] = [
  'cooling_params',
  'alarm_params',
  'power_params',
  'version_params',
]

export const PARAM_SECTION_TITLES: Record<ParamGroupKey, string> = {
  cooling_params: 'Cooling parameters',
  power_params: 'Power parameters',
  alarm_params: 'Alarm parameters',
  version_params: 'Version parameters',
}

export const PARAM_MATRIX_SLOT: Record<ParamGroupKey, { row: number; col: number }> = {
  cooling_params: { row: 1, col: 1 },
  alarm_params: { row: 1, col: 2 },
  power_params: { row: 2, col: 1 },
  version_params: { row: 2, col: 2 },
}

/** rows = number of parameters placed in the first column; remaining params fill other columns. */
export type SectionGridLayout = { columns: number; rows: number }

/** Sentinel: distribute params evenly across all columns (when *_rows omitted but columns > 1). */
export const FIRST_COLUMN_EVEN_SPLIT = -1

export const DEFAULT_SECTION_LAYOUT: SectionGridLayout = { columns: 1, rows: 24 }

function clampInt(value: unknown, min: number, max: number, fallback: number): number {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, Math.round(n)))
}

function readSectionLayout(monitor: Record<string, unknown>, group: ParamGroupKey): SectionGridLayout {
  const colKey = `${group}_columns`
  const rowKey = `${group}_rows`
  const hasCol = colKey in monitor
  const hasRow = rowKey in monitor
  if (!hasCol && !hasRow) return DEFAULT_SECTION_LAYOUT
  const columns = clampInt(monitor[colKey], 1, 6, DEFAULT_SECTION_LAYOUT.columns)
  if (columns <= 1) {
    return { columns: 1, rows: hasRow ? clampInt(monitor[rowKey], 0, 500, 0) : DEFAULT_SECTION_LAYOUT.rows }
  }
  if (!hasRow) {
    return { columns, rows: FIRST_COLUMN_EVEN_SPLIT }
  }
  const rows = clampInt(monitor[rowKey], 0, 500, 0)
  return { columns, rows }
}

function splitEvenly<T>(items: T[], k: number): T[][] {
  if (k <= 0) return []
  if (k === 1) return [items]
  const n = items.length
  const out: T[][] = Array.from({ length: k }, () => [])
  if (n === 0) return out
  const base = Math.floor(n / k)
  const extra = n % k
  let i = 0
  for (let c = 0; c < k; c++) {
    const size = base + (c < extra ? 1 : 0)
    out[c] = items.slice(i, i + size)
    i += size
  }
  return out
}

export function splitParamEntriesForLayout(
  entries: [string, unknown[]][],
  layout: SectionGridLayout,
): [string, unknown[]][][] {
  const { columns, rows } = layout
  if (columns <= 1) return [entries]

  if (rows === FIRST_COLUMN_EVEN_SPLIT) {
    return splitEvenly(entries, columns)
  }

  const n = entries.length
  const firstLen = Math.min(Math.max(0, rows), n)
  const col0 = entries.slice(0, firstLen)
  const rest = entries.slice(firstLen)
  const restCols = columns - 1
  if (restCols <= 0) return [col0]
  return [col0, ...splitEvenly(rest, restCols)]
}

export type MonitorDashboardConfig = {
  groups: Partial<Record<ParamGroupKey, Record<string, unknown[]>>>
  sectionLayout: Partial<Record<ParamGroupKey, SectionGridLayout>>
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

function isParamSpecArray(v: unknown): v is unknown[] {
  return Array.isArray(v) && v.length >= 1
}

function resolveMonitorEntry(
  modelName: string | null,
  firmwareVersion: string | null,
): Record<string, unknown> | null {
  const model = modelName?.trim()
  const fw = firmwareVersion?.trim()
  if (!model || !fw) return null

  const { products } = productsData as {
    products: Array<{
      product_name: string
      versions: Array<{
        version: string
        sidebar_params?: unknown[]
      }>
    }>
  }

  const product = products.find((p) => p.product_name === model)
  if (!product) return null

  const versionEntry = product.versions.find((v) => v.version === fw)
  if (!versionEntry?.sidebar_params) return null

  const monitor = versionEntry.sidebar_params.find(
    (s) =>
      isPlainObject(s) &&
      String((s as { option_name?: string }).option_name ?? '')
        .trim()
        .toLowerCase() === 'monitor',
  )
  if (!monitor || !isPlainObject(monitor)) return null
  return monitor
}

export function getMonitorDashboardConfig(
  modelName: string | null,
  firmwareVersion: string | null,
): MonitorDashboardConfig | null {
  const monitor = resolveMonitorEntry(modelName, firmwareVersion)
  if (!monitor) return null

  const groups: Partial<Record<ParamGroupKey, Record<string, unknown[]>>> = {}
  const sectionLayout: Partial<Record<ParamGroupKey, SectionGridLayout>> = {}

  for (const key of PARAM_SECTION_ORDER) {
    const raw = monitor[key]
    if (!isPlainObject(raw)) continue
    const entries: Record<string, unknown[]> = {}
    for (const [paramName, spec] of Object.entries(raw)) {
      if (!isParamSpecArray(spec)) continue
      entries[paramName] = spec
    }
    if (Object.keys(entries).length > 0) {
      groups[key] = entries
      sectionLayout[key] = readSectionLayout(monitor, key)
    }
  }

  return Object.keys(groups).length > 0 ? { groups, sectionLayout } : null
}

export function getMonitorParamGroups(
  modelName: string | null,
  firmwareVersion: string | null,
): Partial<Record<ParamGroupKey, Record<string, unknown[]>>> | null {
  return getMonitorDashboardConfig(modelName, firmwareVersion)?.groups ?? null
}
