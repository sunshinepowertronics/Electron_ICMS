export default function Dashboard() {
  const modelName = localStorage.getItem('device_model_name')
  const firmwareVersion = localStorage.getItem('device_firmware_version')
  return (

    <>
      <h1 className="page-title">Dashboard</h1>
      <div className="card">
        <h3>Welcome to ICMS - {modelName} - {firmwareVersion}</h3>
        <p>Inventory and Customer Management System. Use the sidebar to open Inventory, Customers, Orders, or Settings.</p>
      </div>
      <div className="card">
        <h3>Quick stats</h3>
        <p>Summary widgets and charts can be added here.</p>
      </div>
    </>
  )
}
