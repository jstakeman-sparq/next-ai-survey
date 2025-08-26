import { VariantProps, cva } from "class-variance-authority"
import { Eyebrow } from "@/components/ui/eyebrow"
import Image from "@/components/ui/image"
import { Markdown } from "@/components/ui/markdown"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Media } from "@/lib/types"
import { cn } from "@/lib/utils"

const bgColors = cva("text-neutral-light-100", {
  variants: {
    variant: {
      primary: "noise bg-forest-500 [--noise-opacity:0.6]",
      secondary: "bg-rust-300 noise [--noise-opacity:0.6]",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

type bgVariant = VariantProps<typeof bgColors>["variant"]

export type StoryProps = {
  variant?: bgVariant
  eyebrow: string
  content: string
  items: {
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
}

export function Story({
  variant = "primary",
  eyebrow,
  content,
  items = [],
}: StoryProps) {
  return (
    <div className={cn("py-40", bgColors({ variant: variant }))}>
      <div className="container">
        <div className="mb-12 grid gap-8 text-center md:mb-24">
          <Eyebrow
            className={cn(
              variant === "primary"
                ? "text-accent-200"
                : "text-neutral-light-100",
            )}
          >
            {eyebrow}
          </Eyebrow>
          <Markdown
            content={content}
            as="div"
            className="lg:text-h1 [&_strong]:text-accent-200 mx-auto text-2xl font-bold text-balance lg:max-w-6xl [&_strong]:font-bold"
          />
        </div>
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 text-center md:grid-cols-2 lg:grid-cols-3 lg:gap-y-0 xl:gap-x-36">
          {items.map((item) => (
            <div key={item.id}>
              <Image
                src={item.image?.url}
                alt=""
                width={item.image.width}
                height={item.image.height}
                className="mx-auto mb-8 rounded-xl object-cover"
              />
              <Title className="mb-6 text-xl font-bold lg:text-2xl" as="h3">
                {item.title}
              </Title>
              <Paragraph className="text-sm md:text-lg">
                {item.description}
              </Paragraph>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
