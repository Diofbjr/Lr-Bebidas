/* eslint-disable prettier/prettier */
import { JSX, useState } from 'react'
import { Sidebar, PageName } from '../../components/layout/Sidebar'
import { Header } from '../../components/layout/Header'
import ModalNovoUsuario from './ModalNovoUsuario'
import ModalEditarUsuario from './ModalEditarUsuario'

interface Usuario {
  id: string
  nome: string
  login: string
  perfil: 'Administrador' | 'Gerente' | 'Caixa'
  status: 'Ativo' | 'Inativo'
  ultimoAcesso: string
}

export default function Usuarios({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (page: PageName) => void }): JSX.Element {
  const [isModalNovoOpen, setIsModalNovoOpen] = useState(false)
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null)

  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: '1', nome: 'Lourival Souza', login: 'lourival.admin', perfil: 'Administrador', status: 'Ativo', ultimoAcesso: 'Hoje 09:12' },
    { id: '2', nome: 'Marcos Silva', login: 'marcos.gerente', perfil: 'Gerente', status: 'Ativo', ultimoAcesso: 'Ontem 18:40' },
    { id: '3', nome: 'Carlos Souza', login: 'carlos.caixa', perfil: 'Caixa', status: 'Inativo', ultimoAcesso: '05/09/2025' }
  ])

  const handleSalvarEdicao = (usuarioAtualizado: Usuario): void => {
    setUsuarios((prev) => prev.map((u) => (u.id === usuarioAtualizado.id ? usuarioAtualizado : u)))
    setUsuarioEditando(null)
  }

  return (
    <div className="min-h-screen bg-[#1F1F1F] font-inter text-white flex">
      <Sidebar activePage="usuarios" onLogout={onLogout} onNavigate={onNavigate} />

      <main className="flex-1 ml-65 flex flex-col h-screen overflow-hidden">
        <Header title="Gestão de Usuários" />

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar mt-12">
          <div className="flex justify-between items-end">
            <div>
               <h3 className="text-sm font-black text-[#777] uppercase tracking-[2px] mb-2">Controle de Acesso</h3>
               <p className="text-[#B5B5B5] text-sm">Gerencie os colaboradores e seus níveis de permissão no sistema.</p>
            </div>
            <button
              onClick={(): void => setIsModalNovoOpen(true)}
              className="bg-[#22C55E] hover:bg-green-600 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-green-900/20 active:scale-95 cursor-pointer"
            >
              + Adicionar Usuário
            </button>
          </div>

          <div className="bg-[#2A2A2A] rounded-2xl border border-[#3A3A3A] overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#252525] text-[#777] text-[10px] font-black uppercase tracking-[2px]">
                <tr>
                  <th className="px-8 py-5">Nome</th>
                  <th className="px-8 py-5">Login</th>
                  <th className="px-8 py-5">Perfil</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333]">
                {usuarios.map((user) => (
                  <tr key={user.id} className="hover:bg-[#2F2F2F] transition-colors group">
                    <td className="px-8 py-5 font-bold text-sm">{user.nome}</td>
                    <td className="px-8 py-5 text-sm text-[#777] font-mono">{user.login}</td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-black/20 ${getPerfilColor(user.perfil)}`}>
                        {user.perfil}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Ativo' ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`}></span>
                        <span className={`text-xs font-bold ${user.status === 'Ativo' ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>{user.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={(): void => setUsuarioEditando(user)}
                        className="text-[10px] font-black uppercase tracking-widest text-[#3B82F6] hover:text-white transition-colors cursor-pointer"
                      >
                        {user.status === 'Ativo' ? 'Configurar' : 'Reativar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Informativo de Perfis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <PermissaoCard titulo="Administrador" cor="border-[#22C55E]" desc="Acesso total: financeiro, estoque e usuários." />
             <PermissaoCard titulo="Gerente" cor="border-[#3B82F6]" desc="Gestão de estoque, compras e relatórios." />
             <PermissaoCard titulo="Caixa" cor="border-[#FACC15]" desc="Operação de PDV e fechamento de turno." />
          </div>
        </div>
      </main>

      <ModalNovoUsuario isOpen={isModalNovoOpen} onClose={(): void => setIsModalNovoOpen(false)} />
      {usuarioEditando && (
        <ModalEditarUsuario
          isOpen={!!usuarioEditando}
          usuario={usuarioEditando}
          onClose={(): void => setUsuarioEditando(null)}
          onSave={handleSalvarEdicao}
        />
      )}
    </div>
  )
}

function getPerfilColor(perfil: string): string {
  if (perfil === 'Administrador') return 'text-[#22C55E]'
  if (perfil === 'Gerente') return 'text-[#3B82F6]'
  return 'text-[#FACC15]'
}

function PermissaoCard({ titulo, cor, desc }: { titulo: string, cor: string, desc: string }): JSX.Element {
  return (
    <div className={`bg-[#2A2A2A] p-6 rounded-xl border-l-4 ${cor} shadow-lg`}>
      <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-2">{titulo}</h4>
      <p className="text-[#777] text-xs leading-relaxed">{desc}</p>
    </div>
  )
}