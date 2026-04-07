function toHex(bytes: number[]): string {
  return bytes.map((b) => (b & 0xff).toString(16).padStart(2, '0')).join(' ')
}

export function appendTrafficTx(bytes: number[], label: string): void {
  const text = `[TX ${label}] ${toHex(bytes)}`
  window.dispatchEvent(new CustomEvent<string>('icms:traffic-line', { detail: text }))
}

export function appendTrafficTxFailed(label: string, error: string): void {
  window.dispatchEvent(new CustomEvent<string>('icms:traffic-line', { detail: `[TX ${label} failed] ${error}` }))
}
