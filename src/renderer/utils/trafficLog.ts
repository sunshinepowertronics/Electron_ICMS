function toHex(bytes: number[]): string {
  return bytes.map((b) => (b & 0xff).toString(16).padStart(2, '0')).join(' ')
}

function linePayload(row: string): string {
  const tab = row.indexOf('\t')
  return (tab >= 0 ? row.slice(tab + 1) : row).trim()
}

function isTxRequest(text: string): boolean {
  return /^\[TX\s+.+?\]\s+[0-9A-Fa-f]{2}\b/.test(text)
}

function isRxFrame(text: string): boolean {
  return text.startsWith('[RX] ')
}

function isTxFailure(text: string): boolean {
  return /^\[TX\s+.+?\s+failed\]/.test(text)
}

/** Request function from `slave func ...`, or null. Exception replies map back to the request function. */
function frameFunction(text: string, kind: 'tx' | 'rx'): number | null {
  const hex = kind === 'tx' ? text.replace(/^\[TX\s+.+?\]\s+/, '') : text.slice(5).trim()
  const parts = hex.split(/\s+/)
  if (parts.length < 2) return null
  const func = Number.parseInt(parts[1] ?? '', 16)
  if (!Number.isFinite(func)) return null
  return kind === 'rx' ? func & 0x7f : func
}

/**
 * Place an RX line directly under the oldest transmit it answers.
 * Replies can arrive in a burst after several transmits; function code keeps each pair together.
 */
export function pairRxWithPendingTx(lines: string[], rxLine: string): string[] {
  const want = frameFunction(linePayload(rxLine), 'rx')
  for (let i = 0; i < lines.length; i++) {
    const text = linePayload(lines[i] ?? '')
    if (!isTxRequest(text)) continue
    let satisfied = false
    for (let j = i + 1; j < lines.length; j++) {
      const next = linePayload(lines[j] ?? '')
      if (isTxRequest(next)) break
      if (isRxFrame(next) || isTxFailure(next)) {
        satisfied = true
        break
      }
    }
    if (satisfied) continue
    const func = frameFunction(text, 'tx')
    if (want !== null && func !== null && func !== want) continue
    const next = lines.slice()
    next.splice(i + 1, 0, rxLine)
    return next
  }
  return [...lines, rxLine]
}

export function appendTrafficTx(bytes: number[], label: string): void {
  const text = `[TX ${label}] ${toHex(bytes)}`
  window.dispatchEvent(new CustomEvent<string>('icms:traffic-line', { detail: text }))
}

export function appendTrafficTxFailed(label: string, error: string): void {
  window.dispatchEvent(new CustomEvent<string>('icms:traffic-line', { detail: `[TX ${label} failed] ${error}` }))
}
