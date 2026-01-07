import { JSX, useState } from 'react'

export interface ItemCompra {
  id: string
  produto: string
  quantidade: number
  unidade: string
  precoUnitario: number
  subtotal: number
  validade: string
}

interface ModalAdicionarProdutoProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (item: ItemCompra) => void
}

export default function ModalAdicionarProduto({
  isOpen,
  onClose,
  onAdd
}: ModalAdicionarProdutoProps): JSX.Element | null {
  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState(1)
  const [unidade, setUnidade] = useState('Unidade')
  const [preco, setPreco] = useState(0)
  const [validade, setValidade] = useState('')

  if (!isOpen) return null

  const handleConfirmar = (): void => {
    if (!nome || quantidade <= 0) return

    onAdd({
      id: Math.random().toString(36).substring(2, 9),
      produto: nome,
      quantidade,
      unidade,
      precoUnitario: preco,
      subtotal: quantidade * preco,
      validade
    })

    setNome('')
    setQuantidade(1)
    setPreco(0)
    setValidade('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-140 bg-[#252525] rounded-2xl border border-[#3A3A3A] shadow-2xl overflow-hidden font-inter">
        <div className="px-8 py-6 border-b border-[#3A3A3A] bg-[#1F1F1F]">
          <h4 className="text-white text-lg font-bold">Adicionar Produto Manualmente</h4>
        </div>

        <div className="p-8 space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-[#777] text-[10px] font-bold uppercase tracking-widest">
              Nome do Produto
            </label>
            <input
              autoFocus
              type="text"
              value={nome}
              onChange={(e): void => setNome(e.target.value)}
              className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm outline-none focus:border-[#22C55E]"
              placeholder="Ex: Cerveja Skol 350ml"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[#777] text-[10px] font-bold uppercase tracking-widest">
                Quantidade
              </label>
              <input
                type="number"
                value={quantidade}
                onChange={(e): void => setQuantidade(Number(e.target.value))}
                className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm outline-none focus:border-[#22C55E]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#777] text-[10px] font-bold uppercase tracking-widest">
                Unidade
              </label>
              <select
                value={unidade}
                onChange={(e): void => setUnidade(e.target.value)}
                className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm outline-none"
              >
                <option value="Unidade">Unidade</option>
                <option value="Caixa">Caixa</option>
                <option value="Fardo">Fardo</option>
                <option value="Litro">Litro</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[#777] text-[10px] font-bold uppercase tracking-widest">
                Custo Unitário (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={preco}
                onChange={(e): void => setPreco(Number(e.target.value))}
                className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm outline-none focus:border-[#22C55E]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#22C55E] text-[10px] font-bold uppercase tracking-widest">
                Data de Validade
              </label>
              <input
                type="date"
                value={validade}
                onChange={(e): void => setValidade(e.target.value)}
                className="w-full h-12 bg-[#1F1F1F] border border-[#22C55E]/30 rounded-xl px-4 text-white text-sm outline-none focus:border-[#22C55E] scheme-dark"
              />
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-[#1F1F1F] border-t border-[#3A3A3A] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-12 text-[#777] font-bold uppercase text-xs hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            className="flex-1 h-12 bg-[#22C55E] hover:bg-green-600 rounded-xl text-white font-black uppercase text-xs transition-all"
          >
            Adicionar à Nota
          </button>
        </div>
      </div>
    </div>
  )
}
