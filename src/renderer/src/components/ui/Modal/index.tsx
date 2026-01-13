import { JSX, ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  width?: string
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = 'w-300'
}: ModalProps): JSX.Element | null {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm font-inter">
      <div
        className={`${width} bg-[#2A2A2A] rounded-2xl shadow-2xl flex flex-col border border-[#3A3A3A] overflow-hidden`}
      >
        <div className="px-10 py-8 border-b border-[#3A3A3A] flex justify-between items-center bg-[#252525]">
          <h3 className="text-white text-2xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-[#777] hover:text-white text-xl cursor-pointer">
            ✕
          </button>
        </div>

        <div className="p-10 flex-1 overflow-y-auto custom-scrollbar">{children}</div>

        {footer && (
          <div className="px-10 py-8 bg-[#252525] border-t border-[#3A3A3A]">{footer}</div>
        )}
      </div>
    </div>
  )
}
