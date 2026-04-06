import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom'
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
import { MdClose, MdUsb, MdUsbOff } from 'react-icons/md'
import { SidebarNavIcon } from './components/SidebarNavIcon'
import { getProductNavFromStorage, tailNavItems } from './utils/productNav'
import { DisplayViewProvider } from './context/DisplayViewContext'
import { STORAGE_FIRMWARE, STORAGE_MODEL } from './utils/deviceStorage'
type SerialPortListItem = { path: string; label: string }

const BAUD_RATES = [1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600] as const

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
  const storedModel = localStorage.getItem(STORAGE_MODEL)?.trim() ?? ''
  const storedFirmware = localStorage.getItem(STORAGE_FIRMWARE)?.trim() ?? ''

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [connectOpen, setConnectOpen] = useState(false)
  const [serialSession, setSerialSession] = useState<{
    path: string
    baudRate: number
    slaveId: string
  } | null>(null)
  const [serialLines, setSerialLines] = useState<string[]>([])
  const serialLineKey = useRef(0)
  const [displayView, setDisplayView] = useState<'data' | 'traffic'>('data')
  const productNav = getProductNavFromStorage()

  useEffect(() => {
    return window.icms.onDisplayView((view) => setDisplayView(view))
  }, [])

  useEffect(() => {
    const offData = window.icms.onSerialData(({ hex }) => {
      serialLineKey.current += 1
      const id = serialLineKey.current
      setSerialLines((prev) => {
        const next = [...prev, `${id}\t${hex}`]
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
    })
    return () => {
      offData()
      offErr()
    }
  }, [])

  return (
    <div className="app-layout">
      <aside className={`sidebar${sidebarOpen ? '' : ' sidebar--collapsed'}`}>
        <h1 className="logo">ICMS</h1>
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
          <div className="content-toolbar-center">
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
                  await window.icms.closeSerialPort()
                  setSerialSession(null)
                  setSerialLines([])
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
          <section className="serial-readout" aria-label="Serial connection">
            <div className="serial-readout-bar">
              <span className="serial-readout-dot" aria-hidden="true" />
              <p className="serial-readout-summary">
                Port <strong>{serialSession.path}</strong>
                <span className="serial-readout-sep" aria-hidden="true" />
                {serialSession.baudRate} baud
                <span className="serial-readout-sep" aria-hidden="true" />
                Slave ID <strong>{serialSession.slaveId || '—'}</strong>
              </p>
            </div>
            <div className="serial-readout-log" role="log" aria-live="polite">
              {serialLines.length === 0 ? (
                <p className="serial-readout-placeholder">Reading port — waiting for incoming bytes…</p>
              ) : (
                serialLines.map((row) => {
                  const tab = row.indexOf('\t')
                  const key = tab >= 0 ? row.slice(0, tab) : row
                  const text = tab >= 0 ? row.slice(tab + 1) : row
                  return (
                    <div key={key} className="serial-readout-line">
                      {text}
                    </div>
                  )
                })
              )}
            </div>
          </section>
        ) : null}
        {displayView === 'traffic' ? (
          <Traffic
            connected={Boolean(serialSession)}
            path={serialSession?.path ?? ''}
            baudRate={serialSession?.baudRate ?? 0}
            slaveId={serialSession?.slaveId ?? ''}
            lines={serialLines}
          />
        ) : null}
        <ConnectModal
          open={connectOpen}
          onClose={() => setConnectOpen(false)}
          onConnected={(info) => {
            setSerialLines([])
            serialLineKey.current = 0
            setSerialSession(info)
          }}
        />
        <DisplayViewProvider
          view={displayView}
          serialConnected={Boolean(serialSession)}
          serialLineCount={serialLines.length}
        >
          <main className="content">
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
          <Route path="/login" element={<Login />} />
          <Route path="/setup" element={<Auth />} />
          <Route path="/card" element={<DefaultCard />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/help" element={<Help />} />
            <Route path="/section/:sectionName" element={<SectionPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
