"use client"

import { useQuery } from "@tanstack/react-query"

interface StatsParams {
  days?: number
  campaignId?: string
}

export function useStats(params: StatsParams = {}) {
  const { days = 7, campaignId } = params

  return useQuery({
    queryKey: ["stats", days, campaignId],
    queryFn: async () => {
      const searchParams = new URLSearchParams()
      searchParams.set("days", String(days))
      if (campaignId) searchParams.set("campaignId", campaignId)

      const res = await fetch(`/api/stats?${searchParams}`)
      if (!res.ok) throw new Error("Failed to fetch stats")
      return res.json()
    },
    refetchInterval: 30000,
  })
}
