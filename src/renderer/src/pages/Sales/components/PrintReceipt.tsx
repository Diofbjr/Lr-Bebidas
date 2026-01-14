import { JSX } from 'react'

interface SaleItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
}

interface PrintProps {
  items: SaleItem[]
  total: number
  method: string
}

export function PrintReceipt({ items, total, method }: PrintProps): JSX.Element {
  return (
    <div
      id="print-area"
      className="hidden print:block p-8 text-black bg-white font-mono text-sm w-[80mm]"
    >
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold uppercase tracking-tight">LR BEBIDAS</h2>
        <p className="text-[10px]">CONVENIÊNCIA E DISTRIBUIDORA</p>
        <p className="text-[10px]">{new Date().toLocaleString('pt-BR')}</p>
      </div>

      <div className="border-t border-b border-black py-2 my-2 text-[10px]">
        <p className="font-bold text-center">CUPOM NÃO FISCAL</p>
      </div>

      <table className="w-full text-[11px]">
        <thead>
          <tr className="border-b border-black/20 text-left">
            <th className="pb-1 uppercase">Item</th>
            <th className="text-center pb-1 uppercase">Qtd</th>
            <th className="text-right pb-1 uppercase">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-black/5">
              <td className="py-1 uppercase">{item.name}</td>
              <td className="text-center py-1">{item.quantity}</td>
              <td className="text-right py-1">R$ {(item.quantity * item.unitPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 pt-2 border-t-2 border-black">
        <div className="flex justify-between font-bold text-base">
          <span>TOTAL:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <p className="text-[10px] mt-1 italic uppercase">Pagamento: {method}</p>
      </div>

      <div className="mt-8 text-center">
        <p className="text-[9px] uppercase font-bold tracking-widest">Obrigado pela preferência!</p>
        <p className="text-[8px] mt-2 italic">LR-Bebidas System</p>
      </div>
    </div>
  )
}
