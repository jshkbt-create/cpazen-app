"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface UseAutoRefreshOptions {
  onRefresh?: () => void
}

export function useAutoRefresh(
  key: string,
  intervalSeconds: number = 30,
  options: UseAutoRefreshOptions = {}
) {
  const [isPaused, setIsPaused] = useState(false)
  const [nextRefresh, setNextRefresh] = useState(intervalSeconds)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)

  const trigger = useCallback(() => {
    options.onRefresh?.()
    setNextRefresh(intervalSeconds)
  }, [intervalSeconds, options])

  useEffect(() => {
    if (isPaused || intervalSeconds <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
      return
    }

    intervalRef.current = setInterval(trigger, intervalSeconds * 1000)

    countdownRef.current = setInterval(() => {
      setNextRefresh(prev => {
        if (prev <= 1) return intervalSeconds
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [isPaused, intervalSeconds, trigger])

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev)
    if (isPaused) {
      setNextRefresh(intervalSeconds)
    }
  }, [isPaused, intervalSeconds])

  return {
    isPaused,
    togglePause,
    nextRefresh,
    trigger,
  }
}
