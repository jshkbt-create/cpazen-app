import { corsHeaders } from '../_shared/cors.ts'
import { getSupabaseClient } from '../_shared/supabaseClient.ts'

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = getSupabaseClient()
    const body = await req.text()

    // Basic logging — store raw postbacks to a table or process as needed
    // This is a stub; replace with your complete implementation.
    console.log('received postback:', body)

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (err) {
    console.error('postback error', err)
    return new Response(JSON.stringify({ error: 'internal' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
}
