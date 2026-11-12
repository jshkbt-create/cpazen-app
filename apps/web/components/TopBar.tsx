'use client'

import Link from 'next/link'
import { User, Bell, Search } from 'lucide-react'

export default function TopBar({ title = 'Performance Dashboard' }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-medium">Cpazen</p>
          <h1 className="text-lg font-semibold text-slate-100">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search campaigns..." 
            className="w-64 rounded-full border border-slate-800 bg-slate-900 pl-10 pr-4 py-1.5 text-sm text-slate-300 outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50"
          />
        </div>
        
        <button className="relative rounded-full p-2 text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-500 border-2 border-slate-950"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-slate-200">User Account</p>
            <p className="text-[10px] text-slate-500">Affiliate Plan</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  )
}
