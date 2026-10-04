'use client'

export default function ReportsPage() {
  const mockReports = [
    { id: '1', name: 'Q4 Performance Summary', created: '2024-10-03', type: 'Performance', rows: 1240 },
    { id: '2', name: 'Conversion Analysis by Geo', created: '2024-10-02', type: 'Conversion', rows: 3450 },
    { id: '3', name: 'Device Performance Report', created: '2024-10-01', type: 'Device', rows: 890 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Reports</p>
        <h2 className="mt-2 text-3xl font-bold">Performance reports</h2>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent reports</h3>
          <button className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400">
            Generate report
          </button>
        </div>
        <div className="mt-6 space-y-3">
          {mockReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/30 p-4 hover:bg-slate-800/60">
              <div>
                <p className="font-medium">{report.name}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {report.type} • {report.rows.toLocaleString()} rows • {report.created}
                </p>
              </div>
              <button className="rounded-md border border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-800">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
