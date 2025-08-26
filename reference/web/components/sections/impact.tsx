import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import { Card } from "@/components/ui/card"
import { Eyebrow } from "@/components/ui/eyebrow"
import Image from "@/components/ui/image"
import { Marquee } from "@/components/ui/marquee"
import { Title } from "@/components/ui/title"
import { Video } from "@/components/ui/video"
import { Media } from "@/lib/types"

export type ImpactProps = {
  eyebrow: string
  title: string
  description: BlocksContent
  pillars: {
    id: number
    title: string
    description: string
    image: Media
    action: {
      url: string
      text: string
      external?: boolean
    }
  }[]
  logos?: Media[]
  video: Media
  poster: Media
}

export function Impact({
  eyebrow,
  title,
  description,
  pillars = [],
  logos,
  video,
  poster,
}: ImpactProps) {
  return (
    <div className="bg-foreground text-background noise pt-24 pb-24 [--noise-opacity:0.5] md:pt-48 md:pb-36">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-y-12 lg:mb-36 lg:grid-cols-2 lg:gap-x-32 lg:gap-y-0">
          <div className="flex flex-col gap-8">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <Title variant="hero" as="h3" className="text-h2 md:text-display">
                {title}
              </Title>
            )}
            {description && (
              <div className="text-lead lg:text-balance">
                <BlocksRenderer content={description} />
              </div>
            )}
          </div>
          {video?.url && poster?.url && (
            <Video poster={poster.url} src={video.url} />
          )}
        </div>
        <div className="text-background mb-8 grid grid-cols-1 gap-14 md:mb-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.id}>
              <Card
                title={pillar.title}
                description={pillar.description}
                image={pillar.image?.url}
                variant="secondary"
                className="py-6 lg:py-0"
                action={
                  pillar.action
                    ? {
                        href: pillar.action.url,
                        label: pillar.action.text,
                      }
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>

      <Marquee pauseOnHover duration={30} gap={2}>
        {logos?.map((logo, index) => (
          <div key={index}>
            <Image
              src={logo.url}
              alt={logo.alternativeText || ""}
              width={logo.width}
              height={logo.height}
              className="h-auto w-[7rem] lg:w-auto"
            />
          </div>
        ))}
      </Marquee>
    </div>
  )
}
