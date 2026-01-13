import { JSX } from 'react'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps): JSX.Element {
  return (
    <header className="absolute left-65 top-0 w-[calc(100%-260px)] h-16 flex items-center px-10 border-b border-[#3A3A3A] bg-[#1F1F1F] z-10">
      <h2 className="text-white font-inter text-2xl font-bold">{title}</h2>
    </header>
  )
}
