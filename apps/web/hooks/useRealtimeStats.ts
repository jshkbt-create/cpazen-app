"use client"

import { useEffect, useState } from 'react'

export function useRealtimeStats() {
  const [stats, setStats] = useState({
    todayClicks: 0,
    todayConversions: 0,
    todayRevenue: 0,
    cr: 0,
    epc: 0,
    avgBotScore: 0,
    clicksChange: 0,
    conversionsChange: 0,
    revenueChange: 0,
    crChange: 0,
    epcChange: 0,
    botScoreChange: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        todayClicks: prev.todayClicks + 1,
        todayConversions: prev.todayConversions + (Math.random() > 0.8 ? 1 : 0),
        todayRevenue: prev.todayRevenue + Math.round(Math.random() * 20),
      }))
    }, 10000)

    return () => clearInterval(timer)
  }, [])

  return stats
}
