import React from 'react'

export default function CampaignTable({ campaigns }: { campaigns: any[] }) {
  return (
    <div className="bg-white/5 rounded overflow-hidden">
      <table className="w-full text-sm">
        <thead className="text-slate-400">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Payout</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c.id} className="border-t border-white/5">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.status}</td>
              <td className="p-2">{c.payout}</td>
              <td className="p-2">View</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
