import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Cpazen</p>
          <h1 className="mt-6 text-5xl font-bold tracking-tight">AI-powered acquisition intelligence</h1>
          <p className="mt-6 text-lg text-slate-300">
            Route every click to revenue with performance tracking, fraud detection, live reporting, and offer optimization.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/login" className="rounded-lg bg-cyan-500 px-5 py-3 font-medium text-slate-950 hover:bg-cyan-400">Login</Link>
            <Link href="/register" className="rounded-lg border border-slate-700 px-5 py-3 font-medium text-slate-100 hover:bg-slate-800">Create account</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
