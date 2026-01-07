import { useState, JSX } from 'react'

interface LoginProps {
  onLoginSuccess: () => void
}

export default function Login({ onLoginSuccess }: LoginProps): JSX.Element {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    // Validação simples
    if (user.trim() === 'admin' && password === '123') {
      setError(false)
      onLoginSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#1F1F1F] flex items-center justify-center px-4">
      <div className="w-full max-w-105 bg-[#2A2A2A] rounded-2xl p-8 shadow-lg">
        <h1 className="text-white text-2xl font-bold text-center">LR Bebidas</h1>
        <p className="text-[#B5B5B5] text-sm text-center mt-1">Acesso ao sistema</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-[#B5B5B5] text-xs mb-1">Usuário</label>
            <input
              type="text"
              value={user}
              onChange={(e): void => setUser(e.target.value)}
              placeholder="Digite seu usuário"
              className="w-full h-10 px-3 rounded-md bg-[#1F1F1F] border border-[#3A3A3A] text-sm text-white outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-[#B5B5B5] text-xs mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e): void => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full h-10 px-3 rounded-md bg-[#1F1F1F] border border-[#3A3A3A] text-sm text-white outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 rounded-md bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors cursor-pointer"
          >
            Entrar
          </button>

          {error && (
            <p className="text-[#EF4444] text-xs text-center mt-2 animate-bounce">
              Usuário ou senha inválidos
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
