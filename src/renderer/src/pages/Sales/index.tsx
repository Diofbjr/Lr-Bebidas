import { JSX, useState, useRef } from 'react'
import { Sidebar, PageName } from '../../components/layout/Sidebar'
import { Header } from '../../components/layout/Header'
import { Modal } from '../../components/ui/Modal'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'

// Componentes Extraídos
import { SalesScanner } from './components/SalesScanner'
import { SalesTable } from './components/SalesTable'
import { SalesSummary } from './components/SalesSummary'
import { PrintReceipt } from './components/PrintReceipt'

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

export default function Sales({
  onLogout,
  onNavigate
}: {
  onLogout: () => void
  onNavigate: (p: PageName) => void
}): JSX.Element {
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
  const totalSale = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)

  const resetSale = (): void => {
    setItems([])
    setSearch('')
    setModalConfig((prev) => ({ ...prev, isOpen: false }))
  }

  const handlePrint = async (): Promise<void> => {
    try {
      // @ts-ignore: IPC function defined in preload script
      const res = await window.api.printDocument()
      if (res.success) resetSale()
    } catch {
      window.print()
      resetSale()
    }
  }

  const handleFinishSale = (): void => {
    if (items.length === 0) return
    setModalConfig({
      isOpen: true,
      type: 'success',
      title: 'Venda Finalizada!',
      message: 'Pressione ENTER para imprimir ou ESC para sair.',
      showActions: true
    })
  }

  useKeyboardShortcuts({
    F1: () => searchInputRef.current?.focus(),
    F2: () => setPaymentMethod('dinheiro'),
    F3: () => setPaymentMethod('cartao'),
    F4: () => setPaymentMethod('pix'),
    F5: handleFinishSale,
    Enter: () => {
      if (modalConfig.isOpen && modalConfig.showActions) handlePrint()
    },
    Escape: () =>
      modalConfig.isOpen ? setModalConfig((p) => ({ ...p, isOpen: false })) : setItems([])
  })

  return (
    <div className="min-w-screen min-h-screen overflow-hidden relative bg-[#1F1F1F] font-inter">
      <Sidebar activePage="vendas" onLogout={onLogout} onNavigate={onNavigate} />
      <Header title="Ponto de Venda (PDV)" />

      <PrintReceipt items={items} total={totalSale} method={paymentMethod} />

      <main className="absolute left-65 top-16 w-[calc(100%-260px)] h-[calc(100vh-124px)] p-10 flex gap-8">
        <div className="flex-1 flex flex-col gap-6">
          <SalesScanner ref={searchInputRef} value={search} onChange={setSearch} />
          <SalesTable items={items} setItems={setItems} />
        </div>
        <SalesSummary
          total={totalSale}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onFinish={handleFinishSale}
        />
      </main>

      <footer className="fixed bottom-0 left-65 right-0 h-15 bg-[#252525] border-t border-[#3A3A3A] px-10 flex items-center justify-between text-[#777] text-[10px] font-black uppercase tracking-widest">
        <div className="flex gap-8">
          <div className="flex gap-2">
            <span className="text-white bg-[#3A3A3A] px-1.5 py-0.5 rounded">F1</span> Scanner
          </div>
          <div className="flex gap-2">
            <span className="text-white bg-[#3A3A3A] px-1.5 py-0.5 rounded">F2-F4</span> Pagamento
          </div>
          <div className="flex gap-2">
            <span className="text-white bg-[#3A3A3A] px-1.5 py-0.5 rounded">F5</span> Finalizar
          </div>
          <div className="flex gap-2 text-white">
            <span className="bg-[#22C55E] px-1.5 py-0.5 text-black rounded">Enter</span> Imprimir
          </div>
        </div>
        <div className="text-[#22C55E]">LR-BEBIDAS v1.0</div>
      </footer>

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((p) => ({ ...p, isOpen: false }))}
        title={modalConfig.title}
        width="w-120"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#B5B5B5] leading-relaxed">{modalConfig.message}</p>
          {modalConfig.showActions && (
            <div className="flex gap-4 mt-8 w-full">
              <button
                onClick={resetSale}
                className="flex-1 py-4 bg-[#3A3A3A] text-white rounded-lg font-black uppercase text-[10px] cursor-pointer"
              >
                Sair (ESC)
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 py-4 bg-[#22C55E] text-white rounded-lg font-black uppercase text-[10px] animate-pulse cursor-pointer"
              >
                Imprimir (ENTER)
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
