"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import AdminHeader from "./AdminHeader"
import SurveyForm from "./SurveyForm"
import SurveyList from "./SurveyList"

interface AdminDashboardProps {
  user: any
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) {
      router.push("/admin/login")
      return
    }
  }, [session, status, router])

  const handleSurveyCreated = () => {
    // Trigger refresh of survey list
    setRefreshTrigger(prev => prev + 1)
  }

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated (will redirect)
  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={session?.user} />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Manage surveys and view analytics for your AI readiness assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Create New Survey
              </h2>
              <SurveyForm onSurveyCreated={handleSurveyCreated} />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Existing Surveys
              </h2>
              <SurveyList key={refreshTrigger} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}