"use strict";
const electron = require("electron");
const serialport = require("serialport");
const path = require("path");
let activeSerialPort = null;
let serialSession = null;
function broadcastSerial(channel, payload) {
  for (const win of electron.BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) win.webContents.send(channel, payload);
  }
}
function broadcastDisplayView(view) {
  for (const win of electron.BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) win.webContents.send("display-options:view", view);
  }
}
function closeActiveSerial() {
  serialSession = null;
  if (!activeSerialPort) return;
  const p = activeSerialPort;
  activeSerialPort = null;
  try {
    p.removeAllListeners();
    if (p.isOpen) p.close();
  } catch {
  }
}
function createApplicationMenu() {
  const isMac = process.platform === "darwin";
  const template = [
    ...isMac ? [
      {
        label: electron.app.name,
        submenu: [
          { role: "about" },
          { type: "separator" },
          { role: "services" },
          { type: "separator" },
          { role: "hide" },
          { role: "hideOthers" },
          { role: "unhide" },
          { type: "separator" },
          { role: "quit" }
        ]
      }
    ] : [],
    {
      label: "File",
      submenu: [isMac ? { role: "close" } : { role: "quit" }]
    },
    {
      label: "Edit",
      submenu: [
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...isMac ? [
          { role: "pasteAndMatchStyle" },
          { role: "delete" },
          { role: "selectAll" },
          { type: "separator" }
        ] : [
          { role: "delete" },
          { type: "separator" },
          { role: "selectAll" }
        ]
      ]
    },
    {
      label: "View",
      submenu: [
        {
          label: "Display Options",
          submenu: [
            {
              label: "Show Data",
              type: "radio",
              checked: true,
              click: () => {
                broadcastDisplayView("data");
              }
            },
            {
              label: "Show Traffic",
              type: "radio",
              checked: false,
              click: () => {
                broadcastDisplayView("traffic");
              }
            }
          ]
        },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { role: "togglefullscreen" }
      ]
    },
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        { role: "close" }
      ]
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            await electron.shell.openExternal("https://sunshinepowertronics.com");
          }
        }
      ]
    }
  ];
  electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(template));
}
function createWindow() {
  const win = new electron.BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false
    },
    title: "ICMS"
  });
  if (process.env.NODE_ENV === "development" || !electron.app.isPackaged) {
    win.loadURL(process.env.ELECTRON_RENDERER_URL ?? "http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
function serialPortLabel(p) {
  const path2 = p.path;
  const friendly = p.friendlyName?.trim();
  if (friendly) return `${friendly} (${path2})`;
  const mfr = p.manufacturer?.trim();
  if (mfr) {
    const sn = p.serialNumber?.trim();
    return sn ? `${mfr} · ${sn} — ${path2}` : `${mfr} — ${path2}`;
  }
  return path2;
}
electron.ipcMain.handle("serial:list-ports", async () => {
  try {
    const ports = await serialport.SerialPort.list();
    return ports.map((p) => ({
      path: p.path,
      label: serialPortLabel(p)
    }));
  } catch {
    return [];
  }
});
electron.ipcMain.handle(
  "serial:open",
  async (_e, opts) => {
    const path2 = opts.path?.trim();
    const baudRate = Number(opts.baudRate);
    const slaveId = opts.slaveId != null ? String(opts.slaveId).trim() : "";
    if (!path2) return { ok: false, error: "No port selected" };
    if (!Number.isFinite(baudRate) || baudRate <= 0) return { ok: false, error: "Invalid baud rate" };
    closeActiveSerial();
    return await new Promise((resolve) => {
      let settled = false;
      const port = new serialport.SerialPort({ path: path2, baudRate });
      const fail = (err) => {
        if (settled) return;
        settled = true;
        try {
          port.removeAllListeners();
          if (port.isOpen) port.close();
        } catch {
        }
        resolve({ ok: false, error: err.message });
      };
      port.once("error", fail);
      port.once("open", () => {
        if (settled) return;
        settled = true;
        port.off("error", fail);
        activeSerialPort = port;
        serialSession = { path: path2, baudRate, slaveId };
        port.on("data", (buf) => {
          const hex = [...buf].map((b) => b.toString(16).padStart(2, "0")).join(" ");
          broadcastSerial("serial:data", { hex, length: buf.length });
        });
        port.on("error", (err) => {
          broadcastSerial("serial:error", err.message);
        });
        resolve({ ok: true, path: path2, baudRate, slaveId });
      });
    });
  }
);
electron.ipcMain.handle("serial:close", async () => {
  closeActiveSerial();
  return { ok: true };
});
electron.ipcMain.handle("serial:status", async () => {
  if (!serialSession || !activeSerialPort?.isOpen) {
    return { connected: false };
  }
  return { connected: true, ...serialSession };
});
electron.app.on("before-quit", () => {
  closeActiveSerial();
});
electron.app.whenReady().then(() => {
  createApplicationMenu();
  createWindow();
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
});
