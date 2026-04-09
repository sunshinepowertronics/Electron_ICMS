import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron'
import { SerialPort } from 'serialport'
import { join } from 'path'
import { existsSync } from 'fs'
import type { MenuItemConstructorOptions } from 'electron'
import { crc16Modbus } from '../shared/modbusRtu'
import { autoUpdater } from 'electron-updater'

let activeSerialPort: SerialPort | null = null
let serialSession: { path: string; baudRate: number; slaveId: string } | null = null
let serialModbusRxBuffer: number[] = []

type UpdateStatus =
  | { state: 'idle' }
  | { state: 'checking' }
  | { state: 'available'; version: string; releaseName?: string | null; releaseNotes?: string | null; mandatory: true }
  | { state: 'not-available' }
  | { state: 'downloading'; percent?: number; bytesPerSecond?: number; transferred?: number; total?: number }
  | { state: 'downloaded'; version: string; mandatory: true }
  | { state: 'error'; message: string }

let latestUpdateStatus: UpdateStatus = { state: 'idle' }

function broadcastUpdateStatus(payload: UpdateStatus): void {
  latestUpdateStatus = payload
  for (const win of BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) win.webContents.send('update:status', payload)
  }
}

function broadcastSerial(channel: string, payload: unknown): void {
  for (const win of BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) win.webContents.send(channel, payload)
  }
}

function broadcastDisplayView(view: 'data' | 'traffic'): void {
  for (const win of BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) win.webContents.send('display-options:view', view)
  }
}

function closeActiveSerial(): void {
  serialSession = null
  serialModbusRxBuffer = []
  if (!activeSerialPort) return
  const p = activeSerialPort
  activeSerialPort = null
  try {
    p.removeAllListeners()
    if (p.isOpen) p.close()
  } catch {
    // ignore
  }
}

function createApplicationMenu(): void {
  const isMac = process.platform === 'darwin'

  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' as const },
              { type: 'separator' as const },
              { role: 'services' as const },
              { type: 'separator' as const },
              { role: 'hide' as const },
              { role: 'hideOthers' as const },
              { role: 'unhide' as const },
              { type: 'separator' as const },
              { role: 'quit' as const },
            ],
          },
        ]
      : []),
    {
      label: 'File',
      submenu: [isMac ? { role: 'close' as const } : { role: 'quit' as const }],
    },
    {
      label: 'Edit',
      submenu: [
        { type: 'separator' as const },
        { role: 'cut' as const },
        { role: 'copy' as const },
        { role: 'paste' as const },
        ...(isMac
          ? [
              { role: 'pasteAndMatchStyle' as const },
              { role: 'delete' as const },
              { role: 'selectAll' as const },
              { type: 'separator' as const },
            ]
          : [
              { role: 'delete' as const },
              { type: 'separator' as const },
              { role: 'selectAll' as const },
            ]),
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Display Options',
          submenu: [
            {
              label: 'Show Data',
              type: 'radio',
              checked: true,
              click: () => {
                broadcastDisplayView('data')
              },
            },
            {
              label: 'Show Traffic',
              type: 'radio',
              checked: false,
              click: () => {
                broadcastDisplayView('traffic')
              },
            },
          ],
        },
        { type: 'separator' as const },
        { role: 'resetZoom' as const },
        { role: 'zoomIn' as const },
        { role: 'zoomOut' as const },
        { role: 'togglefullscreen' as const },
      ],
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' as const },
        { role: 'zoom' as const },
       { role: 'close' as const },
      ],
    },
    {
      role: 'help' as const,
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://sunshinepowertronics.com')
          },
        },
      ],
    },
  ] satisfies MenuItemConstructorOptions[]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

function createWindow(): void {
  const windowIconPath = app.isPackaged
    ? join(process.resourcesPath, 'build', 'icon.ico')
    : join(process.cwd(), 'build', 'icon.ico')

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: existsSync(windowIconPath) ? windowIconPath : undefined,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: 'ICMS',
  })

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    win.loadURL(process.env.ELECTRON_RENDERER_URL ?? 'http://localhost:5173')
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function asTextReleaseNotes(notes: unknown): string | null {
  if (!notes) return null
  if (typeof notes === 'string') return notes
  if (Array.isArray(notes)) {
    const parts = notes
      .map((n) => (n && typeof n === 'object' && 'note' in n ? String((n as { note?: unknown }).note ?? '') : ''))
      .filter(Boolean)
    return parts.length ? parts.join('\n\n') : null
  }
  return null
}

function configureAutoUpdater(): void {
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on('checking-for-update', () => {
    broadcastUpdateStatus({ state: 'checking' })
  })

  autoUpdater.on('update-available', (info) => {
    broadcastUpdateStatus({
      state: 'available',
      version: info.version,
      releaseName: info.releaseName ?? null,
      releaseNotes: asTextReleaseNotes(info.releaseNotes),
      mandatory: true,
    })
  })

  autoUpdater.on('update-not-available', () => {
    broadcastUpdateStatus({ state: 'not-available' })
  })

  autoUpdater.on('download-progress', (p) => {
    broadcastUpdateStatus({
      state: 'downloading',
      percent: typeof p.percent === 'number' ? p.percent : undefined,
      bytesPerSecond: p.bytesPerSecond,
      transferred: p.transferred,
      total: p.total,
    })
  })

  autoUpdater.on('update-downloaded', (info) => {
    broadcastUpdateStatus({ state: 'downloaded', version: info.version, mandatory: true })
  })

  autoUpdater.on('error', (err) => {
    broadcastUpdateStatus({ state: 'error', message: err?.message ? String(err.message) : 'Update error' })
  })
}

async function checkForUpdates(): Promise<void> {
  if (!app.isPackaged) {
    broadcastUpdateStatus({ state: 'idle' })
    return
  }
  try {
    await autoUpdater.checkForUpdates()
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    broadcastUpdateStatus({ state: 'error', message: msg })
  }
}

ipcMain.handle('update:check', async () => {
  await checkForUpdates()
  return { ok: true as const }
})

ipcMain.handle('update:status', async () => {
  return latestUpdateStatus
})

ipcMain.handle('update:download', async () => {
  if (!app.isPackaged) return { ok: false as const, error: 'Updates are disabled in development builds' }
  try {
    await autoUpdater.downloadUpdate()
    return { ok: true as const }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    broadcastUpdateStatus({ state: 'error', message: msg })
    return { ok: false as const, error: msg }
  }
})

ipcMain.handle('update:install', async () => {
  if (!app.isPackaged) return { ok: false as const, error: 'Cannot install updates in development builds' }
  try {
    autoUpdater.quitAndInstall(false, true)
    return { ok: true as const }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return { ok: false as const, error: msg }
  }
})

function serialPortLabel(p: {
  path: string
  friendlyName?: string
  manufacturer?: string
  serialNumber?: string
}): string {
  const path = p.path
  const friendly = p.friendlyName?.trim()
  if (friendly) return `${friendly} (${path})`
  const mfr = p.manufacturer?.trim()
  if (mfr) {
    const sn = p.serialNumber?.trim()
    return sn ? `${mfr} · ${sn} — ${path}` : `${mfr} — ${path}`
  }
  return path
}

function formatSerialBufferAsHex(buf: Buffer): string {
  return [...buf].map((b) => b.toString(16).padStart(2, '0')).join(' ')
}

function publishSerialReadToRenderers(buf: Buffer): void {
  broadcastSerial('serial:data', {
    hex: formatSerialBufferAsHex(buf),
    length: buf.length,
    bytes: [...buf],
  })
}

function publishRawSerialReadToRenderers(buf: Buffer): void {
  broadcastSerial('serial:raw-data', {
    hex: formatSerialBufferAsHex(buf),
    length: buf.length,
    bytes: [...buf],
  })
}

function modbusRtuCrcOk(u: Uint8Array): boolean {
  if (u.length < 4) return false
  const c = crc16Modbus(u.subarray(0, -2))
  return (c & 0xff) === u[u.length - 2] && ((c >> 8) & 0xff) === u[u.length - 1]
}

/** Total RTU frame length from first byte at offset; null if not a recognized response shape yet. */
function modbusRtuResponseByteLength(u: Uint8Array, off: number): number | null {
  if (u.length - off < 2) return null
  const func = u[off + 1]
  if (func & 0x80) return 5
  if (func === 1 || func === 2 || func === 3 || func === 4) {
    if (u.length - off < 3) return null
    const bc = u[off + 2]
    if (bc < 0 || bc > 250) return null
    return 5 + bc
  }
  if (func === 5 || func === 6 || func === 15 || func === 16) return 8
  return null
}

const SERIAL_RX_BUFFER_CAP = 6144

function ingestRawSerialAndEmitModbusFrames(chunk: Buffer): void {
  for (let i = 0; i < chunk.length; i++) serialModbusRxBuffer.push(chunk[i])
  if (serialModbusRxBuffer.length > SERIAL_RX_BUFFER_CAP) {
    serialModbusRxBuffer.splice(0, serialModbusRxBuffer.length - 2048)
  }
  let guard = 0
  while (serialModbusRxBuffer.length >= 5 && guard++ < 8000) {
    const u = new Uint8Array(serialModbusRxBuffer)
    const frameLen = modbusRtuResponseByteLength(u, 0)
    if (frameLen === null) {
      serialModbusRxBuffer.shift()
      continue
    }
    if (serialModbusRxBuffer.length < frameLen) break
    const frame = Buffer.from(serialModbusRxBuffer.slice(0, frameLen))
    if (!modbusRtuCrcOk(new Uint8Array(frame))) {
      serialModbusRxBuffer.shift()
      continue
    }
    serialModbusRxBuffer.splice(0, frameLen)
    publishSerialReadToRenderers(frame)
  }
}

function attachSerialPortModbusDeframer(port: SerialPort): void {
  serialModbusRxBuffer = []
  port.on('data', (raw: Buffer) => {
    publishRawSerialReadToRenderers(raw)
    ingestRawSerialAndEmitModbusFrames(raw)
  })
}

function attachSerialPortErrorListener(port: SerialPort): void {
  port.on('error', (err) => {
    broadcastSerial('serial:error', err.message)
  })
}

ipcMain.handle('serial:list-ports', async () => {
  try {
    const ports = await SerialPort.list()
    return ports.map((p) => ({
      path: p.path,
      label: serialPortLabel(p),
    }))
  } catch {
    return []
  }
})

ipcMain.handle(
  'serial:open',
  async (
    _e,
    opts: { path: string; baudRate: number; slaveId: string },
  ): Promise<
    | { ok: true; path: string; baudRate: number; slaveId: string }
    | { ok: false; error: string }
  > => {
    const path = opts.path?.trim()
    const baudRate = Number(opts.baudRate)
    const slaveId = opts.slaveId != null ? String(opts.slaveId).trim() : ''
    if (!path) return { ok: false, error: 'No port selected' }
    if (!Number.isFinite(baudRate) || baudRate <= 0) return { ok: false, error: 'Invalid baud rate' }

    closeActiveSerial()

    return await new Promise((resolve) => {
      let settled = false
      const port = new SerialPort({ path, baudRate })
      const fail = (err: Error) => {
        if (settled) return
        settled = true
        try {
          port.removeAllListeners()
          if (port.isOpen) port.close()
        } catch {
          // ignore
        }
        resolve({ ok: false as const, error: err.message })
      }
      port.once('error', fail)
      port.once('open', () => {
        if (settled) return
        settled = true
        port.off('error', fail)
        activeSerialPort = port
        serialSession = { path, baudRate, slaveId }
        attachSerialPortModbusDeframer(port)
        attachSerialPortErrorListener(port)
        resolve({ ok: true as const, path, baudRate, slaveId })
      })
    })
  },
)

function normalizeSerialWritePayload(bytes: unknown): number[] | null {
  if (Array.isArray(bytes) && bytes.length > 0) {
    return bytes.map((b) => {
      const n = typeof b === 'number' ? b : Number(b)
      return Number.isFinite(n) ? Math.max(0, Math.min(255, Math.round(n))) : 0
    })
  }
  if (bytes !== null && typeof bytes === 'object' && !Array.isArray(bytes)) {
    const o = bytes as Record<string, unknown>
    const keys = Object.keys(o)
      .filter((k) => /^\d+$/.test(k))
      .sort((a, b) => Number(a) - Number(b))
    if (keys.length === 0) return null
    return keys.map((k) => {
      const n = Number(o[k])
      return Number.isFinite(n) ? Math.max(0, Math.min(255, Math.round(n))) : 0
    })
  }
  return null
}

function serialWriteLogTag(meta: unknown): string | null {
  if (meta === null || typeof meta !== 'object' || Array.isArray(meta)) return null
  const t = (meta as { logTx?: unknown }).logTx
  return typeof t === 'string' && t.length > 0 ? t : null
}

ipcMain.handle(
  'serial:write',
  async (_e, bytes: unknown, meta?: unknown): Promise<{ ok: true } | { ok: false; error: string }> => {
    if (!activeSerialPort?.isOpen) return { ok: false, error: 'Serial port not open' }
    const normalized = normalizeSerialWritePayload(bytes)
    if (!normalized || normalized.length === 0) return { ok: false, error: 'No bytes to write' }
    const tag = serialWriteLogTag(meta)
    if (tag) {
      const hex = normalized.map((b) => b.toString(16).padStart(2, '0').toUpperCase()).join(' ')
      console.log(`[serial:write logTx=${tag}] ${hex}`)
    }
    const buf = Buffer.from(normalized)
    const port = activeSerialPort
    try {
      await new Promise<void>((resolve, reject) => {
        port.write(buf, (err) => {
          if (err) {
            reject(err)
            return
          }
          port.drain((derr) => (derr ? reject(derr) : resolve()))
        })
      })
      return { ok: true as const }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      return { ok: false, error: msg }
    }
  },
)

ipcMain.handle('serial:close', async () => {
  closeActiveSerial()
  return { ok: true as const }
})

ipcMain.handle('serial:status', async () => {
  if (!serialSession || !activeSerialPort?.isOpen) {
    return { connected: false as const }
  }
  return { connected: true as const, ...serialSession }
})

app.on('before-quit', () => {
  closeActiveSerial()
})

app.whenReady().then(() => {
  createApplicationMenu()
  createWindow()
  configureAutoUpdater()
  void checkForUpdates()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
