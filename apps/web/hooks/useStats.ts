'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/utils/api-client'

export interface DashboardStats {
  totalClicks: number
  totalConversions: number
  totalSpend: number
  totalRevenue: number
  roi: number
  ctr: number
}

export function useStats(campaignId?: string) {
  const [stats, setStats] = useState<DashboardStats>({
    totalClicks: 0,
    totalConversions: 0,
    totalSpend: 0,
    totalRevenue: 0,
    roi: 0,
    ctr: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!campaignId) return

    const fetchStats = async () => {
      try {
        setLoading(true)
        const data = await apiClient.fetchCampaignStats(campaignId)
        setStats({
          totalClicks: data.clicks,
          totalConversions: data.conversions,
          totalSpend: 0,
          totalRevenue: 0,
          roi: 0,
          ctr: data.ctr,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [campaignId])

  return { stats, loading }
}
