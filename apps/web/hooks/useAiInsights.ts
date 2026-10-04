"use client"

import { useQuery } from "@tanstack/react-query"

export function useAiInsights() {
  return useQuery({
    queryKey: ["ai-insights"],
    queryFn: async () => {
      const res = await fetch("/api/insights")
      if (!res.ok) throw new Error("Failed to fetch insights")
      return res.json()
    },
    refetchInterval: 60000,
  })
}
