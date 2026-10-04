"use client"

import { useQuery } from "@tanstack/react-query"

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await fetch("/api/notifications")
      if (!res.ok) throw new Error("Failed to fetch notifications")
      return res.json()
    },
    refetchInterval: 60000,
  })
}
