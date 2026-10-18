import React from 'react'
import { PLANS } from '../lib/constants'

export default function PricingCards() {
  const plans = Object.entries(PLANS)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {plans.map(([key, plan]) => (
        <div key={key} className="p-4 bg-white/5 rounded">
          <div className="text-sm text-slate-400">{plan.name}</div>
          <div className="text-2xl font-bold">{plan.events === Infinity ? 'Unlimited' : plan.events}</div>
          <div className="mt-3">
            <button className="px-3 py-2 bg-sky-600 rounded">Choose</button>
          </div>
        </div>
      ))}
    </div>
  )
}
