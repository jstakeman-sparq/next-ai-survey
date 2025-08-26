import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer"
import { Eyebrow } from "@/components/ui/eyebrow"
import Image from "@/components/ui/image"
import { Title } from "@/components/ui/title"
import { Media } from "@/lib/types"

export type FeatureProps = {
  eyebrow: string
  title: string
  description?: BlocksContent
  image: Media
}

export function Feature({ eyebrow, title, description, image }: FeatureProps) {
  return (
    <section className="bg-accent-100 py-24 lg:py-52">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-5 md:gap-12 xl:gap-56">
          <div className="col-span-1 grid md:col-span-3">
            <div className="mb-8 grid gap-8 lg:mb-24">
              <Eyebrow>{eyebrow}</Eyebrow>
              <Title as="h3" className="text-h2 lg:text-hero font-bold">
                {title}
              </Title>
            </div>
            {description && (
              <div className="text-lead md:max-w-xl">
                <BlocksRenderer content={description} />
              </div>
            )}
          </div>
          <div className="col-span-1 md:col-span-2">
            <Image
              src={image?.url}
              alt={image?.alternativeText || ""}
              width={image?.width}
              height={image?.height}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
