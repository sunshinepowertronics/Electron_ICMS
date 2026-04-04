import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('icms', {
  platform: process.platform,
  onShowDataVisible: (callback: (visible: boolean) => void) => {
    const listener = (_: Electron.IpcRendererEvent, visible: boolean) => callback(visible)
    ipcRenderer.on('display-options:show-data', listener)
    return () => {
      ipcRenderer.removeListener('display-options:show-data', listener)
    }
  },
  onShowTrafficVisible: (callback: (visible: boolean) => void) => {
    const listener = (_: Electron.IpcRendererEvent, visible: boolean) => callback(visible)
    ipcRenderer.on('display-options:show-traffic', listener)
    return () => {
      ipcRenderer.removeListener('display-options:show-traffic', listener)
    }
  },
  listSerialPorts: () => ipcRenderer.invoke('serial:list-ports'),
  openSerialPort: (opts: { path: string; baudRate: number; slaveId: string }) =>
    ipcRenderer.invoke('serial:open', opts),
  closeSerialPort: () => ipcRenderer.invoke('serial:close'),
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
