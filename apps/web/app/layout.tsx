import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cpazen | AI CPA Offer Tracker',
  description:
    'Track every click, conversion and payout in real time with performance tracking, fraud detection and offer optimization.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50 antialiased">{children}</body>
    </html>
  )
}
