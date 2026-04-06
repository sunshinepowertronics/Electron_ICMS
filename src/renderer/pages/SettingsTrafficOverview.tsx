import { useDisplayView } from '../context/DisplayViewContext'

export default function SettingsTrafficOverview() {
  const { serialConnected, serialLineCount } = useDisplayView()
  const platform =
    typeof window !== 'undefined' && window.icms?.platform ? window.icms.platform : 'unknown'

  return (
    <>
      <h1 className="page-title">Settings</h1>
      <div className="card">
        <h3>Traffic mode</h3>
        <p>
          You are in traffic view. The monitor strip shows RX-tagged hex lines; the buffer keeps up to 500
          lines. Use <strong>View → Display Options → Show Data</strong> for the standard settings and
          dashboard layout.
        </p>
        <p>
          Platform: {platform}.{' '}
          {serialConnected ? (
            <>
              Serial is <strong>connected</strong> ({serialLineCount} line
              {serialLineCount === 1 ? '' : 's'} in buffer).
            </>
          ) : (
            <>Serial is <strong>not connected</strong>.</>
          )}
        </p>
      </div>
      <div className="card">
        <h3>Capture</h3>
        <p>
          Connect or disconnect from the toolbar. Port errors appear in the traffic log with an{' '}
          <code>[error]</code> prefix.
        </p>
      </div>
    </>
  )
}
