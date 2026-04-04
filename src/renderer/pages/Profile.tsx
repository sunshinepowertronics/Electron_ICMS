import React from 'react'
import { Link } from 'react-router-dom'

function IconLock() {
  return (
    <svg className="profile-tile-icon-svg" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm-3 8V6a3 3 0 0 1 6 0v3H9zm2 6.25a1.25 1.25 0 1 1 2.5 0v1a1.25 1.25 0 1 1-2.5 0v-1z"
      />
    </svg>
  )
}

function IconDeviceCard() {
  return (
    <svg className="profile-tile-icon-svg" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm2 0v12h12V6H6zm2 2h8v2H8V8zm0 4h5v2H8v-2z"
      />
    </svg>
  )
}

function IconArrow() {
  return (
    <svg className="profile-tile-arrow-svg" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M13.22 19.03a.75.75 0 0 1 0-1.06L18.19 13H3.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.75.75 0 1 1 1.06-1.06l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0z"
      />
    </svg>
  )
}

const tiles = [
  {
    to: '/setup',
    title: 'PIN & access code',
    description: 'Full-screen setup flow with verification code and a new 4-digit PIN setup.',
    icon: <IconLock />,
  },
  {
    to: '/card',
    title: 'Device & default card',
    description: 'Setup default card. Select the device model and firmware version.',
    icon: <IconDeviceCard />,
  },
] as const

const Profile = () => {
  return (
    <div className="profile-page">
      <header className="profile-hero">
        <p className="profile-eyebrow">ICMS workspace</p>
        <h1 className="profile-heading">Profile</h1>
        <p className="profile-lead">
          Security and device identity for this installation. Use the shortcuts below when you need to change PIN
          verification or how your default card is applied.
        </p>
        <div className="profile-hero-rule" aria-hidden />
      </header>

      <ul className="profile-grid" role="list">
        {tiles.map(({ to, title, description, icon }) => (
          <li key={to} className="profile-grid-cell">
            <Link to={to} className="profile-tile">
              <span className="profile-tile-icon-wrap">{icon}</span>
              <div className="profile-tile-copy">
                <span className="profile-tile-title">{title}</span>
                <span className="profile-tile-desc">{description}</span>
              </div>
              <span className="profile-tile-arrow-wrap">
                <IconArrow />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile
