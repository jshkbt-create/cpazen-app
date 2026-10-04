import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { priceId } = await request.json().catch(() => ({ priceId: '' }))

  return NextResponse.json({
    ok: true,
    priceId,
    url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/pricing?checkout=mocked`,
  })
}
