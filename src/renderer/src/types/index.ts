export interface Produto {
  id: string;
  codigoBarras: string;
  nome: string;
  precoVenda: number;
  precoCusto: number;
  estoque: number;
  categoria: string;
}

export interface ItemVenda {
  produto: Produto;
  quantidade: number;
  subtotal: number;
}

export interface Venda {
  id: string;
  itens: ItemVenda[];
  total: number;
  metodoPagamento: 'dinheiro' | 'cartao' | 'pix';
  data: Date;
}