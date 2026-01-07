import { useState, JSX } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Produtos from './components/Produtos'
import Compras from './components/Compras'
import Vendas from './components/Vendas'
import Estoque from './components/Estoque' // Importação da nova tela de Estoque
import { PageName } from './components/Sidebar'
import Financeiro from './components/Financeiro'
import Relatorios from './components/Relatorios'
import Usuarios from './components/Usuarios'

export default function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentPage, setCurrentPage] = useState<PageName>('dashboard')

  // Funções de manipulação de estado
  const handleLogout = (): void => {
    setIsAuthenticated(false)
    setCurrentPage('dashboard')
  }

  const handleLogin = (): void => {
    setIsAuthenticated(true)
  }

  // Se não estiver autenticado, mostra o Login
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLogin} />
  }

  // Renderização condicional das telas
  return (
    <main className="min-h-screen w-full select-none bg-[#1F1F1F]">
      {currentPage === 'dashboard' && (
        <Dashboard onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {currentPage === 'produtos' && (
        <Produtos onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {currentPage === 'compras' && <Compras onLogout={handleLogout} onNavigate={setCurrentPage} />}

      {currentPage === 'vendas' && <Vendas onLogout={handleLogout} onNavigate={setCurrentPage} />}

      {currentPage === 'estoque' && <Estoque onLogout={handleLogout} onNavigate={setCurrentPage} />}

      {currentPage === 'financeiro' && (
        <Financeiro onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {currentPage === 'relatorios' && (
        <Relatorios onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {currentPage === 'usuarios' && (
        <Usuarios onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {/* Verificação de segurança para telas em desenvolvimento */}
      {!['dashboard', 'produtos', 'compras', 'vendas', 'estoque'].includes(currentPage) && (
        <div className="flex h-screen items-center justify-center ml-65 text-white font-inter">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Em breve!</h1>
            <p className="text-[#B5B5B5]">
              A tela de <span className="text-white uppercase font-bold">{currentPage}</span> está
              sendo preparada.
            </p>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="mt-6 px-6 py-2 bg-[#22C55E] rounded-lg text-sm font-bold hover:bg-green-600 transition-colors"
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
