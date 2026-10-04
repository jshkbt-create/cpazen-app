'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/utils/api-client'

export function useAiInsights(userId: string | undefined) {
  const [insights, setInsights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    const fetchInsights = async () => {
      try {
        setLoading(true)
        const data = await apiClient.fetchAiInsights(userId)
        setInsights(data)
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [userId])

  return { insights, loading }
}
