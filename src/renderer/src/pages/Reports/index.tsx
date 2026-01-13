import { JSX } from 'react'
import { Sidebar, PageName } from '../../components/layout/Sidebar'
import { Header } from '../../components/layout/Header'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

// Dados: Receita x Custos (Linhas)
const performanceData = [
  { name: 'Seg', receita: 4000, custos: 2400 },
  { name: 'Ter', receita: 3000, custos: 1398 },
  { name: 'Qua', receita: 2000, custos: 3800 },
  { name: 'Qui', receita: 2780, custos: 3908 },
  { name: 'Sex', receita: 1890, custos: 4800 },
  { name: 'Sáb', receita: 6390, custos: 3800 },
  { name: 'Dom', receita: 5490, custos: 4300 }
]

// Dados: Vendas por dia (Barras)
const salesVolumeData = [
  { name: 'Seg', vendas: 180 },
  { name: 'Ter', vendas: 140 },
  { name: 'Qua', vendas: 200 },
  { name: 'Qui', vendas: 160 },
  { name: 'Sex', vendas: 220 }
]

// Dados: Produtos mais vendidos (Pizza)
const productData = [
  { name: 'Cerveja', value: 45, color: '#22C55E' },
  { name: 'Refrigerante', value: 35, color: '#3B82F6' },
  { name: 'Água', value: 20, color: '#FACC15' }
]

export default function Reports({
  onLogout,
  onNavigate
}: {
  onLogout: () => void
  onNavigate: (page: PageName) => void
}): JSX.Element {
  return (
    <div className="min-h-screen bg-[#1F1F1F] font-inter text-white flex">
      <Sidebar activePage="relatorios" onLogout={onLogout} onNavigate={onNavigate} />

      <main className="flex-1 ml-65 flex flex-col h-screen overflow-hidden">
        <Header title="Relatórios Gerenciais" />

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar mt-12">
          {/* Top Cards */}
          <section className="flex flex-wrap gap-6">
            <ReportCard title="Receita Total" value="42.500,00" color="text-[#22C55E]" />
            <ReportCard title="Custos Operacionais" value="28.300,00" color="text-[#EF4444]" />
            <ReportCard title="Lucro Líquido" value="14.200,00" color="text-[#3B82F6]" />
          </section>

          {/* Linha 1: Gráficos de Desempenho */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gráfico de Linhas: Receita x Custos */}
            <div className="lg:col-span-2 bg-[#2A2A2A] p-8 rounded-2xl border border-[#3A3A3A] h-100 shadow-xl">
              <h3 className="text-sm font-black mb-8 text-[#B5B5B5] uppercase tracking-[2px]">
                Comparativo Financeiro (7 Dias)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" vertical={false} />
                    <XAxis
                      dataKey="name"
                      stroke="#555"
                      fontSize={11}
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis stroke="#555" fontSize={11} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F1F1F',
                        border: '1px solid #3A3A3A',
                        borderRadius: '12px'
                      }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Legend
                      verticalAlign="top"
                      height={36}
                      iconType="circle"
                      wrapperStyle={{
                        fontSize: '10px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}
                    />
                    <Line
                      type="monotone"
                      name="Receita"
                      dataKey="receita"
                      stroke="#22C55E"
                      strokeWidth={4}
                      dot={{ r: 4, fill: '#22C55E' }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      name="Custos"
                      dataKey="custos"
                      stroke="#EF4444"
                      strokeWidth={4}
                      dot={{ r: 4, fill: '#EF4444' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico de Barras: Volume */}
            <div className="bg-[#2A2A2A] p-8 rounded-2xl border border-[#3A3A3A] h-100 shadow-xl">
              <h3 className="text-sm font-black mb-8 text-[#B5B5B5] uppercase tracking-[2px]">
                Volume de Itens
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesVolumeData}>
                    <XAxis
                      dataKey="name"
                      stroke="#555"
                      fontSize={11}
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />
                    <Tooltip
                      cursor={{ fill: '#ffffff05' }}
                      contentStyle={{
                        backgroundColor: '#1F1F1F',
                        border: '1px solid #3A3A3A',
                        borderRadius: '12px'
                      }}
                    />
                    <Bar dataKey="vendas" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={25} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Linha 2: Pizza e Insights */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#2A2A2A] p-8 rounded-2xl border border-[#3A3A3A] h-80 flex items-center shadow-xl">
              <div className="flex-1">
                <h3 className="text-sm font-black mb-8 text-[#B5B5B5] uppercase tracking-widest">
                  Mix de Vendas
                </h3>
                <div className="space-y-4">
                  {productData.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span className="text-xs text-[#777] font-bold uppercase flex-1">
                        {item.name}
                      </span>
                      <span className="text-sm font-black font-mono">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={productData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {productData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-linear-to-br from-[#2A2A2A] to-[#222] p-8 rounded-2xl border border-dashed border-[#444] flex flex-col justify-center items-center text-center shadow-xl">
              <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#3B82F6] text-xl">💡</span>
              </div>
              <p className="text-[#B5B5B5] text-sm leading-relaxed max-w-xs">
                As vendas de <span className="text-white font-bold italic">sábado</span> atingiram o
                pico da semana. Considere reforçar o estoque de{' '}
                <span className="text-[#22C55E] font-bold">Cervejas</span> para o próximo final de
                semana.
              </p>
              <button className="mt-8 text-[10px] font-black uppercase tracking-[2px] text-[#3B82F6] hover:text-blue-400 transition-colors cursor-pointer">
                Gerar Relatório Completo (PDF)
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

function ReportCard({
  title,
  value,
  color
}: {
  title: string
  value: string
  color: string
}): JSX.Element {
  return (
    <div className="w-72 bg-[#2A2A2A] p-8 rounded-2xl border border-[#3A3A3A] shadow-xl hover:bg-[#2F2F2F] transition-all group">
      <p className="text-[#777] text-[10px] font-black uppercase tracking-[2px] mb-3 group-hover:text-[#B5B5B5] transition-colors">
        {title}
      </p>
      <div className="flex items-baseline gap-1">
        <span className="text-xs font-bold text-[#555]">R$</span>
        <span className={`text-3xl font-black font-mono ${color} tracking-tighter`}>{value}</span>
      </div>
    </div>
  )
}
