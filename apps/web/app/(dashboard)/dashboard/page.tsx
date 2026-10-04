'use client'

import { useAuth } from '@/hooks/useAuth'
import { useStats } from '@/hooks/useStats'
import { formatCurrency, formatPercent } from '@/lib/utils/stats'

const mockCampaignId = 'demo-campaign-1'

export default function DashboardPage() {
  const { user } = useAuth()
  const { stats } = useStats(mockCampaignId)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Overview</p>
        <h2 className="mt-2 text-3xl font-bold">Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Clicks</p>
          <p className="mt-3 text-3xl font-bold">{stats.totalClicks.toLocaleString()}</p>
          <p className="mt-2 text-sm text-emerald-400">+12.4% vs last week</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Conversions</p>
          <p className="mt-3 text-3xl font-bold">{stats.totalConversions.toLocaleString()}</p>
          <p className="mt-2 text-sm text-emerald-400">+8.2% vs last week</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Revenue</p>
          <p className="mt-3 text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
          <p className="mt-2 text-sm text-emerald-400">+15.3% vs last week</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">ROI</p>
          <p className="mt-3 text-3xl font-bold">{formatPercent(stats.roi)}</p>
          <p className="mt-2 text-sm text-emerald-400">+3.1% vs last week</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-lg font-semibold">Revenue trend</h3>
          <div className="mt-6 h-52 rounded-xl bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 p-4">
            <div className="flex h-full items-end gap-2">
              {[35, 42, 38, 60, 58, 72, 84, 78, 91, 105].map((bar, index) => (
                <div key={index} className="flex-1 rounded-t-lg bg-gradient-to-t from-cyan-500 to-blue-400" style={{ height: `${bar}%` }} />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-lg font-semibold">AI insights</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">🎯 Campaign trending 24% above forecast</li>
            <li className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">⚠️ Three click clusters auto-filtered for fraud</li>
            <li className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">📱 Mobile traffic is 3.2x most performant</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
