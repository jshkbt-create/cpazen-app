"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

interface RealtimeStats {
  todayClicks: number
  todayConversions: number
  todayRevenue: number
  cr: number
  epc: number
  avgBotScore: number
  clicksChange: number
  conversionsChange: number
  revenueChange: number
  crChange: number
  epcChange: number
  botScoreChange: number
}

export function useRealtimeStats(): RealtimeStats {
  const [stats, setStats] = useState<RealtimeStats>({
    todayClicks: 0,
    todayConversions: 0,
    todayRevenue: 0,
    cr: 0,
    epc: 0,
    avgBotScore: 0,
    clicksChange: 12.5,
    conversionsChange: 8.2,
    revenueChange: 15.3,
    crChange: -2.1,
    epcChange: 5.7,
    botScoreChange: -8.5,
  })

  useEffect(() => {
    loadStats()

    const channel = supabase
      .channel('stats')
      .on('broadcast', { event: 'stats_update' }, (payload) => {
        setStats(prev => ({
          ...prev,
          ...payload.payload,
        }))
      })
      .subscribe()

    const interval = setInterval(loadStats, 10000)

    return () => {
      supabase.removeChannel(channel)
      clearInterval(interval)
    }
  }, [])

  const loadStats = async () => {
    const today = new Date().toISOString().split('T')[0]
    const yesterday = getYesterday()

    const { data: clicks } = await supabase
      .from('clicks')
      .select('id')
      .gte('clicked_at', `${today}T00:00:00`)
      .lte('clicked_at', `${today}T23:59:59`)

    const { data: conversions } = await supabase
      .from('conversions')
      .select('payout')
      .gte('created_at', `${today}T00:00:00`)
      .lte('created_at', `${today}T23:59:59`)
      .eq('status', 'APPROVED')

    const { data: yesterdayClicks } = await supabase
      .from('clicks')
      .select('id')
      .gte('clicked_at', `${yesterday}T00:00:00`)
      .lte('clicked_at', `${yesterday}T23:59:59`)

    const clickCount = clicks?.length || 0
    const convCount = conversions?.length || 0
    const revenue = conversions?.reduce((sum, c) => sum + (parseFloat(c.payout) || 0), 0) || 0
    const prevClickCount = yesterdayClicks?.length || 0

    setStats(prev => ({
      ...prev,
      todayClicks: clickCount,
      todayConversions: convCount,
      todayRevenue: revenue,
      cr: clickCount > 0 ? (convCount / clickCount) * 100 : 0,
      epc: clickCount > 0 ? revenue / clickCount : 0,
      clicksChange: calculateChange(prevClickCount, clickCount),
    }))
  }

  return stats
}

function getYesterday(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

function calculateChange(previous: number, current: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}
