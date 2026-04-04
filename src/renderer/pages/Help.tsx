import { useId, useState } from 'react'

const FAQ_PAIRS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: 'What if I forget my PIN?',
    a: "If you forget your PIN, click on 'Forget PIN' and call the support number to get your access code for resetting the PIN.",
  },
  {
    q: 'How do I connect to my equipment?',
    a: 'The system uses serial communication (RS485/Modbus). Ensure your equipment is properly connected via the designated communication port and that the correct product configuration is selected.',
  },
  {
    q: 'What products are supported?',
    a: 'The system supports multiple product types including EICS141, EICS114, EICS42, and many more variants. Each product has specific parameter configurations and communication protocols.',
  },
  {
    q: 'How do I interpret alarm conditions?',
    a: 'Alarm conditions are displayed in the Monitor section. Red indicators show active alarms such as temperature limits, fan failures, or power issues. Check the Settings section for alarm threshold configurations.',
  },
  {
    q: 'Can I export monitoring data?',
    a: 'Yes, the system maintains logs of all monitoring data. Access the Logs section to view historical data and system events for analysis and reporting purposes.',
  },
  {
    q: 'Is the system secure?',
    a: 'Yes, the system implements multiple security layers including PIN-based authentication, device binding, and encrypted local storage to ensure only authorized access to your equipment.',
  },
]

function HelpFaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const baseId = useId()
  const panelId = `${baseId}-panel-${index}`
  const [open, setOpen] = useState(false)

  return (
    <div className="help-faq-item">
      <button
        type="button"
        className="help-faq-q"
        aria-expanded={open}
        aria-controls={panelId}
        id={`${baseId}-btn-${index}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="help-faq-arrow" aria-hidden>
          {open ? '▼' : '▶'}
        </span>
        {question}
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={`${baseId}-btn-${index}`}
        className={`help-faq-a${open ? ' help-faq-a--open' : ''}`}
      >
        <div className="help-faq-a-inner">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function Help() {
  return (
    <div className="help-page">
      <h1 className="help-doc-title">ICMS Help &amp; Documentation</h1>

      <section className="help-section" aria-labelledby="help-overview">
        <h2 id="help-overview" className="help-section-title">
          Application overview
        </h2>
        <div className="help-prose">
          <p>
            The ICMS (Industrial Control and Security Management) system is a comprehensive desktop application
            designed for monitoring and controlling industrial equipment. This system provides real-time monitoring of
            various parameters including temperature, power consumption, fan operations, and alarm conditions.
          </p>
          <p>
            <strong className="help-em">Key capabilities</strong>
          </p>
          <ul className="help-list">
            <li>Real-time monitoring of cooling systems and environmental parameters</li>
            <li>Power management and energy consumption tracking</li>
            <li>Comprehensive alarm and fault detection system</li>
            <li>Secure PIN-based authentication with device binding</li>
            <li>Multi-product support with configurable parameters</li>
            <li>Professional dark theme interface optimized for industrial environments</li>
          </ul>
        </div>
      </section>

      <hr className="help-rule" />

      <section className="help-section" aria-labelledby="help-started">
        <h2 id="help-started" className="help-section-title">
          Getting started
        </h2>
        <div className="help-prose">
          <h3 className="help-subtitle">First time setup</h3>
          <ol className="help-list help-list--ordered">
            <li>
              <strong>Launch the application:</strong> Run the ICMS application from your desktop or start menu.
            </li>
            <li>
              <strong>PIN setup:</strong> Enter a 4-digit PIN of your choice for secure access.
            </li>
            <li>
              <strong>Confirm PIN:</strong> Re-enter the same 4-digit PIN to confirm.
            </li>
            <li>
              <strong>Access code:</strong> To get the access code, contact Sunshine Powertronics Pvt. Ltd. customer
              support at{' '}
              <a href="tel:+919373091580" className="help-tel">
                +91 93730 91580
              </a>
              .
            </li>
            <li>
              <strong>Complete setup:</strong> Use the PIN setup action to finalize your security configuration.
            </li>
          </ol>
          <h3 className="help-subtitle">Daily usage</h3>
          <ol className="help-list help-list--ordered">
            <li>
              <strong>Launch application:</strong> Start the ICMS application.
            </li>
            <li>
              <strong>Enter PIN:</strong> Input your 4-digit PIN.
            </li>
            <li>
              <strong>Access dashboard:</strong> Upon successful authentication, you will reach the main dashboard.
            </li>
            <li>
              <strong>Navigate:</strong> Use the sidebar to access different monitoring sections.
            </li>
          </ol>
        </div>
      </section>

      <hr className="help-rule" />

      <section className="help-section" aria-labelledby="help-features">
        <h2 id="help-features" className="help-section-title">
          Features guide
        </h2>
        <div className="help-prose">
          <h3 className="help-subtitle">Dashboard / monitor</h3>
          <p>The main monitoring interface displays real-time data from your connected equipment:</p>
          <ul className="help-list">
            <li>
              <strong>Cooling and monitoring parameters:</strong> Cabinet temperature (T1), ambient temperature (T2),
              and temperature difference (Δt).
            </li>
            <li>
              <strong>Alarms:</strong> Various alarms are displayed in the Monitor section.
            </li>
            <li>
              <strong>Power management:</strong> System voltage, current, power consumption, and energy usage.
            </li>
            <li>
              <strong>Version information:</strong> Operating status and performance metrics.
            </li>
          </ul>
          <h3 className="help-subtitle">Settings</h3>
          <p>Configure system parameters and alarm thresholds:</p>
          <ul className="help-list">
            <li>
              <strong>Temperature settings:</strong> High/low alarm points, heat exchanger parameters.
            </li>
            <li>
              <strong>Fan configuration:</strong> Duty limits, idle speeds, failure responses.
            </li>
            <li>
              <strong>Power settings:</strong> Voltage alarm thresholds, power-on delays.
            </li>
            <li>
              <strong>Security:</strong> Password protection and access controls.
            </li>
          </ul>
          <h3 className="help-subtitle">Debug &amp; logs</h3>
          <p>Advanced diagnostic tools for system maintenance:</p>
          <ul className="help-list">
            <li>
              <strong>Debug mode:</strong> Raw data monitoring and communication diagnostics.
            </li>
            <li>
              <strong>System logs:</strong> Historical data, alarm records, and system events.
            </li>
            <li>
              <strong>Troubleshooting:</strong> Connection status and error diagnostics.
            </li>
          </ul>
        </div>
      </section>

      <hr className="help-rule" />

      <section className="help-section" aria-labelledby="help-trouble">
        <h2 id="help-trouble" className="help-section-title">
          Troubleshooting
        </h2>
        <div className="help-prose">
          <h3 className="help-subtitle help-subtitle--warn">Connection issues</h3>
          <ul className="help-list">
            <li>
              <strong>No data display:</strong> Check serial port connections and ensure correct COM port selection.
            </li>
            <li>
              <strong>Communication errors:</strong> Verify Modbus settings, baud rate, and device address.
            </li>
            <li>
              <strong>Port not found:</strong> Install proper drivers and check device manager for port availability.
            </li>
          </ul>
          <h3 className="help-subtitle help-subtitle--warn">Authentication problems</h3>
          <ul className="help-list">
            <li>
              <strong>PIN not accepted:</strong> Ensure you are entering the correct 4-digit PIN.
            </li>
            <li>
              <strong>Device binding issues:</strong> The PIN is tied to your specific device for security.
            </li>
          </ul>
          <h3 className="help-subtitle help-subtitle--warn">Display issues</h3>
          <ul className="help-list">
            <li>
              <strong>Missing parameters:</strong> Verify product configuration matches your equipment.
            </li>
            <li>
              <strong>Incorrect values:</strong> Check scaling factors and unit conversions in settings.
            </li>
            <li>
              <strong>Interface problems:</strong> Try restarting the application or checking system compatibility.
            </li>
          </ul>
          <h3 className="help-subtitle help-subtitle--warn">Performance issues</h3>
          <ul className="help-list">
            <li>
              <strong>Slow response:</strong> Check system resources and close unnecessary applications.
            </li>
            <li>
              <strong>Data lag:</strong> Verify communication speed settings and network stability.
            </li>
            <li>
              <strong>Memory usage:</strong> Clear logs periodically to maintain optimal performance.
            </li>
          </ul>
        </div>
      </section>

      <hr className="help-rule" />

      <section className="help-section" aria-labelledby="help-faq">
        <h2 id="help-faq" className="help-section-title">
          Frequently asked questions
        </h2>
        {FAQ_PAIRS.map((pair, i) => (
          <HelpFaqItem key={pair.q} question={pair.q} answer={pair.a} index={i} />
        ))}
      </section>

      <footer className="help-footer">
        <span>© 2026 Sunshine Powertronics Pvt. Ltd.</span>
        <span className="help-footer-version">SW version 2.7.21</span>
      </footer>
    </div>
  )
}
