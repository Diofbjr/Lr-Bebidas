import { JSX, useState, useEffect, useRef } from 'react'
import Sidebar, { PageName } from './Sidebar'
import Modal from './Modal'

interface VendasProps {
  onLogout: () => void
  onNavigate: (page: PageName) => void
}

interface ItemVenda {
  id: string
  nome: string
  quantidade: number
  precoUnitario: number
}

interface ModalConfig {
  isOpen: boolean
  type: 'success' | 'danger'
  title: string
  message: string
  showActions: boolean
}

export default function Vendas({ onLogout, onNavigate }: VendasProps): JSX.Element {
  const [itens, setItens] = useState<ItemVenda[]>([
    { id: '1', nome: 'Cerveja Pilsen 350ml', quantidade: 1, precoUnitario: 7.0 },
    { id: '2', nome: 'Refrigerante Cola 2L', quantidade: 1, precoUnitario: 8.5 }
  ])

  const [pagamento, setPagamento] = useState<'dinheiro' | 'cartao' | 'pix'>('dinheiro')
  const [busca, setBusca] = useState('')
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    isOpen: false,
    type: 'danger',
    title: '',
    message: '',
    showActions: false
  })

  const inputBuscaRef = useRef<HTMLInputElement>(null)

  // Foco automático constante para o Scanner no campo de CÓDIGO
  useEffect((): (() => void) => {
    inputBuscaRef.current?.focus()
    const handleGlobalClick = (e: MouseEvent): void => {
      // Só devolve o foco para o busca se não estiver clicando em outro input (como o de quantidade)
      if ((e.target as HTMLElement).tagName !== 'INPUT') {
        inputBuscaRef.current?.focus()
      }
    }
    window.addEventListener('click', handleGlobalClick)
    return (): void => window.removeEventListener('click', handleGlobalClick)
  }, [])

  const subtotal = itens.reduce((acc, item) => acc + item.precoUnitario * item.quantidade, 0)

  const alterarQuantidadeManual = (id: string, valor: string): void => {
    const num = parseInt(valor)
    setItens((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantidade: isNaN(num) ? 0 : num } : item))
    )
  }

  const ajustarQuantidadeBotoes = (id: string, delta: number): void => {
    setItens((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantidade: Math.max(1, item.quantidade + delta) } : item
      )
    )
  }

  const removerItem = (id: string): void => {
    setItens((prev) => prev.filter((item) => item.id !== id))
  }

  const handleFinalizar = (): void => {
    if (itens.length === 0 || itens.some((i) => i.quantidade <= 0)) {
      setModalConfig({
        isOpen: true,
        type: 'danger',
        title: 'Verifique a Venda',
        message: 'O carrinho está vazio ou existem itens com quantidade zero.',
        showActions: false
      })
      return
    }
    setModalConfig({
      isOpen: true,
      type: 'success',
      title: 'Venda Finalizada!',
      message: 'Deseja imprimir o comprovante para o cliente?',
      showActions: true
    })
  }

  return (
    <div className="min-w-screen min-h-screen overflow-hidden relative bg-[#1F1F1F] font-inter">
      <Sidebar activePage="vendas" onLogout={onLogout} onNavigate={onNavigate} />

      <header className="absolute left-65 top-0 w-[calc(100%-260px)] h-16 flex items-center px-10 border-b border-[#3A3A3A] bg-[#1F1F1F] z-10">
        <h2 className="text-white text-2xl font-bold">Nova Venda</h2>
      </header>

      <main className="absolute left-65 top-16 w-[calc(100%-260px)] h-[calc(100vh-64px)] p-10 flex gap-8">
        <div className="flex-1 flex flex-col gap-6">
          {/* Input de Código de Barras (Sempre focado para o Scanner) */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                ref={inputBuscaRef}
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Bipe o código de barras aqui..."
                className="w-full h-12 bg-[#1F1F1F] border-2 border-[#22C55E] rounded-lg px-6 text-white placeholder-[#555] outline-none"
              />
              <div className="absolute right-4 top-3.5 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-ping"></span>
                <span className="text-[10px] text-[#22C55E] font-bold uppercase tracking-widest">
                  Scanner Ativo
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-[#2A2A2A] rounded-xl border border-[#3A3A3A] p-6 flex flex-col shadow-lg overflow-hidden">
            <div className="flex text-[#777] text-[10px] font-bold uppercase tracking-wider mb-4 px-6">
              <span className="flex-1">Produto</span>
              <span className="w-44 text-center">Quantidade Manual</span>
              <span className="w-32 text-right">Subtotal</span>
              <span className="w-10 ml-4"></span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {itens.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center w-full h-16 bg-[#1F1F1F] rounded-lg px-6 border border-[#3A3A3A]"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.nome}</p>
                    <p className="text-[#22C55E] text-xs font-mono">
                      R$ {item.precoUnitario.toFixed(2)} un.
                    </p>
                  </div>

                  {/* Campo de Quantidade que o vendedor modifica manualmente */}
                  <div className="flex items-center bg-[#2A2A2A] rounded-lg border border-[#3A3A3A] overflow-hidden focus-within:border-[#22C55E] transition-colors">
                    <button
                      onClick={() => ajustarQuantidadeBotoes(item.id, -1)}
                      className="w-10 h-10 text-[#777] hover:bg-[#333] hover:text-white transition-all"
                    >
                      {' '}
                      -{' '}
                    </button>

                    <input
                      type="text"
                      inputMode="numeric"
                      value={item.quantidade}
                      onChange={(e) => alterarQuantidadeManual(item.id, e.target.value)}
                      className="w-14 h-10 bg-transparent text-center text-white font-bold text-lg outline-none"
                    />

                    <button
                      onClick={() => ajustarQuantidadeBotoes(item.id, 1)}
                      className="w-10 h-10 text-[#777] hover:bg-[#333] hover:text-white transition-all"
                    >
                      {' '}
                      +{' '}
                    </button>
                  </div>

                  <span className="w-32 text-right text-[#22C55E] font-bold font-mono text-lg">
                    R$ {(item.precoUnitario * item.quantidade).toFixed(2)}
                  </span>

                  <button
                    onClick={() => removerItem(item.id)}
                    className="ml-4 text-[#EF4444]/40 hover:text-[#EF4444] p-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumo da Venda */}
        <div className="w-110">
          <div className="bg-[#2A2A2A] rounded-xl border border-[#3A3A3A] p-8 shadow-2xl">
            <h3 className="text-white text-lg font-semibold mb-6">Finalização</h3>

            <div className="flex justify-between items-center mb-6">
              <span className="text-[#B5B5B5]">Total da Venda</span>
              <span className="text-[#22C55E] text-4xl font-bold font-mono">
                R$ {subtotal.toFixed(2)}
              </span>
            </div>

            <div className="h-px bg-[#3A3A3A] mb-6" />

            <p className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest mb-4">
              Pagamento
            </p>
            <div className="grid grid-cols-3 gap-2 mb-8">
              {(['dinheiro', 'cartao', 'pix'] as const).map((tipo) => (
                <button
                  key={tipo}
                  onClick={() => setPagamento(tipo)}
                  className={`py-3 rounded-lg text-xs font-bold uppercase border transition-all ${
                    pagamento === tipo
                      ? 'bg-[#22C55E] border-transparent text-white'
                      : 'bg-[#1F1F1F] border-[#3A3A3A] text-[#777]'
                  }`}
                >
                  {' '}
                  {tipo}{' '}
                </button>
              ))}
            </div>

            <button
              onClick={handleFinalizar}
              className="w-full py-6 bg-[#22C55E] hover:bg-green-600 text-white text-xl font-bold rounded-xl shadow-lg active:scale-95 transition-all"
            >
              CONCLUIR VENDA
            </button>
          </div>
        </div>
      </main>

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        title={modalConfig.title}
        type={modalConfig.type}
      >
        <p>{modalConfig.message}</p>
        {modalConfig.showActions && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => {
                setItens([])
                setModalConfig({ ...modalConfig, isOpen: false })
              }}
              className="flex-1 py-4 bg-[#3A3A3A] text-white rounded-lg font-bold"
            >
              Não Imprimir
            </button>
            <button
              onClick={() => {
                setItens([])
                setModalConfig({ ...modalConfig, isOpen: false })
              }}
              className="flex-1 py-4 bg-[#22C55E] text-white rounded-lg font-bold"
            >
              Imprimir Cupom
            </button>
          </div>
        )}
      </Modal>
    </div>
  )
}
