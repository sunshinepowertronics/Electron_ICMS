import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate()
  const [accessCode, setAccessCode] = useState('')
  const [enteredCode, setEnteredCode] = useState('')
  const [newPin, setNewPin] = useState(['', '', '', ''])
  const [confirmPin, setConfirmPin] = useState(['', '', '', ''])
  const [showNewPin, setShowNewPin] = useState(false)
  const newPinRefs = useRef<Array<HTMLInputElement | null>>([])
  const confirmPinRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    const generatedCode = Math.floor(1000 + Math.random() * 9000).toString()
    setAccessCode(generatedCode)
    if (localStorage.getItem('PinSetup') === null) {
      localStorage.setItem('PinSetup', 'false')
    }
  }, [])

  const getComputedAuthorizationCode = (code: string) => {
    if (code.length !== 4) {
      return ''
    }
    const digits = code.split('').map((digit) => Number(digit))
    const computedValue = digits[0] * digits[3] + (digits[1] + digits[2])
    return String(computedValue)
  }

  const expectedAuthorizationCode = getComputedAuthorizationCode(accessCode)
  const isAuthorizationCodeValid =
    enteredCode.length > 0 && expectedAuthorizationCode.length > 0 && enteredCode === expectedAuthorizationCode

  const handlePinChange = (
    value: string,
    index: number,
    pin: string[],
    setPin: React.Dispatch<React.SetStateAction<string[]>>,
    refs: React.MutableRefObject<Array<HTMLInputElement | null>>
  ) => {
    const sanitizedValue = value.replace(/\D/g, '').slice(-1)
    const updatedPin = [...pin]
    updatedPin[index] = sanitizedValue
    setPin(updatedPin)

    if (sanitizedValue && index < refs.current.length - 1) {     
      refs.current[index + 1]?.focus()
    }
  }

  const handlePinKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    pin: string[],
    refs: React.MutableRefObject<Array<HTMLInputElement | null>>
  ) => {
    if (event.key === 'Backspace' && !pin[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  const newPinValue = newPin.join('')
  const confirmPinValue = confirmPin.join('')
  const isPinValid = newPinValue.length === 4 && confirmPinValue.length === 4 && newPinValue === confirmPinValue

  const encryptPin = async (pin: string) => {
    const encoder = new TextEncoder()
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode('icms-local-pin-key'),
      'PBKDF2',
      false,
      ['deriveKey']
    )
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('icms-pin-salt'),
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    )
    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    const encryptedBuffer = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoder.encode(pin)
    )
    const encryptedArray = Array.from(new Uint8Array(encryptedBuffer))
    return JSON.stringify({
      iv: Array.from(iv),
      data: encryptedArray,
    })
  }

  const handleSubmit = async () => {
    if (!isAuthorizationCodeValid || !isPinValid) {
      return
    }
    const encryptedPin = await encryptPin(confirmPinValue)
    localStorage.setItem('encrypted_pin', encryptedPin)
    localStorage.setItem('PinSetup', 'true')
    navigate('/login')
  }

  return (
    <div className="auth-page">
      <h1 className="page-title">Setup Your PIN</h1>
      <p className="auth-subtitle">Create a secure 4-digit UPI style PIN to continue.</p>

      <div className="auth-code-row">


          <input
            className="auth-code-input"
            type="text"
            inputMode="numeric"
            placeholder="Enter authorization code"
            value={enteredCode}
            maxLength={2}
            onChange={(e) => setEnteredCode(e.target.value.replace(/\D/g, '').slice(0, 2))}
          />

        <p className="auth-generated-code">Access Code: {accessCode}</p>
      </div>

      {enteredCode.length > 0 && (
        <p className={`auth-code-status ${isAuthorizationCodeValid ? 'valid' : 'invalid'}`}>
          {isAuthorizationCodeValid ? ' ✅ Authorization code matched - You are authorized to proceed' : '❌ Wrong code'}
        </p>
      )}

      <p className="auth-help-text">
        For assistance in obtaining the authorization code, contact Sunshine Powertronics Pvt. Ltd.
        customer support at +91 93730 91580.
      </p>
<div className='pin-section'>
      <div className="auth-section">
        <strong className="auth-section-title">Enter New PIN</strong>
        <div className="pin-grid-with-toggle">
          <div className="pin-grid">
            {newPin.map((digit, index) => (
              <input
                key={`new-${index}`}
                ref={(el) => {
                  newPinRefs.current[index] = el
                }}
                className="pin-input"
                type={showNewPin ? 'text' : 'password'}
                inputMode="numeric"
                maxLength={1}
                value={digit}
                disabled={!isAuthorizationCodeValid}
                onChange={(e) =>
                  handlePinChange(e.target.value, index, newPin, setNewPin, newPinRefs)
                }
                onKeyDown={(e) => handlePinKeyDown(e, index, newPin, newPinRefs)}
              />
            ))}
          </div>
          <button
            type="button"
            className="pin-visibility-toggle"
            disabled={!isAuthorizationCodeValid}
            onClick={() => setShowNewPin((prev) => !prev)}
            aria-label={showNewPin ? 'Hide new PIN' : 'Show new PIN'}
          >
            {showNewPin ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M3 3l18 18M10.58 10.58a2 2 0 102.83 2.83M9.88 5.08A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7-1 2.24-2.77 4.12-5 5.26M6.61 6.61C4.2 7.87 2.31 9.79 1 12c1.73 3.89 6 7 11 7 1.73 0 3.37-.37 4.84-1.03"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M1 12c1.73-3.89 6-7 11-7s9.27 3.11 11 7c-1.73 3.89-6 7-11 7S2.73 15.89 1 12z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="auth-section">
        <strong className="auth-section-title">Confirm PIN</strong>
        <div className="pin-grid">
          {confirmPin.map((digit, index) => (
            <input
              key={`confirm-${index}`}
              ref={(el) => {
                confirmPinRefs.current[index] = el
              }}
              className="pin-input"
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={!isAuthorizationCodeValid}
              onChange={(e) =>
                handlePinChange(e.target.value, index, confirmPin, setConfirmPin, confirmPinRefs)
              }
              onKeyDown={(e) => handlePinKeyDown(e, index, confirmPin, confirmPinRefs)}
            />
          ))}
        </div>
      </div>
      </div>

      <button className="auth-submit" disabled={!isAuthorizationCodeValid || !isPinValid} onClick={handleSubmit}>
        Set PIN
      </button>
    </div>
  )
}

export default Auth