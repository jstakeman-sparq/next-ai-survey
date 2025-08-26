import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminHeader from "./components/AdminHeader"
import SurveyForm from "./components/SurveyForm"
import SurveyList from "./components/SurveyList"

export default async function AdminPage() {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={session.user} />
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
              <SurveyForm />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Existing Surveys
              </h2>
              <SurveyList />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}