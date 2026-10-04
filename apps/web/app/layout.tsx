import './globals.css'

export const metadata = {
  title: 'Cpazen',
  description: 'AI-powered CPA offer tracking',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
