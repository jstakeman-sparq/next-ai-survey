import AdminDashboard from "./components/AdminDashboard"

export default function AdminPage() {
  // The middleware handles authentication, so we can assume user is authenticated here
  // We'll get user info from the client-side session
  return <AdminDashboard user={null} />
}