/* eslint-disable prettier/prettier */
import { JSX } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Purchase } from '../../types/purchase'

interface PurchaseDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  purchase: Purchase | null
}

export default function PurchaseDetailsModal({ isOpen, onClose, purchase }: PurchaseDetailsModalProps): JSX.Element | null {
  if (!purchase) return null

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Purchase Details - #${purchase.id}`}
      width="w-200"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 bg-[#1F1F1F] p-4 rounded-xl border border-[#3A3A3A]">
          <div>
            <p className="text-[#777] text-[10px] uppercase font-bold">Supplier</p>
            <p className="text-white text-sm font-bold">{purchase.supplier}</p>
          </div>
          <div>
            <p className="text-[#777] text-[10px] uppercase font-bold">Date</p>
            <p className="text-white text-sm font-mono">{purchase.date}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[#777] text-[10px] uppercase font-bold px-2">Items List</p>
          <div className="space-y-2">
            {purchase.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-[#1F1F1F] p-4 rounded-xl border border-[#3A3A3A]/50">
                <div>
                  <p className="text-white text-sm font-semibold">{item.product}</p>
                  <p className="text-[#777] text-xs">{item.quantity} {item.unit} x R$ {item.unitPrice.toFixed(2)}</p>
                </div>
                <p className="text-[#22C55E] font-bold font-mono">R$ {item.subtotal.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#3A3A3A] flex justify-between items-center">
          <p className="text-white font-bold uppercase text-xs">Total Purchase</p>
          <p className="text-[#22C55E] text-2xl font-bold font-mono">{purchase.totalValue}</p>
        </div>
      </div>
    </Modal>
  )
}