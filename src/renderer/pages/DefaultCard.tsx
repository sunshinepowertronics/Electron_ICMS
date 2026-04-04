import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import productsData from '../utils/products.json'
import { STORAGE_CONFIGURED, STORAGE_FIRMWARE, STORAGE_MODEL } from '../utils/deviceStorage'

export default function DefaultCard() {
  const navigate = useNavigate()
  const products = productsData.products
  const [productName, setProductName] = useState('')
  const [versionName, setVersionName] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'error'>('idle')

  const selectedProduct = useMemo(
    () => products.find((p) => p.product_name === productName),
    [productName, products]
  )

  const versionOptions = selectedProduct?.versions ?? []
  const versionDisabled = versionOptions.length === 0
  const canSave = Boolean(productName.trim() && versionName.trim())

  useEffect(() => {
    setVersionName('')
  }, [productName])

  useEffect(() => {
    setSaveStatus('idle')
  }, [productName, versionName])

  function persistConfiguration() {
    const model = productName.trim()
    const firmware = versionName.trim()
    if (!model || !firmware) return
    try {
      localStorage.setItem(STORAGE_MODEL, model)
      localStorage.setItem(STORAGE_FIRMWARE, firmware)
      localStorage.setItem(STORAGE_CONFIGURED, 'true')
      navigate('/dashboard')
    } catch {
      setSaveStatus('error')
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!canSave) return
    persistConfiguration()
  }

  return (
    <div className="default-card-page">
      <div className="default-card-inner">
        <header className="default-card-header">
          <span className="default-card-eyebrow">Configuration</span>
          <h1 className="default-card-title">Device profile</h1>
          <p className="default-card-lead">
            Pick your product and firmware version.
          </p>
        </header>
        <form className="default-card-form" onSubmit={handleSubmit} noValidate>
          <div className="default-card-fields">
            <label className="default-card-field">
              <span className="default-card-field-head">
                <span className="default-card-field-label">Model Name</span>
              </span>
              <select
                className="default-card-select"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                aria-label="Product model"
              >
                <option value="">Choose a model name…</option>
                {products.map((p) => (
                  <option key={p.product_name} value={p.product_name}>
                    {p.product_name}
                  </option>
                ))}
              </select>
            </label>
            <label className="default-card-field">
              <span className="default-card-field-head">
                <span className="default-card-field-label">Firmware Version</span>
              </span>
              <select
                className="default-card-select"
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
                disabled={versionDisabled}
                aria-label="Firmware version"
              >
                {versionDisabled ? (
                  <option value="">Choose a product first…</option>
                ) : (
                  [
                    <option key="_version-placeholder" value="">
                      Select version name
                    </option>,
                    ...versionOptions.map((v, i) => (
                      <option key={`${v.version}-${i}`} value={v.version}>
                        {v.version}
                        {v.is_default ? ' · default' : ''}
                      </option>
                    )),
                  ]
                )}
              </select>
            </label>
          </div>
          <button type="submit" className="default-card-save" disabled={!canSave}>
            Save configuration
          </button>
          {saveStatus === 'error' && (
            <p className="default-card-save-feedback default-card-save-feedback--err" role="alert">
              Could not save. Storage may be unavailable.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
