import { useState, JSX, FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

interface LoginProps {
  onLoginSuccess: () => void
}

export default function Login({ onLoginSuccess }: LoginProps): JSX.Element {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()

    // Futuramente, esta lógica poderá ir para um hook useAuth()
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
        <header className="text-center mb-8">
          <h1 className="text-white text-2xl font-bold">LR Bebidas</h1>
          <p className="text-[#B5B5B5] text-sm mt-1">Acesso ao sistema</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Usuário"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Digite seu usuário"
          />

          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />

          <Button type="submit">Entrar</Button>

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
