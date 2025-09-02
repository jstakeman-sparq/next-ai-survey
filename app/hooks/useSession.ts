"use client"

import { useState, useEffect } from "react"

export function useSession() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch('/api/auth/session')
        if (response.ok) {
          const sessionData = await response.json()
          setSession(sessionData)
        } else {
          setSession(null)
        }
      } catch (error) {
        console.error('Error fetching session:', error)
        setSession(null)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [])

  return { session, loading }
}