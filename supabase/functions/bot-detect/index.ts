import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

interface BotDetectionRequest {
  clickId: string
  ip: string
  userAgent: string
  referrer?: string
  mouseData?: {
    movements: number
    clicks: number
    scrollDepth: number
    timeOnPage: number
  }
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const body: BotDetectionRequest = await req.json()

  let score = 0
  const flags: string[] = []

  // Check user agent
  const ua = body.userAgent.toLowerCase()
  const botPatterns = [
    'bot', 'crawler', 'spider', 'scrape', 'headless',
    'puppeteer', 'selenium', 'playwright', 'phantomjs'
  ]
  if (botPatterns.some(p => ua.includes(p))) {
    score += 40
    flags.push('suspicious_ua')
  }

  // Check for missing mouse data
  if (!body.mouseData || body.mouseData.movements < 5) {
    score += 30
    flags.push('no_mouse_activity')
  }

  // Check time on page
  if (body.mouseData && body.mouseData.timeOnPage < 2000) {
    score += 20
    flags.push('quick_exit')
  }

  // Cap at 100
  score = Math.min(100, score)

  // Update click record
  try {
    await supabase
      .from('clicks')
      .update({
        bot_score: score,
        fraud_flags: flags,
        quality_score: Math.max(0, 100 - score)
      })
      .eq('click_id', body.clickId)
  } catch (error) {
    console.error('Failed to update click:', error)
  }

  return new Response(
    JSON.stringify({
      click_id: body.clickId,
      bot_score: score,
      fraud_flags: flags,
      is_bot: score > 80,
      quality_score: Math.max(0, 100 - score)
    }),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    }
  )
})
