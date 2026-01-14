import { JSX } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Purchase } from '../../types/purchase'

interface PurchaseDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  purchase: Purchase | null
}

export default function PurchaseDetailsModal({
  isOpen,
  onClose,
  purchase
}: PurchaseDetailsModalProps): JSX.Element | null {
  if (!purchase) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalhes da Compra - #${purchase.id}`}
      width="w-200"
    >
      <div className="space-y-6">
        {/* Informações Cabeçalho */}
        <div className="grid grid-cols-2 gap-4 bg-[#1F1F1F] p-4 rounded-xl border border-[#3A3A3A]">
          <div>
            <p className="text-[#777] text-[10px] uppercase font-black tracking-widest">
              Fornecedor
            </p>
            <p className="text-white text-sm font-bold uppercase">{purchase.supplier}</p>
          </div>
          <div>
            <p className="text-[#777] text-[10px] uppercase font-black tracking-widest">
              Data da Entrada
            </p>
            <p className="text-white text-sm font-mono">{purchase.date}</p>
          </div>
        </div>

        {/* Listagem de Itens */}
        <div className="space-y-2">
          <p className="text-[#777] text-[10px] uppercase font-black tracking-widest px-2">
            Itens da Nota
          </p>
          <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar pr-1">
            {purchase.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[#1F1F1F] p-4 rounded-xl border border-[#3A3A3A]/50"
              >
                <div>
                  <p className="text-white text-sm font-bold uppercase">{item.product}</p>
                  <p className="text-[#777] text-xs">
                    {item.quantity} {item.unit} × R$ {item.unitPrice.toFixed(2)}
                  </p>
                </div>
                <p className="text-[#22C55E] font-black font-mono">R$ {item.subtotal.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé com Totalizadores */}
        <div className="pt-4 border-t border-[#3A3A3A] flex justify-between items-center">
          <p className="text-white font-black uppercase text-xs tracking-widest">
            Valor Total da Compra
          </p>
          <p className="text-[#22C55E] text-2xl font-black font-mono">{purchase.totalValue}</p>
        </div>
      </div>
    </Modal>
  )
}
