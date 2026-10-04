'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/utils/api-client'

export function useCampaigns(userId: string | undefined) {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return

    const fetchCampaigns = async () => {
      try {
        setLoading(true)
        const data = await apiClient.fetchCampaigns(userId)
        setCampaigns(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch campaigns')
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [userId])

  return { campaigns, loading, error }
}
