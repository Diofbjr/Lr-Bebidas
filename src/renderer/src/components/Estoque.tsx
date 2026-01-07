import { JSX, useState } from 'react'
import Sidebar, { PageName } from './Sidebar'
import ModalAjusteEstoque from './ModalAjusteEstoque'

interface EstoqueProps {
  onLogout: () => void
  onNavigate: (page: PageName) => void
}

export interface ItemEstoque {
  id: string
  produto: string
  lote: string
  validade: string
  qtdCx: number
  qtdUn: number
  status: 'OK' | 'Atenção' | 'Vencido'
}

export default function Estoque({ onLogout, onNavigate }: EstoqueProps): JSX.Element {
  const [itens, setItens] = useState<ItemEstoque[]>([
    {
      id: '1',
      produto: 'Cerveja Pilsen 350ml',
      lote: 'L2025-01',
      validade: '12/2025',
      qtdCx: 48,
      qtdUn: 576,
      status: 'OK'
    },
    {
      id: '2',
      produto: 'Refrigerante Cola 2L',
      lote: 'L2024-09',
      validade: '02/2025',
      qtdCx: 12,
      qtdUn: 72,
      status: 'Atenção'
    },
    {
      id: '3',
      produto: 'Água Mineral 500ml',
      lote: 'L2024-05',
      validade: '08/2024',
      qtdCx: 0,
      qtdUn: 18,
      status: 'Vencido'
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ItemEstoque | null>(null)

  // Agora utilizamos o setItens para atualizar a lista localmente
  const handleSaveAjuste = (id: string, novasQtds: { qtdCx: number; qtdUn: number }): void => {
    setItens((prevItens) =>
      prevItens.map((item) =>
        item.id === id ? { ...item, qtdCx: novasQtds.qtdCx, qtdUn: novasQtds.qtdUn } : item
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

      <header className="absolute left-65 top-0 w-[calc(100%-260px)] h-16 flex items-center px-10 border-b border-[#3A3A3A] bg-[#1F1F1F] z-10">
        <h2 className="text-2xl font-bold">Estoque</h2>
      </header>

      <main className="absolute left-65 top-16 w-[calc(100%-260px)] h-[calc(100vh-64px)] p-10 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar produto"
            className="w-70 h-10 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 text-xs outline-none focus:border-[#22C55E] transition-colors"
          />
        </div>

        <div className="flex flex-col border border-[#3A3A3A] rounded-xl overflow-hidden shadow-lg bg-[#2A2A2A]">
          <div className="h-12 bg-[#252525] flex items-center px-6 text-[#777] text-[10px] font-bold uppercase tracking-widest">
            <span className="flex-1">Produto</span>
            <span className="w-32 text-center">Lote</span>
            <span className="w-32 text-center">Validade</span>
            <span className="w-24 text-center">Qtd (Cx)</span>
            <span className="w-24 text-center">Qtd (Un)</span>
            <span className="w-32 text-center">Status</span>
            <span className="w-32 text-right">Ações</span>
          </div>

          <div className="flex flex-col divide-y divide-[#3A3A3A]">
            {itens.map((item) => (
              <div
                key={item.id}
                className="h-14 flex items-center px-6 hover:bg-[#2F2F2F] transition-colors text-sm"
              >
                <span className="flex-1 font-medium">{item.produto}</span>
                <span className="w-32 text-center text-[#B5B5B5]">{item.lote}</span>
                <span className={`w-32 text-center font-bold ${getStatusColor(item.status)}`}>
                  {item.validade}
                </span>
                <span className="w-24 text-center">{item.qtdCx}</span>
                <span className="w-24 text-center">{item.qtdUn}</span>
                <span
                  className={`w-32 text-center text-xs font-bold ${getStatusColor(item.status)}`}
                >
                  {item.status}
                </span>
                <div className="w-32 text-right flex justify-end gap-3 font-bold uppercase text-[10px]">
                  <button
                    onClick={() => {
                      setSelectedItem(item)
                      setIsModalOpen(true)
                    }}
                    className="text-[#3B82F6] hover:underline"
                  >
                    Ajustar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ModalAjusteEstoque
        key={selectedItem?.id || 'modal-ajuste'}
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAjuste}
      />
    </div>
  )
}
