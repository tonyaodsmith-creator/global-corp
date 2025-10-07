import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import fs from 'node:fs'

const isDev = !app.isPackaged

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    backgroundColor: '#020617',
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'hiddenInset'
  })

  if (isDev) {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

// Simple persistence API
const saveDir = () => path.join(app.getPath('userData'), 'saves')
const saveFile = () => path.join(saveDir(), 'latest.json')

ipcMain.handle('save-game', async (_evt, data: string) => {
  fs.mkdirSync(saveDir(), { recursive: true })
  fs.writeFileSync(saveFile(), data, 'utf-8')
  return { ok: true }
})

ipcMain.handle('load-game', async () => {
  try {
    const file = saveFile()
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, 'utf-8')
      return { ok: true, data }
    }
    return { ok: true, data: null }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
