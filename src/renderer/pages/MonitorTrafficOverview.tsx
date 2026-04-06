import { useDisplayView } from '../context/DisplayViewContext'
import { STORAGE_FIRMWARE, STORAGE_MODEL } from '../utils/deviceStorage'

export default function MonitorTrafficOverview() {
  const { serialConnected, serialLineCount } = useDisplayView()
  const modelName = localStorage.getItem(STORAGE_MODEL)
  const firmwareVersion = localStorage.getItem(STORAGE_FIRMWARE)

  return (
    <>
      <h1 className="page-title">Traffic</h1>
      <div className="card">
        <h3>Serial traffic — {modelName ?? '—'} · {firmwareVersion ?? '—'}</h3>
        <p>
          The strip above shows each receive burst as hex octets with an RX label. Switch back to{' '}
          <strong>View → Display Options → Show Data</strong> for the standard monitor summary.
        </p>
        <p>
          {serialConnected ? (
            <>
              <strong>Connected.</strong> {serialLineCount} line{serialLineCount === 1 ? '' : 's'} in the
              rolling buffer (up to 500).
            </>
          ) : (
            <>
              <strong>Not connected.</strong> Use the toolbar Connect button to open a port and capture
              traffic.
            </>
          )}
        </p>
      </div>
      <div className="card">
        <h3>Using this log</h3>
        <p>
          Cross-check bytes with your device’s Modbus map or protocol guide. Errors from the port appear
          in the log with an <code>[error]</code> prefix.
        </p>
      </div>
    </>
  )
}
