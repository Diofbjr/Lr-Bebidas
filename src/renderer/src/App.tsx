/* eslint-disable prettier/prettier */
import { useState, JSX } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Sales from './pages/Sales'
import Products from './pages/Products'
import Inventory from './pages/Inventory'
import Purchases from './pages/Purchases'
import Finance from './pages/Finance'
import Reports from './pages/Reports'
import Usuarios from './pages/Users' // Certifique-se que a pasta chama Users ou Usuarios

// Definição estrita das páginas do sistema
export type PageName =
  | 'dashboard'
  | 'vendas'
  | 'produtos'
  | 'estoque'
  | 'compras'
  | 'financeiro'
  | 'relatorios'
  | 'usuarios'

export default function App(): JSX.Element {
  // Estado de Autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Estado de Navegação (Inicia no Dashboard após login)
  const [currentPage, setCurrentPage] = useState<PageName>('dashboard')

  // Funções de Controle
  const handleLogin = (): void => setIsAuthenticated(true)
  
  const handleLogout = (): void => {
    setIsAuthenticated(false)
    setCurrentPage('dashboard')
  }

  // Renderização Condicional: Login
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLogin} />
  }

  // Renderização Condicional: Sistema Principal (Dashboard e Módulos)
  return (
    <main className="min-h-screen w-full select-none bg-[#1F1F1F] text-white font-inter">
      
      {currentPage === 'dashboard' && (
        <Dashboard onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {currentPage === 'vendas' && (
        <Sales onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {currentPage === 'produtos' && (
        <Products onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {currentPage === 'estoque' && (
        <Inventory onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {currentPage === 'compras' && (
        <Purchases onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {currentPage === 'financeiro' && (
        <Finance onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {currentPage === 'relatorios' && (
        <Reports onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {currentPage === 'usuarios' && (
        <Usuarios onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {/* Fallback de Segurança para Rotas Inexistentes */}
      {!['dashboard', 'vendas', 'produtos', 'estoque', 'compras', 'financeiro', 'relatorios', 'usuarios'].includes(currentPage) && (
        <div className="flex h-screen flex-col items-center justify-center bg-[#1F1F1F]">
          <h1 className="text-6xl font-black text-[#2A2A2A] mb-4 uppercase">404</h1>
          <p className="text-[#777] mb-8">Página não encontrada ou em desenvolvimento.</p>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="px-8 py-3 bg-[#22C55E] rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-green-600 transition-all cursor-pointer"
          >
            Voltar ao Dashboard
          </button>
        </div>
      )}
    </main>
  )
}