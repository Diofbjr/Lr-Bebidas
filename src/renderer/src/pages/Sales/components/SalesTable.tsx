import { JSX, Dispatch, SetStateAction } from 'react'

interface SaleItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
}

interface TableProps {
  items: SaleItem[]
  setItems: Dispatch<SetStateAction<SaleItem[]>>
}

export function SalesTable({ items, setItems }: TableProps): JSX.Element {
  const adjustQuantity = (id: string, delta: number): void => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    )
  }

  const handleManualQuantity = (id: string, value: string): void => {
    const num = parseInt(value)
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: isNaN(num) ? 0 : num } : item))
    )
  }

  const removeItem = (id: string): void => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="flex-1 bg-[#2A2A2A] rounded-xl border border-[#3A3A3A] p-6 flex flex-col shadow-lg overflow-hidden">
      <div className="flex text-[#777] text-[10px] font-black uppercase tracking-[2px] mb-4 px-6">
        <span className="flex-1">Produto</span>
        <span className="w-44 text-center">Quantidade</span>
        <span className="w-32 text-right">Subtotal</span>
        <span className="w-10 ml-4"></span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center w-full h-16 bg-[#1F1F1F] rounded-lg px-6 border border-[#3A3A3A] hover:border-[#444] transition-colors"
          >
            <div className="flex-1">
              <p className="text-white font-bold text-sm uppercase">{item.name}</p>
              <p className="text-[#22C55E] text-xs font-mono font-bold">
                R$ {item.unitPrice.toFixed(2)} un.
              </p>
            </div>
            <div className="flex items-center bg-[#2A2A2A] rounded-lg border border-[#3A3A3A] overflow-hidden focus-within:border-[#22C55E]">
              <button
                onClick={(): void => adjustQuantity(item.id, -1)}
                className="w-10 h-10 text-[#777] hover:bg-[#333] hover:text-white cursor-pointer font-bold"
              >
                -
              </button>
              <input
                type="text"
                value={item.quantity}
                onChange={(e): void => handleManualQuantity(item.id, e.target.value)}
                className="w-14 h-10 bg-transparent text-center text-white font-black text-lg outline-none"
              />
              <button
                onClick={(): void => adjustQuantity(item.id, 1)}
                className="w-10 h-10 text-[#777] hover:bg-[#333] hover:text-white cursor-pointer font-bold"
              >
                +
              </button>
            </div>
            <span className="w-32 text-right text-[#22C55E] font-black font-mono text-xl">
              R$ {(item.unitPrice * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={(): void => removeItem(item.id)}
              className="ml-4 text-[#EF4444]/40 hover:text-[#EF4444] p-2 cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
