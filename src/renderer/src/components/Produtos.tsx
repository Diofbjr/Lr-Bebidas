import { JSX, useState } from 'react'
import Sidebar, { PageName } from './Sidebar'
import ModalNovoProduto from './ModalNovoProduto'
import ModalEditarProduto from './ModalEditarProduto'

// Definição da interface do Produto para facilitar a tipagem
interface Produto {
  nome: string
  codigo: string
  estoque: number
  minimo: number
  status: 'Ativo' | 'Inativo'
}

interface ProdutosProps {
  onLogout: () => void
  onNavigate: (page: PageName) => void
}

interface TableRowProps extends Produto {
  isLowStock?: boolean
  onEdit: (produto: Produto) => void
}

export default function Produtos({ onLogout, onNavigate }: ProdutosProps): JSX.Element {
  const [isModalNovoOpen, setIsModalNovoOpen] = useState(false)
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false)
  const [produtoParaEditar, setProdutoParaEditar] = useState<Produto | null>(null)
  const [busca, setBusca] = useState('')

  // Função para disparar a edição
  const handleAbrirEdicao = (produto: Produto): void => {
    setProdutoParaEditar(produto)
    setIsModalEditarOpen(true)
  }

  return (
    <div className="min-w-screen min-h-screen overflow-hidden relative bg-[#1F1F1F]">
      <Sidebar activePage="produtos" onLogout={onLogout} onNavigate={onNavigate} />

      {/* Header Superior */}
      <header className="absolute left-65 top-0 w-[calc(100%-260px)] h-16 flex items-center px-10 border-b border-[#3A3A3A] bg-[#1F1F1F] z-10">
        <h2 className="text-white font-inter text-2xl font-bold">Produtos</h2>
      </header>

      {/* Container de Conteúdo */}
      <main className="absolute left-65 top-16 w-[calc(100%-260px)] h-[calc(100vh-64px)] overflow-y-auto p-10 flex flex-col gap-6 custom-scrollbar">
        {/* Barra de Ações */}
        <div className="flex justify-between items-center w-full">
          <div className="relative">
            <input
              type="text"
              value={busca}
              onChange={(e): void => setBusca(e.target.value)}
              placeholder="Buscar produto por nome ou código"
              className="w-105 h-10 bg-[#1F1F1F] border border-[#3A3A3A] rounded-lg px-4 text-xs text-[#B5B5B5] focus:outline-none focus:border-[#22C55E] transition-colors placeholder:text-[#555]"
            />
          </div>

          <button
            onClick={(): void => setIsModalNovoOpen(true)}
            className="h-10 px-6 bg-[#22C55E] hover:bg-green-600 text-white rounded-lg text-sm font-bold uppercase tracking-wider transition-all active:scale-95 shadow-lg"
          >
            + Novo Produto
          </button>
        </div>

        {/* Tabela de Produtos */}
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
            <TableRow
              nome="Cerveja Lata 350ml"
              codigo="789123456"
              estoque={120}
              minimo={50}
              status="Ativo"
              onEdit={handleAbrirEdicao}
            />
            <TableRow
              nome="Refrigerante 2L"
              codigo="789987654"
              estoque={20}
              minimo={40}
              status="Ativo"
              isLowStock
              onEdit={handleAbrirEdicao}
            />
            <TableRow
              nome="Água Mineral 500ml"
              codigo="789987111"
              estoque={200}
              minimo={100}
              status="Ativo"
              onEdit={handleAbrirEdicao}
            />
          </div>
        </div>
      </main>

      {/* Modal de Cadastro */}
      <ModalNovoProduto isOpen={isModalNovoOpen} onClose={(): void => setIsModalNovoOpen(false)} />

      {/* Modal de Edição - A 'key' garante que o estado resete ao trocar de produto */}
      <ModalEditarProduto
        key={produtoParaEditar?.codigo || 'editar-modal'}
        isOpen={isModalEditarOpen}
        onClose={(): void => {
          setIsModalEditarOpen(false)
          setProdutoParaEditar(null)
        }}
        produto={produtoParaEditar}
      />
    </div>
  )
}

function TableRow({
  nome,
  codigo,
  estoque,
  minimo,
  status,
  isLowStock,
  onEdit
}: TableRowProps): JSX.Element {
  return (
    <div className="flex items-center w-full h-16 bg-[#1F1F1F] rounded-xl px-6 hover:bg-[#252525] transition-all group border border-transparent hover:border-[#3A3A3A]">
      <span className="flex-1 text-white font-inter text-sm font-semibold truncate pr-4">
        {nome}
      </span>

      <span className="w-45 text-[#777] font-mono text-sm">{codigo}</span>

      <span
        className={`w-35 text-center font-mono text-base font-bold ${isLowStock ? 'text-red-500' : 'text-white'}`}
      >
        {estoque}
      </span>

      <span className="w-35 text-center text-[#777] font-mono text-sm">{minimo}</span>

      <span className="w-35 text-center">
        <span
          className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-tighter ${
            status === 'Ativo'
              ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20'
              : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}
        >
          {status}
        </span>
      </span>

      <div className="w-24 text-right">
        <button
          onClick={(): void =>
            onEdit({ nome, codigo, estoque, minimo, status: status as 'Ativo' | 'Inativo' })
          }
          className="bg-[#3A3A3A] text-white px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase hover:bg-blue-600 transition-colors"
        >
          Editar
        </button>
      </div>
    </div>
  )
}
