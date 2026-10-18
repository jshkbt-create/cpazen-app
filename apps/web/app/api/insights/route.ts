import { prisma } from '../../../lib/prisma'

export async function GET() {
  try {
    const insights = await prisma.aiInsight.findMany({ orderBy: { createdAt: 'desc' }, take: 50 })
    return new Response(JSON.stringify({ ok: true, insights }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('insights GET error', err)
    return new Response(JSON.stringify({ ok: false, error: 'internal' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
