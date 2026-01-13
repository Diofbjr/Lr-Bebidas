import { InputHTMLAttributes, JSX } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, ...rest }: InputProps): JSX.Element {
  return (
    <div className="w-full">
      {label && <label className="block text-[#B5B5B5] text-xs mb-1">{label}</label>}
      <input
        className="w-full h-10 px-3 rounded-md bg-[#1F1F1F] border border-[#3A3A3A] text-sm text-white outline-none focus:ring-2 focus:ring-green-500"
        {...rest}
      />
    </div>
  )
}
