/* eslint-disable prettier/prettier */
import { JSX, useState, useEffect, useRef } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Button } from '../../components/ui/Button'
import { PurchaseItem } from '../../types/purchase'

type PaymentMethod = 'PIX' | 'Card' | 'Cash' | 'Billet'

interface NewPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewPurchaseModal({ isOpen, onClose }: NewPurchaseModalProps): JSX.Element | null {
  const [items, setItems] = useState<PurchaseItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PIX')
  const [supplier, setSupplier] = useState('')
  const [isNewSupplier, setIsNewSupplier] = useState(false)
  const [barcode, setBarcode] = useState('')
  
  const inputScannerRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputScannerRef.current?.focus(), 100)
      return (): void => clearTimeout(timer)
    }
    return undefined
  }, [isOpen])

  const totalPurchase = items.reduce((acc, item) => acc + item.subtotal, 0)

  const handleFinish = (): void => {
    setItems([])
    onClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Nova Entrada de Estoque"
      footer={
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[#777] text-[10px] uppercase font-bold tracking-widest mb-1">Valor Total</p>
            <p className="text-[#22C55E] text-4xl font-bold font-mono">
              R$ {totalPurchase.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={onClose} className="w-40 h-14 text-[#B5B5B5] font-bold uppercase text-xs cursor-pointer">
              Cancelar
            </button>
            <div className="w-72">
               <Button onClick={handleFinish} disabled={!supplier || items.length === 0}>
                 FINALIZAR ENTRADA
               </Button>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">Fornecedor</label>
              <button 
                onClick={(): void => setIsNewSupplier(!isNewSupplier)}
                className="text-[#22C55E] text-[9px] font-black uppercase hover:underline cursor-pointer"
              >
                {isNewSupplier ? 'Selecionar da Lista' : '+ Novo Fornecedor'}
              </button>
            </div>
            <input
              type="text"
              value={supplier}
              onChange={(e): void => setSupplier(e.target.value)}
              className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-xs outline-none"
              placeholder={isNewSupplier ? "Nome do novo fornecedor..." : "Buscar fornecedor..."}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">Pagamento</label>
            <select
              value={paymentMethod}
              onChange={(e): void => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-xs outline-none"
            >
              <option value="PIX">PIX</option>
              <option value="Card">Cartão</option>
              <option value="Cash">Dinheiro</option>
              <option value="Billet">Boleto</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#22C55E] text-[10px] font-bold uppercase tracking-widest">Leitor Status: Ativo</label>
            <input
              ref={inputScannerRef}
              type="text"
              value={barcode}
              onChange={(e): void => setBarcode(e.target.value)}
              className="w-full h-12 bg-[#1F1F1F] border-2 border-[#22C55E]/50 rounded-xl px-6 text-white text-sm font-mono outline-none"
              placeholder="Bipar código de barras..."
            />
          </div>
        </div>

        <div className="bg-[#1F1F1F]/40 rounded-2xl border border-[#3A3A3A] overflow-hidden min-h-90 flex flex-col">
          <div className="h-10 bg-[#1F1F1F] flex items-center px-8 text-[#777] text-[9px] font-bold uppercase tracking-widest border-b border-[#3A3A3A]">
            <span className="w-80">Produto</span>
            <span className="w-24 text-center">Unidade</span>
            <span className="w-20 text-center">Qtd</span>
            <span className="w-32 text-center">Custo Unit.</span>
            <span className="flex-1 text-right">Subtotal</span>
          </div>
          <div className="flex-1 p-4 flex items-center justify-center text-[#444] text-xs italic">
            {items.length === 0 ? "Nenhum item adicionado. Use o leitor ou busque manualmente." : "Itens da lista aqui..."}
          </div>
        </div>
      </div>
    </Modal>
  )
}