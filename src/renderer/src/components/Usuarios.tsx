import { JSX, useState } from 'react'
import Sidebar, { PageName } from './Sidebar'
import ModalNovoUsuario from '../components/ModalNovoUsuario'
import ModalEditarUsuario from '../components/ModalEditarUsuario'

interface UsuariosProps {
  onLogout: () => void
  onNavigate: (page: PageName) => void
}

interface Usuario {
  id: string
  nome: string
  login: string
  perfil: 'Administrador' | 'Gerente' | 'Caixa'
  status: 'Ativo' | 'Inativo'
  ultimoAcesso: string
}

export default function Usuarios({ onLogout, onNavigate }: UsuariosProps): JSX.Element {
  // Estados de Modais
  const [isModalNovoOpen, setIsModalNovoOpen] = useState(false)
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null)

  // Estado da Lista de Usuários
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: '1',
      nome: 'Lourival Souza',
      login: 'lourival.admin',
      perfil: 'Administrador',
      status: 'Ativo',
      ultimoAcesso: 'Hoje 09:12'
    },
    {
      id: '2',
      nome: 'Marcos Silva',
      login: 'marcos.gerente',
      perfil: 'Gerente',
      status: 'Ativo',
      ultimoAcesso: 'Ontem 18:40'
    },
    {
      id: '3',
      nome: 'Carlos Souza',
      login: 'carlos.caixa',
      perfil: 'Caixa',
      status: 'Inativo',
      ultimoAcesso: '05/09/2025'
    }
  ])

  // Função para salvar edição
  const handleSalvarEdicao = (usuarioAtualizado: Usuario): void => {
    setUsuarios((prev) =>
      prev.map((u) => (u.id === usuarioAtualizado.id ? { ...u, ...usuarioAtualizado } : u))
    )
    setUsuarioEditando(null)
    // Aqui você enviaria para o banco de dados via IPC futuramente
  }

  return (
    <div className="min-h-screen bg-[#1F1F1F] font-inter text-white flex">
      <Sidebar activePage="usuarios" onLogout={onLogout} onNavigate={onNavigate} />

      <main className="flex-1 ml-65 flex flex-col h-screen overflow-hidden">
        {/* Header Superior */}
        <header className="h-16 flex items-center justify-between px-10 border-b border-[#3A3A3A] bg-[#1F1F1F]">
          <h2 className="text-2xl font-bold">Usuários</h2>
          <button
            onClick={(): void => setIsModalNovoOpen(true)}
            className="bg-[#22C55E] hover:bg-green-600 px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-lg active:scale-95"
          >
            + Novo Usuário
          </button>
        </header>

        {/* Área de Conteúdo */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
          <div className="bg-[#2A2A2A] rounded-xl border border-[#3A3A3A] overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#252525] text-[#777] text-[10px] font-bold uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">Nome</th>
                  <th className="px-8 py-4">Usuário</th>
                  <th className="px-8 py-4">Perfil</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Último Acesso</th>
                  <th className="px-8 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333]">
                {usuarios.map((user) => (
                  <tr key={user.id} className="hover:bg-[#2F2F2F] transition-colors group">
                    <td className="px-8 py-4 text-sm font-medium">{user.nome}</td>
                    <td className="px-8 py-4 text-sm text-[#B5B5B5]">{user.login}</td>
                    <td className="px-8 py-4">
                      <span className={`text-sm font-bold ${getPerfilColor(user.perfil)}`}>
                        {user.perfil}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${user.status === 'Ativo' ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`}
                        ></span>
                        <span
                          className={`text-sm ${user.status === 'Ativo' ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}
                        >
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-sm text-[#B5B5B5]">{user.ultimoAcesso}</td>
                    <td className="px-8 py-4 text-right">
                      <button
                        onClick={(): void => setUsuarioEditando(user)}
                        className={`text-sm font-bold hover:underline transition-all ${user.status === 'Ativo' ? 'text-[#3B82F6]' : 'text-[#EF4444]'}`}
                      >
                        {user.status === 'Ativo' ? 'Editar' : 'Reativar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card Informativo de Perfis */}
          <div className="w-full max-w-2xl bg-[#2A2A2A] p-8 rounded-xl border border-[#3A3A3A] shadow-lg">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
              <span className="w-1 h-5 bg-[#22C55E] rounded-full"></span>
              Perfis e Permissões
            </h3>

            <div className="space-y-6">
              <PermissaoItem
                titulo="Administrador"
                desc="Acesso total ao sistema, configurações de usuários e financeiro fiscal."
                cor="text-[#22C55E]"
              />
              <PermissaoItem
                titulo="Gerente"
                desc="Gestão completa de estoque, lançamentos de compras, vendas e relatórios detalhados."
                cor="text-[#3B82F6]"
              />
              <PermissaoItem
                titulo="Caixa"
                desc="Acesso restrito ao PDV (Vendas), abertura e fechamento de turno."
                cor="text-[#FACC15]"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Modais */}
      <ModalNovoUsuario isOpen={isModalNovoOpen} onClose={(): void => setIsModalNovoOpen(false)} />

      {usuarioEditando && (
        <ModalEditarUsuario
          key={usuarioEditando.id} // Reinicia o modal se trocar de usuário
          isOpen={!!usuarioEditando}
          usuario={usuarioEditando}
          onClose={(): void => setUsuarioEditando(null)}
          onSave={handleSalvarEdicao}
        />
      )}
    </div>
  )
}

/** * Funções Auxiliares */

function getPerfilColor(perfil: string): string {
  switch (perfil) {
    case 'Administrador':
      return 'text-[#22C55E]'
    case 'Gerente':
      return 'text-[#3B82F6]'
    case 'Caixa':
      return 'text-[#FACC15]'
    default:
      return 'text-white'
  }
}

function PermissaoItem({
  titulo,
  desc,
  cor
}: {
  titulo: string
  desc: string
  cor: string
}): JSX.Element {
  return (
    <div className="border-l-2 border-[#3A3A3A] pl-4 hover:border-l-white transition-all group">
      <p
        className={`text-sm font-bold uppercase tracking-widest ${cor} group-hover:brightness-110`}
      >
        {titulo}
      </p>
      <p className="text-xs text-[#B5B5B5] mt-1 leading-relaxed">{desc}</p>
    </div>
  )
}
