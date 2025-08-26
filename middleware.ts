import { auth } from "@/auth"

export default auth((req) => {
  // Skip authentication in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    return
  }
  
  // Allow access to login page and auth routes
  if (req.nextUrl.pathname === "/admin/login" || 
      req.nextUrl.pathname.startsWith("/api/auth")) {
    return
  }
  
  // Redirect unauthenticated users to login
  if (!req.auth && req.nextUrl.pathname.startsWith("/admin")) {
    const newUrl = new URL("/admin/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}