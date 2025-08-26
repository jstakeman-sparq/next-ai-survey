import { signOut } from "@/auth"
import type { User } from "next-auth"

interface AdminHeaderProps {
  user: User | undefined
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              AI Survey Admin
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {user?.image && (
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.image}
                  alt={user.name || "User"}
                />
              )}
              <span className="text-sm font-medium text-gray-700">
                {user?.name || user?.email}
              </span>
            </div>
            
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/admin/login" })
              }}
            >
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}