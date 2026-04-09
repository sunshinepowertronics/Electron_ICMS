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

export type UpdateStatus =
  | { state: 'idle' }
  | { state: 'checking' }
  | { state: 'available'; version: string; releaseName?: string | null; releaseNotes?: string | null; mandatory: true }
  | { state: 'not-available' }
  | { state: 'downloading'; percent?: number; bytesPerSecond?: number; transferred?: number; total?: number }
  | { state: 'downloaded'; version: string; mandatory: true }
  | { state: 'error'; message: string }

export interface ICMSBridge {
  platform: string
  onUpdateStatus: (callback: (status: UpdateStatus) => void) => () => void
  getUpdateStatus: () => Promise<UpdateStatus>
  checkForUpdates: () => Promise<{ ok: true }>
  downloadUpdate: () => Promise<{ ok: true } | { ok: false; error: string }>
  installUpdate: () => Promise<{ ok: true } | { ok: false; error: string }>
  onDisplayView: (callback: (view: DisplayView) => void) => () => void
  listSerialPorts: () => Promise<SerialPortListItem[]>
  openSerialPort: (opts: { path: string; baudRate: number; slaveId: string }) => Promise<SerialOpenResult>
  closeSerialPort: () => Promise<{ ok: true }>
  writeSerialBytes: (
    bytes: number[],
    meta?: { logTx?: string },
  ) => Promise<{ ok: true } | { ok: false; error: string }>
  getSerialStatus: () => Promise<SerialStatus>
  onSerialData: (
    callback: (payload: { hex: string; length: number; bytes: number[] }) => void,
  ) => () => void
  onSerialRawData: (
    callback: (payload: { hex: string; length: number; bytes: number[] }) => void,
  ) => () => void
  onSerialError: (callback: (message: string) => void) => () => void
}

declare global {
  interface Window {
    icms: ICMSBridge
  }
}

export {}
