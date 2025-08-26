import { useState, useEffect } from "react"
import { auth } from "@/auth"

export function useSession() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    // In development mode, return a mock session if needed
    if (process.env.NODE_ENV !== 'production') {
      setSession(null)
      return
    }

    // In production, get the actual session
    auth().then(setSession).catch(() => setSession(null))
  }, [])

  return session
}