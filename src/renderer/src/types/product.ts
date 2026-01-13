export interface Product {
  name: string
  code: string
  stock: number
  minStock: number
  status: 'Ativo' | 'Inativo'
}
