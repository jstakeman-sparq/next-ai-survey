"use client"

import { Button } from "@/components/ui/button"
import { Divider } from "@/components/ui/divider"
import { Eyebrow } from "@/components/ui/eyebrow"
import Image from "@/components/ui/image"
import { Markdown } from "@/components/ui/markdown"
import { Title } from "@/components/ui/title"
import { getMediaUrl } from "@/lib/media"
import { Action, Media } from "@/lib/types"
import { cn } from "@/lib/utils"

export type HeroProps = {
  title: string
  description?: string
  subtitle?: string
  media?: Media
  actions: Action[]
  gradient?: "primary" | "secondary"
}

export function Hero({
  title,
  description,
  subtitle,
  media,
  actions,
  gradient = "primary",
}: HeroProps) {
  const isCompact = !media

  return (
    <section
      className={cn(
        "text-neutral-light-100 bg-neutral-dark-400 relative flex h-screen items-end pb-8 md:pb-16",
        isCompact && "noise h-auto pt-64 pb-16",
      )}
    >
      {media && (
        <>
          {media.mime.includes("video") ? (
            <video
              src={getMediaUrl(media.url)}
              playsInline
              autoPlay
              muted
              loop
              webkit-playsinline="true"
              onEnded={(e) => {
                const video = e.currentTarget
                video.currentTime = 0
                video.play()
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              src={media.url}
              alt={media.alternativeText || ""}
              className="absolute inset-0 h-full w-full object-cover"
              width={media.width}
              height={media.height}
            />
          )}
        </>
      )}

      <div className="relative z-3 container">
        <Title
          id="hero-title"
          variant="hero"
          className="text-h1 md:text-hero font-black tracking-[-0.05em] text-balance"
        >
          {title}
        </Title>

        <Divider />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-8 md:gap-8">
          <div className="order-2 col-span-1 grid gap-y-6 md:order-none md:col-span-4">
            {subtitle && <Eyebrow>{subtitle}</Eyebrow>}

            {actions?.map((action, i) => (
              <Button
                key={i}
                variant={action.variant || "primary"}
                size="lg"
                href={action.url}
                target={action.isExternal ? "_blank" : undefined}
              >
                {action.text}
              </Button>
            ))}
          </div>

          {description && (
            <div className="order-1 col-span-1 md:order-none md:col-span-4 md:col-start-5">
              {subtitle && (
                <Eyebrow className="mb-6 block md:hidden">{subtitle}</Eyebrow>
              )}
              <p className="text-lead [&_a]:underline [&_a]:decoration-[1px] [&_a]:underline-offset-4">
                <Markdown content={description} />
              </p>
            </div>
          )}
        </div>
      </div>

      {!isCompact && (
        <>
          {gradient === "secondary" ? (
            <div
              className="noise absolute -bottom-0 z-2 h-72 w-full [--noise-opacity:0.5]"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, #252D25 36.78%, transparent 100%)",
              }}
            />
          ) : (
            <div
              className="noise absolute -bottom-0 z-2 h-72 w-full [--noise-opacity:0.5]"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, #16110F 36.78%, transparent 100%)",
              }}
            />
          )}
        </>
      )}
    </section>
  )
}
