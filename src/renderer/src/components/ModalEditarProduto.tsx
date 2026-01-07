import { JSX, useState } from 'react'

interface ProdutoParaEditar {
  nome: string
  codigo: string
  estoque: number
  minimo: number
  status: 'Ativo' | 'Inativo'
}

interface ModalEditarProdutoProps {
  isOpen: boolean
  onClose: () => void
  produto: ProdutoParaEditar | null
}

export default function ModalEditarProduto({
  isOpen,
  onClose,
  produto
}: ModalEditarProdutoProps): JSX.Element | null {
  const [nome, setNome] = useState(produto?.nome || '')
  const [codigo, setCodigo] = useState(produto?.codigo || '')
  const [minimo, setMinimo] = useState(produto?.minimo || 0)
  const [status, setStatus] = useState<'Ativo' | 'Inativo'>(produto?.status || 'Ativo')

  if (!isOpen || !produto) return null

  const handleSalvar = (): void => {
    console.log('Alterações salvas:', { nome, codigo, minimo, status })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm animate-in fade-in duration-300 font-inter">
      <div className="w-250 bg-[#2A2A2A] rounded-2xl shadow-2xl flex flex-col border border-[#3A3A3A] overflow-hidden">
        {/* Header */}
        <div className="px-10 py-8 border-b border-[#3A3A3A] flex justify-between items-center bg-[#252525]">
          <div>
            <h3 className="text-white text-2xl font-bold">Editar Produto</h3>
            <p className="text-[#777] text-xs mt-1 font-mono uppercase tracking-widest">
              ID: {produto.codigo}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#777] hover:text-white text-xl transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Formulário */}
        <div className="p-10 grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
                Nome do Produto
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e): void => setNome(e.target.value)}
                className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm outline-none focus:border-[#22C55E] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
                  Código de Barras
                </label>
                <input
                  type="text"
                  value={codigo}
                  onChange={(e): void => setCodigo(e.target.value)}
                  className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm font-mono outline-none focus:border-[#22C55E]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
                  Categoria
                </label>
                <select className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm outline-none focus:border-[#22C55E]">
                  <option>Cervejas</option>
                  <option>Refrigerantes</option>
                  <option>Águas</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
                  Estoque Mínimo
                </label>
                <input
                  type="number"
                  value={minimo}
                  onChange={(e): void => setMinimo(Number(e.target.value))}
                  className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm outline-none focus:border-[#22C55E]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
                  Status do Item
                </label>
                <div className="w-48 h-12 bg-[#1F1F1F] rounded-xl relative flex items-center p-1 border border-[#3A3A3A] overflow-hidden">
                  <div
                    className={`absolute h-10 w-[calc(50%-4px)] rounded-lg transition-all duration-300 ${
                      status === 'Ativo'
                        ? 'bg-[#22C55E] translate-x-0'
                        : 'bg-red-500 translate-x-full'
                    }`}
                  />
                  <button
                    onClick={(): void => setStatus('Ativo')}
                    className={`relative z-10 flex-1 text-[10px] font-black uppercase transition-colors duration-300 ${status === 'Ativo' ? 'text-white' : 'text-[#555]'}`}
                  >
                    Ativo
                  </button>
                  <button
                    onClick={(): void => setStatus('Inativo')}
                    className={`relative z-10 flex-1 text-[10px] font-black uppercase transition-colors duration-300 ${status === 'Inativo' ? 'text-white' : 'text-[#555]'}`}
                  >
                    Inativo
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#1F1F1F] rounded-xl border border-[#3A3A3A] flex justify-between items-center">
              <span className="text-[#777] text-xs font-bold uppercase tracking-widest">
                Estoque Atual
              </span>
              <span className="text-white font-mono text-xl font-bold">
                {produto.estoque} unidades
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-[#252525] border-t border-[#3A3A3A] flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-8 h-12 text-[#B5B5B5] font-bold uppercase text-xs hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            className="px-12 h-12 bg-[#22C55E] hover:bg-green-600 rounded-xl text-white font-black uppercase text-xs shadow-lg shadow-green-900/20 transition-all active:scale-95"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  )
}
