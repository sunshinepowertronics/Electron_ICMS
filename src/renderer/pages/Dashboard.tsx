import MonitorTrafficOverview from './MonitorTrafficOverview'
import { useDisplayView } from '../context/DisplayViewContext'
import { STORAGE_FIRMWARE, STORAGE_MODEL } from '../utils/deviceStorage'
import {
  DEFAULT_SECTION_LAYOUT,
  getMonitorDashboardConfig,
  PARAM_MATRIX_RENDER_ORDER,
  PARAM_MATRIX_SLOT,
  PARAM_SECTION_TITLES,
  splitParamEntriesForLayout,
  type ParamGroupKey,
  type SectionGridLayout,
} from '../utils/monitorParamsFromProduct'

function formatUnit(raw: unknown): string {
  if (raw === null || raw === undefined) return '—'
  const t = String(raw).trim()
  return t.length > 0 ? t : ''
}

function formatDefault(raw: unknown): string {
  if (raw === null || raw === undefined) return '—'
  const t = String(raw).trim()
  return t.length > 0 ? t : '—'
}

function ParamSectionCard({
  groupKey,
  block,
  layout,
}: {
  groupKey: ParamGroupKey
  block: Record<string, unknown[]>
  layout: SectionGridLayout
}) {
  const columnChunks = splitParamEntriesForLayout(Object.entries(block), layout)

  return (
    <div className="card dashboard-param-matrix-cell">
      <h3>{PARAM_SECTION_TITLES[groupKey]}</h3>
      <div className="dashboard-param-section-cols">
        {columnChunks.map((colEntries, colIndex) => (
          <ul key={colIndex} className="dashboard-param-list dashboard-param-col">
            {colEntries.map(([name, spec]) => (
              <li key={name} className="dashboard-param-row">
                <span className="dashboard-param-name">{name}</span>
                <span className="dashboard-param-default">{formatDefault(spec.length > 1 ? spec[1] : undefined)}</span>
                <span className="dashboard-param-unit">{formatUnit(spec[0])}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { view } = useDisplayView()
  if (view === 'traffic') {
    return <MonitorTrafficOverview />
  }

  const dashboardConfig = getMonitorDashboardConfig(
    localStorage.getItem(STORAGE_MODEL),
    localStorage.getItem(STORAGE_FIRMWARE),
  )
  const groups = dashboardConfig?.groups ?? null
  const sectionLayout = dashboardConfig?.sectionLayout ?? {}

  return (
    <>
      <h1 className="page-title">Dashboard</h1>
      {!groups ? (
        <div className="card">
          <p>
            No monitor parameters for the current device. Set <strong>model</strong> and{' '}
            <strong>firmware version</strong> (matching <code>products.json</code>) in device setup, then
            open Monitor again.
          </p>
        </div>
      ) : (
        <div className="dashboard-param-matrix">
          {PARAM_MATRIX_RENDER_ORDER.map((groupKey) => {
            const block = groups[groupKey]
            const slot = PARAM_MATRIX_SLOT[groupKey]
            return (
              <div
                key={groupKey}
                className="dashboard-param-cell"
                style={{ gridRow: slot.row, gridColumn: slot.col }}
              >
                {block && Object.keys(block).length > 0 ? (
                  <ParamSectionCard
                    groupKey={groupKey}
                    block={block}
                    layout={sectionLayout[groupKey] ?? DEFAULT_SECTION_LAYOUT}
                  />
                ) : null}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
