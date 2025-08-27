import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for Amplify deployment
  output: 'standalone',
  
  // Reduce memory usage during build
  experimental: {
    // Use SWC minifier for better performance
    swcMinify: true,
  },
  
  // Optimize images for better performance
  images: {
    unoptimized: true, // For static exports if needed
  },
  
  // Reduce bundle size
  webpack: (config, { isServer }) => {
    // Optimize for production builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
};

export default nextConfig;
