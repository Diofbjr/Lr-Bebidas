import { JSX, useState } from 'react'
import Sidebar, { PageName } from './Sidebar'
import ModalNovaCompra from './ModalNovaCompra'
import ModalDetalhesCompra from './ModalDetalhesCompra'

interface ComprasProps {
  onLogout: () => void
  onNavigate: (page: PageName) => void
}

interface ItemDetalhe {
  produto: string
  quantidade: number
  unidade: string
  precoUnitario: number
  subtotal: number
}

interface Compra {
  id: string
  data: string
  fornecedor: string
  valorTotal: string
  itens: ItemDetalhe[]
}

const COMPRAS_REALIZADAS: Compra[] = [
  {
    id: '1',
    data: '05/01/2026',
    fornecedor: 'Ambev Distribuidora',
    valorTotal: 'R$ 2.450,00',
    itens: [
      {
        produto: 'Cerveja Pilsen 350ml',
        quantidade: 10,
        unidade: 'Caixa',
        precoUnitario: 45.0,
        subtotal: 450.0
      },
      {
        produto: 'Brahma Duplo Malte',
        quantidade: 20,
        unidade: 'Caixa',
        precoUnitario: 50.0,
        subtotal: 1000.0
      },
      {
        produto: 'Skol Lata 269ml',
        quantidade: 20,
        unidade: 'Caixa',
        precoUnitario: 50.0,
        subtotal: 1000.0
      }
    ]
  },
  {
    id: '2',
    data: '02/01/2026',
    fornecedor: 'Coca-Cola Brasil',
    valorTotal: 'R$ 1.180,00',
    itens: [
      {
        produto: 'Refrigerante Cola 2L',
        quantidade: 100,
        unidade: 'Unidade',
        precoUnitario: 7.2,
        subtotal: 720.0
      },
      {
        produto: 'Água Mineral 500ml',
        quantidade: 255,
        unidade: 'Unidade',
        precoUnitario: 1.8,
        subtotal: 460.0
      }
    ]
  }
]

export default function Compras({ onLogout, onNavigate }: ComprasProps): JSX.Element {
  const [isModalNovaCompraOpen, setIsModalNovaCompraOpen] = useState(false)
  const [isModalDetalhesOpen, setIsModalDetalhesOpen] = useState(false)
  const [compraSelecionada, setCompraSelecionada] = useState<Compra | null>(null)

  // CORREÇÃO: Adicionado o tipo de retorno ': void'
  const handleVerDetalhes = (compra: Compra): void => {
    setCompraSelecionada(compra)
    setIsModalDetalhesOpen(true)
  }

  return (
    <div className="min-w-screen min-h-screen overflow-hidden relative bg-[#1F1F1F]">
      <Sidebar activePage="compras" onLogout={onLogout} onNavigate={onNavigate} />

      <header className="absolute left-65 top-0 w-[calc(100%-260px)] h-16 flex items-center px-10 border-b border-[#3A3A3A] bg-[#1F1F1F] z-10">
        <h2 className="text-white font-inter text-2xl font-bold">Compras</h2>
      </header>

      <main className="absolute left-65 top-16 w-[calc(100%-260px)] h-[calc(100vh-64px)] overflow-y-auto p-10 flex flex-col gap-6 custom-scrollbar">
        <div className="flex justify-end items-center w-full">
          <button
            onClick={(): void => setIsModalNovaCompraOpen(true)}
            className="h-11 px-8 bg-[#22C55E] hover:bg-green-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2 transition-all active:scale-95"
          >
            <span>+ Nova Compra</span>
          </button>
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
            {COMPRAS_REALIZADAS.map((compra) => (
              <div
                key={compra.id}
                className="flex items-center w-full h-16 bg-[#1F1F1F] rounded-xl px-6 hover:bg-[#252525] transition-all group border border-transparent hover:border-[#3A3A3A]"
              >
                <span className="w-48 text-[#B5B5B5] font-mono text-sm">{compra.data}</span>
                <span className="flex-1 text-white font-inter text-sm font-semibold">
                  {compra.fornecedor}
                </span>
                <span className="w-35 text-center text-[#777] font-inter text-sm font-bold">
                  {compra.itens.length}
                </span>
                <span className="w-45 text-center text-[#22C55E] font-mono text-base font-bold">
                  {compra.valorTotal}
                </span>
                <div className="w-24 text-right">
                  <button
                    onClick={(): void => handleVerDetalhes(compra)}
                    className="bg-[#3A3A3A] text-white px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase hover:bg-[#22C55E] transition-colors"
                  >
                    Ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ModalNovaCompra
        isOpen={isModalNovaCompraOpen}
        onClose={(): void => setIsModalNovaCompraOpen(false)}
      />

      <ModalDetalhesCompra
        isOpen={isModalDetalhesOpen}
        onClose={(): void => setIsModalDetalhesOpen(false)}
        compra={compraSelecionada}
      />
    </div>
  )
}
