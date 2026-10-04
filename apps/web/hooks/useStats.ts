"use client"

import { useQuery } from '@tanstack/react-query'

export function useStats(params: { days?: number; campaignId?: string } = {}) {
  const { days = 7, campaignId } = params

  return useQuery({
    queryKey: ['stats', days, campaignId],
    queryFn: async () => {
      const params = new URLSearchParams({ days: String(days) })
      if (campaignId) params.set('campaignId', campaignId)

      const res = await fetch(`/api/stats?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch stats')
      return res.json()
    },
    refetchInterval: 30000,
  })
}
