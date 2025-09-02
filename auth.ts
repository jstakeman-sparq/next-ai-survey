import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  debug: false, // Disable debug to reduce potential header access
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      // Simple redirect logic to avoid complex header operations
      if (url.startsWith(baseUrl) || url.startsWith('/')) {
        return url.startsWith('/') ? `${baseUrl}${url}` : url
      }
      return `${baseUrl}/admin`
    },
  },
})