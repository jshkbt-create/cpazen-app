import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? 'https://example.supabase.co',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? 'example-service-role'
)

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const body = await req.json().catch(() => ({ }))
  const score = Math.min(100, Number(body.botScore ?? 0))

  try {
    await supabase.from('clicks').update({
      bot_score: score,
      fraud_flags: score > 80 ? ['suspicious_traffic'] : [],
      quality_score: Math.max(0, 100 - score),
    }).eq('click_id', body.clickId ?? '')
  } catch (error) {
    console.error('bot-detect error', error)
  }

  return new Response(JSON.stringify({ ok: true, botScore: score }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})
