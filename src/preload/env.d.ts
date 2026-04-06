export interface SerialPortListItem {
  path: string
  label: string
}

export type SerialOpenResult =
  | { ok: true; path: string; baudRate: number; slaveId: string }
  | { ok: false; error: string }

export type SerialStatus =
  | { connected: false }
  | { connected: true; path: string; baudRate: number; slaveId: string }

export type DisplayView = 'data' | 'traffic'

export interface ICMSBridge {
  platform: string
  onDisplayView: (callback: (view: DisplayView) => void) => () => void
  listSerialPorts: () => Promise<SerialPortListItem[]>
  openSerialPort: (opts: { path: string; baudRate: number; slaveId: string }) => Promise<SerialOpenResult>
  closeSerialPort: () => Promise<{ ok: true }>
  getSerialStatus: () => Promise<SerialStatus>
  onSerialData: (callback: (payload: { hex: string; length: number }) => void) => () => void
  onSerialError: (callback: (message: string) => void) => () => void
}

declare global {
  interface Window {
    icms: ICMSBridge
  }
}

export {}
