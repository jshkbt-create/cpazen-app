export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Campaigns</p>
        <h2 className="mt-2 text-3xl font-bold">Manage your campaigns</h2>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Active campaigns</h3>
          <button className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950">New campaign</button>
        </div>
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-800">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-300">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Spend</th>
                <th className="px-4 py-3">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              <tr>
                <td className="px-4 py-3">Q4 Brazil</td>
                <td className="px-4 py-3"><span className="rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-300">Active</span></td>
                <td className="px-4 py-3">$1,420</td>
                <td className="px-4 py-3">$3,860</td>
              </tr>
              <tr>
                <td className="px-4 py-3">SaaS Trial</td>
                <td className="px-4 py-3"><span className="rounded-full bg-amber-500/15 px-2 py-1 text-amber-300">Paused</span></td>
                <td className="px-4 py-3">$620</td>
                <td className="px-4 py-3">$1,240</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
