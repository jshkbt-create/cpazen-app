import { useQuery } from '@tanstack/react-query'

export const useNotifications = () => {
  return useQuery(['notifications'], async () => {
    const res = await fetch('/api/notifications')
    return res.json()
  })
}
