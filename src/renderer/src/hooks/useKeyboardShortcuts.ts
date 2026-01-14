import { useEffect } from 'react'

type ShortcutConfig = {
  [key: string]: () => void
}

export const useKeyboardShortcuts = (shortcuts: ShortcutConfig): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      // Verifica se a tecla pressionada existe na nossa configuração
      if (shortcuts[event.key]) {
        event.preventDefault()
        shortcuts[event.key]()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Limpeza do evento ao desmontar o componente
    return (): void => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}
