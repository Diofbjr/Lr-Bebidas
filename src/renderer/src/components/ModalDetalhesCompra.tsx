import { JSX } from 'react'

interface ItemDetalhe {
  produto: string
  quantidade: number
  unidade: string
  precoUnitario: number
  subtotal: number
}

interface ModalDetalhesCompraProps {
  isOpen: boolean
  onClose: () => void
  compra: {
    data: string
    fornecedor: string
    valorTotal: string
    itens: ItemDetalhe[]
  } | null
}

export default function ModalDetalhesCompra({
  isOpen,
  onClose,
  compra
}: ModalDetalhesCompraProps): JSX.Element | null {
  if (!isOpen || !compra) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm animate-in fade-in duration-300 font-inter">
      <div className="w-220 bg-[#2A2A2A] rounded-2xl shadow-2xl flex flex-col border border-[#3A3A3A] overflow-hidden">
        {/* Header */}
        <div className="px-10 py-6 border-b border-[#3A3A3A] flex justify-between items-center bg-[#252525]">
          <div>
            <h3 className="text-white text-xl font-bold">Detalhes da Entrada</h3>
            <p className="text-[#777] text-xs mt-1">Realizada em {compra.data}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#777] hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        {/* Informações Principais */}
        <div className="p-10 space-y-8">
          <div className="flex justify-between items-end bg-[#1F1F1F] p-6 rounded-xl border border-[#3A3A3A]">
            <div>
              <p className="text-[#777] text-[10px] font-bold uppercase tracking-widest mb-1">
                Fornecedor
              </p>
              <p className="text-white text-lg font-bold">{compra.fornecedor}</p>
            </div>
            <div className="text-right">
              <p className="text-[#777] text-[10px] font-bold uppercase tracking-widest mb-1">
                Valor Total da Nota
              </p>
              <p className="text-[#22C55E] text-2xl font-mono font-bold">{compra.valorTotal}</p>
            </div>
          </div>

          {/* Tabela de Itens */}
          <div className="space-y-4">
            <h4 className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
              Produtos Comprados
            </h4>
            <div className="rounded-xl border border-[#3A3A3A] overflow-hidden">
              <div className="h-10 bg-[#1F1F1F] flex items-center px-6 text-[#777] text-[9px] font-bold uppercase border-b border-[#3A3A3A]">
                <span className="flex-1">Produto</span>
                <span className="w-24 text-center">Qtd</span>
                <span className="w-32 text-right">Subtotal</span>
              </div>
              <div className="max-h-60 overflow-y-auto custom-scrollbar">
                {compra.itens.map((item, index) => (
                  <div
                    key={index}
                    className="h-12 flex items-center px-6 text-sm border-b border-[#333] last:border-0 hover:bg-[#252525]"
                  >
                    <span className="flex-1 text-white font-medium">{item.produto}</span>
                    <span className="w-24 text-center text-[#B5B5B5] font-mono">
                      {item.quantidade} <span className="text-[10px]">{item.unidade}</span>
                    </span>
                    <span className="w-32 text-right text-white font-mono font-bold">
                      R$ {item.subtotal.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-6 bg-[#252525] border-t border-[#3A3A3A] flex justify-end">
          <button
            onClick={onClose}
            className="px-8 h-11 bg-[#3A3A3A] hover:bg-[#444] text-white rounded-lg text-xs font-bold uppercase transition-all"
          >
            Fechar Detalhes
          </button>
        </div>
      </div>
    </div>
  )
}
