import { JSX } from 'react'

interface SummaryProps {
  total: number
  paymentMethod: 'dinheiro' | 'cartao' | 'pix'
  setPaymentMethod: (method: 'dinheiro' | 'cartao' | 'pix') => void
  onFinish: () => void
}

export function SalesSummary({
  total,
  paymentMethod,
  setPaymentMethod,
  onFinish
}: SummaryProps): JSX.Element {
  return (
    <div className="w-110 flex flex-col">
      <div className="bg-[#2A2A2A] rounded-xl border border-[#3A3A3A] p-8 shadow-2xl h-full flex flex-col">
        <h3 className="text-white text-[10px] font-black uppercase tracking-[2px] mb-6">
          Resumo da Venda
        </h3>
        <div className="flex justify-between items-center mb-6">
          <span className="text-[#B5B5B5] text-sm">Total Geral</span>
          <span className="text-[#22C55E] text-5xl font-black font-mono">
            R$ {total.toFixed(2)}
          </span>
        </div>
        <div className="h-px bg-[#3A3A3A] mb-8" />

        <p className="text-[#B5B5B5] text-[10px] font-black uppercase tracking-widest mb-4">
          Pagamento
        </p>
        <div className="grid grid-cols-1 gap-3 mb-8">
          {(['dinheiro', 'cartao', 'pix'] as const).map((method, idx) => (
            <button
              key={method}
              onClick={(): void => setPaymentMethod(method)}
              className={`flex justify-between items-center px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest border transition-all cursor-pointer ${
                paymentMethod === method
                  ? 'bg-[#22C55E] border-transparent text-white'
                  : 'bg-[#1F1F1F] border-[#3A3A3A] text-[#777]'
              }`}
            >
              <span>{method}</span>
              <span className="opacity-40 text-[9px] font-mono">F{idx + 2}</span>
            </button>
          ))}
        </div>

        <button
          onClick={onFinish}
          className="mt-auto w-full py-6 bg-[#22C55E] hover:bg-green-600 text-white text-xl font-black rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer flex flex-col items-center"
        >
          CONCLUIR VENDA
          <span className="text-[10px] opacity-60 mt-1 uppercase tracking-widest">
            Pressione F5
          </span>
        </button>
      </div>
    </div>
  )
}
