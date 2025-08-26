import { Card } from "@/components/ui/card"
import { Eyebrow } from "@/components/ui/eyebrow"
import Image from "@/components/ui/image"
import { Title } from "@/components/ui/title"
import { getMediaUrl } from "@/lib/media"
import type { Media } from "@/lib/types"
import { cn } from "@/lib/utils"

type HighlightsProps = {
  eyebrow: string
  title: string
  cards?: {
    title: string
    description: string
    image?: Media
  }[]
  highlightsImage?: Media
}

const Media = ({ media, className }: { media: Media; className?: string }) => {
  return (
    <>
      {media.mime.includes("video") ? (
        <video
          src={getMediaUrl(media?.url)}
          autoPlay
          loop
          muted
          playsInline
          className={cn("object-cover w-full h-full", className)}
        />
      ) : (
        <Image
          src={media?.url}
          alt={media?.alternativeText || ""}
          width={media?.width}
          height={media?.height}
          className={cn("object-cover w-full h-full", className)}
        />
      )}
    </>
  )
}

export function Highlights({
  eyebrow,
  title,
  cards = [],
  highlightsImage,
}: HighlightsProps) {
  return (
    <div className="md:my-40 mb-24 mt-40 grid gap-y-20">
      <div className="container">
        <div className="mb-14 lg:mb-20">
          {eyebrow && <Eyebrow className="mb-8">{eyebrow}</Eyebrow>}
          {title && (
            <Title
              variant="hero"
              as="h3"
              className="text-h2 md:text-hero text-balance"
            >
              {title}
            </Title>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-5 xl:gap-y-0 mt-10 relative">
          {highlightsImage?.url && (
            <div className="relative mr-3 h-[23.125rem] md:h-auto mb-10 xl:mb-0">
              <div className="absolute right-[-0.75rem] top-[-0.75rem] bg-rust-400 h-[calc(100%+1.5rem)] z-0 w-5xl shadow-[0px_0px_32px_rgba(162,63,43,0.65)]">
                <Media media={highlightsImage} />
                <span className="backdrop-blur-md absolute inset-0 bg-rust-500/10" />
              </div>

              <div className="h-full border rounded-xl overflow-clip border-white scale-x-[-1]">
                <Media media={highlightsImage} />
              </div>
            </div>
          )}

          {cards.length > 0 &&
            cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                image={card.image?.url}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
