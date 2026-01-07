import { JSX } from 'react'
import Sidebar, { PageName } from './Sidebar'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'

interface DashboardProps {
  onLogout: () => void
  onNavigate: (page: PageName) => void
}

// Dados fictícios para o gráfico de vendas
const dadosVendas = [
  { dia: 'Seg', valor: 2400 },
  { dia: 'Ter', valor: 1398 },
  { dia: 'Qua', valor: 3800 },
  { dia: 'Qui', valor: 3908 },
  { dia: 'Sex', valor: 4800 },
  { dia: 'Sáb', valor: 5500 },
  { dia: 'Dom', valor: 4300 }
]

export default function Dashboard({ onLogout, onNavigate }: DashboardProps): JSX.Element {
  return (
    <div className="min-w-screen min-h-screen overflow-hidden relative bg-[#1F1F1F]">
      <Sidebar activePage="dashboard" onLogout={onLogout} onNavigate={onNavigate} />

      {/* Header Superior */}
      <header className="absolute left-65 top-0 w-[calc(100%-260px)] h-16 flex items-center px-10 border-b border-[#3A3A3A] bg-[#1F1F1F] z-10">
        <h2 className="text-white font-inter text-2xl font-bold">Dashboard</h2>
      </header>

      {/* Container de Conteúdo */}
      <main className="absolute left-65 top-16 w-[calc(100%-260px)] h-[calc(100vh-64px)] overflow-y-auto p-10 custom-scrollbar">
        <div className="flex flex-wrap gap-6 mb-10">
          <MetricCard label="Estoque crítico" value="12" color="text-[#EF4444]" />
          <MetricCard label="Produtos a vencer" value="8" color="text-[#FACC15]" />
          <MetricCard label="Vendas do dia" value="R$ 3.420" color="text-[#22C55E]" />
          <MetricCard label="Caixa do dia" value="R$ 1.980" color="text-[#3B82F6]" />
        </div>

        <div className="flex flex-wrap gap-6">
          {/* Seção do Gráfico Preenchida */}
          <section className="flex-1 min-w-150 h-90 bg-[#2A2A2A] rounded-xl p-6 border border-[#3A3A3A] shadow-lg flex flex-col">
            <h3 className="text-white font-inter text-base mb-6 font-semibold">
              Vendas por dia (Semana Atual)
            </h3>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosVendas} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" vertical={false} />
                  <XAxis
                    dataKey="dia"
                    stroke="#777"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="#777"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val: number) => `R$${val}`}
                  />
                  <Tooltip
                    cursor={{ fill: '#333', opacity: 0.4 }}
                    contentStyle={{
                      backgroundColor: '#1F1F1F',
                      border: '1px solid #3A3A3A',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    itemStyle={{ color: '#22C55E', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
                    {dadosVendas.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.valor > 4000 ? '#22C55E' : '#3B82F6'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Top Produtos */}
          <section className="w-md h-90 bg-[#2A2A2A] rounded-xl p-6 border border-[#3A3A3A] shadow-lg overflow-hidden">
            <h3 className="text-white font-inter text-base mb-6 font-semibold">Top produtos</h3>
            <ul className="space-y-4">
              {[
                { nome: 'Cerveja Lata 350ml', qtd: '1.240 un' },
                { nome: 'Refrigerante 2L', qtd: '850 un' },
                { nome: 'Água Mineral', qtd: '600 un' },
                { nome: 'Energético', qtd: '420 un' },
                { nome: 'Cerveja Long Neck', qtd: '310 un' }
              ].map((prod, i) => (
                <li
                  key={prod.nome}
                  className="text-[#B5B5B5] font-inter text-sm flex justify-between border-b border-[#3A3A3A]/50 pb-2 hover:text-white transition-colors"
                >
                  <span className="flex gap-3">
                    <span className="text-[#555] font-bold">{i + 1}</span>
                    {prod.nome}
                  </span>
                  <span className="text-white font-mono font-bold">{prod.qtd}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}

/** * Sub-componente com tipagem explícita para evitar erros do ESLint
 */
function MetricCard({
  label,
  value,
  color
}: {
  label: string
  value: string
  color: string
}): JSX.Element {
  return (
    <div className="w-70 h-30 bg-[#2A2A2A] rounded-xl p-5 border border-[#3A3A3A] shadow-md transition-all hover:border-[#444] hover:-translate-y-1">
      <p className="text-[#777] text-[10px] font-bold uppercase tracking-widest">{label}</p>
      <p className={`${color} font-inter text-3xl font-bold mt-2 font-mono tracking-tighter`}>
        {value}
      </p>
    </div>
  )
}
