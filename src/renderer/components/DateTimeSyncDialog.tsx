import { useEffect, useMemo, useState } from 'react'
import { writeEics141DateTimeSync } from '../utils/settingsParamWrite'

export function DateTimeSyncDialog({
  open,
  onClose,
  slaveId,
  serialConnected,
  controllerDateSpec,
  timeSpec,
}: {
  open: boolean
  onClose: () => void
  slaveId: string
  serialConnected: boolean
  controllerDateSpec: unknown[]
  timeSpec: unknown[]
}) {
  const [now, setNow] = useState(() => new Date())
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setError(null)
    setSuccess(null)
    setBusy(false)
    setNow(new Date())
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [open])

  const displayValue = useMemo(
    () =>
      now.toLocaleString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    [now],
  )

  if (!open) return null

  return (
    <div className="settings-edit-backdrop" role="presentation" onClick={(e) => e.target === e.currentTarget && !busy && onClose()}>
      <div className="settings-edit-dialog datetime-sync-dialog" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h2 className="settings-edit-title datetime-sync-title">Date/Time Sync</h2>
        <p className="settings-edit-hint datetime-sync-subtitle">Synchronize controller clock with current system time.</p>
        <div className="datetime-sync-time-card">
          <p className="datetime-sync-time-value">{displayValue}</p>
        </div>

        {error ? (
          <p className="settings-edit-error" role="alert">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="settings-edit-success" role="status">
            {success}
          </p>
        ) : null}

        <div className="settings-edit-actions">
          <button type="button" className="settings-edit-btn settings-edit-btn--plain" disabled={busy} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="settings-edit-btn settings-edit-btn--primary"
            disabled={busy}
            onClick={async () => {
              setError(null)
              setSuccess(null)
              if (!serialConnected) {
                setError('Connect serial first.')
                return
              }
              setBusy(true)
              try {
                const res = await writeEics141DateTimeSync(slaveId, controllerDateSpec, timeSpec)
                if (!res.ok) {
                  setError(res.error)
                  return
                }
                setSuccess('Date/time synchronized successfully.')
                window.setTimeout(() => onClose(), 700)
              } finally {
                setBusy(false)
              }
            }}
          >
            {busy ? 'Synchronizing…' : 'Synchronize Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
