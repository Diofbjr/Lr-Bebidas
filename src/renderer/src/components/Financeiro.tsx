import { JSX, useState } from 'react'
import Sidebar, { PageName } from './Sidebar'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

interface FinanceiroProps {
  onLogout: () => void
  onNavigate: (page: PageName) => void
}

interface Movimentacao {
  id: string
  data: string
  descricao: string
  tipo: 'Entrada' | 'Saída'
  forma: 'PIX' | 'Cartão' | 'Dinheiro' | 'Boleto'
  valor: number
}

const dadosMensais = [
  { name: '01/01', entradas: 4000, saidas: 2400 },
  { name: '02/01', entradas: 3000, saidas: 1398 },
  { name: '03/01', entradas: 2000, saidas: 5800 },
  { name: '04/01', entradas: 2780, saidas: 3908 },
  { name: '05/01', entradas: 1890, saidas: 4800 },
  { name: '06/01', entradas: 2390, saidas: 3800 },
  { name: '07/01', entradas: 3490, saidas: 4300 }
]

const dadosCategorias = [
  { name: 'Cervejas', value: 45, color: '#22C55E' },
  { name: 'Refrigerantes', value: 25, color: '#3B82F6' },
  { name: 'Águas/Sucos', value: 20, color: '#FACC15' },
  { name: 'Outros', value: 10, color: '#A855F7' }
]

export default function Financeiro({ onLogout, onNavigate }: FinanceiroProps): JSX.Element {
  const [periodo, setPeriodo] = useState('Janeiro/2026')

  // Dados fictícios de faturamento por método
  const faturamentoMetodo = {
    pix: '8.450,00',
    cartao: '6.120,00',
    dinheiro: '4.180,00'
  }

  const [movimentacoes] = useState<Movimentacao[]>([
    {
      id: '1',
      data: '07/01',
      descricao: 'Venda balcão #552',
      tipo: 'Entrada',
      forma: 'PIX',
      valor: 180.0
    },
    {
      id: '2',
      data: '07/01',
      descricao: 'Compra fornecedor Ambev',
      tipo: 'Saída',
      forma: 'Boleto',
      valor: 2300.0
    },
    {
      id: '3',
      data: '06/01',
      descricao: 'Venda balcão #551',
      tipo: 'Entrada',
      forma: 'Dinheiro',
      valor: 450.0
    },
    {
      id: '4',
      data: '06/01',
      descricao: 'Venda balcão #550',
      tipo: 'Entrada',
      forma: 'Cartão',
      valor: 120.0
    }
  ])

  return (
    <div className="min-h-screen bg-[#1F1F1F] font-inter text-white flex">
      <Sidebar activePage="financeiro" onLogout={onLogout} onNavigate={onNavigate} />

      <main className="flex-1 ml-65 flex flex-col h-screen overflow-hidden">
        <header className="h-16 flex items-center justify-between px-10 border-b border-[#3A3A3A] bg-[#1F1F1F]">
          <h2 className="text-2xl font-bold">Financeiro</h2>
          <div className="flex gap-4">
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-2 text-sm outline-none focus:border-[#22C55E]"
            >
              <option>Janeiro/2026</option>
              <option>Dezembro/2025</option>
            </select>
            <button className="bg-[#22C55E] hover:bg-green-600 px-6 py-2 rounded-lg text-sm font-bold transition-all">
              Exportar PDF
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
          {/* Resumo Geral */}
          <div className="space-y-4">
            <h3 className="text-[#777] text-[10px] font-bold uppercase tracking-widest">
              Resumo de Caixa
            </h3>
            <div className="flex flex-wrap gap-6">
              <CardFinanceiro titulo="Entradas" valor="18.750,00" cor="text-[#22C55E]" />
              <CardFinanceiro titulo="Saídas" valor="9.430,00" cor="text-[#EF4444]" />
              <CardFinanceiro titulo="Lucro Líquido" valor="9.320,00" cor="text-[#3B82F6]" />
            </div>
          </div>

          {/* Faturamento por Método de Pagamento */}
          <div className="space-y-4">
            <h3 className="text-[#777] text-[10px] font-bold uppercase tracking-widest">
              Entradas por Método
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CardMiniMetodo metodo="PIX" valor={faturamentoMetodo.pix} corBarra="bg-cyan-400" />
              <CardMiniMetodo
                metodo="Cartão"
                valor={faturamentoMetodo.cartao}
                corBarra="bg-purple-500"
              />
              <CardMiniMetodo
                metodo="Dinheiro"
                valor={faturamentoMetodo.dinheiro}
                corBarra="bg-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#2A2A2A] p-6 rounded-xl border border-[#3A3A3A] h-90 shadow-lg">
              <h3 className="text-base font-semibold mb-6 text-[#B5B5B5]">Fluxo de Caixa</h3>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={dadosMensais}>
                  <defs>
                    <linearGradient id="colorEntrada" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#777"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#777"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `R$${val}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F1F1F',
                      border: '1px solid #3A3A3A',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="entradas"
                    stroke="#22C55E"
                    fillOpacity={1}
                    fill="url(#colorEntrada)"
                    strokeWidth={3}
                  />
                  <Area
                    type="monotone"
                    dataKey="saidas"
                    stroke="#EF4444"
                    fill="transparent"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#2A2A2A] p-6 rounded-xl border border-[#3A3A3A] h-90 flex flex-col shadow-lg">
              <h3 className="text-base font-semibold mb-2 text-[#B5B5B5]">Vendas por Categoria</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dadosCategorias}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dadosCategorias.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {dadosCategorias.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2 text-[10px]">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    ></span>
                    <span className="text-[#B5B5B5] uppercase font-bold tracking-wider">
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#2A2A2A] rounded-xl border border-[#3A3A3A] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-[#3A3A3A] flex justify-between items-center">
              <h3 className="text-base font-semibold">Últimas Movimentações</h3>
              <button className="text-xs text-[#3B82F6] hover:underline font-bold uppercase tracking-widest">
                Ver Histórico
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-[#252525] text-[#777] text-[10px] font-bold uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">Data</th>
                  <th className="px-8 py-4">Descrição</th>
                  <th className="px-8 py-4">Tipo</th>
                  <th className="px-8 py-4 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333]">
                {movimentacoes.map((mov) => (
                  <tr key={mov.id} className="hover:bg-[#2F2F2F] transition-colors">
                    <td className="px-8 py-4 text-sm text-[#B5B5B5]">{mov.data}</td>
                    <td className="px-8 py-4 text-sm font-medium">
                      {mov.descricao}
                      <p className="text-[10px] text-[#555] font-normal uppercase tracking-tighter">
                        {mov.forma}
                      </p>
                    </td>
                    <td className="px-8 py-4">
                      <span
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                          mov.tipo === 'Entrada'
                            ? 'bg-[#22C55E]/10 text-[#22C55E]'
                            : 'bg-[#EF4444]/10 text-[#EF4444]'
                        }`}
                      >
                        {mov.tipo}
                      </span>
                    </td>
                    <td
                      className={`px-8 py-4 text-sm font-bold font-mono text-right ${
                        mov.tipo === 'Entrada' ? 'text-[#22C55E]' : 'text-[#EF4444]'
                      }`}
                    >
                      {mov.tipo === 'Entrada' ? '+' : '-'} R$ {mov.valor.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

function CardFinanceiro({
  titulo,
  valor,
  cor
}: {
  titulo: string
  valor: string
  cor: string
}): JSX.Element {
  return (
    <div className="w-70 bg-[#2A2A2A] p-6 rounded-xl border border-[#3A3A3A] hover:border-[#444] transition-all shadow-lg group">
      <p className="text-[#777] text-[10px] font-bold uppercase tracking-[2px] mb-2 group-hover:text-[#B5B5B5]">
        {titulo}
      </p>
      <div className="flex items-baseline gap-1">
        <span className="text-sm font-medium text-[#777]">R$</span>
        <span className={`text-3xl font-bold font-mono ${cor} tracking-tighter`}>{valor}</span>
      </div>
    </div>
  )
}

function CardMiniMetodo({
  metodo,
  valor,
  corBarra
}: {
  metodo: string
  valor: string
  corBarra: string
}): JSX.Element {
  return (
    <div className="bg-[#2A2A2A] p-4 rounded-xl border border-[#3A3A3A] flex items-center gap-4 relative overflow-hidden group">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${corBarra}`}></div>
      <div className="flex-1">
        <p className="text-[#777] text-[9px] font-bold uppercase tracking-wider">{metodo}</p>
        <p className="text-xl font-bold font-mono">R$ {valor}</p>
      </div>
      <div className="opacity-10 group-hover:opacity-20 transition-opacity">
        {/* Ícone meramente ilustrativo */}
        <div className="w-8 h-8 rounded bg-white"></div>
      </div>
    </div>
  )
}
