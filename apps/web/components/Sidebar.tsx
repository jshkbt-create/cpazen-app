'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Megaphone, 
  ListOrdered, 
  BarChart3, 
  Settings, 
  CreditCard, 
  HelpCircle 
} from 'lucide-react'
import { clsx } from 'clsx'

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Campaigns', href: '/dashboard/campaigns', icon: Megaphone },
  { label: 'Offers', href: '/dashboard/offers', icon: ListOrdered },
  { label: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 font-black text-xl">C</div>
        <span className="text-xl font-bold tracking-tight text-slate-100">Cpazen</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-8">
        <div>
          <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-3">Main Menu</p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className={clsx(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.2)]" 
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    )}
                  >
                    <Icon className={clsx("h-4 w-4", isActive ? "text-cyan-400" : "text-slate-500")} />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-900/30">
        <Link 
          href="/docs" 
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition"
        >
          <HelpCircle className="h-4 w-4 text-slate-500" />
          Documentation
        </Link>
      </div>
    </aside>
  )
}
