import { useEffect, useId, useState } from 'react'
import type { MonitorQueryKey } from '../utils/monitorParamsFromProduct'
import type { SettingsParamGroupKey } from '../utils/monitorParamsFromProduct'
import {
  firstRegisterIndexFromSpec,
  getDecimalMultiplierFromSpec,
  getAsciiStringMode,
  getParameterRangeLabel,
  getSpecNumericMode,
  isAsciiLikeSpec,
  registerRangeFromSpec,
  parseRangeBounds,
} from '../utils/settingsParamSpec'
import {
  writeSettingsAlarmBool,
  writeSettingsAsciiRegisters,
  writeSettingsNumericRegister,
} from '../utils/settingsParamWrite'

function displayLooksEnabled(s: string): boolean {
  const t = s.trim().toLowerCase()
  return ['enabled', 'on', '1', 'true', 'yes', 'active'].includes(t)
}

export function SettingsParamEditDialog({
  open,
  onClose,
  paramName,
  spec,
  groupKey,
  displayText,
  slaveId,
  serialConnected,
  queryForGroup,
}: {
  open: boolean
  onClose: () => void
  paramName: string
  spec: unknown[]
  groupKey: SettingsParamGroupKey
  displayText: string
  slaveId: string
  serialConnected: boolean
  queryForGroup: MonitorQueryKey | undefined
}) {
  const titleId = useId()
  const hintId = useId()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [writeProgress, setWriteProgress] = useState<{
    writtenRegisters: number
    totalRegisters: number
    writtenChars: number
    totalChars: number
  } | null>(null)
  const isAlarm = groupKey === 'alarm_params'
  const ascii = isAsciiLikeSpec(spec)
  const asciiMode = ascii ? getAsciiStringMode(spec) : null
  const mult = getDecimalMultiplierFromSpec(spec)
  const rangeLabel = getParameterRangeLabel(spec)
  const rangeBounds = rangeLabel ? parseRangeBounds(rangeLabel) : null
  const numericMode = getSpecNumericMode(spec)
  const isPassword = paramName.trim().toLowerCase() === 'password'
  const hasHint = Boolean(rangeLabel || ascii)
  const inputLabel =
    mult !== null ? 'Value (device units)' : ascii ? 'Text' : isPassword ? 'Password' : 'Value'
  const asciiRange = ascii ? registerRangeFromSpec(spec[2]) : null
  const asciiStart = ascii ? (asciiRange?.start ?? firstRegisterIndexFromSpec(spec[2])) : null
  const asciiEnd = ascii ? (asciiRange?.end ?? asciiStart) : null
  const asciiTotalRegs =
    ascii && asciiStart !== null && asciiEnd !== null ? Math.max(0, asciiEnd - asciiStart + 1) : 0

  const [toggleOn, setToggleOn] = useState(false)
  const [textInput, setTextInput] = useState('')

  useEffect(() => {
    if (!open) return
    setError(null)
    setSuccess(null)
    setBusy(false)
    setWriteProgress(null)
    if (isAlarm) {
      setToggleOn(displayLooksEnabled(displayText))
    } else if (ascii) {
      setTextInput(displayText.trim())
    } else {
      setTextInput(displayText.trim())
    }
  }, [open, isAlarm, ascii, mult, displayText])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, busy])

  if (!open) return null

  const runWrite = async () => {
    setError(null)
    setSuccess(null)
    if (!serialConnected) {
      setError('Connect serial first.')
      return
    }
    setBusy(true)
    try {
      if (isAlarm) {
        const res = await writeSettingsAlarmBool(slaveId, queryForGroup, spec, toggleOn)
        if (!res.ok) {
          setError(res.error)
          return
        }
        setSuccess('Write successful.')
        window.setTimeout(onClose, 700)
        return
      }
      if (ascii) {
        setWriteProgress({
          writtenRegisters: 0,
          totalRegisters: asciiTotalRegs,
          writtenChars: 0,
          totalChars: asciiMode === '16bit' ? asciiTotalRegs * 2 : asciiTotalRegs,
        })
        await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()))
        const res = await writeSettingsAsciiRegisters(slaveId, spec, textInput, (p) => setWriteProgress(p))
        if (!res.ok) {
          setError(res.error)
          return
        }
        setSuccess('Write successful.')
        window.setTimeout(onClose, 700)
        return
      }
      const rawStr = textInput.trim()
      if (mult !== null) {
        const displayVal = parseFloat(rawStr)
        if (!Number.isFinite(displayVal)) {
          setError('Enter a valid number.')
          return
        }
        const rawInt = Math.round(displayVal / mult)
        const res = await writeSettingsNumericRegister(slaveId, spec, rawInt, 'uint16')
        if (!res.ok) {
          setError(res.error)
          return
        }
        setSuccess('Write successful.')
        window.setTimeout(onClose, 700)
        return
      }
      const rawInt = parseInt(rawStr, 10)
      if (!Number.isFinite(rawInt)) {
        setError('Enter a valid integer.')
        return
      }
      if (rangeBounds) {
        if (rawInt < rangeBounds.min || rawInt > rangeBounds.max) {
          setError(`Value must be between ${rangeBounds.min} and ${rangeBounds.max}.`)
          return
        }
      }
      const res = await writeSettingsNumericRegister(slaveId, spec, rawInt, numericMode)
      if (!res.ok) {
        setError(res.error)
        return
      }
      setSuccess('Write successful.')
      window.setTimeout(onClose, 700)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="settings-edit-backdrop"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && !busy && onClose()}
    >
      <div
        className="settings-edit-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={hasHint ? hintId : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className="settings-edit-title">
          {paramName}
        </h2>

        {hasHint ? (
          <p id={hintId} className="settings-edit-hint">
            {[
              rangeLabel ? `Range: ${rangeLabel}` : '',
              ascii && asciiMode === '16bit'
                ? 'Two characters per register.'
                : ascii
                  ? 'One character per register.'
                  : '',
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
        ) : null}

        {busy && ascii && writeProgress && writeProgress.totalRegisters > 1 ? (
          <div className="settings-edit-progress" role="status" aria-live="polite">
            <div className="settings-edit-progress-line">
              <span className="settings-edit-spinner" aria-hidden="true" />
              <span className="settings-edit-progress-text">
                Writing… {writeProgress.writtenChars}/{writeProgress.totalChars} chars · {writeProgress.writtenRegisters}/
                {writeProgress.totalRegisters} regs
              </span>
            </div>
            <div className="settings-edit-progress-track" aria-hidden="true">
              <div
                className="settings-edit-progress-bar"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(
                      0,
                      Math.round((writeProgress.writtenRegisters / Math.max(1, writeProgress.totalRegisters)) * 100),
                    ),
                  )}%`,
                }}
              />
            </div>
          </div>
        ) : null}

        {isAlarm ? (
          <div className="settings-edit-toggle-line">
            <button
              type="button"
              className={`settings-edit-switch ${toggleOn ? 'settings-edit-switch--on' : 'settings-edit-switch--off'}`}
              onClick={() => setToggleOn(!toggleOn)}
              disabled={busy}
              aria-pressed={toggleOn}
              aria-label={toggleOn ? 'Enabled. Press to disable.' : 'Disabled. Press to enable.'}
            >
              <span className="settings-edit-switch-knob" />
            </button>
            <span className="settings-edit-state">{toggleOn ? 'Enabled' : 'Disabled'}</span>
          </div>
        ) : (
          <label className="settings-edit-field">
            <span className="settings-edit-label">{inputLabel}</span>
            <input
              className="settings-edit-input"
              type={isPassword ? 'password' : 'text'}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={busy}
              autoComplete="off"
              spellCheck={false}
            />
          </label>
        )}

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
          <button type="button" className="settings-edit-btn settings-edit-btn--plain" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="settings-edit-btn settings-edit-btn--primary" onClick={runWrite} disabled={busy}>
            {busy ? 'Saving…' : isAlarm ? 'OK' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
