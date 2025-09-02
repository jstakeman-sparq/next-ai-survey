import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Allow access to login page and auth routes
  if (request.nextUrl.pathname === "/admin/login" || 
      request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }
  
  // For now, allow access to admin routes - let client-side handle auth
  // The SessionProvider will handle authentication state
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}