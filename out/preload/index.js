"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("icms", {
  platform: process.platform,
  onShowDataVisible: (callback) => {
    const listener = (_, visible) => callback(visible);
    electron.ipcRenderer.on("display-options:show-data", listener);
    return () => {
      electron.ipcRenderer.removeListener("display-options:show-data", listener);
    };
  },
  onShowTrafficVisible: (callback) => {
    const listener = (_, visible) => callback(visible);
    electron.ipcRenderer.on("display-options:show-traffic", listener);
    return () => {
      electron.ipcRenderer.removeListener("display-options:show-traffic", listener);
    };
  },
  listSerialPorts: () => electron.ipcRenderer.invoke("serial:list-ports"),
  openSerialPort: (opts) => electron.ipcRenderer.invoke("serial:open", opts),
  closeSerialPort: () => electron.ipcRenderer.invoke("serial:close"),
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
