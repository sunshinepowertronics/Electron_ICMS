import type { KeyboardEvent } from 'react'
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

function isVersionParamHidden(spec: unknown[]): boolean {
  return spec.length >= 5 && String(spec[4]).trim() === 'hide'
}

function entriesForParamMatrix(
  groupKey: ParamGroupKey,
  block: Record<string, unknown[]>,
): [string, unknown[]][] {
  let entries = Object.entries(block)

  if (groupKey === 'version_params') {
    entries = entries.filter(([, spec]) => !Array.isArray(spec) || !isVersionParamHidden(spec))
  }

  if (groupKey === 'alarm_params') {
    const fanOn = block['Fan On']
    const hideFanOn =
      Array.isArray(fanOn) && fanOn.length >= 6 && String(fanOn[5]).trim() === 'fan_status'
    if (hideFanOn) {
      entries = entries.filter(([name]) => name !== 'Fan On')
    }
  }

  return entries
}

export function ParamSectionCard({
  groupKey,
  block,
  layout,
  liveByParamName,
  interactive,
  onParamRowClick,
}: {
  groupKey: ParamGroupKey
  block: Record<string, unknown[]>
  layout: SectionGridLayout
  liveByParamName?: Record<string, MonitorLiveCell>
  interactive?: boolean
  onParamRowClick?: (p: { paramName: string; spec: unknown[]; displayText: string }) => void
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
              const clickable = Boolean(interactive && onParamRowClick)
              return (
                <li
                  key={name}
                  className={`dashboard-param-row${clickable ? ' dashboard-param-row--clickable' : ''}`}
                  {...(clickable
                    ? {
                        role: 'button' as const,
                        tabIndex: 0,
                        onClick: () => onParamRowClick!({ paramName: name, spec, displayText: text }),
                        onKeyDown: (e: KeyboardEvent) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            onParamRowClick!({ paramName: name, spec, displayText: text })
                          }
                        },
                      }
                    : {})}
                >
                  <span
                    className={`dashboard-param-name${live?.nameMuted ? ' dashboard-param-name--muted' : ''}`}
                  >
                    {name}
                  </span>
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
