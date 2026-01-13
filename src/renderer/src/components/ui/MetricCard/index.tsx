import { JSX } from 'react'

interface MetricCardProps {
  label: string
  value: string
  color: string
}

export function MetricCard({ label, value, color }: MetricCardProps): JSX.Element {
  return (
    <div className="w-70 h-30 bg-[#2A2A2A] rounded-xl p-5 border border-[#3A3A3A] shadow-md transition-all hover:border-[#444] hover:-translate-y-1">
      <p className="text-[#777] text-[10px] font-bold uppercase tracking-widest">{label}</p>
      <p className={`${color} font-inter text-3xl font-bold mt-2 font-mono tracking-tighter`}>
        {value}
      </p>
    </div>
  )
}
