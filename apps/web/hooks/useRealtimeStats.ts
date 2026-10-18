import { useQuery } from '@tanstack/react-query'

export const useRealtimeStats = (campaignId: string) => {
  return useQuery(['realtimeStats', campaignId], async () => {
    const res = await fetch(`/api/stats?campaignId=${campaignId}`)
    return res.json()
  })
}
