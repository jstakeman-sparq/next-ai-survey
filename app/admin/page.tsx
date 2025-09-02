"use client"

import { useEffect } from "react"
import AdminDashboard from "./components/AdminDashboard"

export default function AdminPage() {
  // The middleware handles authentication, so we can assume user is authenticated here
  // We'll get user info from the client-side session
  
  useEffect(() => {
    console.log('[AdminPage] Admin page loaded')
  }, [])

  return <AdminDashboard user={null} />
}