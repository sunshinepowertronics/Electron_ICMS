type TrafficProps = {
  connected: boolean
  path: string
  baudRate: number
  slaveId: string
  lines: string[]
}

export default function Traffic({ connected, path, baudRate, slaveId, lines }: TrafficProps) {
  return (
    <section className="serial-readout traffic-view" aria-label="Serial traffic">
      <div className="serial-readout-bar">
        <span
          className={connected ? 'serial-readout-dot' : 'serial-readout-dot serial-readout-dot--idle'}
          aria-hidden="true"
        />
        <p className="serial-readout-summary">
          Traffic —{' '}
          {connected ? (
            <>
              <strong>{path}</strong>
              <span className="serial-readout-sep" aria-hidden="true" />
              {baudRate} baud
              <span className="serial-readout-sep" aria-hidden="true" />
              Slave ID <strong>{slaveId || '—'}</strong>
            </>
          ) : (
            <strong>Not connected</strong>
          )}
        </p>
      </div>
      <div className="serial-readout-log" role="log" aria-live="polite">
        {!connected ? (
          <p className="serial-readout-placeholder">
            Use the toolbar Connect button to open a port and view traffic.
          </p>
        ) : lines.length === 0 ? (
          <p className="serial-readout-placeholder">No frames yet — waiting for bytes on the wire…</p>
        ) : (
          lines.map((row) => {
            const tab = row.indexOf('\t')
            const key = tab >= 0 ? row.slice(0, tab) : row
            const text = tab >= 0 ? row.slice(tab + 1) : row
            return (
              <div key={key} className="serial-readout-line traffic-view-line">
                <span className="traffic-view-tag" aria-hidden="true">
                  RX
                </span>
                <span className="traffic-view-payload">{text}</span>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}
