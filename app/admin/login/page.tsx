import { signIn } from "@/auth"

interface LoginPageProps {
  searchParams: {
    error?: string;
    callbackUrl?: string;
  }
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const { error, callbackUrl } = searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in with your JumpCloud account to access the admin dashboard
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Authentication Error
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    {error === 'Configuration' 
                      ? 'There was a problem with the server configuration. Please contact support.'
                      : error === 'AccessDenied'
                      ? 'Access denied. Please check your credentials and try again.'
                      : error === 'Verification'
                      ? 'Unable to verify your identity. Please try again.'
                      : `Authentication failed: ${error}`
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 space-y-6">
          <form
            action={async () => {
              "use server"
              await signIn("jumpcloud", { redirectTo: "/admin" })
            }}
          >
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <svg 
                className="h-5 w-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
                />
              </svg>
              Sign in with JumpCloud
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}