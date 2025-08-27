import NextAuth from "next-auth"
import { secret } from '@aws-amplify/backend';

// Server-side auth configuration with Amplify secrets
const requiredEnvVars = {
  AUTH_SECRET: secret('AUTH_SECRET'),
  AUTH_JUMPCLOUD_ISSUER: secret('AUTH_JUMPCLOUD_ISSUER'),
  AUTH_JUMPCLOUD_ID: secret('AUTH_JUMPCLOUD_ID'),
  AUTH_JUMPCLOUD_SECRET: secret('AUTH_JUMPCLOUD_SECRET'),
}

// Check for missing environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key)

// Debug logging for Amplify deployment
console.log('Environment check:')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('AUTH_SECRET present:', !!requiredEnvVars.AUTH_SECRET)
console.log('AUTH_JUMPCLOUD_ISSUER present:', !!requiredEnvVars.AUTH_JUMPCLOUD_ISSUER)
console.log('AUTH_JUMPCLOUD_ID present:', !!requiredEnvVars.AUTH_JUMPCLOUD_ID)
console.log('AUTH_JUMPCLOUD_SECRET present:', !!requiredEnvVars.AUTH_JUMPCLOUD_SECRET)

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '))
  console.error('For Amplify Gen2 deployment, set these as secrets in the Amplify console')
  // Don't throw error during build time - let NextAuth handle gracefully
}

// Generate a fallback secret if none is provided (for development/testing only)
const getSecret = () => {
  const authSecret = requiredEnvVars.AUTH_SECRET;
  
  if (!authSecret) {
    console.warn('No AUTH_SECRET found. Using fallback (not recommended for production)');
    // Generate a deterministic fallback secret based on deployment environment
    return process.env.NODE_ENV === 'production' 
      ? 'missing-secret-please-configure-in-amplify-console'
      : 'development-fallback-secret-please-set-auth-secret';
  }
  
  return String(authSecret);
};

// JumpCloud OIDC Configuration
const jumpCloudConfig = {
  id: "jumpcloud",
  name: "JumpCloud",
  type: "oidc" as const,
  issuer: String(requiredEnvVars.AUTH_JUMPCLOUD_ISSUER || ''),
  clientId: String(requiredEnvVars.AUTH_JUMPCLOUD_ID || ''),
  clientSecret: String(requiredEnvVars.AUTH_JUMPCLOUD_SECRET || ''),
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
});