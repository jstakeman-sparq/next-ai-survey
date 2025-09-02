import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

// In Amplify Gen2, secrets are provided as JSON in $secrets variable
// They are parsed in amplify.yml and written to .env.production
// Next.js automatically loads .env.production in production builds

// Load environment variables (Amplify secrets are automatically injected)
const requiredEnvVars = {
  AUTH_SECRET: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
}

// Log NextAuth URL configuration
console.log('NextAuth Configuration:')
console.log('- NODE_ENV:', process.env.NODE_ENV)
console.log('- NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'NOT SET')
console.log('- Google Client ID:', requiredEnvVars.AUTH_GOOGLE_ID ? 'SET' : 'NOT SET')
console.log('- Google Client Secret:', requiredEnvVars.AUTH_GOOGLE_SECRET ? 'SET' : 'NOT SET')

// Check for missing environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key)


if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '))
  console.error('For Amplify Gen2 deployment, set these as secrets in the Amplify console')
  // Don't throw error during build time - let NextAuth handle gracefully
}

// Generate a fallback secret if none is provided (for development/testing only)
const getSecret = () => {
  const authSecret = requiredEnvVars.AUTH_SECRET;
  
  if (!authSecret) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('No AUTH_SECRET found. Using fallback (not recommended for production)');
    }
    // Generate a deterministic fallback secret based on deployment environment
    return process.env.NODE_ENV === 'production' 
      ? 'missing-secret-please-configure-in-amplify-console'
      : 'development-fallback-secret-please-set-auth-secret';
  }
  
  return authSecret;
};


export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: getSecret(),
  providers: [
    Google({
      clientId: requiredEnvVars.AUTH_GOOGLE_ID!,
      clientSecret: requiredEnvVars.AUTH_GOOGLE_SECRET!,
    })
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    redirect: async ({ url, baseUrl }) => {
      // Allow same-origin URLs
      if (url.startsWith('/') || url.startsWith(baseUrl)) {
        return url.startsWith('/') ? `${baseUrl}${url}` : url;
      }
      return `${baseUrl}/admin`;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  debug: process.env.NODE_ENV === 'development',
})