"use client"

import { useCallback, useEffect, useRef, useState } from 'react'

export function useAutoRefresh(intervalSeconds = 30, onRefresh?: () => void) {
  const [isPaused, setIsPaused] = useState(false)
  const [nextRefresh, setNextRefresh] = useState(intervalSeconds)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const trigger = useCallback(() => {
    onRefresh?.()
    setNextRefresh(intervalSeconds)
  }, [intervalSeconds, onRefresh])

  useEffect(() => {
    if (isPaused || intervalSeconds <= 0) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      trigger()
    }, intervalSeconds * 1000)

    const countdown = setInterval(() => {
      setNextRefresh((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      clearInterval(countdown)
    }
  }, [intervalSeconds, isPaused, trigger])

  return { isPaused, setIsPaused, nextRefresh, trigger }
}
