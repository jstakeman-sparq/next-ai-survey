"use client"

import { useState, useEffect } from "react"
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"
import AdminHeader from "./AdminHeader"
import SurveyForm from "./SurveyForm"
import SurveyList from "./SurveyList"

interface AdminDashboardProps {
  user: any
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  // const { data: session, status } = useSession()
  // const router = useRouter()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleSurveyCreated = () => {
    // Trigger refresh of survey list
    setRefreshTrigger(prev => prev + 1)
  }

  // Temporarily disabled authentication for debugging

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={undefined} />
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