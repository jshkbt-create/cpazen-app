import React from 'react'

export default function TopBar({ title }: { title?: string }) {
  return (
    <header className="flex items-center justify-between p-4 bg-white/5 text-slate-100">
      <h1 className="text-xl font-semibold">{title ?? 'Dashboard'}</h1>
      <div className="flex items-center gap-4">
        <div className="text-sm">Signed in</div>
        <img src="/avatar-placeholder.png" alt="avatar" className="h-8 w-8 rounded-full" />
      </div>
    </header>
  )
}
