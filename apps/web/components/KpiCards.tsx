import React from 'react'

type Kpi = { label: string; value: string | number }

export default function KpiCards({ items }: { items: Kpi[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((k) => (
        <div key={k.label} className="p-4 bg-white/5 rounded">
          <div className="text-sm text-slate-400">{k.label}</div>
          <div className="text-2xl font-bold">{k.value}</div>
        </div>
      ))}
    </div>
  )
}
