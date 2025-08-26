import { VariantProps, cva } from "class-variance-authority"
import { Eyebrow } from "@/components/ui/eyebrow"
import Image from "@/components/ui/image"
import { Title } from "@/components/ui/title"
import { Media } from "@/lib/types"
import { cn } from "@/lib/utils"

const bgColors = cva(" ", {
  variants: {
    variant: {
      primary: "bg-forest-500 text-neutral-light-100",
      light: "bg-neutral-light-200 text-neutral-dark-500",
      dark: "bg-neutral-dark-500 text-neutral-light-100",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

type bgVariant = VariantProps<typeof bgColors>["variant"]

export function Bullets({
  variant,
  eyebrow,
  title,
  items,
}: {
  variant?: bgVariant
  eyebrow: string
  title: string
  items: { label: string; value: string; image: Media }[]
}) {
  const half = Math.ceil(items.length / 2)
  const leftItems = items.slice(0, half)
  const rightItems = items.slice(half)

  return (
    <section
      className={cn(
        "noise py-24 [--noise-opacity:0.5] lg:py-48",
        bgColors({ variant: variant }),
      )}
    >
      <div className="container">
        <div className="mb-20 grid gap-6 text-balance lg:mb-24">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title
            variant="display"
            as="h3"
            className="text-h1 lg:text-display font-bold"
          >
            {title}
          </Title>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-44">
          {/* Left Column */}
          <div className="flex flex-col">
            {leftItems.map((item) => (
              <div
                key={item.label}
                className="border-neutral-light-100/50 flex gap-x-4 border-b py-4 lg:gap-6 lg:py-6"
              >
                <Image
                  src={item.image.url}
                  alt={item.image.alternativeText || ""}
                  width={item.image.width}
                  height={item.image.height}
                />
                <div className="grid gap-y-2">
                  <h3 className="text-2xl font-bold">{item.value}</h3>
                  <p className="md:text-lg">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            {rightItems.map((item) => (
              <div
                key={item.label}
                className="border-neutral-light-100/50 flex gap-x-4 border-b py-4 lg:gap-6 lg:py-6"
              >
                <Image
                  src={item.image.url}
                  alt={item.image.alternativeText || ""}
                  width={item.image.width}
                  height={item.image.height}
                />
                <div className="grid gap-y-2">
                  <h3 className="text-2xl font-bold">{item.value}</h3>
                  <p className="md:text-lg">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
