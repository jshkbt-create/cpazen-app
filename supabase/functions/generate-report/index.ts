import { corsHeaders } from '../_shared/cors.ts'
import { getSupabaseClient } from '../_shared/supabaseClient.ts'

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabase = getSupabaseClient()
    const payload = await req.json().catch(() => null)

    // Stub: generate a report or schedule a job
    console.log('generate-report payload:', payload)

    return new Response(JSON.stringify({ ok: true, scheduled: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (err) {
    console.error('generate-report error', err)
    return new Response('internal', { status: 500, headers: corsHeaders })
  }
}
