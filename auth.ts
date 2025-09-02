import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [Google],
  callbacks: {
    authorized: async ({auth, request: {nextUrl}}) => {
      const isOnAdminPage = nextUrl.pathname.startsWith("/admin")
      const isOnLoginPage = nextUrl.pathname === "/admin/login"
      
      if (isOnAdminPage && !isOnLoginPage) {
        return !!auth
      }
      return true
    }
  }
})