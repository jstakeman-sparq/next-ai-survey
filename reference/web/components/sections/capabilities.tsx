import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer"
import Link from "next/link"
import { Eyebrow } from "@/components/ui/eyebrow"
import Image from "@/components/ui/image"
import { Title } from "@/components/ui/title"
import { Media } from "@/lib/types"
import { cn } from "@/lib/utils"

export function Capabilities({
  eyebrow,
  title,
  description,
  cards,
  variant = "primary",
}: {
  eyebrow: string
  title: string
  description?: BlocksContent
  cards: {
    title: string
    description: string
    image: Media
    action: {
      url: string
      text: string
      external?: boolean
    }
  }[]
  variant?: "primary" | "secondary"
}) {
  if (!cards || cards.length === 0) return null

  const [firstCard, ...otherCards] = cards

  return (
    <section className="pt-24 md:py-32">
      <div className="container">
        <div className="grid grid-cols-12 gap-8">
          <div
            className={cn(
              "col-span-12 space-y-8 lg:col-span-8",
              variant === "secondary" ? "lg:pt-8" : "",
            )}
          >
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title
              variant="display"
              className={cn(
                "font-bold",
                variant === "primary"
                  ? "text-h2 lg:text-display w-full xl:w-4xl"
                  : "text-h2 lg:text-h1 max-w-full lg:max-w-lg",
              )}
            >
              {title}
            </Title>
            {description && (
              <div className="text-lead w-full">
                <BlocksRenderer content={description} />
              </div>
            )}
          </div>

          <div className="col-span-12 lg:col-span-4">
            <Link
              href={firstCard.action.url}
              className={cn(
                "border-neutral-light-500 mb-8 flex min-h-[17.5rem] flex-col justify-between rounded-xl border p-6 hover:border-transparent hover:text-neutral-100 hover:duration-400 md:min-h-[21.25rem] md:p-9",
                variant === "primary"
                  ? "hover:bg-rust-300"
                  : "hover:bg-forest-500",
              )}
            >
              <div className="space-y-4">
                <Image
                  src={firstCard.image.url}
                  alt={firstCard.image.alternativeText || ""}
                  width={firstCard.image.width}
                  height={firstCard.image.height}
                  className="mb-4 h-12 w-12 object-cover"
                />
                <Title className="lg:text-h2 text-2xl leading-[1.25] font-bold">
                  {firstCard.title}
                </Title>
              </div>
              <div className="flex-1" />
              <p className="text-lg">{firstCard.description}</p>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {otherCards.map((card, index) => (
            <Link
              href={card.action.url}
              key={index}
              className={cn(
                "border-neutral-light-500 flex min-h-[17.5rem] flex-col justify-between rounded-xl border p-6 hover:border-transparent hover:text-neutral-100 hover:duration-400 md:min-h-[21.25rem] md:p-9",
                variant === "primary"
                  ? "hover:bg-rust-300"
                  : "hover:bg-forest-500",
              )}
            >
              <div className="space-y-4">
                <Image
                  src={card.image.url}
                  alt={card.image.alternativeText || ""}
                  width={card.image.width}
                  height={card.image.height}
                  className="mb-4 h-12 w-12 object-cover"
                />
                <Title className="lg:text-h2 text-2xl leading-[1.25] font-bold">
                  {card.title}
                </Title>
              </div>
              <div className="flex-1" />
              <p className="text-lg">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
