"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

interface RealtimeActivity {
  id: string
  type: "click" | "conversion" | "revenue" | "alert" | "insight" | "bot"
  message: string
  details?: string
  value?: string
  timestamp: Date
}

export function useRealtime() {
  const [activities, setActivities] = useState<RealtimeActivity[]>([])

  useEffect(() => {
    const channel = supabase
      .channel('public:conversions')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'conversions' },
        (payload) => {
          const newActivity: RealtimeActivity = {
            id: payload.new.id,
            type: payload.new.status === 'FRAUD' ? 'bot' : 'conversion',
            message: `New ${payload.new.status.toLowerCase()} conversion`,
            details: `Campaign: ${payload.new.campaign_id}`,
            value: `$${payload.new.payout}`,
            timestamp: new Date(),
          }
          setActivities(prev => [newActivity, ...prev].slice(0, 100))
        }
      )
      .subscribe()

    loadRecentActivities()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const loadRecentActivities = async () => {
    const { data: conversions } = await supabase
      .from('conversions')
      .select('*, campaigns(name)')
      .order('created_at', { ascending: false })
      .limit(20)

    const formatted: RealtimeActivity[] = [
      ...(conversions?.map(c => ({
        id: c.id,
        type: (c.status === 'FRAUD' ? 'bot' : 'conversion') as RealtimeActivity['type'],
        message: `New ${c.status.toLowerCase()} conversion`,
        details: `Campaign: ${c.campaigns?.name || c.campaign_id}`,
        value: `$${c.payout}`,
        timestamp: new Date(c.created_at),
      })) || []),
    ].slice(0, 50)

    setActivities(formatted)
  }

  return { activities }
}
