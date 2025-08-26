import type { Metadata } from "next"
import localFont from "next/font/local"
import { Footer } from "@/components/globals/footer"
import { Header } from "@/components/globals/header"
import { ScrollUp } from "@/components/scroll-up"
import { TrackingScript } from "@/components/tracking-script"
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants"
import { getMediaUrl } from "@/lib/media"
import { getGlobalData } from "@/lib/strapi"
import "./globals.css"

const font = localFont({
  src: [
    { path: "../assets/fonts/Satoshi-Variable.woff2", style: "normal" },
    { path: "../assets/fonts/Satoshi-VariableItalic.woff2", style: "italic" },
  ],
})

export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await getGlobalData()

  const title = metadata?.title || SITE_NAME
  const description = metadata?.description || SITE_DESCRIPTION
  const image = getMediaUrl(metadata?.image?.url)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const data = await getGlobalData()

  return (
    <html lang="en" className={font.className}>
      <head>
        {data.favicon?.url && (
          <link rel="icon" href={getMediaUrl(data.favicon?.url)} />
        )}

        <TrackingScript />
      </head>
      <body>
        <ScrollUp />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
