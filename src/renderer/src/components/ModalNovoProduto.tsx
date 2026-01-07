import { JSX, useState } from 'react'

interface ModalNovoProdutoProps {
  isOpen: boolean
  onClose: () => void
}

export default function ModalNovoProduto({
  isOpen,
  onClose
}: ModalNovoProdutoProps): JSX.Element | null {
  const [status, setStatus] = useState<'Ativo' | 'Inativo'>('Ativo')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm animate-in fade-in duration-300 font-inter">
      <div className="w-250 bg-[#2A2A2A] rounded-2xl shadow-2xl flex flex-col border border-[#3A3A3A] overflow-hidden">
        <div className="px-10 py-8 border-b border-[#3A3A3A] flex justify-between items-center bg-[#252525]">
          <h3 className="text-white text-2xl font-bold">Cadastrar Novo Produto</h3>
          <button onClick={onClose} className="text-[#777] hover:text-white text-xl">
            ✕
          </button>
        </div>

        <div className="p-10 grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
                Nome do Produto
              </label>
              <input
                type="text"
                className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm outline-none focus:border-[#22C55E]"
                placeholder="Ex: Heineken 600ml"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
                  Código de Barras
                </label>
                <input
                  type="text"
                  className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm font-mono outline-none focus:border-[#22C55E]"
                  placeholder="789..."
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
                  Categoria
                </label>
                <select className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm outline-none">
                  <option>Cervejas</option>
                  <option>Refrigerantes</option>
                  <option>Águas</option>
                  <option>Destilados</option>
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
                  className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm outline-none focus:border-[#22C55E]"
                  placeholder="12"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
                  Status do Item
                </label>
                <div className="w-50 h-12 bg-[#1F1F1F] rounded-xl relative flex items-center p-1 border border-[#3A3A3A]">
                  <div
                    className={`absolute h-10 w-24 bg-[#22C55E] rounded-lg transition-transform duration-300 ${
                      status === 'Ativo' ? 'translate-x-0' : 'translate-x-38.5'
                    }`}
                  />
                  <button
                    onClick={(): void => setStatus('Ativo')}
                    className={`relative z-10 flex-1 text-[10px] font-black uppercase transition-colors ${status === 'Ativo' ? 'text-white' : 'text-[#555]'}`}
                  >
                    Ativo
                  </button>
                  <button
                    onClick={(): void => setStatus('Inativo')}
                    className={`relative z-10 flex-1 text-[10px] font-black uppercase transition-colors ${status === 'Inativo' ? 'text-white' : 'text-[#555]'}`}
                  >
                    Inativo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-10 py-8 bg-[#252525] border-t border-[#3A3A3A] flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-8 h-12 text-[#B5B5B5] font-bold uppercase text-xs hover:text-white transition-colors"
          >
            Descartar
          </button>
          <button className="px-12 h-12 bg-[#22C55E] hover:bg-green-600 rounded-xl text-white font-black uppercase text-xs shadow-lg transition-all">
            Salvar Produto
          </button>
        </div>
      </div>
    </div>
  )
}
