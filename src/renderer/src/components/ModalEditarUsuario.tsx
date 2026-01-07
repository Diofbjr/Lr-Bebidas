import { JSX, useState } from 'react'
import ModalTrocarSenha from './ModalTrocarSenha'

interface Usuario {
  id: string
  nome: string
  login: string
  perfil: 'Administrador' | 'Gerente' | 'Caixa'
  status: 'Ativo' | 'Inativo'
  ultimoAcesso: string
}

interface ModalEditarUsuarioProps {
  isOpen: boolean
  onClose: () => void
  usuario: Usuario
  onSave: (usuario: Usuario) => void
}

export default function ModalEditarUsuario({
  isOpen,
  onClose,
  usuario,
  onSave
}: ModalEditarUsuarioProps): JSX.Element | null {
  // Estados do formulário de edição
  const [nome, setNome] = useState(usuario.nome)
  const [perfil, setPerfil] = useState(usuario.perfil)
  const [statusAtivo, setStatusAtivo] = useState(usuario.status === 'Ativo')

  // Estado para controlar o sub-modal de senha
  const [isTrocarSenhaOpen, setIsTrocarSenhaOpen] = useState(false)

  if (!isOpen) return null

  const handleSalvarEdicao = (): void => {
    onSave({
      ...usuario,
      nome,
      perfil,
      status: statusAtivo ? 'Ativo' : 'Inativo'
    })
  }

  const handleSalvarNovaSenha = (novaSenha: string): void => {
    console.log(`Senha alterada para o usuário ${usuario.login}:`, novaSenha)
    // Aqui entrará a chamada de IPC para o back-end futuramente
    setIsTrocarSenhaOpen(false)
  }

  return (
    <>
      {/* Modal de Edição Principal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm animate-in fade-in duration-300 font-inter">
        <div className="w-220 bg-[#2A2A2A] rounded-2xl shadow-2xl flex flex-col border border-[#3A3A3A] overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-10 py-8 border-b border-[#3A3A3A] flex justify-between items-center bg-[#252525]">
            <h3 className="text-white text-2xl font-bold">Editar Usuário</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-[#777] hover:text-white text-xl transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Conteúdo */}
          <div className="p-10 space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[#B5B5B5] text-xs font-medium uppercase tracking-wider">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e): void => setNome(e.target.value)}
                  className="w-full h-11 bg-[#1F1F1F] border border-[#3A3A3A] rounded-lg px-4 text-white text-sm outline-none focus:border-[#22C55E] transition-all"
                />
              </div>
              <div className="space-y-2 opacity-80">
                <label className="text-[#B5B5B5] text-xs font-medium uppercase tracking-wider">
                  Usuário (login)
                </label>
                <input
                  type="text"
                  value={usuario.login}
                  disabled
                  className="w-full h-11 bg-[#1F1F1F] border border-[#3A3A3A] rounded-lg px-4 text-[#777] text-sm cursor-not-allowed"
                />
              </div>
            </div>

            {/* Perfil */}
            <div className="space-y-3">
              <label className="text-[#B5B5B5] text-xs font-medium uppercase tracking-wider">
                Perfil de acesso
              </label>
              <div className="flex gap-4">
                {(['Administrador', 'Gerente', 'Caixa'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={(): void => setPerfil(p)}
                    className={`flex-1 h-11 rounded-lg text-sm font-bold transition-all ${
                      perfil === p
                        ? 'bg-[#22C55E] text-white shadow-lg'
                        : 'bg-[#1F1F1F] text-[#B5B5B5] border border-[#3A3A3A] hover:border-[#555]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="bg-[#1F1F1F]/50 border border-[#FACC15]/20 p-4 rounded-xl">
                <p className="text-[#FACC15] text-sm flex items-center gap-2">
                  <span className="text-lg">⚠</span> Alterar o perfil modifica as permissões do
                  usuário imediatamente
                </p>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="space-y-3">
              <label className="text-[#B5B5B5] text-xs font-medium uppercase tracking-wider">
                Status do usuário
              </label>
              <div
                onClick={(): void => setStatusAtivo(!statusAtivo)}
                className={`w-50 h-11 rounded-full relative flex items-center px-1 cursor-pointer transition-all duration-300 ${
                  statusAtivo ? 'bg-[#22C55E]' : 'bg-[#3A3A3A]'
                }`}
              >
                <div
                  className={`w-9 h-9 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    statusAtivo ? 'translate-x-38.5' : 'translate-x-0'
                  }`}
                />
                <span
                  className={`absolute ${statusAtivo ? 'left-6 text-white' : 'right-6 text-[#EF4444]'} text-xs font-bold uppercase`}
                >
                  {statusAtivo ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>

            {/* Segurança */}
            <div className="bg-[#1F1F1F] border border-[#3A3A3A] p-6 rounded-xl space-y-4">
              <p className="text-white text-base font-bold">Segurança</p>
              <button
                type="button"
                onClick={(): void => setIsTrocarSenhaOpen(true)}
                className="w-80 h-10 bg-[#EF4444] hover:bg-red-600 text-white text-sm font-bold rounded-lg transition-all active:scale-95 shadow-lg shadow-red-500/10"
              >
                Resetar senha
              </button>
              <p className="text-[#777] text-xs">
                O usuário será obrigado a criar nova senha no próximo login.
              </p>
            </div>
          </div>

          {/* Footer Botões */}
          <div className="px-10 py-8 bg-[#252525] border-t border-[#3A3A3A] flex justify-end gap-4 mt-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-40 h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-lg text-[#B5B5B5] text-sm font-bold hover:text-white transition-all"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSalvarEdicao}
              className="w-60 h-12 bg-[#22C55E] hover:bg-green-600 rounded-lg text-white text-sm font-bold shadow-lg shadow-green-500/10 transition-all active:scale-95"
            >
              Salvar alterações
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Troca de Senha (Renderiza por cima) */}
      <ModalTrocarSenha
        isOpen={isTrocarSenhaOpen}
        onClose={(): void => setIsTrocarSenhaOpen(false)}
        onSave={handleSalvarNovaSenha}
      />
    </>
  )
}
