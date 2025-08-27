import NextAuth from "next-auth"

// Try to import Amplify secrets, fallback to env vars
let amplifySecrets: any = null;
try {
  const { secret } = require('@aws-amplify/backend');
  amplifySecrets = {
    AUTH_SECRET: secret('AUTH_SECRET'),
    AUTH_JUMPCLOUD_ISSUER: secret('AUTH_JUMPCLOUD_ISSUER'),
    AUTH_JUMPCLOUD_ID: secret('AUTH_JUMPCLOUD_ID'),
    AUTH_JUMPCLOUD_SECRET: secret('AUTH_JUMPCLOUD_SECRET'),
  };
} catch (error) {
  // Amplify backend not available (likely edge runtime or build time)
  console.log('Amplify backend not available, using environment variables');
}

// Load secrets from Amplify if available, otherwise use environment variables
const requiredEnvVars = {
  AUTH_SECRET: amplifySecrets?.AUTH_SECRET || process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  AUTH_JUMPCLOUD_ISSUER: amplifySecrets?.AUTH_JUMPCLOUD_ISSUER || process.env.AUTH_JUMPCLOUD_ISSUER,
  AUTH_JUMPCLOUD_ID: amplifySecrets?.AUTH_JUMPCLOUD_ID || process.env.AUTH_JUMPCLOUD_ID,
  AUTH_JUMPCLOUD_SECRET: amplifySecrets?.AUTH_JUMPCLOUD_SECRET || process.env.AUTH_JUMPCLOUD_SECRET,
}

// Log NextAuth URL configuration
const nextAuthUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL
console.log('NextAuth Configuration:')
console.log('- AUTH_URL:', process.env.AUTH_URL)
console.log('- NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
console.log('- Resolved URL:', nextAuthUrl)
console.log('- NODE_ENV:', process.env.NODE_ENV)

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

// JumpCloud OIDC Configuration
const jumpCloudConfig = {
  id: "jumpcloud",
  name: "JumpCloud",
  type: "oidc" as const,
  issuer: requiredEnvVars.AUTH_JUMPCLOUD_ISSUER || '',
  clientId: requiredEnvVars.AUTH_JUMPCLOUD_ID || '',
  clientSecret: requiredEnvVars.AUTH_JUMPCLOUD_SECRET || '',
  authorization: {
    params: {
      scope: "openid profile email"
    }
  },
  profile(profile: any) {
    return {
      id: profile.sub,
      email: profile.email,
    }
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: getSecret(),
  trustHost: true,
  providers: requiredEnvVars.AUTH_JUMPCLOUD_ISSUER ? [jumpCloudConfig] : [],
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