import { JSX, ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  type?: 'default' | 'success' | 'danger'
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  type = 'default'
}: ModalProps): JSX.Element | null {
  if (!isOpen) return null

  const iconColors = {
    default: 'bg-blue-500/20 text-blue-500',
    success: 'bg-[#22C55E]/20 text-[#22C55E]',
    danger: 'bg-red-500/20 text-red-500'
  }

  const iconSymbol = {
    default: 'ℹ',
    success: '✓',
    danger: '!'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#2A2A2A] border border-[#3A3A3A] p-8 rounded-2xl w-full max-w-md shadow-2xl text-center animate-in fade-in zoom-in duration-200">
        <div
          className={`w-16 h-16 ${iconColors[type]} rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold`}
        >
          {iconSymbol[type]}
        </div>

        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <div className="text-[#B5B5B5] mb-8">{children}</div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#777] hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
