"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export function useRealtime() {
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    const channel = supabase
      .channel('cpazen-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'conversions' },
        (payload) => {
          setActivities((prev) => [
            {
              id: payload.new.id,
              type: 'conversion',
              message: 'New conversion received',
              timestamp: new Date(),
            },
            ...prev,
          ].slice(0, 25))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { activities }
}
