"use client"

import { useState, useEffect } from "react"

export function useSession() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSession() {
      console.log('[useSession] Fetching session data...')
      try {
        const response = await fetch('/api/auth/session')
        console.log('[useSession] Session API response status:', response.status)
        
        if (response.ok) {
          const sessionData = await response.json()
          console.log('[useSession] Session data received:', sessionData)
          setSession(sessionData)
        } else {
          console.log('[useSession] Session API response not ok, setting session to null')
          setSession(null)
        }
      } catch (error) {
        console.error('[useSession] Error fetching session:', error)
        setSession(null)
      } finally {
        console.log('[useSession] Session fetch complete, loading set to false')
        setLoading(false)
      }
    }

    fetchSession()
  }, [])

  return { session, loading }
}