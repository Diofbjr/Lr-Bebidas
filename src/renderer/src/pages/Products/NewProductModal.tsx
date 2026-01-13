import { JSX, useState } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Button } from '../../components/ui/Button'

interface NewProductModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewProductModal({
  isOpen,
  onClose
}: NewProductModalProps): JSX.Element | null {
  const [status, setStatus] = useState<'Ativo' | 'Inativo'>('Ativo')
  const [category, setCategory] = useState('Cervejas')

  const handleSave = (): void => {
    // Lógica de salvar via IPC virá aqui futuramente
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar Novo Produto"
      width="w-250"
      footer={
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-8 h-12 text-[#B5B5B5] font-bold uppercase text-xs hover:text-white transition-colors cursor-pointer"
          >
            Descartar
          </button>
          <div className="w-48">
            <Button onClick={handleSave}>SALVAR PRODUTO</Button>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-8">
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
              <select
                value={category}
                onChange={(e): void => setCategory(e.target.value)}
                className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm outline-none"
              >
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
              <div className="w-full h-12 bg-[#1F1F1F] rounded-xl relative flex items-center p-1 border border-[#3A3A3A] overflow-hidden">
                <div
                  className={`absolute h-10 w-[calc(50%-4px)] bg-[#22C55E] rounded-lg transition-transform duration-300 ${
                    status === 'Ativo' ? 'translate-x-0' : 'translate-x-[calc(100%+4px)]'
                  }`}
                />
                <button
                  onClick={(): void => setStatus('Ativo')}
                  className={`relative z-10 flex-1 text-[10px] font-black uppercase transition-colors ${status === 'Ativo' ? 'text-white' : 'text-[#555]'} cursor-pointer`}
                >
                  Ativo
                </button>
                <button
                  onClick={(): void => setStatus('Inativo')}
                  className={`relative z-10 flex-1 text-[10px] font-black uppercase transition-colors ${status === 'Inativo' ? 'text-white' : 'text-[#555]'} cursor-pointer`}
                >
                  Inativo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
