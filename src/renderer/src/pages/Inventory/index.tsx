/* eslint-disable prettier/prettier */
import { JSX, useState } from 'react'
import { Sidebar, PageName } from '../../components/layout/Sidebar'
import { Header } from '../../components/layout/Header'
import StockAdjustmentModal from './StockAdjustmentModal'

export interface InventoryItem {
  id: string
  product: string
  batch: string
  expiry: string
  qtyBox: number
  qtyUnit: number
  status: 'OK' | 'Atenção' | 'Vencido'
}

export default function Inventory({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (page: PageName) => void }): JSX.Element {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: '1',
      product: 'Cerveja Pilsen 350ml',
      batch: 'L2025-01',
      expiry: '12/2025',
      qtyBox: 48,
      qtyUnit: 576,
      status: 'OK'
    },
    {
      id: '2',
      product: 'Refrigerante Cola 2L',
      batch: 'L2024-09',
      expiry: '02/2025',
      qtyBox: 12,
      qtyUnit: 72,
      status: 'Atenção'
    },
    {
      id: '3',
      product: 'Água Mineral 500ml',
      batch: 'L2024-05',
      expiry: '08/2024',
      qtyBox: 0,
      qtyUnit: 18,
      status: 'Vencido'
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)

  const handleSaveAdjustment = (id: string, newQtys: { qtyBox: number; qtyUnit: number }): void => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qtyBox: newQtys.qtyBox, qtyUnit: newQtys.qtyUnit } : item
      )
    )
    setIsModalOpen(false)
  }

  const getStatusColor = (status: string): string => {
    if (status === 'OK') return 'text-[#22C55E]'
    if (status === 'Atenção') return 'text-[#FACC15]'
    return 'text-[#EF4444]'
  }

  return (
    <div className="min-w-screen min-h-screen bg-[#1F1F1F] font-inter relative overflow-hidden text-white">
      <Sidebar activePage="estoque" onLogout={onLogout} onNavigate={onNavigate} />
      <Header title="Estoque por Lote" />

      <main className="absolute left-65 top-16 w-[calc(100%-260px)] h-[calc(100vh-64px)] p-10 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar por produto ou lote..."
            className="w-80 h-10 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 text-xs outline-none focus:border-[#22C55E] transition-colors"
          />
        </div>

        <div className="flex flex-col border border-[#3A3A3A] rounded-xl overflow-hidden shadow-lg bg-[#2A2A2A]">
          {/* Table Header */}
          <div className="h-12 bg-[#252525] flex items-center px-6 text-[#777] text-[10px] font-bold uppercase tracking-widest border-b border-[#3A3A3A]">
            <span className="flex-1">Produto</span>
            <span className="w-32 text-center">Lote</span>
            <span className="w-32 text-center">Validade</span>
            <span className="w-24 text-center">Caixas</span>
            <span className="w-24 text-center">Unidades</span>
            <span className="w-32 text-center">Status</span>
            <span className="w-32 text-right">Ações</span>
          </div>

          {/* Table Body */}
          <div className="flex flex-col divide-y divide-[#3A3A3A]">
            {items.map((item) => (
              <div
                key={item.id}
                className="h-14 flex items-center px-6 hover:bg-[#2F2F2F] transition-colors text-sm"
              >
                <span className="flex-1 font-medium">{item.product}</span>
                <span className="w-32 text-center text-[#B5B5B5] font-mono text-xs">{item.batch}</span>
                <span className={`w-32 text-center font-bold ${getStatusColor(item.status)}`}>
                  {item.expiry}
                </span>
                <span className="w-24 text-center font-mono">{item.qtyBox}</span>
                <span className="w-24 text-center font-mono">{item.qtyUnit}</span>
                <span className={`w-32 text-center text-[10px] font-black uppercase ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
                <div className="w-32 text-right flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedItem(item)
                      setIsModalOpen(true)
                    }}
                    className="text-[#3B82F6] hover:text-blue-400 font-bold uppercase text-[10px] tracking-widest cursor-pointer transition-colors"
                  >
                    Ajustar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <StockAdjustmentModal
        key={selectedItem?.id || 'stock-modal'}
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAdjustment}
      />
    </div>
  )
}