import { stripe } from '../../../../lib/stripe'

export async function POST(req: Request) {
  try {
    // In production verify signature using stripe.webhooks.constructEvent with raw body and signature header
    const payload = await req.json().catch(() => ({}))
    console.log('received stripe webhook:', payload)
    // Handle webhook types as needed
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('stripe/webhook error', err)
    return new Response(JSON.stringify({ ok: false, error: 'internal' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
