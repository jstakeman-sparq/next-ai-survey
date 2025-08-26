import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
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
})