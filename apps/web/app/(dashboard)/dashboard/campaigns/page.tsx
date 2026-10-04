'use client'

import { useAuth } from '@/hooks/useAuth'
import { useCampaigns } from '@/hooks/useCampaigns'

export default function CampaignsPage() {
  const { user } = useAuth()
  const { campaigns, loading } = useCampaigns(user?.id)

  const mockCampaigns = [
    { id: '1', name: 'Q4 Brazil CPA', status: 'Active', spend: '$1,420', revenue: '$3,860', roas: '2.72x' },
    { id: '2', name: 'SaaS Trial Mobile', status: 'Paused', spend: '$620', revenue: '$1,240', roas: '2.0x' },
    { id: '3', name: 'Gaming Install US', status: 'Active', spend: '$2,140', revenue: '$5,820', roas: '2.72x' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Campaigns</p>
        <h2 className="mt-2 text-3xl font-bold">Manage your campaigns</h2>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Active campaigns</h3>
          <button className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400">
            New campaign
          </button>
        </div>
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-800">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-300">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Spend</th>
                <th className="px-4 py-3">Revenue</th>
                <th className="px-4 py-3">ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {mockCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-medium">{campaign.name}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      campaign.status === 'Active'
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : 'bg-slate-700 text-slate-300'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{campaign.spend}</td>
                  <td className="px-4 py-3 text-emerald-400">{campaign.revenue}</td>
                  <td className="px-4 py-3 font-semibold">{campaign.roas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
