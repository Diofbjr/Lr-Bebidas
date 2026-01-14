/* eslint-disable prettier/prettier */
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1280, // Aumentei um pouco para o PDV ficar confortável
    height: 720,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // --- ESCUTADORES IPC ---

  // Teste de conexão
  ipcMain.on('ping', () => console.log('pong'))

  // Lógica de Impressão Profissional
  // Lógica de Impressão Profissional corrigida
  ipcMain.handle('print-document', async (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return { success: false, error: 'Janela não encontrada' }

    return new Promise((resolve) => {
      win.webContents.print(
        {
          silent: false, // Deixe false para teste, true para PDV real
          printBackground: true,
          color: false, // Padrão para impressoras térmicas
          margins: {
            // Corrigido de 'margin' para 'margins'
            marginType: 'none'
          }
        },
        (success, failureReason) => {
          if (!success) {
            console.error(`Falha na impressão: ${failureReason}`)
            resolve({ success: false, error: failureReason })
          } else {
            resolve({ success: true })
          }
        }
      )
    })
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
