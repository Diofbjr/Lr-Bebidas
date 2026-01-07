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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

interface RelatoriosProps {
  onLogout: () => void
  onNavigate: (page: PageName) => void
}

// Dados: Receita x Custos (Linhas)
const dadosDesempenho = [
  { name: 'Seg', receita: 4000, custos: 2400 },
  { name: 'Ter', receita: 3000, custos: 1398 },
  { name: 'Qua', receita: 2000, custos: 3800 },
  { name: 'Qui', receita: 2780, custos: 3908 },
  { name: 'Sex', receita: 1890, custos: 4800 },
  { name: 'Sáb', receita: 6390, custos: 3800 },
  { name: 'Dom', receita: 5490, custos: 4300 }
]

// Dados: Vendas por dia (Barras)
const dadosVendasBarra = [
  { name: 'Seg', vendas: 180 },
  { name: 'Ter', vendas: 140 },
  { name: 'Qua', vendas: 200 },
  { name: 'Qui', vendas: 160 },
  { name: 'Sex', vendas: 220 }
]

// Dados: Produtos mais vendidos (Pizza)
const dadosProdutos = [
  { name: 'Cerveja', value: 45, color: '#22C55E' },
  { name: 'Refrigerante', value: 35, color: '#3B82F6' },
  { name: 'Água', value: 20, color: '#FACC15' }
]

export default function Relatorios({ onLogout, onNavigate }: RelatoriosProps): JSX.Element {
  return (
    <div className="min-h-screen bg-[#1F1F1F] font-inter text-white flex">
      <Sidebar activePage="relatorios" onLogout={onLogout} onNavigate={onNavigate} />

      <main className="flex-1 ml-65 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center px-10 border-b border-[#3A3A3A] bg-[#1F1F1F]">
          <h2 className="text-2xl font-bold">Relatórios Gerenciais</h2>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
          {/* Top Cards (Receita, Custos, Lucro) */}
          <div className="flex flex-wrap gap-6">
            <CardRelatorio titulo="Receita Total" valor="42.500,00" cor="text-[#22C55E]" />
            <CardRelatorio titulo="Custos Operacionais" valor="28.300,00" cor="text-[#EF4444]" />
            <CardRelatorio titulo="Lucro Líquido" valor="14.200,00" cor="text-[#3B82F6]" />
          </div>

          {/* Linha 1: Receita x Custos e Vendas por Dia */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gráfico Comparativo (7 dias) */}
            <div className="lg:col-span-2 bg-[#2A2A2A] p-6 rounded-xl border border-[#3A3A3A] h-96 shadow-lg">
              <h3 className="text-sm font-semibold mb-6 text-[#B5B5B5] uppercase tracking-wider">
                Receita x Custos (Últimos 7 dias)
              </h3>
              <ResponsiveContainer width="100%" height="80%">
                <LineChart data={dadosDesempenho}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#777"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis stroke="#777" fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F1F1F',
                      border: '1px solid #3A3A3A',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    dataKey="receita"
                    stroke="#22C55E"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="custos"
                    stroke="#EF4444"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Vendas por dia (Barras) */}
            <div className="bg-[#2A2A2A] p-6 rounded-xl border border-[#3A3A3A] h-96 shadow-lg">
              <h3 className="text-sm font-semibold mb-6 text-[#B5B5B5] uppercase tracking-wider">
                Volume de Vendas
              </h3>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={dadosVendasBarra}>
                  <XAxis
                    dataKey="name"
                    stroke="#777"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: '#333' }}
                    contentStyle={{ backgroundColor: '#1F1F1F', border: 'none' }}
                  />
                  <Bar dataKey="vendas" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Linha 2: Produtos Mais Vendidos (Pizza) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-105 bg-[#2A2A2A] p-8 rounded-xl border border-[#3A3A3A] h-80 flex items-center shadow-lg">
              <div className="flex-1 flex flex-col">
                <h3 className="text-base font-semibold mb-6">Produtos mais vendidos</h3>
                <div className="space-y-4">
                  {dadosProdutos.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span className="text-sm text-[#B5B5B5] flex-1">{item.name}</span>
                      <span className="text-sm font-bold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dadosProdutos}
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {dadosProdutos.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Placeholder para outro relatório ou insights 
            <div className="flex-1 bg-linear-to-br from-[#2A2A2A] to-[#1F1F1F] p-8 rounded-xl border border-dashed border-[#444] flex flex-col justify-center items-center text-center">
              <p className="text-[#777] text-sm italic">
                &#34;As vendas de sábado atingiram o pico da semana.
                <br />
                Considere reforçar o estoque de <span className="text-[#22C55E]">
                  Cervejas
                </span>{' '}
                para o próximo final de semana.&#34;
              </p>
              <button className="mt-6 text-[10px] font-bold uppercase tracking-widest text-[#3B82F6] hover:underline">
                Gerar Insight com IA
              </button>
            </div>*/}
          </div>
        </div>
      </main>
    </div>
  )
}

/**
 * Componente de Card Reutilizável
 */
function CardRelatorio({
  titulo,
  valor,
  cor
}: {
  titulo: string
  valor: string
  cor: string
}): JSX.Element {
  return (
    <div className="w-70 bg-[#2A2A2A] p-6 rounded-xl border border-[#3A3A3A] shadow-md hover:bg-[#2F2F2F] transition-colors">
      <p className="text-[#B5B5B5] text-[10px] font-bold uppercase tracking-widest mb-2">
        {titulo}
      </p>
      <p className={`text-2xl font-bold font-mono ${cor}`}>R$ {valor}</p>
    </div>
  )
}
