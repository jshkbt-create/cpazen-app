import { useQuery } from '@tanstack/react-query'

export const useCampaigns = () => {
  return useQuery(['campaigns'], async () => {
    const res = await fetch('/api/campaigns')
    return res.json()
  })
}
