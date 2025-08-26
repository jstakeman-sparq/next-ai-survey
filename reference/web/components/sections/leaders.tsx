import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import { VariantProps, cva } from "class-variance-authority"
import Link from "next/link"
import { Eyebrow } from "@/components/ui/eyebrow"
import Image from "@/components/ui/image"
import { Title } from "@/components/ui/title"
import { LinkedIn } from "@/components/icons/linkedin"
import { Member } from "@/lib/types"
import { cn } from "@/lib/utils"

const bgColors = cva("text-neutral-dark-500", {
  variants: {
    variant: {
      primary: "bg-rust-100",
      secondary: "bg-forest-100",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

type bgVariant = VariantProps<typeof bgColors>["variant"]

export function Leaders({
  eyebrow,
  title,
  description,
  members,
  variant,
}: {
  eyebrow: string
  title: string
  description: BlocksContent
  members: Member[]
  variant?: bgVariant
}) {
  return (
    <div
      className={cn(
        "noise py-24 [--noise-blend-mode:color-burn] [--noise-color:var(--color-neutral-dark-500)] [--noise-opacity:0.5] lg:py-48",
        bgColors({ variant: variant }),
      )}
    >
      <div className="container">
        <div className="mb-24">
          <Eyebrow className="mb-8 lg:mb-7">{eyebrow}</Eyebrow>
          <Title
            as="h3"
            variant="display"
            className="text-h1 lg:text-display mb-8 font-bold lg:mb-10 lg:max-w-1/2"
          >
            {title}
          </Title>
          <div className="text-xl lg:max-w-1/3">
            <BlocksRenderer content={description} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-11 lg:grid-cols-3 lg:gap-x-11 lg:gap-y-6">
          {members.map((item) => (
            <div key={item.name} className="grid gap-y-6">
              {item.avatar && (
                <Image
                  src={item.avatar.url}
                  alt={item.avatar.alternativeText || ""}
                  width={item.avatar.width}
                  height={item.avatar.height}
                  className={cn("z-10 max-w-28 rounded-full")}
                />
              )}
              <div>
                <Title className="text-h2 mb-3 font-bold">{item.name}</Title>
                <p className="font-bold">{item.role}</p>
                <div className="text-balance">{item.description}</div>
              </div>
              <Link
                href={item.linkedin}
                target="_blank"
                className={cn(
                  "z-10 h-14 w-14 rounded-full p-4 duration-300",
                  variant === "primary" &&
                    "bg-rust-200 text-rust-300 hover:bg-rust-300 hover:text-rust-200",
                  variant === "secondary" &&
                    "bg-forest-200 text-forest-500 hover:bg-accent-200 hover:text-forest-500",
                )}
              >
                <LinkedIn className={cn("h-6 w-6")} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
