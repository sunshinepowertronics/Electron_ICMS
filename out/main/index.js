"use strict";
const electron = require("electron");
const serialport = require("serialport");
const path = require("path");
function crc16Modbus(data) {
  let crc = 65535;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i];
    for (let j = 0; j < 8; j++) {
      if (crc & 1) crc = crc >>> 1 ^ 40961;
      else crc >>>= 1;
    }
  }
  return crc & 65535;
}
let activeSerialPort = null;
let serialSession = null;
let serialModbusRxBuffer = [];
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
  serialModbusRxBuffer = [];
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
function formatSerialBufferAsHex(buf) {
  return [...buf].map((b) => b.toString(16).padStart(2, "0")).join(" ");
}
function publishSerialReadToRenderers(buf) {
  broadcastSerial("serial:data", {
    hex: formatSerialBufferAsHex(buf),
    length: buf.length,
    bytes: [...buf]
  });
}
function modbusRtuCrcOk(u) {
  if (u.length < 4) return false;
  const c = crc16Modbus(u.subarray(0, -2));
  return (c & 255) === u[u.length - 2] && (c >> 8 & 255) === u[u.length - 1];
}
function modbusRtuResponseByteLength(u, off) {
  if (u.length - off < 2) return null;
  const func = u[off + 1];
  if (func & 128) return 5;
  if (func === 1 || func === 2 || func === 3 || func === 4) {
    if (u.length - off < 3) return null;
    const bc = u[off + 2];
    if (bc < 0 || bc > 250) return null;
    return 5 + bc;
  }
  if (func === 5 || func === 6 || func === 15 || func === 16) return 8;
  return null;
}
const SERIAL_RX_BUFFER_CAP = 6144;
function ingestRawSerialAndEmitModbusFrames(chunk) {
  for (let i = 0; i < chunk.length; i++) serialModbusRxBuffer.push(chunk[i]);
  if (serialModbusRxBuffer.length > SERIAL_RX_BUFFER_CAP) {
    serialModbusRxBuffer.splice(0, serialModbusRxBuffer.length - 2048);
  }
  let guard = 0;
  while (serialModbusRxBuffer.length >= 5 && guard++ < 8e3) {
    const u = new Uint8Array(serialModbusRxBuffer);
    const frameLen = modbusRtuResponseByteLength(u, 0);
    if (frameLen === null) {
      serialModbusRxBuffer.shift();
      continue;
    }
    if (serialModbusRxBuffer.length < frameLen) break;
    const frame = Buffer.from(serialModbusRxBuffer.slice(0, frameLen));
    if (!modbusRtuCrcOk(new Uint8Array(frame))) {
      serialModbusRxBuffer.shift();
      continue;
    }
    serialModbusRxBuffer.splice(0, frameLen);
    publishSerialReadToRenderers(frame);
  }
}
function attachSerialPortModbusDeframer(port) {
  serialModbusRxBuffer = [];
  port.on("data", (raw) => {
    ingestRawSerialAndEmitModbusFrames(raw);
  });
}
function attachSerialPortErrorListener(port) {
  port.on("error", (err) => {
    broadcastSerial("serial:error", err.message);
  });
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
        attachSerialPortModbusDeframer(port);
        attachSerialPortErrorListener(port);
        resolve({ ok: true, path: path2, baudRate, slaveId });
      });
    });
  }
);
function normalizeSerialWritePayload(bytes) {
  if (Array.isArray(bytes) && bytes.length > 0) {
    return bytes.map((b) => {
      const n = typeof b === "number" ? b : Number(b);
      return Number.isFinite(n) ? Math.max(0, Math.min(255, Math.round(n))) : 0;
    });
  }
  if (bytes !== null && typeof bytes === "object" && !Array.isArray(bytes)) {
    const o = bytes;
    const keys = Object.keys(o).filter((k) => /^\d+$/.test(k)).sort((a, b) => Number(a) - Number(b));
    if (keys.length === 0) return null;
    return keys.map((k) => {
      const n = Number(o[k]);
      return Number.isFinite(n) ? Math.max(0, Math.min(255, Math.round(n))) : 0;
    });
  }
  return null;
}
electron.ipcMain.handle("serial:write", async (_e, bytes) => {
  if (!activeSerialPort?.isOpen) return { ok: false, error: "Serial port not open" };
  const normalized = normalizeSerialWritePayload(bytes);
  if (!normalized || normalized.length === 0) return { ok: false, error: "No bytes to write" };
  const buf = Buffer.from(normalized);
  const port = activeSerialPort;
  try {
    await new Promise((resolve, reject) => {
      port.write(buf, (err) => {
        if (err) {
          reject(err);
          return;
        }
        port.drain((derr) => derr ? reject(derr) : resolve());
      });
    });
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
});
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
