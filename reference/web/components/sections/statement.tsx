import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import { VariantProps, cva } from "class-variance-authority"
import { Eyebrow } from "@/components/ui/eyebrow"
import Image from "@/components/ui/image"
import { Marquee } from "@/components/ui/marquee"
import { Media } from "@/lib/types"
import { cn } from "@/lib/utils"

const bgColors = cva("text-neutral-light-100", {
  variants: {
    variant: {
      primary: "bg-rust-300",
      secondary: "bg-forest-500",
      accent: "bg-accent-200 text-neutral-dark-500",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

type bgVariant = VariantProps<typeof bgColors>["variant"]

export type StatementProps = {
  variant?: bgVariant
  eyebrow: string
  content: BlocksContent
  logos?: Media[]
}

export function Statement({
  variant = "primary",
  eyebrow,
  content,
  logos = [],
}: StatementProps) {
  return (
    <section
      className={cn(
        "noise py-24 text-center lg:py-50",
        bgColors({ variant: variant }),
      )}
    >
      <div className="container">
        <div className="mb-6 grid gap-y-12 lg:mb-24 lg:gap-y-10">
          <Eyebrow>{eyebrow}</Eyebrow>
          {content && (
            <div className="text-h2 lg:text-h1 mx-auto space-y-8 text-center font-bold lg:max-w-5xl lg:space-y-16 lg:font-medium">
              <BlocksRenderer content={content} />
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 lg:mt-32">
        <Marquee duration={30} gap={2}>
          {logos?.map((logo, index) => (
            <Image
              key={index}
              src={logo.url}
              alt={logo.alternativeText || ""}
              width={logo.width}
              height={logo.height}
              className="h-auto w-[6rem] lg:w-auto"
            />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
