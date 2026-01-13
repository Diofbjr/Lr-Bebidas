import { JSX, useState } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Button } from '../../components/ui/Button'
import { InventoryItem } from './index'

interface StockAdjustmentModalProps {
  isOpen: boolean
  item: InventoryItem | null
  onClose: () => void
  onSave: (id: string, newQtys: { qtyBox: number; qtyUnit: number }) => void
}

export default function StockAdjustmentModal({
  isOpen,
  item,
  onClose,
  onSave
}: StockAdjustmentModalProps): JSX.Element | null {
  const [qtyBox, setQtyBox] = useState(item?.qtyBox || 0)
  const [qtyUnit, setQtyUnit] = useState(item?.qtyUnit || 0)

  if (!item) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ajustar Estoque"
      width="w-120"
      footer={
        <div className="flex gap-4 w-full">
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-xl border border-[#3A3A3A] text-[#777] hover:text-white font-bold text-xs uppercase transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <div className="flex-1">
            <Button onClick={() => onSave(item.id, { qtyBox, qtyUnit })}>SALVAR AJUSTE</Button>
          </div>
        </div>
      }
    >
      <div className="mb-6">
        <p className="text-[#B5B5B5] text-xs font-bold uppercase tracking-widest mb-1">
          Produto selecionado
        </p>
        <p className="text-white text-lg font-bold">{item.product}</p>
        <p className="text-[#777] text-xs font-mono mt-1">LOTE: {item.batch}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-black text-[#777] tracking-tighter">
            Quantidade em Caixas
          </label>
          <input
            type="number"
            value={qtyBox}
            onChange={(e) => setQtyBox(Number(e.target.value))}
            className="bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl h-14 px-4 text-white focus:border-[#22C55E] outline-none font-mono text-xl transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-black text-[#777] tracking-tighter">
            Unidades Avulsas
          </label>
          <input
            type="number"
            value={qtyUnit}
            onChange={(e) => setQtyUnit(Number(e.target.value))}
            className="bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl h-14 px-4 text-white focus:border-[#22C55E] outline-none font-mono text-xl transition-colors"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-[#1F1F1F] rounded-xl border border-[#3A3A3A] border-dashed">
        <p className="text-[10px] text-[#777] uppercase font-bold text-center">
          O ajuste manual deve ser usado apenas para correções de inventário.
        </p>
      </div>
    </Modal>
  )
}
