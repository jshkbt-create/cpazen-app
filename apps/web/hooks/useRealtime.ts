import { useEffect } from 'react'

export const useRealtime = (onMessage: (data: any) => void) => {
  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_APP_URL?.replace('http', 'ws') + '/realtime')
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      onMessage(data)
    }
    return () => ws.close()
  }, [onMessage])
}
