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

export type MonitorQueryKey = 'query1' | 'query2'

export type MonitorDashboardConfig = {
  groups: Partial<Record<ParamGroupKey, Record<string, unknown[]>>>
  sectionLayout: Partial<Record<ParamGroupKey, SectionGridLayout>>
  queryMapping: Partial<Record<ParamGroupKey, MonitorQueryKey>>
  /** When set, alarm bit indices refer to 24 bits from `coils[b0]`, `coils[b1]`, `coils[b2]` (8 bits each, LSB-first). */
  alarmDiscreteByteIndices: [number, number, number] | null
  /** `b0` from JSON: when alarms use query1, single-register bit decode uses `words[b0]` and bit index from spec. */
  alarmHoldingBitBaseRegister: number | null
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

function isParamSpecArray(v: unknown): v is unknown[] {
  return Array.isArray(v) && v.length >= 1
}

export const SETTINGS_PARAM_MATRIX_ORDER = ['cooling_params', 'alarm_params', 'version_params'] as const

export type SettingsParamGroupKey = (typeof SETTINGS_PARAM_MATRIX_ORDER)[number]

export type SettingsDashboardConfig = {
  groups: Partial<Record<SettingsParamGroupKey, Record<string, unknown[]>>>
  sectionLayout: Partial<Record<SettingsParamGroupKey, SectionGridLayout>>
  queryMapping: Partial<Record<SettingsParamGroupKey, MonitorQueryKey>>
  alarmDiscreteByteIndices: [number, number, number] | null
  alarmHoldingBitBaseRegister: number | null
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

function monitorBlockHasQueries(m: Record<string, unknown>): boolean {
  const q1 = m.query1
  const q2 = m.query2
  return (typeof q1 === 'string' && q1.trim().length > 0) || (typeof q2 === 'string' && q2.trim().length > 0)
}

function extractMonitorFromSidebar(sidebar: unknown[] | undefined): Record<string, unknown> | null {
  if (!sidebar) return null
  const monitor = sidebar.find(
    (s) =>
      isPlainObject(s) &&
      String((s as { option_name?: string }).option_name ?? '')
        .trim()
        .toLowerCase() === 'monitor',
  )
  return monitor && isPlainObject(monitor) ? monitor : null
}

/** Exact model+firmware first; else same model with default firmware; else first firmware that has Monitor queries. */
function resolveMonitorEntryForSerialPoll(
  modelName: string | null,
  firmwareVersion: string | null,
): Record<string, unknown> | null {
  const exact = resolveMonitorEntry(modelName, firmwareVersion)
  if (exact && monitorBlockHasQueries(exact)) return exact

  const model = modelName?.trim()
  if (!model) return null

  const { products } = productsData as {
    products: Array<{
      product_name: string
      versions: Array<{
        version: string
        is_default?: boolean
        sidebar_params?: unknown[]
      }>
    }>
  }

  const product = products.find((p) => p.product_name === model)
  if (!product?.versions?.length) return null

  const fw = firmwareVersion?.trim()
  if (fw) {
    const v = product.versions.find((e) => e.version === fw)
    const m = v ? extractMonitorFromSidebar(v.sidebar_params) : null
    if (m && monitorBlockHasQueries(m)) return m
  }

  const defaultVer = product.versions.find((e) => e.is_default === true)
  if (defaultVer) {
    const m = extractMonitorFromSidebar(defaultVer.sidebar_params)
    if (m && monitorBlockHasQueries(m)) return m
  }

  for (const v of product.versions) {
    const m = extractMonitorFromSidebar(v.sidebar_params)
    if (m && monitorBlockHasQueries(m)) return m
  }

  return null
}

function extractSettingsFromSidebar(sidebar: unknown[] | undefined): Record<string, unknown> | null {
  if (!sidebar) return null
  const settings = sidebar.find(
    (s) =>
      isPlainObject(s) &&
      String((s as { option_name?: string }).option_name ?? '')
        .trim()
        .toLowerCase() === 'settings',
  )
  return settings && isPlainObject(settings) ? settings : null
}

function resolveSettingsEntry(
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

  return extractSettingsFromSidebar(versionEntry.sidebar_params)
}

function resolveSettingsEntryForSerialPoll(
  modelName: string | null,
  firmwareVersion: string | null,
): Record<string, unknown> | null {
  const exact = resolveSettingsEntry(modelName, firmwareVersion)
  if (exact && monitorBlockHasQueries(exact)) return exact

  const model = modelName?.trim()
  if (!model) return null

  const { products } = productsData as {
    products: Array<{
      product_name: string
      versions: Array<{
        version: string
        is_default?: boolean
        sidebar_params?: unknown[]
      }>
    }>
  }

  const product = products.find((p) => p.product_name === model)
  if (!product?.versions?.length) return null

  const fw = firmwareVersion?.trim()
  if (fw) {
    const v = product.versions.find((e) => e.version === fw)
    const s = v ? extractSettingsFromSidebar(v.sidebar_params) : null
    if (s && monitorBlockHasQueries(s)) return s
  }

  const defaultVer = product.versions.find((e) => e.is_default === true)
  if (defaultVer) {
    const s = extractSettingsFromSidebar(defaultVer.sidebar_params)
    if (s && monitorBlockHasQueries(s)) return s
  }

  for (const v of product.versions) {
    const s = extractSettingsFromSidebar(v.sidebar_params)
    if (s && monitorBlockHasQueries(s)) return s
  }

  return null
}

export function getSettingsQueryTemplates(
  modelName: string | null,
  firmwareVersion: string | null,
): { query1?: string; query2?: string } | null {
  const settings = resolveSettingsEntryForSerialPoll(modelName, firmwareVersion)
  if (!settings) return null
  const q1 = settings.query1
  const q2 = settings.query2
  const out: { query1?: string; query2?: string } = {}
  if (typeof q1 === 'string' && q1.trim()) out.query1 = q1.trim()
  if (typeof q2 === 'string' && q2.trim()) out.query2 = q2.trim()
  return Object.keys(out).length > 0 ? out : null
}

function readSettingsQueryMapping(settings: Record<string, unknown>): Partial<Record<SettingsParamGroupKey, MonitorQueryKey>> {
  const raw = settings.query_mapping
  if (!isPlainObject(raw)) return {}
  const out: Partial<Record<SettingsParamGroupKey, MonitorQueryKey>> = {}
  for (const key of SETTINGS_PARAM_MATRIX_ORDER) {
    const v = raw[key]
    if (v === 'query1' || v === 'query2') out[key] = v
  }
  return out
}

export function getSettingsDashboardConfig(
  modelName: string | null,
  firmwareVersion: string | null,
): SettingsDashboardConfig | null {
  const settings = resolveSettingsEntry(modelName, firmwareVersion)
  if (!settings) return null

  const groups: Partial<Record<SettingsParamGroupKey, Record<string, unknown[]>>> = {}
  const sectionLayout: Partial<Record<SettingsParamGroupKey, SectionGridLayout>> = {}

  for (const key of SETTINGS_PARAM_MATRIX_ORDER) {
    const raw = settings[key]
    if (!isPlainObject(raw)) continue
    const entries: Record<string, unknown[]> = {}
    for (const [paramName, spec] of Object.entries(raw)) {
      if (!isParamSpecArray(spec)) continue
      entries[paramName] = spec
    }
    if (Object.keys(entries).length > 0) {
      groups[key] = entries
      sectionLayout[key] = readSectionLayout(settings, key as ParamGroupKey)
    }
  }

  return Object.keys(groups).length > 0
    ? {
        groups,
        sectionLayout,
        queryMapping: readSettingsQueryMapping(settings),
        alarmDiscreteByteIndices: readMonitorAlarmDiscreteTriple(settings),
        alarmHoldingBitBaseRegister: readMonitorAlarmB0(settings),
      }
    : null
}

function readMonitorQueryMapping(monitor: Record<string, unknown>): Partial<Record<ParamGroupKey, MonitorQueryKey>> {
  const raw = monitor.query_mapping
  if (!isPlainObject(raw)) return {}
  const out: Partial<Record<ParamGroupKey, MonitorQueryKey>> = {}
  for (const key of PARAM_SECTION_ORDER) {
    const v = raw[key]
    if (v === 'query1' || v === 'query2') out[key] = v
  }
  return out
}

function readMonitorAlarmDiscreteTriple(monitor: Record<string, unknown>): [number, number, number] | null {
  const parts: number[] = []
  for (const k of ['b0', 'b1', 'b2'] as const) {
    const v = monitor[k]
    const n = typeof v === 'number' && Number.isFinite(v) ? v : parseInt(String(v ?? '').trim(), 10)
    if (!Number.isFinite(n) || n < 0) return null
    parts.push(Math.floor(n))
  }
  return [parts[0], parts[1], parts[2]]
}

function readMonitorAlarmB0(monitor: Record<string, unknown>): number | null {
  const v = monitor.b0
  const n = typeof v === 'number' && Number.isFinite(v) ? v : parseInt(String(v ?? '').trim(), 10)
  if (!Number.isFinite(n) || n < 0) return null
  return Math.floor(n)
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

  return Object.keys(groups).length > 0
    ? {
        groups,
        sectionLayout,
        queryMapping: readMonitorQueryMapping(monitor),
        alarmDiscreteByteIndices: readMonitorAlarmDiscreteTriple(monitor),
        alarmHoldingBitBaseRegister: readMonitorAlarmB0(monitor),
      }
    : null
}

export function getMonitorParamGroups(
  modelName: string | null,
  firmwareVersion: string | null,
): Partial<Record<ParamGroupKey, Record<string, unknown[]>>> | null {
  return getMonitorDashboardConfig(modelName, firmwareVersion)?.groups ?? null
}

export function getMonitorQueryTemplates(
  modelName: string | null,
  firmwareVersion: string | null,
): { query1?: string; query2?: string } | null {
  const monitor = resolveMonitorEntryForSerialPoll(modelName, firmwareVersion)
  if (!monitor) return null
  const q1 = monitor.query1
  const q2 = monitor.query2
  const out: { query1?: string; query2?: string } = {}
  if (typeof q1 === 'string' && q1.trim()) out.query1 = q1.trim()
  if (typeof q2 === 'string' && q2.trim()) out.query2 = q2.trim()
  return Object.keys(out).length > 0 ? out : null
}
