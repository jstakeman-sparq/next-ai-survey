import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for Amplify deployment
  output: 'standalone',
  
  // Optimize images for better performance
  images: {
    unoptimized: true, // For static exports if needed
  },
  
  // Reduce bundle size and optimize webpack
  webpack: (config, { isServer }) => {
    // Optimize for production builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Exclude Amplify backend packages from Edge middleware
    config.resolve.alias = {
      ...config.resolve.alias,
      '@aws-amplify/backend': false,
      '@aws-amplify/graphql-generator': false,
      '@aws-amplify/graphql-types-generator': false,
    };
    
    return config;
  },
  
  // Optimize compilation
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
