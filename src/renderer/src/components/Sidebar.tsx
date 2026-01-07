import { JSX } from 'react'

// Definimos exatamente quais strings são aceitas
export type PageName =
  | 'dashboard'
  | 'produtos'
  | 'compras'
  | 'vendas'
  | 'estoque'
  | 'financeiro'
  | 'relatorios'
  | 'usuarios'

interface SidebarProps {
  onLogout: () => void
  activePage: PageName
  onNavigate: (page: PageName) => void
}

export default function Sidebar({ onLogout, activePage, onNavigate }: SidebarProps): JSX.Element {
  const menuItems: { id: PageName; name: string; top: string }[] = [
    { id: 'dashboard', name: 'Dashboard', top: 'top-24' },
    { id: 'produtos', name: 'Produtos', top: 'top-40' },
    { id: 'compras', name: 'Compras', top: 'top-52' },
    { id: 'vendas', name: 'Vendas', top: 'top-64' },
    { id: 'estoque', name: 'Estoque', top: 'top-[304px]' },
    { id: 'financeiro', name: 'Financeiro', top: 'top-[352px]' },
    { id: 'relatorios', name: 'Relatórios', top: 'top-[400px]' },
    { id: 'usuarios', name: 'Usuários', top: 'top-[448px]' }
  ]

  return (
    <aside className="w-65 h-screen absolute left-0 top-0 z-20 bg-[#2A2A2A]">
      <p className="text-white font-inter text-xl font-bold w-27.25 absolute left-19 top-7 text-center">
        LR Bebidas
      </p>

      {menuItems.map((item) => {
        const isActive = activePage === item.id
        return (
          <div
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-57 h-12 absolute left-4 ${item.top} cursor-pointer transition-all duration-200 group`}
          >
            <div
              className={`w-full h-full rounded-lg absolute left-0 top-0 transition-colors ${
                isActive ? 'bg-[#3A3A3A]' : 'group-hover:bg-[#3A3A3A]/50'
              }`}
            />
            {isActive && (
              <div className="w-1 h-full bg-[#22C55E] absolute left-0 top-0 rounded-l-lg" />
            )}
            <p
              className={`font-inter text-sm absolute left-8 top-3.5 transition-colors ${
                isActive ? 'text-white font-semibold' : 'text-[#B5B5B5] group-hover:text-white'
              }`}
            >
              {item.name}
            </p>
          </div>
        )
      })}

      <button
        onClick={onLogout}
        className="absolute bottom-10 left-8 text-[#EF4444] font-inter text-sm font-bold hover:text-red-400 transition-colors cursor-pointer"
      >
        Sair do Sistema
      </button>
    </aside>
  )
}
