import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col">
        <header className="border-b border-slate-800 bg-slate-950/80 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Cpazen</p>
              <h1 className="text-lg font-semibold">Performance dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-300">
                {user.email ?? 'member@cpazen.com'}
              </span>
            </div>
          </div>
        </header>
        <div className="flex flex-1">
          <aside className="w-72 border-r border-slate-800 bg-slate-900/80 p-5">
            <nav className="space-y-2 text-sm text-slate-300">
              <a className="block rounded-md bg-slate-800 px-3 py-2 hover:bg-slate-700" href="/dashboard">Overview</a>
              <a className="block rounded-md px-3 py-2 hover:bg-slate-800" href="/dashboard/campaigns">Campaigns</a>
              <a className="block rounded-md px-3 py-2 hover:bg-slate-800" href="/dashboard/offers">Offers</a>
              <a className="block rounded-md px-3 py-2 hover:bg-slate-800" href="/dashboard/reports">Reports</a>
              <a className="block rounded-md px-3 py-2 hover:bg-slate-800" href="/dashboard/settings">Settings</a>
            </nav>
          </aside>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
