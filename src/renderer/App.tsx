import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Logs from './pages/Logs'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import DefaultCard from './pages/DefaultCard'
import Help from './pages/Help'
import SectionPage from './pages/SectionPage'
import { SidebarNavIcon } from './components/SidebarNavIcon'
import { getProductNavFromStorage, tailNavItems } from './utils/productNav'

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
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const productNav = getProductNavFromStorage()

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
        </header>
        <main className="content">
          <Outlet />
        </main>
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
