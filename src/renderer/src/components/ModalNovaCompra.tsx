import { JSX, useState, useEffect, useRef } from 'react'
import ModalAdicionarProduto, { ItemCompra } from './ModalAdicionarProduto'

type FormaPagamento = 'PIX' | 'Cartão' | 'Dinheiro' | 'Boleto'

interface ProdutoEstoque {
  barcode: string
  nome: string
  precoCusto: number
  unidade: 'Caixa' | 'Unidade' | 'Outro'
}

interface ModalNovaCompraProps {
  isOpen: boolean
  onClose: () => void
}

const ESTOQUE_MOCK: ProdutoEstoque[] = [
  { barcode: '78910001', nome: 'Cerveja Pilsen 350ml', precoCusto: 4.5, unidade: 'Unidade' },
  { barcode: '78910002', nome: 'Água Mineral 500ml', precoCusto: 1.8, unidade: 'Unidade' },
  { barcode: '78910003', nome: 'Refrigerante Cola 2L', precoCusto: 7.2, unidade: 'Unidade' }
]

const FORNECEDORES_INICIAIS = ['Ambev Distribuidora', 'Coca-Cola Brasil', 'Heineken Brasil']

export default function ModalNovaCompra({
  isOpen,
  onClose
}: ModalNovaCompraProps): JSX.Element | null {
  const [itens, setItens] = useState<ItemCompra[]>([])
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('PIX')
  const [fornecedor, setFornecedor] = useState('')
  const [isNovoFornecedor, setIsNovoFornecedor] = useState(false)
  const [listaFornecedores, setListaFornecedores] = useState(FORNECEDORES_INICIAIS)
  const [barcode, setBarcode] = useState('')
  const [isManualModalOpen, setIsManualModalOpen] = useState(false)
  const inputScannerRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && !isManualModalOpen) {
      const timer = setTimeout(() => inputScannerRef.current?.focus(), 100)
      return (): void => clearTimeout(timer)
    }
    return undefined
  }, [isOpen, isManualModalOpen])

  if (!isOpen) return null

  const handleAddItem = (novoItem: ItemCompra): void => {
    setItens((prev) => {
      // Itens com validades diferentes devem ser tratados como lotes separados
      const existente = prev.find(
        (i) =>
          i.produto === novoItem.produto &&
          i.unidade === novoItem.unidade &&
          i.validade === novoItem.validade
      )
      if (existente) {
        return prev.map((i) =>
          i.id === existente.id
            ? {
                ...i,
                quantidade: i.quantidade + novoItem.quantidade,
                subtotal: (i.quantidade + novoItem.quantidade) * i.precoUnitario
              }
            : i
        )
      }
      return [...prev, novoItem]
    })
  }

  const handleRemoveItem = (id: string): void => {
    setItens((prev) => prev.filter((item) => item.id !== id))
  }

  const handleScannerKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && barcode.trim() !== '') {
      const produto = ESTOQUE_MOCK.find((p) => p.barcode === barcode)
      if (produto) {
        handleAddItem({
          id: Math.random().toString(36).substring(2, 9),
          produto: produto.nome,
          quantidade: 1,
          unidade: produto.unidade,
          precoUnitario: produto.precoCusto,
          subtotal: produto.precoCusto,
          validade: '' // Scanner direto não pega validade, ideal abrir modal manual
        })
      } else {
        setIsManualModalOpen(true)
      }
      setBarcode('')
    }
  }

  const handleFinalizarCompra = (): void => {
    if (!fornecedor || itens.length === 0) return
    if (isNovoFornecedor && !listaFornecedores.includes(fornecedor)) {
      setListaFornecedores((prev) => [...prev, fornecedor].sort())
    }
    onClose()
    setItens([])
    setFornecedor('')
  }

  const totalCompra = itens.reduce((acc, item) => acc + item.subtotal, 0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm font-inter">
      <div className="w-300 h-210 bg-[#2A2A2A] rounded-2xl shadow-2xl flex flex-col border border-[#3A3A3A] overflow-hidden">
        <div className="px-10 py-8 border-b border-[#3A3A3A] flex justify-between items-center bg-[#252525]">
          <h3 className="text-white text-2xl font-bold">Nova Entrada de Estoque</h3>
          <button onClick={onClose} className="text-[#777] hover:text-white text-xl">
            ✕
          </button>
        </div>

        <div className="p-10 flex-1 overflow-y-auto space-y-8 custom-scrollbar">
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
                  Fornecedor
                </label>
                <button
                  onClick={() => setIsNovoFornecedor(!isNovoFornecedor)}
                  className="text-[#22C55E] text-[9px] font-black uppercase hover:underline"
                >
                  {isNovoFornecedor ? ' selecionar lista' : '+ novo cadastro'}
                </button>
              </div>
              {isNovoFornecedor ? (
                <input
                  type="text"
                  value={fornecedor}
                  onChange={(e) => setFornecedor(e.target.value)}
                  className="w-full h-12 bg-[#1F1F1F] border border-[#22C55E]/30 rounded-xl px-4 text-white text-xs outline-none"
                  placeholder="Nome do fornecedor..."
                />
              ) : (
                <select
                  value={fornecedor}
                  onChange={(e) => setFornecedor(e.target.value)}
                  className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-xs outline-none appearance-none"
                >
                  <option value="">Selecione...</option>
                  {listaFornecedores.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest">
                Pagamento
              </label>
              <select
                value={formaPagamento}
                onChange={(e) => setFormaPagamento(e.target.value as FormaPagamento)}
                className="w-full h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl px-4 text-white text-xs outline-none"
              >
                <option value="PIX">PIX</option>
                <option value="Cartão">Cartão</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Boleto">Boleto</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#22C55E] text-[10px] font-bold uppercase tracking-widest">
                Leitor Status: Ativo
              </label>
              <input
                ref={inputScannerRef}
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyDown={handleScannerKey}
                className="w-full h-12 bg-[#1F1F1F] border-2 border-[#22C55E]/50 rounded-xl px-6 text-white text-sm font-mono outline-none"
                placeholder="Bipar item..."
              />
            </div>
          </div>

          <div className="flex-1 bg-[#1F1F1F]/40 rounded-2xl border border-[#3A3A3A] overflow-hidden flex flex-col min-h-90">
            <div className="h-10 bg-[#1F1F1F] flex items-center px-8 text-[#777] text-[9px] font-bold uppercase tracking-widest border-b border-[#3A3A3A]">
              <span className="w-80">Produto</span>
              <span className="w-24 text-center">Unidade</span>
              <span className="w-20 text-center">Qtd</span>
              <span className="w-28 text-center">Validade</span>
              <span className="w-32 text-center">Custo Unit.</span>
              <span className="flex-1 text-right">Subtotal</span>
              <span className="w-10 ml-4"></span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {itens.map((item) => (
                <div
                  key={item.id}
                  className="h-14 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl flex items-center px-8 text-sm group"
                >
                  <span className="w-80 text-white font-semibold">{item.produto}</span>
                  <span className="w-24 text-center">
                    <span className="bg-[#2A2A2A] text-[#B5B5B5] px-3 py-1 rounded text-[9px] font-black uppercase">
                      {item.unidade}
                    </span>
                  </span>
                  <span className="w-20 text-center text-white font-mono font-bold">
                    {item.quantidade}
                  </span>
                  <span className="w-28 text-center text-[#B5B5B5] font-mono text-xs">
                    {item.validade ? new Date(item.validade).toLocaleDateString('pt-BR') : '---'}
                  </span>
                  <span className="w-32 text-center text-[#777] font-mono">
                    R$ {item.precoUnitario.toFixed(2)}
                  </span>
                  <span className="flex-1 text-right text-[#22C55E] font-bold font-mono">
                    R$ {item.subtotal.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-4 text-red-500/30 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsManualModalOpen(true)}
              className="m-4 h-10 border border-dashed border-[#333] rounded-xl text-[#555] text-[10px] font-bold uppercase tracking-widest hover:text-[#22C55E] transition-all"
            >
              + Buscar Manualmente / Inserir Validade
            </button>
          </div>
        </div>

        <div className="px-10 py-8 bg-[#252525] border-t border-[#3A3A3A] flex justify-between items-center">
          <div>
            <p className="text-[#777] text-[10px] uppercase font-bold tracking-widest mb-1">
              Total da Nota
            </p>
            <p className="text-[#22C55E] text-4xl font-bold font-mono">
              R$ {totalCompra.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="w-40 h-14 text-[#B5B5B5] font-bold uppercase text-xs"
            >
              Cancelar
            </button>
            <button
              onClick={handleFinalizarCompra}
              disabled={!fornecedor || itens.length === 0}
              className="w-72 h-14 bg-[#22C55E] hover:bg-green-600 disabled:opacity-20 rounded-xl text-white font-black uppercase text-sm shadow-lg transition-all"
            >
              Finalizar Entrada
            </button>
          </div>
        </div>

        <ModalAdicionarProduto
          key={isManualModalOpen ? 'manual-open' : 'manual-closed'}
          isOpen={isManualModalOpen}
          onClose={() => setIsManualModalOpen(false)}
          onAdd={handleAddItem}
        />
      </div>
    </div>
  )
}
