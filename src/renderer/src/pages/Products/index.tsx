/* eslint-disable prettier/prettier */
import { JSX, useState } from 'react'
import { Sidebar, PageName } from '../../components/layout/Sidebar'
import { Header } from '../../components/layout/Header'
import { Button } from '../../components/ui/Button'
import { Product } from '../../types/product'
import NewProductModal from './NewProductModal'
import EditProductModal from './EditProductModal'

interface ProductsProps {
  onLogout: () => void
  onNavigate: (page: PageName) => void
}

export default function Products({ onLogout, onNavigate }: ProductsProps): JSX.Element {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState<Product | null>(null)
  const [search, setSearch] = useState('')

  const handleOpenEdit = (product: Product): void => {
    setProductToEdit(product)
    setIsEditModalOpen(true)
  }

  // Dados Mockados para exibição
  const PRODUCTS_MOCK: Product[] = [
    { name: "Cerveja Lata 350ml", code: "789123456", stock: 120, minStock: 50, status: 'Ativo' },
    { name: "Refrigerante 2L", code: "789987654", stock: 20, minStock: 40, status: 'Ativo' },
    { name: "Água Mineral 500ml", code: "789987111", stock: 200, minStock: 100, status: 'Ativo' }
  ]

  return (
    <div className="min-w-screen min-h-screen overflow-hidden relative bg-[#1F1F1F]">
      <Sidebar activePage="produtos" onLogout={onLogout} onNavigate={onNavigate} />
      <Header title="Produtos" />

      <main className="absolute left-65 top-16 w-[calc(100%-260px)] h-[calc(100vh-64px)] overflow-y-auto p-10 flex flex-col gap-6 custom-scrollbar">
        <div className="flex justify-between items-center w-full">
          <input
            type="text"
            value={search}
            onChange={(e): void => setSearch(e.target.value)}
            placeholder="Buscar produto por nome ou código"
            className="w-105 h-10 bg-[#1F1F1F] border border-[#3A3A3A] rounded-lg px-4 text-xs text-[#B5B5B5] focus:outline-none focus:border-[#22C55E] transition-colors placeholder:text-[#555]"
          />

          <div className="w-48">
            <Button onClick={(): void => setIsNewModalOpen(true)}>
              + NOVO PRODUTO
            </Button>
          </div>
        </div>

        <div className="flex-1 bg-[#2A2A2A] rounded-2xl p-8 border border-[#3A3A3A] shadow-2xl flex flex-col overflow-hidden">
          <div className="flex text-[#777] text-[10px] mb-6 px-4 uppercase tracking-[0.2em] font-black border-b border-[#3A3A3A] pb-4">
            <span className="flex-1">Produto</span>
            <span className="w-45">Código</span>
            <span className="w-35 text-center">Estoque</span>
            <span className="w-35 text-center">Mínimo</span>
            <span className="w-35 text-center">Status</span>
            <span className="w-24 text-right pr-4">Ações</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {PRODUCTS_MOCK.map((product) => (
              <TableRow 
                key={product.code} 
                product={product} 
                onEdit={handleOpenEdit} 
              />
            ))}
          </div>
        </div>
      </main>

      <NewProductModal 
        isOpen={isNewModalOpen} 
        onClose={(): void => setIsNewModalOpen(false)} 
      />

      <EditProductModal
        key={productToEdit?.code || 'edit-modal'}
        isOpen={isEditModalOpen}
        onClose={(): void => {
          setIsEditModalOpen(false)
          setProductToEdit(null)
        }}
        product={productToEdit}
      />
    </div>
  )
}

/* Componente Interno TableRow */
interface TableRowProps {
  product: Product
  onEdit: (product: Product) => void
}

function TableRow({ product, onEdit }: TableRowProps): JSX.Element {
  const isLowStock = product.stock <= product.minStock

  return (
    <div className="flex items-center w-full h-16 bg-[#1F1F1F] rounded-xl px-6 hover:bg-[#252525] transition-all group border border-transparent hover:border-[#3A3A3A]">
      <span className="flex-1 text-white font-inter text-sm font-semibold truncate pr-4">
        {product.name}
      </span>
      <span className="w-45 text-[#777] font-mono text-sm">{product.code}</span>
      <span className={`w-35 text-center font-mono text-base font-bold ${isLowStock ? 'text-red-500' : 'text-white'}`}>
        {product.stock}
      </span>
      <span className="w-35 text-center text-[#777] font-mono text-sm">{product.minStock}</span>
      <span className="w-35 text-center">
        <span className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-tighter ${
          product.status === 'Ativo' 
            ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20' 
            : 'bg-red-500/10 text-red-500 border border-red-500/20'
        }`}>
          {product.status}
        </span>
      </span>
      <div className="w-24 text-right">
        <button
          onClick={(): void => onEdit(product)}
          className="bg-[#3A3A3A] text-white px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Editar
        </button>
      </div>
    </div>
  )
}