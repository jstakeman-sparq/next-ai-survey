import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminDashboard from "./components/AdminDashboard"

export default async function AdminPage() {
  const session = await auth()

  // Redirect if no session
  if (!session) {
    redirect("/admin/login")
  }

  return <AdminDashboard user={session.user} />
}