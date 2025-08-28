import NextAuth from "next-auth"

// In Amplify Gen2, secrets are provided as JSON in $secrets variable
// They are parsed in amplify.yml and written to .env.production
// Next.js automatically loads .env.production in production builds

// Auto-detect production URL if AUTH_URL is not set
const getAuthUrl = () => {
  // First try to get from environment variables (Amplify secrets are injected here)
  const configuredUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL;
  if (configuredUrl) return configuredUrl;
  
  // Auto-detect for Amplify production deployment
  if (process.env.NODE_ENV === 'production' && process.env.AWS_REGION) {
    // This is likely an Amplify deployment - construct the URL
    return `https://master.d322titcdljuli.amplifyapp.com`;
  }
  
  return undefined;
};

// Load environment variables (Amplify secrets are automatically injected)
const requiredEnvVars = {
  AUTH_SECRET: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  AUTH_JUMPCLOUD_ISSUER: process.env.AUTH_JUMPCLOUD_ISSUER,
  AUTH_JUMPCLOUD_ID: process.env.AUTH_JUMPCLOUD_ID,
  AUTH_JUMPCLOUD_SECRET: process.env.AUTH_JUMPCLOUD_SECRET,
  AUTH_URL: getAuthUrl(),
}

// Log NextAuth URL configuration
console.log('NextAuth Configuration:')
console.log('- AUTH_URL (resolved):', requiredEnvVars.AUTH_URL)
console.log('- NODE_ENV:', process.env.NODE_ENV)
console.log('- JumpCloud Issuer:', requiredEnvVars.AUTH_JUMPCLOUD_ISSUER || 'NOT SET')
console.log('- JumpCloud Client ID:', requiredEnvVars.AUTH_JUMPCLOUD_ID ? 'SET' : 'NOT SET')
console.log('- JumpCloud Client Secret:', requiredEnvVars.AUTH_JUMPCLOUD_SECRET ? 'SET' : 'NOT SET')

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
  checks: ["state", "nonce", "pkce"] as ("state" | "nonce" | "pkce" | "none")[],
  // issuer: requiredEnvVars.AUTH_JUMPCLOUD_ISSUER || '',
  // issuerUrl: requiredEnvVars.AUTH_JUMPCLOUD_ISSUER || '',
  wellKnown: "https://oauth.id.jumpcloud.com/.well-known/openid-configuration",
  clientId: "5b5ef794-3385-4cae-b39f-c84049ac372e",
  clientSecret: requiredEnvVars.AUTH_JUMPCLOUD_SECRET || '',
  client: {
    token_endpoint_auth_method: "client_secret_post"
  },
  authorization: {
    params: {
      scope: "email"
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
  providers: [jumpCloudConfig],
  callbacks: {
    authorized: async ({ auth }) => {
      // Return true if user is authenticated
      return !!auth
    },
    redirect: async ({ url, baseUrl }) => {
      // Ensure redirects use the correct base URL in production
      const authUrl = requiredEnvVars.AUTH_URL;
      const resolvedBaseUrl = authUrl || baseUrl;
      
      // If url is relative, resolve it against the base URL
      if (url.startsWith('/')) {
        return `${resolvedBaseUrl}${url}`;
      }
      
      // If url is absolute and matches the base domain, allow it
      if (url.startsWith(resolvedBaseUrl)) {
        return url;
      }
      
      // Default to base URL for safety
      return resolvedBaseUrl;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  debug: process.env.NODE_ENV === 'development',
})