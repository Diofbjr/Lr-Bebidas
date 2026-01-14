import { JSX, useState } from 'react'
import { Sidebar, PageName } from '../../components/layout/Sidebar'
import { Header } from '../../components/layout/Header'
import { Button } from '../../components/ui/Button'
import { Purchase } from '../../types/purchase'
import NewPurchaseModal from './NewPurchaseModal'
import PurchaseDetailsModal from './PurchaseDetailsModal'

const PURCHASES_MOCK: Purchase[] = [
  {
    id: '1',
    date: '05/01/2026',
    supplier: 'Ambev Distribuidora',
    totalValue: 'R$ 2.450,00',
    items: [
      {
        product: 'Cerveja Pilsen 350ml',
        quantity: 10,
        unit: 'Caixa',
        unitPrice: 45.0,
        subtotal: 450.0
      }
    ]
  }
]

interface PurchasesProps {
  onLogout: () => void
  onNavigate: (page: PageName) => void
}

export default function Purchases({ onLogout, onNavigate }: PurchasesProps): JSX.Element {
  const [isNewPurchaseModalOpen, setIsNewPurchaseModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)

  const handleShowDetails = (purchase: Purchase): void => {
    setSelectedPurchase(purchase)
    setIsDetailsModalOpen(true)
  }

  return (
    <div className="min-w-screen min-h-screen overflow-hidden relative bg-[#1F1F1F]">
      <Sidebar activePage="compras" onLogout={onLogout} onNavigate={onNavigate} />
      <Header title="Compras" />

      <main className="absolute left-65 top-16 w-[calc(100%-260px)] h-[calc(100vh-64px)] overflow-y-auto p-10 flex flex-col gap-6 custom-scrollbar">
        <div className="flex justify-end items-center w-full">
          <div className="w-48">
            <Button onClick={(): void => setIsNewPurchaseModalOpen(true)}>+ NOVA COMPRA</Button>
          </div>
        </div>

        <div className="flex-1 bg-[#2A2A2A] rounded-2xl p-8 border border-[#3A3A3A] shadow-2xl flex flex-col overflow-hidden">
          <div className="flex text-[#777] text-[10px] mb-6 px-4 uppercase tracking-[0.2em] font-black border-b border-[#3A3A3A] pb-4">
            <span className="w-48">Data</span>
            <span className="flex-1">Fornecedor</span>
            <span className="w-35 text-center">Itens</span>
            <span className="w-45 text-center">Valor Total</span>
            <span className="w-24 text-right">Ações</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {PURCHASES_MOCK.map((purchase) => (
              <div
                key={purchase.id}
                className="flex items-center w-full h-16 bg-[#1F1F1F] rounded-xl px-6 hover:bg-[#252525] transition-all group border border-transparent hover:border-[#3A3A3A]"
              >
                <span className="w-48 text-[#B5B5B5] font-mono text-sm">{purchase.date}</span>
                <span className="flex-1 text-white font-inter text-sm font-semibold">
                  {purchase.supplier}
                </span>
                <span className="w-35 text-center text-[#777] font-inter text-sm font-bold">
                  {purchase.items.length}
                </span>
                <span className="w-45 text-center text-[#22C55E] font-mono text-base font-bold">
                  {purchase.totalValue}
                </span>
                <div className="w-24 text-right">
                  <button
                    onClick={(): void => handleShowDetails(purchase)}
                    className="bg-[#3A3A3A] text-white px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase hover:bg-[#22C55E] transition-colors cursor-pointer"
                  >
                    Ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <NewPurchaseModal
        isOpen={isNewPurchaseModalOpen}
        onClose={() => setIsNewPurchaseModalOpen(false)}
      />
      <PurchaseDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        purchase={selectedPurchase}
      />
    </div>
  )
}
