/* eslint-disable prettier/prettier */
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Definição das APIs customizadas que o React poderá acessar via window.api
const api = {
  /**
   * Dispara o comando de impressão no Main Process
   * @returns Promise<{ success: boolean; error?: string }>
   */
  printDocument: () => ipcRenderer.invoke('print-document')
}

// O uso do `contextBridge` é a prática recomendada de segurança do Electron
if (process.contextIsolated) {
  try {
    // Expõe as APIs padrão do toolkit (opcional, mas útil)
    contextBridge.exposeInMainWorld('electron', electronAPI)
    
    // Expõe a nossa API de impressão
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error('Erro ao expor APIs no Preload:', error)
  }
} else {
  // Fallback para ambientes sem isolamento de contexto (menos comum hoje em dia)
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}