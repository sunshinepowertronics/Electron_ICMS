import { useCallback, useEffect, useRef, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Logs from './pages/Logs'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import DefaultCard from './pages/DefaultCard'
import Traffic from './pages/Traffic'
import Help from './pages/Help'
import SectionPage from './pages/SectionPage'
import { DateTimeSyncDialog } from './components/DateTimeSyncDialog'
import { MdClose, MdUsb, MdUsbOff } from 'react-icons/md'
import { SidebarNavIcon } from './components/SidebarNavIcon'
import { getProductNavFromStorage, tailNavItems } from './utils/productNav'
import { DisplayViewProvider } from './context/DisplayViewContext'
import { STORAGE_FIRMWARE, STORAGE_MODEL } from './utils/deviceStorage'
import type { UpdateStatus } from '../preload/env'
import {
  getMonitorDashboardConfig,
  getMonitorQueryTemplates,
  getSettingsDashboardConfig,
  getSettingsQueryTemplates,
} from './utils/monitorParamsFromProduct'
import { buildModbusRtuFrame } from '../shared/modbusRtu'

type SerialPortListItem = { path: string; label: string }

const BAUD_RATES = [1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600] as const

const MONITOR_POLL_MS = 600

function serialPortFieldCopy(platform: string): { label: string; selectPlaceholder: string } {
  if (platform === 'win32') {
    return { label: 'COM / serial port', selectPlaceholder: 'Select COM port' }
  }
  return { label: 'Serial port', selectPlaceholder: 'Select serial port' }
}

function ConnectModal({
  open,
  onClose,
  onConnected,
}: {
  open: boolean
  onClose: () => void
  onConnected: (info: { path: string; baudRate: number; slaveId: string }) => void
}) {
  const [ports, setPorts] = useState<SerialPortListItem[]>([])
  const [portsLoading, setPortsLoading] = useState(false)
  const [portPath, setPortPath] = useState('')
  const [slaveId, setSlaveId] = useState('')
  const [baudRate, setBaudRate] = useState<number>(9600)
  const [connectBusy, setConnectBusy] = useState(false)
  const [connectError, setConnectError] = useState<string | null>(null)

  const { label: portFieldLabel, selectPlaceholder } = serialPortFieldCopy(window.icms.platform)

  useEffect(() => {
    if (!open) return
    let cancelled = false
    setPortsLoading(true)
    const run = async () => {
      try {
        const list = await window.icms.listSerialPorts()
        if (!cancelled) setPorts(Array.isArray(list) ? list : [])
      } catch {
        if (!cancelled) setPorts([])
      } finally {
        if (!cancelled) setPortsLoading(false)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      setPortPath('')
      setSlaveId('')
      setBaudRate(9600)
      setConnectError(null)
      setConnectBusy(false)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const canConnect = Boolean(portPath) && !portsLoading

  return (
    <div className="connect-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="connect-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="connect-modal-title"
        aria-describedby="connect-modal-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="connect-modal-header">
          <div className="connect-modal-header-text">
            <span className="connect-modal-icon-badge" aria-hidden="true">
              <MdUsb className="connect-modal-header-icon" />
            </span>
            <div>
              <h2 id="connect-modal-title" className="connect-modal-title">
                Serial connection
              </h2>
              <p id="connect-modal-desc" className="connect-modal-subtitle">
                Select an available port and settings for your device.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="connect-modal-dismiss"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <MdClose className="connect-modal-dismiss-icon" aria-hidden />
          </button>
        </div>
        <form className="connect-modal-form" onSubmit={(e) => e.preventDefault()}>
          <div className="connect-modal-body">
            <div className="connect-modal-field">
              <label className="connect-modal-label" htmlFor="connect-serial-port">
                {portFieldLabel}
              </label>
              <select
                id="connect-serial-port"
                className="connect-modal-select"
                value={portPath}
                onChange={(e) => setPortPath(e.target.value)}
                disabled={portsLoading || (!portsLoading && ports.length === 0)}
              >
                <option value="">
                  {portsLoading
                    ? 'Scanning for ports…'
                    : ports.length === 0
                      ? 'No serial ports detected'
                      : selectPlaceholder}
                </option>
                {ports.map((p) => (
                  <option key={p.path} value={p.path}>
                    {p.label}
                  </option>
                ))}
              </select>
              {!portsLoading && ports.length === 0 ? (
                <p className="connect-modal-hint">Connect a USB serial adapter and reopen this dialog.</p>
              ) : null}
            </div>
            <div className="connect-modal-row2">
              <div className="connect-modal-field connect-modal-field--compact">
                <label className="connect-modal-label" htmlFor="connect-slave-id">
                  Slave ID
                </label>
                <input
                  id="connect-slave-id"
                  className="connect-modal-input"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="1–247"
                  value={slaveId}
                  onChange={(e) => setSlaveId(e.target.value)}
                />
              </div>
              <div className="connect-modal-field connect-modal-field--compact">
                <label className="connect-modal-label" htmlFor="connect-baud">
                  Baud rate
                </label>
                <select
                  id="connect-baud"
                  className="connect-modal-select"
                  value={baudRate}
                  onChange={(e) => setBaudRate(Number(e.target.value))}
                >
                  {BAUD_RATES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {connectError ? <p className="connect-modal-error">{connectError}</p> : null}
          <div className="connect-modal-footer">
            <button
              type="button"
              className="connect-modal-btn connect-modal-btn--secondary"
              disabled={connectBusy}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="connect-modal-btn connect-modal-btn--primary"
              disabled={!canConnect || connectBusy}
              onClick={async () => {
                setConnectError(null)
                setConnectBusy(true)
                try {
                  const result = await window.icms.openSerialPort({
                    path: portPath,
                    baudRate,
                    slaveId: slaveId.trim(),
                  })
                  if (!result.ok) {
                    setConnectError(result.error)
                    return
                  }
                  onConnected({
                    path: result.path,
                    baudRate: result.baudRate,
                    slaveId: result.slaveId,
                  })
                  onClose()
                } catch (e) {
                  setConnectError(e instanceof Error ? e.message : 'Could not open port')
                } finally {
                  setConnectBusy(false)
                }
              }}
            >
              {connectBusy ? 'Connecting…' : 'Connect'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function RootRedirect() {
  return localStorage.getItem('PinSetup') === 'true' ? (
    <Navigate to="/login" replace />
  ) : (
    <Auth />
  )
}

function SetupRouteGuard() {
  return localStorage.getItem('PinSetup') === 'true' ? <Navigate to="/login" replace /> : <Auth />
}

function LoginRouteGuard() {
  return localStorage.getItem('PinSetup') === 'true' ? <Login /> : <Navigate to="/setup" replace />
}

function renderNavLink(item: { to: string; label: string; key: string }) {
  const { to, label, key } = item
  return (
    <NavLink
      key={key}
      to={to}
      className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
    >
      <span className="nav-link-icon" aria-hidden>
        <SidebarNavIcon to={to} label={label} />
      </span>
      <span className="nav-link-label">{label}</span>
    </NavLink>
  )
}

function SidebarLogoutButton({ label }: { label: string }) {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      className="nav-link nav-link--logout"
      onClick={() => navigate('/login', { replace: true })}
    >
      <span className="nav-link-icon" aria-hidden>
        <SidebarNavIcon to="/login" label={label} />
      </span>
      <span className="nav-link-label">{label}</span>
    </button>
  )
}

function AppLayout() {
  const location = useLocation()
  const storedModel = localStorage.getItem(STORAGE_MODEL)?.trim() ?? ''
  const storedFirmware = localStorage.getItem(STORAGE_FIRMWARE)?.trim() ?? ''

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [connectOpen, setConnectOpen] = useState(false)
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>({ state: 'idle' })
  const [updateToastOpen, setUpdateToastOpen] = useState(false)
  const [updateBusy, setUpdateBusy] = useState(false)
  const [updateActionError, setUpdateActionError] = useState<string | null>(null)
  const [serialSession, setSerialSession] = useState<{
    path: string
    baudRate: number
    slaveId: string
  } | null>(null)
  const [serialLines, setSerialLines] = useState<string[]>([])
  const [lastSerialRxAt, setLastSerialRxAt] = useState<number | null>(null)
  const serialLineKey = useRef(0)
  const settingsPollHoldRef = useRef(false)
  const [settingsParamEditBlocksPoll, setSettingsParamEditBlocksPoll] = useState(false)
  const beginSettingsParamEdit = useCallback(() => {
    settingsPollHoldRef.current = true
    setSettingsParamEditBlocksPoll(true)
  }, [])
  const endSettingsParamEdit = useCallback(() => {
    settingsPollHoldRef.current = false
    setSettingsParamEditBlocksPoll(false)
  }, [])
  const [displayView, setDisplayView] = useState<'data' | 'traffic'>('data')
  const [toolbarNow, setToolbarNow] = useState(() => new Date())
  const [dateTimeSyncOpen, setDateTimeSyncOpen] = useState(false)
  const disconnectSerial = useCallback(async () => {
    try {
      await window.icms.closeSerialPort()
    } catch {
    } finally {
      setSerialSession(null)
      setSerialLines([])
      setLastSerialRxAt(null)
    }
  }, [])
  const productNav = getProductNavFromStorage()
  const clearSerialTraffic = useCallback(() => {
    setSerialLines([])
    serialLineKey.current = 0
  }, [])
  const commHealthy = Boolean(serialSession) && lastSerialRxAt !== null && Date.now() - lastSerialRxAt <= 4000
  const modelUpper = storedModel.trim().toUpperCase()
  const settingsConfig = getSettingsDashboardConfig(
    localStorage.getItem(STORAGE_MODEL),
    localStorage.getItem(STORAGE_FIRMWARE),
  )
  const monitorConfig = getMonitorDashboardConfig(
    localStorage.getItem(STORAGE_MODEL),
    localStorage.getItem(STORAGE_FIRMWARE),
  )
  const controllerDateSpec =
    settingsConfig?.groups?.version_params?.["Controller's Date"] ??
    monitorConfig?.groups?.version_params?.["Controller's Date"] ??
    null
  const timeSpec =
    settingsConfig?.groups?.version_params?.Time ?? monitorConfig?.groups?.version_params?.Time ?? null
  const canOpenDateTimeSync = modelUpper === 'EICS141'

  useEffect(() => {
    const id = window.setInterval(() => setToolbarNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    return window.icms.onUpdateStatus((s) => {
      setUpdateStatus(s)
      if (s.state === 'available') {
        setUpdateToastOpen(true)
      }
      if (s.state === 'error') {
        setUpdateActionError(s.message)
      }
    })
  }, [])

  useEffect(() => {
    return window.icms.onDisplayView((view) => setDisplayView(view))
  }, [])

  useEffect(() => {
    const offData = window.icms.onSerialData(({ hex }) => {
      setLastSerialRxAt(Date.now())
      serialLineKey.current += 1
      const id = serialLineKey.current
      const upperHex = hex.toUpperCase()
      setSerialLines((prev) => {
        const next = [...prev, `${id}\t[RX] ${upperHex}`]
        return next.length > 500 ? next.slice(-500) : next
      })
    })
    const offErr = window.icms.onSerialError((msg) => {
      serialLineKey.current += 1
      const id = serialLineKey.current
      setSerialLines((prev) => {
        const next = [...prev, `${id}\t[error] ${msg}`]
        return next.length > 500 ? next.slice(-500) : next
      })
      if (/port|disconnect|closed|not open|not found|unavailable|enoent|eio/i.test(msg)) {
        void disconnectSerial()
      }
    })
    return () => {
      offData()
      offErr()
    }
  }, [disconnectSerial])

  useEffect(() => {
    const onTrafficLine = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail
      if (!detail) return
      serialLineKey.current += 1
      const id = serialLineKey.current
      setSerialLines((prev) => {
        const next = [...prev, `${id}\t${detail}`]
        return next.length > 500 ? next.slice(-500) : next
      })
    }
    window.addEventListener('icms:traffic-line', onTrafficLine as EventListener)
    return () => window.removeEventListener('icms:traffic-line', onTrafficLine as EventListener)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/settings' && location.pathname !== '/dashboard') return
    setSerialLines([])
    serialLineKey.current = 0
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/settings') {
      endSettingsParamEdit()
    }
  }, [location.pathname, endSettingsParamEdit])

  useEffect(() => {
    if (!serialSession) return

    const path = location.pathname
    const pollSettings = path === '/settings'
    const pollMonitor = path === '/dashboard'
    if (!pollSettings && !pollMonitor) return
    if (settingsParamEditBlocksPoll) return

    const model = localStorage.getItem(STORAGE_MODEL)
    const fw = localStorage.getItem(STORAGE_FIRMWARE)
    const templates = pollSettings
      ? getSettingsQueryTemplates(model, fw)
      : getMonitorQueryTemplates(model, fw)
    if (!templates) return

    const labelPrefix = pollSettings ? 'settings' : 'monitor'
    const frames: { label: string; bytes: number[] }[] = []
    if (templates.query1) {
      const f = buildModbusRtuFrame(templates.query1, serialSession.slaveId)
      if (f) frames.push({ label: `${labelPrefix}/q1`, bytes: [...f] })
    }
    if (templates.query2) {
      const f = buildModbusRtuFrame(templates.query2, serialSession.slaveId)
      if (f) frames.push({ label: `${labelPrefix}/q2`, bytes: [...f] })
    }
    if (frames.length === 0) return

    let step = 0
    let pollId: number | undefined
    let cancelled = false

    const pushLine = (text: string) => {
      serialLineKey.current += 1
      const id = serialLineKey.current
      setSerialLines((prev) => {
        const next = [...prev, `${id}\t${text}`]
        return next.length > 500 ? next.slice(-500) : next
      })
    }

    const tick = async () => {
      if (settingsPollHoldRef.current) return
      const { label, bytes } = frames[step % frames.length]
      step += 1
      const hex = bytes
        .map((b) => b.toString(16).padStart(2, '0').toUpperCase())
        .join(' ')
      pushLine(`[TX ${label}] ${hex}`)
      const res = await window.icms.writeSerialBytes(bytes)
      if (!res.ok) {
        pushLine(`[TX ${label} failed] ${res.error}`)
        if (/port|disconnect|closed|not open|not found|unavailable|enoent|eio/i.test(res.error)) {
          void disconnectSerial()
        }
      }
    }

    const start = window.setTimeout(() => {
      if (cancelled) return
      void tick()
      pollId = window.setInterval(() => void tick(), MONITOR_POLL_MS)
    }, 150)

    return () => {
      cancelled = true
      window.clearTimeout(start)
      if (pollId !== undefined) window.clearInterval(pollId)
    }
  }, [serialSession, location.pathname, settingsParamEditBlocksPoll, displayView, disconnectSerial])

  return (
    <div className="app-layout">
      {updateToastOpen && updateStatus.state === 'available' ? (
        <div className="update-toast" role="status" aria-live="polite">
          <div className="update-toast-title">Update available</div>
          <div className="update-toast-body">Version {updateStatus.version} is available. Update is required.</div>
          <button
            type="button"
            className="update-toast-close"
            aria-label="Dismiss update notification"
            onClick={() => setUpdateToastOpen(false)}
          >
            <MdClose aria-hidden />
          </button>
        </div>
      ) : null}

      {updateStatus.state === 'available' ||
      updateStatus.state === 'downloading' ||
      updateStatus.state === 'downloaded' ? (
        <div className="update-modal-backdrop" role="presentation">
          <div className="update-modal" role="dialog" aria-modal="true" aria-labelledby="update-modal-title">
            <div className="update-modal-header">
              <div className="update-modal-header-text">
                <div>
                  <h2 id="update-modal-title" className="update-modal-title">
                    Update required
                  </h2>
                  <p className="update-modal-subtitle">A new version is available and must be installed to continue.</p>
                </div>
              </div>
            </div>
            <div className="update-modal-body">
              {updateStatus.state === 'available' ? (
                <>
                  <p className="update-modal-line">
                    New version: <strong>{updateStatus.version}</strong>
                  </p>
                  {updateStatus.releaseName ? (
                    <p className="update-modal-line update-modal-line--muted">{updateStatus.releaseName}</p>
                  ) : null}
                  {updateStatus.releaseNotes ? <pre className="update-modal-notes">{updateStatus.releaseNotes}</pre> : null}
                </>
              ) : null}

              {updateStatus.state === 'downloading' ? (
                <>
                  <p className="update-modal-line">Downloading update…</p>
                  <div className="update-progress">
                    <div
                      className="update-progress-bar"
                      style={{ width: `${Math.max(0, Math.min(100, updateStatus.percent ?? 0))}%` }}
                      aria-hidden
                    />
                  </div>
                  <p className="update-modal-line update-modal-line--muted">
                    {typeof updateStatus.percent === 'number' ? `${updateStatus.percent.toFixed(1)}%` : 'Starting…'}
                  </p>
                </>
              ) : null}

              {updateStatus.state === 'downloaded' ? (
                <p className="update-modal-line">
                  Update downloaded. Restart to install <strong>{updateStatus.version}</strong>.
                </p>
              ) : null}

              {updateActionError ? <p className="update-modal-error">{updateActionError}</p> : null}
            </div>
            <div className="update-modal-footer">
              {updateStatus.state === 'available' ? (
                <button
                  type="button"
                  className="update-modal-btn update-modal-btn--primary"
                  disabled={updateBusy}
                  onClick={async () => {
                    setUpdateActionError(null)
                    setUpdateBusy(true)
                    try {
                      const res = await window.icms.downloadUpdate()
                      if (!res.ok) setUpdateActionError(res.error)
                    } finally {
                      setUpdateBusy(false)
                    }
                  }}
                >
                  {updateBusy ? 'Starting…' : 'Download update'}
                </button>
              ) : null}
              {updateStatus.state === 'downloading' ? (
                <button type="button" className="update-modal-btn update-modal-btn--primary" disabled>
                  Downloading…
                </button>
              ) : null}
              {updateStatus.state === 'downloaded' ? (
                <button
                  type="button"
                  className="update-modal-btn update-modal-btn--primary"
                  disabled={updateBusy}
                  onClick={async () => {
                    setUpdateActionError(null)
                    setUpdateBusy(true)
                    try {
                      const res = await window.icms.installUpdate()
                      if (!res.ok) setUpdateActionError(res.error)
                    } finally {
                      setUpdateBusy(false)
                    }
                  }}
                >
                  Restart and install
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <aside className={`sidebar${sidebarOpen ? '' : ' sidebar--collapsed'}`}>

        <nav id="app-sidebar-nav" className="sidebar-nav-main" aria-label="Product">
          {productNav.map(renderNavLink)}
        </nav>
        <div className="sidebar-nav-footer">
          <nav id="app-sidebar-footer" aria-label="Account">
            {tailNavItems.map((item) =>
              item.key === '__logout' ? (
                <SidebarLogoutButton key={item.key} label={item.label} />
              ) : (
                renderNavLink(item)
              )
            )}
          </nav>
        </div>
      </aside>
      <div className="app-main">
        <header className="content-toolbar">
          <div className="content-toolbar-start">
            <button
              type="button"
              className="sidebar-toggle"
              aria-expanded={sidebarOpen}
              aria-controls="app-sidebar-nav app-sidebar-footer"
              aria-label={sidebarOpen ? 'Collapse navigation' : 'Expand navigation'}
              onClick={() => setSidebarOpen((open) => !open)}
            >
              <svg className="sidebar-toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  fill="currentColor"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                />
              </svg>
            </button>
          </div>
          <div className="content-toolbar-start">
            {storedModel || storedFirmware ? (
              <p
                className="content-toolbar-device"
                title={[storedModel, storedFirmware].filter(Boolean).join(' · ')}
              >
                {storedModel ? (
                  <span className="content-toolbar-device-text">{storedModel}</span>
                ) : null}
                {storedModel && storedFirmware ? (
                  <span className="content-toolbar-device-sep" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                {storedFirmware ? (
                  <span className="content-toolbar-device-text">v{storedFirmware}</span>
                ) : null}
              </p>
            ) : null}
          </div>
          <div className="content-toolbar-end">
            <span
              className={`comm-status-dot ${commHealthy ? 'comm-status-dot--ok' : 'comm-status-dot--bad'}`}
              aria-label={commHealthy ? 'Communication healthy' : 'Communication timeout'}
              title={commHealthy ? 'Communication healthy' : 'No response in last 4 seconds'}
            />
            <button
              type="button"
              className="content-toolbar-datetime-btn"
              title={canOpenDateTimeSync ? 'Date/Time sync' : 'Date/Time sync unavailable for this device'}
              onClick={() => {
                if (!canOpenDateTimeSync) return
                beginSettingsParamEdit()
                setDateTimeSyncOpen(true)
              }}
            >
              <time className="content-toolbar-datetime" dateTime={toolbarNow.toISOString()}>
                {toolbarNow.toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'medium',
                })}
              </time>
            </button>
            <button
              type="button"
              className={serialSession ? 'connect-button connect-button--connected' : 'connect-button'}
              aria-label={
                serialSession
                  ? `Disconnect serial — ${serialSession.path}`
                  : 'Connect serial device'
              }
              title={serialSession ? `Disconnect (${serialSession.path})` : 'Connect'}
              onClick={async () => {
                if (serialSession) {
                  await disconnectSerial()
                  return
                }
                setConnectOpen(true)
              }}
            >
              {serialSession ? (
                <>
                  <MdUsbOff className="connect-usb-icon" aria-hidden />
                  <span className="connect-button-port" title={serialSession.path}>
                    {serialSession.path}
                  </span>
                </>
              ) : (
                <MdUsb className="connect-usb-icon" aria-hidden />
              )}
            </button>
          </div>
        </header>
        {displayView === 'data' && serialSession ? (
          <>
          </>
        ) : null}
        {displayView === 'traffic' &&
        location.pathname !== '/settings' &&
        location.pathname !== '/dashboard' ? (
          <div className="app-main-traffic">
            <Traffic
              connected={Boolean(serialSession)}
              path={serialSession?.path ?? ''}
              baudRate={serialSession?.baudRate ?? 0}
              slaveId={serialSession?.slaveId ?? ''}
              lines={serialLines}
              onClear={clearSerialTraffic}
            />
          </div>
        ) : null}
        <ConnectModal
          open={connectOpen}
          onClose={() => setConnectOpen(false)}
          onConnected={(info) => {
            setSerialLines([])
            serialLineKey.current = 0
            setLastSerialRxAt(null)
            setSerialSession(info)
          }}
        />
        {canOpenDateTimeSync && dateTimeSyncOpen ? (
          <DateTimeSyncDialog
            open
            onClose={() => {
              endSettingsParamEdit()
              setDateTimeSyncOpen(false)
            }}
            serialConnected={Boolean(serialSession)}
            slaveId={serialSession?.slaveId ?? ''}
            controllerDateSpec={Array.isArray(controllerDateSpec) ? controllerDateSpec : []}
            timeSpec={Array.isArray(timeSpec) ? timeSpec : []}
          />
        ) : null}
        <DisplayViewProvider
          view={displayView}
          serialConnected={Boolean(serialSession)}
          serialLineCount={serialLines.length}
          serialLines={serialLines}
          serialPath={serialSession?.path ?? ''}
          serialBaudRate={serialSession?.baudRate ?? 0}
          serialSlaveId={serialSession?.slaveId ?? ''}
          clearSerialTraffic={clearSerialTraffic}
          beginSettingsParamEdit={beginSettingsParamEdit}
          endSettingsParamEdit={endSettingsParamEdit}
        >
          <main
            className={`content${
              displayView === 'traffic' &&
              location.pathname !== '/settings' &&
              location.pathname !== '/dashboard'
                ? ' content--under-traffic'
                : ''
            }${
              displayView === 'traffic' &&
              (location.pathname === '/settings' || location.pathname === '/dashboard')
                ? ' content--traffic-inline'
                : ''
            }`}
          >
            <Outlet />
          </main>
        </DisplayViewProvider>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginRouteGuard />} />
          <Route path="/setup" element={<SetupRouteGuard />} />
          <Route path="/card" element={<DefaultCard />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/help" element={<Help />} />
            <Route path="/section/:sectionName" element={<SectionPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<SetupRouteGuard />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
