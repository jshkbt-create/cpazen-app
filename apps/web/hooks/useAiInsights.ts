import { useQuery } from '@tanstack/react-query'
import { prisma } from '../lib/prisma'

export const useAiInsights = () => {
  return useQuery(['aiInsights'], async () => {
    // Placeholder: fetch from API route
    const res = await fetch('/api/insights')
    return res.json()
  })
}
