'use client'

export default function OffersPage() {
  const mockOffers = [
    { id: '1', name: 'VPN Pro Annual', network: 'TradingMate', payout: '$45.50', cap: 'Unlimited', status: 'Active' },
    { id: '2', name: 'Crypto Wallet Signup', network: 'NetworkX', payout: '$32.00', cap: '100/day', status: 'Active' },
    { id: '3', name: 'Gaming App Install', network: 'MobileApps', payout: '$2.50', cap: '500/day', status: 'Paused' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Offers</p>
        <h2 className="mt-2 text-3xl font-bold">Available offers</h2>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Active offers</h3>
          <button className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400">
            Browse all offers
          </button>
        </div>
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-800">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-300">
              <tr>
                <th className="px-4 py-3">Offer Name</th>
                <th className="px-4 py-3">Network</th>
                <th className="px-4 py-3">Payout</th>
                <th className="px-4 py-3">Daily Cap</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {mockOffers.map((offer) => (
                <tr key={offer.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-medium">{offer.name}</td>
                  <td className="px-4 py-3 text-slate-400">{offer.network}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-400">{offer.payout}</td>
                  <td className="px-4 py-3">{offer.cap}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      offer.status === 'Active'
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : 'bg-slate-700 text-slate-300'
                    }`}>
                      {offer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
