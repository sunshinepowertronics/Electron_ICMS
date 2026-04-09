import { useMemo } from 'react'
import { ParamSectionCard } from '../components/ParamSectionCard'
import Traffic from './Traffic'
import { useDisplayView } from '../context/DisplayViewContext'
import { STORAGE_FIRMWARE, STORAGE_MODEL } from '../utils/deviceStorage'
import { computeMonitorLiveValues } from '../utils/monitorLiveValues'
import {
  DEFAULT_SECTION_LAYOUT,
  getMonitorDashboardConfig,
  PARAM_MATRIX_RENDER_ORDER,
  PARAM_MATRIX_SLOT,
} from '../utils/monitorParamsFromProduct'

export default function Dashboard() {
  const { view, serialConnected, serialLines, serialPath, serialBaudRate, serialSlaveId, clearSerialTraffic } =
    useDisplayView()
  const dashboardConfig = getMonitorDashboardConfig(
    localStorage.getItem(STORAGE_MODEL),
    localStorage.getItem(STORAGE_FIRMWARE),
  )
  const groups = dashboardConfig?.groups ?? null
  const sectionLayout = dashboardConfig?.sectionLayout ?? {}
  const liveByParamName = useMemo(() => {
    const cfg = getMonitorDashboardConfig(
      localStorage.getItem(STORAGE_MODEL),
      localStorage.getItem(STORAGE_FIRMWARE),
    )
    return computeMonitorLiveValues(serialLines, cfg)
  }, [serialLines])

  if (view === 'traffic') {
    return (
      <>
        <div className="traffic-log-embed">
          <Traffic
            connected={serialConnected}
            path={serialPath}
            baudRate={serialBaudRate}
            slaveId={serialSlaveId}
            lines={serialLines}
            onClear={clearSerialTraffic}
          />
        </div>
      </>
    )
  }

  return (
    <>
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
                    liveByParamName={liveByParamName}
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
