import React from 'react'

export default function AiInsightPanel({ insight, onApply, onDismiss }: { insight: any; onApply?: () => void; onDismiss?: () => void }) {
  return (
    <div className="p-4 bg-white/5 rounded">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-slate-400">{insight.type}</div>
          <h3 className="text-lg font-semibold">{insight.title}</h3>
          <p className="text-sm text-slate-300">{insight.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <button className="px-3 py-1 bg-green-600 rounded" onClick={onApply}>Apply</button>
          <button className="px-3 py-1 bg-red-600 rounded" onClick={onDismiss}>Dismiss</button>
        </div>
      </div>
    </div>
  )
}
