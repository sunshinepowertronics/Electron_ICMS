export default function Settings() {
  const platform = typeof window !== 'undefined' && window.icms?.platform ? window.icms.platform : 'unknown'
  return (
    <>
      <h1 className="page-title">Settings</h1>
      <div className="card">
        <h3>Application</h3>
        <p>Platform: {platform}. App preferences and configuration can go here.</p>
      </div>
    </>
  )
}
