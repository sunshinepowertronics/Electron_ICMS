import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('icms', {
  platform: process.platform,
  onDisplayView: (callback: (view: 'data' | 'traffic') => void) => {
    const listener = (_: Electron.IpcRendererEvent, view: 'data' | 'traffic') => callback(view)
    ipcRenderer.on('display-options:view', listener)
    return () => {
      ipcRenderer.removeListener('display-options:view', listener)
    }
  },
  listSerialPorts: () => ipcRenderer.invoke('serial:list-ports'),
  openSerialPort: (opts: { path: string; baudRate: number; slaveId: string }) =>
    ipcRenderer.invoke('serial:open', opts),
  closeSerialPort: () => ipcRenderer.invoke('serial:close'),
  writeSerialBytes: (bytes: number[], meta?: { logTx?: string }) =>
    ipcRenderer.invoke('serial:write', bytes, meta),
  getSerialStatus: () => ipcRenderer.invoke('serial:status'),
  onSerialData: (callback: (payload: { hex: string; length: number }) => void) => {
    const listener = (_: Electron.IpcRendererEvent, payload: { hex: string; length: number }) =>
      callback(payload)
    ipcRenderer.on('serial:data', listener)
    return () => ipcRenderer.removeListener('serial:data', listener)
  },
  onSerialError: (callback: (message: string) => void) => {
    const listener = (_: Electron.IpcRendererEvent, message: string) => callback(message)
    ipcRenderer.on('serial:error', listener)
    return () => ipcRenderer.removeListener('serial:error', listener)
  },
})
