/* eslint-disable prettier/prettier */
import { JSX, useState } from 'react'
import { Sidebar, PageName } from '../../components/layout/Sidebar'
import { Header } from '../../components/layout/Header'
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

interface Transaction {
  id: string
  date: string
  description: string
  type: 'Entrada' | 'Saída'
  method: 'PIX' | 'Cartão' | 'Dinheiro' | 'Boleto'
  value: number
}

const monthlyData = [
  { name: '01/01', entradas: 4000, saidas: 2400 },
  { name: '02/01', entradas: 3000, saidas: 1398 },
  { name: '03/01', entradas: 2000, saidas: 5800 },
  { name: '04/01', entradas: 2780, saidas: 3908 },
  { name: '05/01', entradas: 1890, saidas: 4800 },
  { name: '06/01', entradas: 2390, saidas: 3800 },
  { name: '07/01', entradas: 3490, saidas: 4300 }
]

const categoryData = [
  { name: 'Cervejas', value: 45, color: '#22C55E' },
  { name: 'Refrigerantes', value: 25, color: '#3B82F6' },
  { name: 'Águas/Sucos', value: 20, color: '#FACC15' },
  { name: 'Outros', value: 10, color: '#A855F7' }
]

export default function Finance({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (page: PageName) => void }): JSX.Element {
  const [period, setPeriod] = useState('Janeiro/2026')

  const revenueByMethod = {
    pix: '8.450,00',
    cartao: '6.120,00',
    dinheiro: '4.180,00'
  }

  const [transactions] = useState<Transaction[]>([
    { id: '1', date: '07/01', description: 'Venda balcão #552', type: 'Entrada', method: 'PIX', value: 180.0 },
    { id: '2', date: '07/01', description: 'Compra fornecedor Ambev', type: 'Saída', method: 'Boleto', value: 2300.0 },
    { id: '3', date: '06/01', description: 'Venda balcão #551', type: 'Entrada', method: 'Dinheiro', value: 450.0 },
    { id: '4', date: '06/01', description: 'Venda balcão #550', type: 'Entrada', method: 'Cartão', value: 120.0 }
  ])

  return (
    <div className="min-h-screen bg-[#1F1F1F] font-inter text-white flex">
      <Sidebar activePage="financeiro" onLogout={onLogout} onNavigate={onNavigate} />

      <main className="flex-1 ml-65 flex flex-col h-screen overflow-hidden relative">
        <Header title="Financeiro" />
        
        {/* Filtros posicionados no topo direito */}
        <div className="absolute right-10 top-3 z-20 flex gap-4">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-2 text-xs font-bold outline-none focus:border-[#22C55E] transition-colors cursor-pointer"
          >
            <option>Janeiro/2026</option>
            <option>Dezembro/2025</option>
          </select>
          <button className="bg-[#22C55E] hover:bg-green-600 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg">
            Exportar PDF
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar mt-12">
          {/* Resumo */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SummaryCard title="Entradas" value="18.750,00" color="text-[#22C55E]" />
            <SummaryCard title="Saídas" value="9.430,00" color="text-[#EF4444]" />
            <SummaryCard title="Lucro Líquido" value="9.320,00" color="text-[#3B82F6]" />
          </section>

          {/* Métodos */}
          <section className="space-y-4">
            <h3 className="text-[#777] text-[10px] font-black uppercase tracking-[3px]">Entradas por Método</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MethodCard label="PIX" value={revenueByMethod.pix} barColor="bg-cyan-400" />
              <MethodCard label="Cartão" value={revenueByMethod.cartao} barColor="bg-purple-500" />
              <MethodCard label="Dinheiro" value={revenueByMethod.dinheiro} barColor="bg-green-500" />
            </div>
          </section>

          {/* Gráficos */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#2A2A2A] p-8 rounded-2xl border border-[#3A3A3A] h-100 shadow-xl">
              <h3 className="text-sm font-bold mb-8 text-[#B5B5B5] uppercase tracking-widest">Fluxo de Caixa Mensal</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="colorEntrada" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" vertical={false} />
                    <XAxis dataKey="name" stroke="#555" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#555" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `R$${val}`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F1F1F', border: '1px solid #3A3A3A', borderRadius: '12px' }} />
                    <Area type="monotone" dataKey="entradas" stroke="#22C55E" fillOpacity={1} fill="url(#colorEntrada)" strokeWidth={4} />
                    <Area type="monotone" dataKey="saidas" stroke="#EF4444" fill="transparent" strokeWidth={2} strokeDasharray="6 6" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#2A2A2A] p-8 rounded-2xl border border-[#3A3A3A] h-100 flex flex-col shadow-xl">
              <h3 className="text-sm font-bold mb-4 text-[#B5B5B5] uppercase tracking-widest">Vendas por Categoria</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2 text-[10px]">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></span>
                    <span className="text-[#777] uppercase font-black">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tabela */}
          <section className="bg-[#2A2A2A] rounded-2xl border border-[#3A3A3A] overflow-hidden shadow-2xl mb-10">
            <div className="p-6 border-b border-[#3A3A3A] bg-[#252525]">
              <h3 className="text-sm font-bold uppercase tracking-widest">Últimas Movimentações</h3>
            </div>
            <table className="w-full text-left">
              <thead className="bg-[#2A2A2A] text-[#555] text-[10px] font-black uppercase tracking-widest border-b border-[#333]">
                <tr>
                  <th className="px-10 py-5">Data</th>
                  <th className="px-10 py-5">Descrição / Método</th>
                  <th className="px-10 py-5">Tipo</th>
                  <th className="px-10 py-5 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333]">
                {transactions.map((mov) => (
                  <tr key={mov.id} className="hover:bg-[#2F2F2F] transition-colors">
                    <td className="px-10 py-5 text-sm font-mono text-[#777]">{mov.date}</td>
                    <td className="px-10 py-5">
                      <p className="text-sm font-bold text-white">{mov.description}</p>
                      <p className="text-[9px] text-[#22C55E] font-black uppercase">{mov.method}</p>
                    </td>
                    <td className="px-10 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                        mov.type === 'Entrada' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {mov.type}
                      </span>
                    </td>
                    <td className={`px-10 py-5 text-base font-black font-mono text-right ${
                      mov.type === 'Entrada' ? 'text-[#22C55E]' : 'text-[#EF4444]'
                    }`}>
                      {mov.type === 'Entrada' ? '+' : '-'} R$ {mov.value.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  )
}

function SummaryCard({ title, value, color }: { title: string, value: string, color: string }): JSX.Element {
  return (
    <div className="bg-[#2A2A2A] p-8 rounded-2xl border border-[#3A3A3A] hover:border-[#444] transition-all shadow-xl group">
      <p className="text-[#777] text-[10px] font-black uppercase tracking-[2px] mb-3 group-hover:text-[#B5B5B5]">{title}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-bold text-[#555]">R$</span>
        <span className={`text-4xl font-black font-mono ${color} tracking-tighter`}>{value}</span>
      </div>
    </div>
  )
}

function MethodCard({ label, value, barColor }: { label: string, value: string, barColor: string }): JSX.Element {
  return (
    <div className="bg-[#2A2A2A] p-6 rounded-2xl border border-[#3A3A3A] flex items-center gap-5 relative overflow-hidden hover:bg-[#2F2F2F] transition-colors group">
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${barColor}`}></div>
      <div className="flex-1">
        <p className="text-[#777] text-[10px] font-black uppercase tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-black font-mono">R$ {value}</p>
      </div>
    </div>
  )
}