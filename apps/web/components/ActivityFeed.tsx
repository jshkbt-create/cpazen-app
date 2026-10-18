import React from 'react'

export default function ActivityFeed({ items }: { items: any[] }) {
  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <div key={idx} className="p-2 bg-white/3 rounded">
          <div className="text-sm text-slate-300">{it.title}</div>
          <div className="text-xs text-slate-500">{it.time}</div>
        </div>
      ))}
    </div>
  )
}
