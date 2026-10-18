import { prisma } from '../../../../../lib/prisma'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const insight = await prisma.aiInsight.update({ where: { id }, data: { applied: true, appliedAt: new Date() } })
    return new Response(JSON.stringify({ ok: true, insight }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('insights/[id]/apply POST error', err)
    return new Response(JSON.stringify({ ok: false, error: 'not_found_or_internal' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
