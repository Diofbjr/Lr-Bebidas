/* eslint-disable prettier/prettier */
import { JSX, useState } from 'react'

interface ModalTrocarSenhaProps {
  isOpen: boolean
  onClose: () => void
  onSave: (novaSenha: string) => void
}

export default function ModalTrocarSenha({
  isOpen,
  onClose,
  onSave
}: ModalTrocarSenhaProps): JSX.Element | null {
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  if (!isOpen) return null

  // Validações de segurança para feedback visual
  const temOitoCaracteres = senha.length >= 8
  const temNumero = /\d/.test(senha)
  const temLetra = /[a-zA-Z]/.test(senha)
  const senhasCoincidem = senha === confirmarSenha && senha !== ''

  const handleSalvar = (): void => {
    if (temOitoCaracteres && temNumero && temLetra && senhasCoincidem) {
      onSave(senha)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300 font-inter">
      {/* Container: w-160 equivale a 640px */}
      <div className="w-160 bg-[#2A2A2A] rounded-2xl shadow-2xl flex flex-col border border-[#3A3A3A] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-10 py-8 border-b border-[#3A3A3A] bg-[#252525]">
          <h3 className="text-white text-2xl font-bold">Trocar Senha</h3>
        </div>

        <div className="p-10 space-y-6">
          {/* Alerta de Segurança */}
          <div className="bg-[#1F1F1F] border border-[#FACC15]/30 p-4 rounded-xl">
            <p className="text-[#FACC15] text-sm flex items-center gap-2 font-medium">
              <span className="text-lg">⚠</span> Por segurança, defina uma nova senha para continuar
            </p>
          </div>

          {/* Campos de Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[#B5B5B5] text-xs font-semibold uppercase tracking-wider">
                Nova senha *
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e): void => setSenha(e.target.value)}
                placeholder="••••••••••"
                className="w-full h-11 bg-[#1F1F1F] border border-[#3A3A3A] rounded-lg px-4 text-white text-sm outline-none focus:border-[#22C55E] transition-all placeholder:text-[#444]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[#B5B5B5] text-xs font-semibold uppercase tracking-wider">
                Confirmar nova senha *
              </label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e): void => setConfirmarSenha(e.target.value)}
                placeholder="••••••••••"
                className={`w-full h-11 bg-[#1F1F1F] border rounded-lg px-4 text-white text-sm outline-none transition-all placeholder:text-[#444] ${
                  confirmarSenha && !senhasCoincidem
                    ? 'border-red-500/50 focus:border-red-500'
                    : 'border-[#3A3A3A] focus:border-[#22C55E]'
                }`}
              />
            </div>
          </div>

          {/* Requisitos Visuais */}
          <div className="bg-[#1F1F1F] border border-[#3A3A3A] p-6 rounded-xl space-y-3">
            <p className="text-white text-sm font-bold mb-1">Requisitos de segurança</p>
            <div className="space-y-2.5">
              <RequisitoItem check={temOitoCaracteres} texto="Mínimo 8 caracteres" />
              <RequisitoItem check={temNumero} texto="Pelo menos 1 número" />
              <RequisitoItem check={temLetra} texto="Pelo menos 1 letra" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-[#252525] border-t border-[#3A3A3A] flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-40 h-12 bg-[#1F1F1F] border border-[#3A3A3A] rounded-lg text-[#B5B5B5] text-sm font-bold hover:text-white hover:bg-[#252525] transition-all"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSalvar}
            disabled={!senhasCoincidem || !temOitoCaracteres || !temNumero || !temLetra}
            className={`w-55 h-12 rounded-lg text-white text-sm font-bold shadow-lg transition-all active:scale-95 ${
              senhasCoincidem && temOitoCaracteres && temNumero && temLetra
                ? 'bg-[#22C55E] hover:bg-green-600'
                : 'bg-green-900/20 text-white/20 cursor-not-allowed border border-white/5'
            }`}
          >
            Salvar nova senha
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Sub-componente para os itens de requisito para manter o código limpo
 */
function RequisitoItem({ check, texto }: { check: boolean; texto: string }): JSX.Element {
  return (
    <p
      className={`text-xs flex items-center gap-3 transition-colors duration-300 ${
        check ? 'text-[#22C55E]' : 'text-[#777]'
      }`}
    >
      <span
        className={`flex items-center justify-center w-4 h-4 rounded-full border ${
          check ? 'border-[#22C55E] bg-[#22C55E]/10' : 'border-[#444]'
        }`}
      >
        {check ? '✓' : ''}
      </span>
      {texto}
    </p>
  )
}
