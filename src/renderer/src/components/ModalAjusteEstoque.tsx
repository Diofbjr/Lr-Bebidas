import { JSX, useState } from 'react'
import { ItemEstoque } from './Estoque'

interface ModalAjusteEstoqueProps {
  isOpen: boolean
  item: ItemEstoque | null
  onClose: () => void
  onSave: (id: string, novasQtds: { qtdCx: number; qtdUn: number }) => void
}

export default function ModalAjusteEstoque({
  isOpen,
  item,
  onClose,
  onSave
}: ModalAjusteEstoqueProps): JSX.Element | null {
  // Inicializamos o estado diretamente com o item (sem useEffect)
  const [qtdCx, setQtdCx] = useState(item?.qtdCx || 0)
  const [qtdUn, setQtdUn] = useState(item?.qtdUn || 0)

  if (!isOpen || !item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-112.5 bg-[#2A2A2A] border border-[#3A3A3A] rounded-2xl shadow-2xl p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Ajustar Estoque</h3>
            <p className="text-[#B5B5B5] text-xs mt-1">{item.produto}</p>
          </div>
          <button onClick={onClose} className="text-[#777] hover:text-white transition-colors">
            ✕
          </button>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold text-[#777]">Caixas</label>
              <input
                type="number"
                value={qtdCx}
                onChange={(e) => setQtdCx(Number(e.target.value))}
                className="bg-[#1F1F1F] border border-[#3A3A3A] rounded-lg h-12 px-4 text-white focus:border-[#3B82F6] outline-none font-mono"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold text-[#777]">Unidades</label>
              <input
                type="number"
                value={qtdUn}
                onChange={(e) => setQtdUn(Number(e.target.value))}
                className="bg-[#1F1F1F] border border-[#3A3A3A] rounded-lg h-12 px-4 text-white focus:border-[#3B82F6] outline-none font-mono"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 h-12 rounded-xl border border-[#3A3A3A] text-white font-bold text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={() => onSave(item.id, { qtdCx, qtdUn })}
              className="flex-1 h-12 rounded-xl bg-[#22C55E] text-white font-bold text-sm hover:bg-green-600 shadow-lg"
            >
              Salvar Ajuste
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
