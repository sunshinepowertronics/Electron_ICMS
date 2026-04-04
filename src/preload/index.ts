import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('icms', {
  platform: process.platform
})
