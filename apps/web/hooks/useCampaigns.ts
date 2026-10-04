"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export function useCampaigns() {
  const queryClient = useQueryClient()

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await fetch("/api/campaigns")
      if (!res.ok) throw new Error("Failed to fetch campaigns")
      return res.json()
    },
  })

  const toggleStatus = useMutation({
    mutationFn: async (campaignId: string) => {
      const res = await fetch(`/api/campaigns/${campaignId}/toggle`, {
        method: "POST",
      })
      if (!res.ok) throw new Error("Failed to toggle campaign")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] })
    },
  })

  return {
    campaigns,
    isLoading,
    toggleStatus: toggleStatus.mutate,
  }
}
