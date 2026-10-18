import { useQuery } from '@tanstack/react-query'

export const useStats = (campaignId: string) => {
  return useQuery(['stats', campaignId], async () => {
    const res = await fetch(`/api/stats?campaignId=${campaignId}`)
    return res.json()
  })
}
