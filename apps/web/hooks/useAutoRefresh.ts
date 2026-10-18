import { useEffect } from 'react'

export const useAutoRefresh = (callback: () => void, intervalMs: number = 30000) => {
  useEffect(() => {
    const id = setInterval(callback, intervalMs)
    return () => clearInterval(id)
  }, [callback, intervalMs])
}
