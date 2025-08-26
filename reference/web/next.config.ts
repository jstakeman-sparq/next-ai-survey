import type { NextConfig } from "next"

const requiredEnvVars = [
  "STRAPI_API_URL",
  "NEXT_PUBLIC_STRAPI_API_URL",
  "NEXT_PUBLIC_STRAPI_MEDIA_URL",
  "PREVIEW_SECRET",
] as const

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
}

// interface RedirectItem {
//   source: string
//   destination: string
//   permanent?: boolean
// }

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: "https" as const,
      //   hostname: process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL?.replace(
      //     /^https?:\/\//,
      //     "",
      //   ) as string,
      // },
      {
        protocol: "https" as const,
        hostname: "artistic-bear-7573813657.media.strapiapp.com",
      },
      ...(process.env.NODE_ENV === "development"
        ? [
            {
              protocol: "https" as const,
              hostname: "artistic-bear-7573813657.media.strapiapp.com",
            },
            {
              protocol: "http" as const,
              hostname: "localhost",
              port: "1337",
              pathname: "/uploads/**/*",
            },
            {
              protocol: "http" as const,
              hostname: "127.0.0.1",
              port: "1337",
              pathname: "/uploads/**/*",
            },
          ]
        : []),
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self' ${process.env.STRAPI_API_URL}`,
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ]
  },
  redirects: async () => [
    {
      source: "/home",
      destination: "/",
      permanent: true,
    },
  ],
  rewrites: async () => [
    {
      source: "/",
      destination: "/home",
    },
  ],
  // async redirects(): Promise<RedirectItem[]> {
  //   let redirections: RedirectItem[] = []
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/redirections`,
  //     )
  //     const result = await res.json()
  //     const redirectItems: RedirectItem[] = result.data.map(
  //       ({ source, destination }: RedirectItem) => {
  //         return {
  //           source: `/:locale/${source}`,
  //           destination: `/:locale/${destination}`,
  //           permanent: false,
  //         }
  //       },
  //     )

  //     redirections = redirections.concat(redirectItems)

  //     return redirections
  //   } catch (error) {
  //     return []
  //   }
  // },
}

export default nextConfig
