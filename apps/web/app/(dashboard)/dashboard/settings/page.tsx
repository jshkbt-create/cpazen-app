'use client'

import { useAuth } from '@/hooks/useAuth'

export default function SettingsPage() {
  const { user, logout } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Settings</p>
        <h2 className="mt-2 text-3xl font-bold">Account settings</h2>
      </div>

      <div className="grid gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold">Account information</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm text-slate-400">Email</label>
              <p className="mt-1 text-slate-100">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm text-slate-400">User ID</label>
              <p className="mt-1 font-mono text-sm text-slate-400">{user?.id}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold">API Keys</h3>
          <p className="mt-2 text-sm text-slate-400">Manage your API keys for programmatic access.</p>
          <button className="mt-4 rounded-md border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800">
            Generate API Key
          </button>
        </div>

        <div className="rounded-2xl border border-rose-900/30 bg-rose-950/30 p-6">
          <h3 className="text-lg font-semibold text-rose-300">Danger Zone</h3>
          <p className="mt-2 text-sm text-slate-400">Permanently delete your account and all associated data.</p>
          <button className="mt-4 rounded-md bg-rose-600/20 px-4 py-2 text-sm text-rose-400 hover:bg-rose-600/30">
            Delete account
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={logout}
          className="rounded-md bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
