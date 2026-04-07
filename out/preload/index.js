"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("icms", {
  platform: process.platform,
  onDisplayView: (callback) => {
    const listener = (_, view) => callback(view);
    electron.ipcRenderer.on("display-options:view", listener);
    return () => {
      electron.ipcRenderer.removeListener("display-options:view", listener);
    };
  },
  listSerialPorts: () => electron.ipcRenderer.invoke("serial:list-ports"),
  openSerialPort: (opts) => electron.ipcRenderer.invoke("serial:open", opts),
  closeSerialPort: () => electron.ipcRenderer.invoke("serial:close"),
  writeSerialBytes: (bytes, meta) => electron.ipcRenderer.invoke("serial:write", bytes, meta),
  getSerialStatus: () => electron.ipcRenderer.invoke("serial:status"),
  onSerialData: (callback) => {
    const listener = (_, payload) => callback(payload);
    electron.ipcRenderer.on("serial:data", listener);
    return () => electron.ipcRenderer.removeListener("serial:data", listener);
  },
  onSerialError: (callback) => {
    const listener = (_, message) => callback(message);
    electron.ipcRenderer.on("serial:error", listener);
    return () => electron.ipcRenderer.removeListener("serial:error", listener);
  }
});
