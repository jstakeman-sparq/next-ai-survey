import NextAuth from "next-auth"

// In Amplify Gen2, secrets are provided as JSON in $secrets variable
// They are parsed in amplify.yml and written to .env.production
// Next.js automatically loads .env.production in production builds

// Auto-detect production URL if AUTH_URL is not set
const getAuthUrl = () => {
  // First try to get from environment variables (Amplify secrets are injected here)
  const configuredUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL;
  if (configuredUrl) return configuredUrl;
  
  // Use localhost in development, production domain otherwise
  return process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000'
    : `https://ai.teamsparq.com`;
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
  type: "oauth" as const,
  checks: ["state"],
  authorization: {
    url: "https://oauth.id.jumpcloud.com/oauth2/auth",
    params: {
      scope: "openid profile email",
      response_type: "code"
    }
  },
  token: "https://oauth.id.jumpcloud.com/oauth2/token",
  userinfo: "https://oauth.id.jumpcloud.com/userinfo",
  clientId: "5b5ef794-3385-4cae-b39f-c84049ac372e",
  clientSecret: "tWKyClyF8lLuTXqSbGmRtvLPQk",
  client: {
    token_endpoint_auth_method: "client_secret_post"
  },
  profile(profile: any) {
    console.log('Profile received:', profile);
    return {
      id: profile.sub || profile.id,
      email: profile.email,
      name: profile.name || profile.email,
    }
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: getSecret(),
  trustHost: true,
  providers: [jumpCloudConfig] as any,
  callbacks: {
    authorized: async ({ auth }) => {
      // Return true if user is authenticated
      return !!auth
    },
    signIn: async ({ user, account, profile }) => {
      console.log('SignIn callback:', { user, account, profile });
      return true;
    },
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      console.log('Redirect callback:', { url, baseUrl });
      
      // After successful login, redirect to admin dashboard
      if (url.includes('/api/auth/callback')) {
        return `${baseUrl}/admin`;
      }
      
      // If url is relative, resolve it against the base URL
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      
      // If url is absolute and matches the base domain, allow it
      if (url.startsWith(baseUrl)) {
        return url;
      }
      
      // Default to admin dashboard
      return `${baseUrl}/admin`;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  debug: process.env.NODE_ENV === 'development',
})