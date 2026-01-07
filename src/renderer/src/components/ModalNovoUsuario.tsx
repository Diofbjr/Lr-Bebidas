import { JSX, useState } from 'react'

interface ModalNovoUsuarioProps {
  isOpen: boolean
  onClose: () => void
}

type Perfil = 'Administrador' | 'Gerente' | 'Caixa'

export default function ModalNovoUsuario({
  isOpen,
  onClose
}: ModalNovoUsuarioProps): JSX.Element | null {
  const [nome, setNome] = useState('')
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [perfil, setPerfil] = useState<Perfil>('Administrador')
  const [statusAtivo, setStatusAtivo] = useState(true)

  if (!isOpen) return null

  const getPermissoes = (p: Perfil): string[] => {
    const permissoes: Record<Perfil, string[]> = {
      Administrador: ['Acesso total ao sistema', 'Usuários, financeiro, relatórios'],
      Gerente: ['Gestão de estoque e compras', 'Relatórios de vendas e turnos'],
      Caixa: ['Acesso restrito ao PDV', 'Abertura e fechamento de turno']
    }
    return permissoes[p]
  }

  const handleCriar = (): void => {
    console.log('Criando usuário:', { nome, login, perfil, statusAtivo })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm animate-in fade-in duration-300 font-inter">
      {/* Ajustado: w-[880px] -> w-220 */}
      <div className="w-220 bg-[#2A2A2A] rounded-2xl shadow-2xl flex flex-col border border-[#3A3A3A] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-10 py-8 border-b border-[#3A3A3A] flex justify-between items-center bg-[#252525]">
          <h3 className="text-white text-2xl font-bold">Novo Usuário</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#777] hover:text-white text-xl transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Formulário */}
        <div className="p-10 space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[#B5B5B5] text-xs">Nome completo *</label>
              <input
                type="text"
                value={nome}
                onChange={(e): void => setNome(e.target.value)}
                className="w-full h-11 bg-[#1F1F1F] border border-[#3A3A3A] rounded-lg px-4 text-white text-sm outline-none focus:border-[#22C55E] transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#B5B5B5] text-xs">Usuário (login) *</label>
              <input
                type="text"
                value={login}
                onChange={(e): void => setLogin(e.target.value)}
                className="w-full h-11 bg-[#1F1F1F] border border-[#3A3A3A] rounded-lg px-4 text-white text-sm outline-none focus:border-[#22C55E]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[#B5B5B5] text-xs">Senha inicial *</label>
              <input
                type="password"
                value={senha}
                onChange={(e): void => setSenha(e.target.value)}
                className="w-full h-11 bg-[#1F1F1F] border border-[#3A3A3A] rounded-lg px-4 text-white text-sm outline-none focus:border-[#22C55E]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#B5B5B5] text-xs">Confirmar senha *</label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e): void => setConfirmarSenha(e.target.value)}
                className="w-full h-11 bg-[#1F1F1F] border border-[#3A3A3A] rounded-lg px-4 text-white text-sm outline-none focus:border-[#22C55E]"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[#B5B5B5] text-xs">Perfil de acesso *</label>
            <div className="flex gap-4">
              {(['Administrador', 'Gerente', 'Caixa'] as Perfil[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={(): void => setPerfil(p)}
                  className={`flex-1 h-11 rounded-lg text-sm font-medium transition-all ${
                    perfil === p
                      ? 'bg-[#22C55E] text-white shadow-lg shadow-green-900/20'
                      : 'bg-[#1F1F1F] text-[#B5B5B5] border border-[#3A3A3A] hover:border-[#555]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full bg-[#1F1F1F] p-6 rounded-xl border border-[#3A3A3A] space-y-3">
            <p className="text-white text-base font-medium">Permissões automáticas do perfil</p>
            <div className="space-y-1">
              <p className="text-[#22C55E] text-sm font-bold">{perfil}</p>
              {getPermissoes(perfil).map((perm, i) => (
                <p key={i} className="text-[#B5B5B5] text-xs flex items-center gap-2">
                  <span className="text-[#22C55E]">✔</span> {perm}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[200px_1fr] gap-8 items-end">
            <div className="space-y-3">
              <label className="text-[#B5B5B5] text-xs">Status do usuário</label>
              <div
                onClick={(): void => setStatusAtivo(!statusAtivo)}
                className={`w-full h-11 rounded-full relative flex items-center px-1 cursor-pointer transition-colors ${statusAtivo ? 'bg-[#22C55E]' : 'bg-[#3A3A3A]'}`}
              >
                {/* Ajustado: translate-x-[150px] -> translate-x-37.5 */}
                <div
                  className={`w-9 h-9 bg-white rounded-full shadow-md transition-transform duration-300 ${statusAtivo ? 'translate-x-37.5' : 'translate-x-0'}`}
                />
                <span
                  className={`absolute ${statusAtivo ? 'left-6 text-white' : 'right-6 text-[#777]'} text-sm font-bold`}
                >
                  {statusAtivo ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>

            <div className="h-24 bg-[#1F1F1F] border border-[#3A3A3A] rounded-xl p-4 flex flex-col justify-center">
              <p className="text-[#22C55E] text-sm font-bold flex items-center gap-2">
                <span>ℹ️</span> Importante
              </p>
              <p className="text-[#B5B5B5] text-xs mt-1">
                O usuário poderá alterar a senha no primeiro acesso.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-[#252525] border-t border-[#3A3A3A] flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-40 h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-lg text-[#B5B5B5] text-sm font-medium hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleCriar}
            className="w-60 h-12 bg-[#22C55E] hover:bg-green-600 rounded-lg text-white text-sm font-bold shadow-lg shadow-green-900/20 transition-all active:scale-95"
          >
            Criar usuário
          </button>
        </div>
      </div>
    </div>
  )
}
