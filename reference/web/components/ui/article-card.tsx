import Link from "next/link"
import { ByLine } from "@/components/ui/by-line"
import Image from "@/components/ui/image"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { type Article, ArticleType, Service, Technology } from "@/lib/types"
import { cn, formatDate, getArticleUrl } from "@/lib/utils"

export interface ArticleCardProps extends Article {
  className?: string
  isFeatured?: boolean
  showDate?: boolean
  showDescription?: boolean
  showTags?: boolean
  technologies: Technology[]
  services: Service[]
}

export function ArticleCard({
  title,
  description,
  cover,
  createdAt,
  isFeatured = false,
  className,
  slug,
  type,
  showDate,
  showDescription = true,
  showTags = true,
  technologies = [],
  services = [],
}: ArticleCardProps) {
  const maxSize = isFeatured ? "w-full h-[28.125rem]" : "w-full h-[21.375rem]"

  const readTime = 10

  return (
    <div className={className}>
      <Link href={getArticleUrl(type, slug)} className="group relative block">
        {cover && (
          <div className={cn("overflow-clip rounded-xl", maxSize)}>
            <Image
              src={cover.url}
              alt={cover.alternativeText || ""}
              width={cover.width}
              height={cover.height}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="bg-accent-200 absolute top-5 left-5 rounded-md p-2 text-sm font-black uppercase">
              {type !== ArticleType.Default ? type || "Insight" : "Insight"}
            </div>
          </div>
        )}
        {title && (
          <Title
            variant="hero"
            as="h3"
            className="group-hover:text-rust-400 mt-4 text-xl transition-colors duration-300 md:text-2xl"
          >
            {title}
          </Title>
        )}
        {description && showDescription && (
          <Paragraph className="mb-4 text-lg">{description}</Paragraph>
        )}
        {showDate && (
          <ByLine
            variant="secondary"
            date={formatDate(createdAt)}
            readTime={readTime}
          />
        )}
      </Link>

      {showTags && (services.length > 0 || technologies.length > 0) && (
        <div className="flex flex-wrap gap-1">
          {[
            ...services.map((s) => ({ ...s, _type: "service" })),
            ...technologies.map((t) => ({ ...t, _type: "tech" })),
          ].map((item) => (
            <span
              key={`${item._type}-${item.id}`}
              className="bg-rust-100 hover:border-rust-300 text-rust-300 max-w-max rounded-sm border border-transparent p-1.5 text-[0.625rem] font-black uppercase transition-all duration-300 hover:bg-transparent"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
