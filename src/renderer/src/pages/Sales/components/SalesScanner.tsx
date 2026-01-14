import { JSX, forwardRef } from 'react'

interface ScannerProps {
  value: string
  onChange: (val: string) => void
}

export const SalesScanner = forwardRef<HTMLInputElement, ScannerProps>(
  ({ value, onChange }, ref): JSX.Element => {
    return (
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={(e): void => onChange(e.target.value)}
            placeholder="Pressione F1 para focar no scanner..."
            className="w-full h-12 bg-[#1F1F1F] border-2 border-[#22C55E] rounded-lg px-6 text-white placeholder-[#555] outline-none shadow-lg shadow-green-900/10 focus:border-green-400 transition-all"
          />
          <div className="absolute right-4 top-3.5 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-ping"></span>
            <span className="text-[10px] text-[#22C55E] font-black uppercase tracking-widest">
              Scanner Ativo
            </span>
          </div>
        </div>
      </div>
    )
  }
)

SalesScanner.displayName = 'SalesScanner'
