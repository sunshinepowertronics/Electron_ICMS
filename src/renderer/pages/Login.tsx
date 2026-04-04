import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { STORAGE_CONFIGURED } from '../utils/deviceStorage'

export default function Login() {
  const navigate = useNavigate()
  const [pin, setPin] = useState(['', '', '', ''])
  const [showPin, setShowPin] = useState(false)
  const [pinError, setPinError] = useState(false)
  const pinRefs = useRef<Array<HTMLInputElement | null>>([])
  const verifySeq = useRef(0)

  const handlePinChange = (value: string, index: number) => {
    setPinError(false)
    const sanitizedValue = value.replace(/\D/g, '').slice(-1)
    const updatedPin = [...pin]
    updatedPin[index] = sanitizedValue
    setPin(updatedPin)

    if (sanitizedValue && index < pinRefs.current.length - 1) {
      pinRefs.current[index + 1]?.focus()
    }
  }

  const handlePinKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && !pin[index] && index > 0) {
      pinRefs.current[index - 1]?.focus()
    }
  }

  useEffect(() => {
    const pinValue = pin.join('')
    if (pinValue.length !== 4) {
      return
    }

    const seq = ++verifySeq.current
    ;(async () => {
      const stored = localStorage.getItem('encrypted_pin')
      if (!stored) {
        if (verifySeq.current === seq) {
          setPin(['', '', '', ''])
          setPinError(true)
          pinRefs.current[0]?.focus()
        }
        return
      }

      const tryDecrypt = async () => {
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
          ['decrypt']
        )
        const parsed = JSON.parse(stored) as { iv: number[]; data: number[] }
        const decrypted = await window.crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: new Uint8Array(parsed.iv) },
          key,
          new Uint8Array(parsed.data)
        )
        return new TextDecoder().decode(decrypted)
      }

      try {
        const decrypted = await tryDecrypt()
        if (verifySeq.current !== seq) return
        if (decrypted === pinValue) {
          navigate(localStorage.getItem(STORAGE_CONFIGURED) === 'true' ? '/dashboard' : '/card')
        } else {
          setPin(['', '', '', ''])
          setPinError(true)
          pinRefs.current[0]?.focus()
        }
      } catch {
        if (verifySeq.current !== seq) return
        setPin(['', '', '', ''])
        setPinError(true)
        pinRefs.current[0]?.focus()
      }
    })()
  }, [pin, navigate])

  return (
    <div className="login-page">
      <h1 className="login-title">ICMS</h1>
      <p className="login-subtitle">Enter your PIN to continue</p>
      <div className="pin-grid-with-toggle">
        <div className="pin-grid">
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                pinRefs.current[index] = el
              }}
              className="pin-input"
              type={showPin ? 'text' : 'password'}
              inputMode="numeric"
              maxLength={1}
              autoComplete="one-time-code"
              value={digit}
              onChange={(e) => handlePinChange(e.target.value, index)}
              onKeyDown={(e) => handlePinKeyDown(e, index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="pin-visibility-toggle"
          onClick={() => setShowPin((prev) => !prev)}
          aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
        >
          {showPin ? (
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
      {pinError && <p className="auth-code-status invalid">Incorrect PIN. Try again.</p>}
      <Link to="/setup" className="login-setup-link">
        Set up or change PIN
      </Link>
    </div>
  )
}
