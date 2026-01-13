export type PaymentMethod = 'PIX' | 'CARD' | 'CASH' | 'BILLET'

export interface StockProduct {
  barcode: string
  name: string
  costPrice: number
  unit: 'BOX' | 'UNIT' | 'OTHER'
}

export interface PurchaseItem {
  product: string
  quantity: number
  unit: string
  unitPrice: number
  subtotal: number
}

export interface Purchase {
  id: string
  date: string
  supplier: string
  totalValue: string
  items: PurchaseItem[]
}
