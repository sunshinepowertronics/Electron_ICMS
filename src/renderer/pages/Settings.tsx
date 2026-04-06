import { ParamSectionCard } from '../components/ParamSectionCard'
import Traffic from './Traffic'
import { useDisplayView } from '../context/DisplayViewContext'
import { STORAGE_FIRMWARE, STORAGE_MODEL } from '../utils/deviceStorage'
import {
  DEFAULT_SECTION_LAYOUT,
  getSettingsDashboardConfig,
  SETTINGS_PARAM_MATRIX_ORDER,
  type SettingsParamGroupKey,
} from '../utils/monitorParamsFromProduct'

const SETTINGS_GRID_CLASS: Record<SettingsParamGroupKey, string> = {
  cooling_params: 'settings-param-cooling',
  alarm_params: 'settings-param-alarm',
  version_params: 'settings-param-version',
}

export default function Settings() {
  const { view, serialConnected, serialLines, serialPath, serialBaudRate, serialSlaveId } = useDisplayView()
  if (view === 'traffic') {
    return (
      <>
        <h1 className="page-title">Settings</h1>
        <div className="traffic-log-embed">
          <Traffic
            connected={serialConnected}
            path={serialPath}
            baudRate={serialBaudRate}
            slaveId={serialSlaveId}
            lines={serialLines}
          />
        </div>
      </>
    )
  }

  const settingsConfig = getSettingsDashboardConfig(
    localStorage.getItem(STORAGE_MODEL),
    localStorage.getItem(STORAGE_FIRMWARE),
  )
  const groups = settingsConfig?.groups ?? null
  const sectionLayout = settingsConfig?.sectionLayout ?? {}

  const platform = typeof window !== 'undefined' && window.icms?.platform ? window.icms.platform : 'unknown'

  return (
    <>
      <h1 className="page-title">Settings</h1>
      {!groups ? (
        <>
          <div className="card">
            <p>
              No device settings parameters for the current device. Set <strong>model</strong> and{' '}
              <strong>firmware version</strong> (matching <code>products.json</code>) in device setup, then open
              Settings again.
            </p>
          </div>
          <div className="card settings-app-card">
            <h3>Application</h3>
            <p>Platform: {platform}. App preferences and configuration can go here.</p>
          </div>
        </>
      ) : (
        <>
          <div className="settings-param-matrix">
            {SETTINGS_PARAM_MATRIX_ORDER.map((groupKey) => {
              const block = groups[groupKey]
              if (!block || Object.keys(block).length === 0) return null
              return (
                <div
                  key={groupKey}
                  className={`dashboard-param-cell ${SETTINGS_GRID_CLASS[groupKey]}`}
                >
                  <ParamSectionCard
                    groupKey={groupKey}
                    block={block}
                    layout={sectionLayout[groupKey] ?? DEFAULT_SECTION_LAYOUT}
                  />
                </div>
              )
            })}
          </div>
       
        </>
      )}
    </>
  )
}
