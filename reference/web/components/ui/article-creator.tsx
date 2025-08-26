import { VariantProps, cva } from "class-variance-authority"
import Link from "next/link"
import { ByLine } from "@/components/ui/by-line"
import Image from "@/components/ui/image"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import type { ArticleType, Category, Media } from "@/lib/types"
import { cn, formatDate, getArticleUrl } from "@/lib/utils"

const bgColors = cva("grid grid-cols-2 rounded-xl md:grid-cols-10", {
  variants: {
    variant: {
      primary: "bg-neutral-light-100 items-center gap-7 md:gap-12",
      secondary: "bg-rust-100 border border-rust-300 gap-5",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

type bgVariant = VariantProps<typeof bgColors>["variant"]

export interface ArticleCreatorProps {
  variant?: bgVariant
  title: string
  description: string
  cover: Media
  createdAt: string
  categories: Category[]
  slug: string
  type: ArticleType
  className?: string
  showDescription?: boolean
}

export function ArticleCreator({
  variant = "primary",
  title,
  description,
  cover,
  createdAt,
  className,
  slug,
  type,
  showDescription = true,
}: ArticleCreatorProps) {
  const readTime = 10

  return (
    <Link href={getArticleUrl(type, slug)} className={cn(className)}>
      <div className={cn("", bgColors({ variant: variant }))}>
        <div className="col-span-1 h-full md:col-span-2">
          {cover?.url && (
            <div
              className={cn(
                "h-full overflow-clip rounded-l-xl md:h-[11.563rem]",
                variant === "secondary" ? "md:max-h-32" : "",
              )}
            >
              <Image
                src={cover.url}
                alt={cover.alternativeText || ""}
                width={cover.width}
                height={cover.height}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="col-span-1 md:col-span-8">
          <div
            className={cn(
              variant === "secondary" ? "my-5 space-y-5" : "py-5 pr-5 md:p-0",
            )}
          >
            {showDescription && (
              <Paragraph className="text-neutral-dark-500 mb-5 text-lg leading-[1.4] md:mb-2">
                {description}
              </Paragraph>
            )}
            <Title
              as="h4"
              variant="subtitle"
              className={cn(
                "leading-[1.3]",
                variant === "secondary"
                  ? "text-rust-300 text-lg font-bold"
                  : "md:text-h2 mb-5 text-2xl font-bold md:mb-4",
              )}
            >
              {variant === "secondary" && (
                <span className="text-neutral-dark-500 text-lg font-normal">
                  For a deeper dive read
                </span>
              )}{" "}
              <span
                className={cn(
                  variant === "secondary"
                    ? "decoration-rust-300 underline underline-offset-4"
                    : "",
                )}
              >
                {" "}
                {title}
              </span>
            </Title>

            <ByLine
              date={formatDate(createdAt)}
              readTime={readTime}
              className="text-neutral-dark-500 m-0 font-medium"
            />
          </div>
        </div>
      </div>
    </Link>
  )
}
