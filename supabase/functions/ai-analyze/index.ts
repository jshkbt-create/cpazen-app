import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'

serve(async (_req) => {
  return new Response(JSON.stringify({ ok: true, message: 'ai analyze stub' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})
