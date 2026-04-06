import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron'
import { SerialPort } from 'serialport'
import { join } from 'path'
import type { MenuItemConstructorOptions } from 'electron'

let activeSerialPort: SerialPort | null = null
let serialSession: { path: string; baudRate: number; slaveId: string } | null = null

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
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
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
        port.on('data', (buf) => {
          const hex = [...buf]
            .map((b) => b.toString(16).padStart(2, '0'))
            .join(' ')
          broadcastSerial('serial:data', { hex, length: buf.length })
        })
        port.on('error', (err) => {
          broadcastSerial('serial:error', err.message)
        })
        resolve({ ok: true as const, path, baudRate, slaveId })
      })
    })
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
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
