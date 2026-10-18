import Link from 'next/link'
import { APP_NAME } from '../lib/constants'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-slate-100 p-4">
      <div className="mb-6 text-lg font-bold">{APP_NAME}</div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/campaigns">Campaigns</Link>
          </li>
          <li>
            <Link href="/offers">Offers</Link>
          </li>
          <li>
            <Link href="/reports">Reports</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
