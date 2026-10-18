import { prisma } from '../../../../lib/prisma'

export async function POST(req: Request) {
  try {
    const payload = await req.json().catch(() => ({}))

    // Placeholder: enqueue/generate insights based on payload — here we create a scheduled Report row or AiInsight stub
    const insight = await prisma.aiInsight.create({
      data: {
        userId: (payload.userId as string) ?? 'system',
        campaignId: payload.campaignId ?? null,
        type: 'OPTIMIZATION',
        title: payload.title ?? 'Generated Insight',
        description: JSON.stringify(payload).slice(0, 1000),
        severity: 'INFO',
        metrics: {},
        confidence: 0.5,
      },
    })

    return new Response(JSON.stringify({ ok: true, insight }), { status: 201, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('insights/generate POST error', err)
    return new Response(JSON.stringify({ ok: false, error: 'internal' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
