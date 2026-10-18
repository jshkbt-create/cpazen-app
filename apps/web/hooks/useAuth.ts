import { useState, useEffect } from 'react'
import { createClient } from '../lib/supabase/client'

export const useAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const supabase = createClient()
    const { data: auth } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      auth.subscription.unsubscribe()
    }
  }, [])

  return { user }
}
