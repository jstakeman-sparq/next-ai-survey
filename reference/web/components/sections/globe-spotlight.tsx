import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import { Eyebrow } from "@/components/ui/eyebrow"
import Image from "@/components/ui/image"
import { Title } from "@/components/ui/title"
import globeImage from "@/assets/media/images/globe-spotlight.svg"
import { cn } from "@/lib/utils"

export function GlobeSpotlight({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: BlocksContent
}) {
  return (
    <section
      className={cn(
        "bg-accent-100 noise relative pb-24 [--noise-opacity:0.5] lg:pt-32 lg:pb-60",
      )}
    >
      <div className="container">
        <div className="mb-20 grid gap-8 text-center text-balance">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title
            variant="display"
            as="h3"
            className="text-h2 lg:text-display mx-auto max-w-3xl font-bold"
          >
            {title}
          </Title>
          {description && (
            <div className="lg:text-lead text-lg lg:text-balance">
              <BlocksRenderer content={description} />
            </div>
          )}
        </div>
        <Image
          src={globeImage}
          alt=""
          className="absolute left-1/2 mx-auto -translate-x-1/2 lg:max-w-[60%] [@media(min-width:1921px)]:-bottom-70 [@media(min-width:2100px)]:max-w-[40%]"
        />
      </div>
    </section>
  )
}
