import NextAuth from "next-auth"

// Validate required environment variables
const requiredEnvVars = {
  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH_JUMPCLOUD_ISSUER: process.env.AUTH_JUMPCLOUD_ISSUER,
  AUTH_JUMPCLOUD_ID: process.env.AUTH_JUMPCLOUD_ID,
  AUTH_JUMPCLOUD_SECRET: process.env.AUTH_JUMPCLOUD_SECRET,
}

// Check for missing environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key)

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '))
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`)
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: [
    {
      id: "jumpcloud",
      name: "JumpCloud",
      type: "oidc",
      issuer: process.env.AUTH_JUMPCLOUD_ISSUER,
      clientId: process.env.AUTH_JUMPCLOUD_ID,
      clientSecret: process.env.AUTH_JUMPCLOUD_SECRET,
      authorization: {
        params: {
          scope: "openid profile email"
        }
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
        }
      },
    }
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Return true if user is authenticated
      return !!auth
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  debug: process.env.NODE_ENV === 'development',
})