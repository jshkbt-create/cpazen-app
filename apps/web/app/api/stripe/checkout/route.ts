import { stripe } from '../../../../lib/stripe'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    // Create a Checkout Session (basic example)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: body.priceId ?? process.env.STRIPE_PRICE_STARTER,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/cancel`,
    })

    return new Response(JSON.stringify({ ok: true, sessionId: session.id }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('stripe/checkout error', err)
    return new Response(JSON.stringify({ ok: false, error: 'internal' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
