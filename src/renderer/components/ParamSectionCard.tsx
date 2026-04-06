import {
  PARAM_SECTION_TITLES,
  splitParamEntriesForLayout,
  type ParamGroupKey,
  type SectionGridLayout,
} from '../utils/monitorParamsFromProduct'
import type { MonitorLiveCell } from '../utils/monitorLiveValues'

const LIVE_SCALAR_COLOR = '#00ff00'

export function formatUnit(raw: unknown): string {
  if (raw === null || raw === undefined) return '—'
  const t = String(raw).trim()
  return t.length > 0 ? t : ''
}

export function formatDefault(raw: unknown): string {
  if (raw === null || raw === undefined) return '—'
  const t = String(raw).trim()
  return t.length > 0 ? t : '—'
}

function entriesForParamMatrix(
  groupKey: ParamGroupKey,
  block: Record<string, unknown[]>,
): [string, unknown[]][] {
  const entries = Object.entries(block)
  if (groupKey !== 'alarm_params') return entries
  const fanOn = block['Fan On']
  const hideFanOn =
    Array.isArray(fanOn) && fanOn.length >= 6 && String(fanOn[5]).trim() === 'fan_status'
  if (!hideFanOn) return entries
  return entries.filter(([name]) => name !== 'Fan On')
}

export function ParamSectionCard({
  groupKey,
  block,
  layout,
  liveByParamName,
}: {
  groupKey: ParamGroupKey
  block: Record<string, unknown[]>
  layout: SectionGridLayout
  liveByParamName?: Record<string, MonitorLiveCell>
}) {
  const columnChunks = splitParamEntriesForLayout(entriesForParamMatrix(groupKey, block), layout)

  return (
    <div className="card dashboard-param-matrix-cell">
      <h3>{PARAM_SECTION_TITLES[groupKey]}</h3>
      <div className="dashboard-param-section-cols">
        {columnChunks.map((colEntries, colIndex) => (
          <ul key={colIndex} className="dashboard-param-list dashboard-param-col">
            {colEntries.map(([name, spec]) => {
              const live = liveByParamName?.[name]
              const text = live?.value ?? formatDefault(spec.length > 1 ? spec[1] : undefined)
              const valueColor = live ? (live.color ?? LIVE_SCALAR_COLOR) : undefined
              return (
                <li key={name} className="dashboard-param-row">
                  <span className="dashboard-param-name">{name}</span>
                  <span
                    className="dashboard-param-default"
                    style={valueColor ? { color: valueColor } : undefined}
                  >
                    {text}
                  </span>
                  <span className="dashboard-param-unit">{formatUnit(spec[0])}</span>
                </li>
              )
            })}
          </ul>
        ))}
      </div>
    </div>
  )
}
