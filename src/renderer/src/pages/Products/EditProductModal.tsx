import { JSX, useState } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Button } from '../../components/ui/Button'
import { Product } from '../../types/product'

interface EditProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

export default function EditProductModal({
  isOpen,
  onClose,
  product
}: EditProductModalProps): JSX.Element | null {
  const [name, setName] = useState(product?.name || '')
  const [code, setCode] = useState(product?.code || '')
  const [minStock, setMinStock] = useState(product?.minStock || 0)
  const [status, setStatus] = useState<'Ativo' | 'Inativo'>(product?.status || 'Ativo')

  if (!product) return null

  const handleUpdate = (): void => {
    // setItems/update logic
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Produto"
      width="w-250"
      footer={
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-8 h-12 text-[#B5B5B5] font-bold uppercase text-xs hover:text-white transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <div className="w-56">
            <Button onClick={handleUpdate}>SALVAR ALTERAÇÕES</Button>
          </div>
        </div>
      }
    >
      <div className="mb-6">
        <p className="text-[#777] text-xs font-mono uppercase tracking-widest">
          ID/CÓDIGO: {product.code}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
              Nome do Produto
            </label>
            <input
              type="text"
              value={name}
              onChange={(e): void => setName(e.target.value)}
              className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm outline-none focus:border-[#22C55E]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
                Código de Barras
              </label>
              <input
                type="text"
                value={code}
                onChange={(e): void => setCode(e.target.value)}
                className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm font-mono outline-none focus:border-[#22C55E]"
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
                value={minStock}
                onChange={(e): void => setMinStock(Number(e.target.value))}
                className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-sm outline-none focus:border-[#22C55E]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
                Status do Item
              </label>
              <div className="w-full h-12 bg-[#1F1F1F] rounded-xl relative flex items-center p-1 border border-[#3A3A3A] overflow-hidden">
                <div
                  className={`absolute h-10 w-[calc(50%-4px)] rounded-lg transition-all duration-300 ${
                    status === 'Ativo'
                      ? 'bg-[#22C55E] translate-x-0'
                      : 'bg-red-500 translate-x-[calc(100%+4px)]'
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

          <div className="p-4 bg-[#1F1F1F] rounded-xl border border-[#3A3A3A] flex justify-between items-center">
            <span className="text-[#777] text-xs font-bold uppercase tracking-widest">
              Estoque Atual
            </span>
            <span className="text-white font-mono text-xl font-bold">{product.stock} unidades</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
