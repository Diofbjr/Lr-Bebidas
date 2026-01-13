/* eslint-disable prettier/prettier */
import { JSX, useState, useEffect, useRef } from 'react'
import { Sidebar, PageName } from '../../components/layout/Sidebar'
import { Header } from '../../components/layout/Header'
import { Modal } from '../../components/ui/Modal'

interface SalesProps {
  onLogout: () => void
  onNavigate: (page: PageName) => void
}

interface SaleItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
}

interface ModalConfig {
  isOpen: boolean
  type: 'success' | 'danger'
  title: string
  message: string
  showActions: boolean
}

export default function Sales({ onLogout, onNavigate }: SalesProps): JSX.Element {
  const [items, setItems] = useState<SaleItem[]>([
    { id: '1', name: 'Cerveja Pilsen 350ml', quantity: 1, unitPrice: 7.0 },
    { id: '2', name: 'Refrigerante Cola 2L', quantity: 1, unitPrice: 8.5 }
  ])

  const [paymentMethod, setPaymentMethod] = useState<'dinheiro' | 'cartao' | 'pix'>('dinheiro')
  const [search, setSearch] = useState('')
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    isOpen: false,
    type: 'danger',
    title: '',
    message: '',
    showActions: false
  })

  const searchInputRef = useRef<HTMLInputElement>(null)

  // Foco automático constante para o Scanner
  useEffect((): (() => void) => {
    searchInputRef.current?.focus()
    const handleGlobalClick = (e: MouseEvent): void => {
      if ((e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'BUTTON') {
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('click', handleGlobalClick)
    return (): void => window.removeEventListener('click', handleGlobalClick)
  }, [])

  const totalSale = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)

  const handleManualQuantity = (id: string, value: string): void => {
    const num = parseInt(value)
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: isNaN(num) ? 0 : num } : item))
    )
  }

  const adjustQuantity = (id: string, delta: number): void => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    )
  }

  const removeItem = (id: string): void => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleFinishSale = (): void => {
    if (items.length === 0 || items.some((i) => i.quantity <= 0)) {
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
      <Header title="Nova Venda" />

      <main className="absolute left-65 top-16 w-[calc(100%-260px)] h-[calc(100vh-64px)] p-10 flex gap-8">
        <div className="flex-1 flex flex-col gap-6">
          {/* Input do Scanner */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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

          {/* Lista de Itens */}
          <div className="flex-1 bg-[#2A2A2A] rounded-xl border border-[#3A3A3A] p-6 flex flex-col shadow-lg overflow-hidden">
            <div className="flex text-[#777] text-[10px] font-bold uppercase tracking-wider mb-4 px-6">
              <span className="flex-1">Produto</span>
              <span className="w-44 text-center">Quantidade</span>
              <span className="w-32 text-right">Subtotal</span>
              <span className="w-10 ml-4"></span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex items-center w-full h-16 bg-[#1F1F1F] rounded-lg px-6 border border-[#3A3A3A]">
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-[#22C55E] text-xs font-mono">R$ {item.unitPrice.toFixed(2)} un.</p>
                  </div>

                  <div className="flex items-center bg-[#2A2A2A] rounded-lg border border-[#3A3A3A] overflow-hidden focus-within:border-[#22C55E] transition-colors">
                    <button onClick={() => adjustQuantity(item.id, -1)} className="w-10 h-10 text-[#777] hover:bg-[#333] hover:text-white transition-all cursor-pointer">-</button>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={item.quantity}
                      onChange={(e) => handleManualQuantity(item.id, e.target.value)}
                      className="w-14 h-10 bg-transparent text-center text-white font-bold text-lg outline-none"
                    />
                    <button onClick={() => adjustQuantity(item.id, 1)} className="w-10 h-10 text-[#777] hover:bg-[#333] hover:text-white transition-all cursor-pointer">+</button>
                  </div>

                  <span className="w-32 text-right text-[#22C55E] font-bold font-mono text-lg">
                    R$ {(item.unitPrice * item.quantity).toFixed(2)}
                  </span>

                  <button onClick={() => removeItem(item.id)} className="ml-4 text-[#EF4444]/40 hover:text-[#EF4444] p-2 cursor-pointer transition-colors">✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Painel Lateral de Finalização */}
        <div className="w-110">
          <div className="bg-[#2A2A2A] rounded-xl border border-[#3A3A3A] p-8 shadow-2xl">
            <h3 className="text-white text-lg font-semibold mb-6">Finalização</h3>
            <div className="flex justify-between items-center mb-6">
              <span className="text-[#B5B5B5]">Total da Venda</span>
              <span className="text-[#22C55E] text-4xl font-bold font-mono">R$ {totalSale.toFixed(2)}</span>
            </div>

            <div className="h-px bg-[#3A3A3A] mb-6" />

            <p className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest mb-4">Pagamento</p>
            <div className="grid grid-cols-3 gap-2 mb-8">
              {(['dinheiro', 'cartao', 'pix'] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`py-3 rounded-lg text-xs font-bold uppercase border transition-all cursor-pointer ${
                    paymentMethod === method ? 'bg-[#22C55E] border-transparent text-white shadow-lg shadow-green-900/20' : 'bg-[#1F1F1F] border-[#3A3A3A] text-[#777]'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            <button
              onClick={handleFinishSale}
              className="w-full py-6 bg-[#22C55E] hover:bg-green-600 text-white text-xl font-bold rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              CONCLUIR VENDA
            </button>
          </div>
        </div>
      </main>

      {/* Modal de Feedback */}
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        title={modalConfig.title}
        width="w-120"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#B5B5B5] leading-relaxed">{modalConfig.message}</p>
          
          {modalConfig.showActions && (
            <div className="flex gap-4 mt-8 w-full">
              <button
                onClick={() => { setItems([]); setModalConfig({ ...modalConfig, isOpen: false }) }}
                className="flex-1 py-4 bg-[#3A3A3A] text-white rounded-lg font-bold uppercase text-xs hover:bg-[#444] transition-colors cursor-pointer"
              >
                Não Imprimir
              </button>
              <button
                onClick={() => { setItems([]); setModalConfig({ ...modalConfig, isOpen: false }) }}
                className="flex-1 py-4 bg-[#22C55E] text-white rounded-lg font-bold uppercase text-xs hover:bg-green-600 transition-colors cursor-pointer"
              >
                Imprimir Cupom
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}