import { ButtonHTMLAttributes, ReactNode, JSX } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'danger'
}

export function Button({ children, variant = 'primary', ...rest }: ButtonProps): JSX.Element {
  const variantClasses =
    variant === 'primary' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'

  return (
    <button
      className={`w-full h-10 rounded-md text-white text-sm font-medium transition-colors cursor-pointer ${variantClasses}`}
      {...rest}
    >
      {children}
    </button>
  )
}
