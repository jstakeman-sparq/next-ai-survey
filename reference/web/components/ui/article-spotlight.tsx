import Link from "next/link"
import { ByLine } from "@/components/ui/by-line"
import Image from "@/components/ui/image"
import { Title } from "@/components/ui/title"
import type { ArticleType, Media, Service, Technology } from "@/lib/types"
import { cn, formatDate, getArticleUrl } from "@/lib/utils"

export interface ArticleSpotlightProps {
  title: string
  cover: Media
  createdAt: string
  slug: string
  type: ArticleType
  className?: string
  services: Service[]
  technologies: Technology[]
}

export function ArticleSpotlight({
  title,
  cover,
  createdAt,
  className,
  slug,
  type,
  services = [],
  technologies = [],
}: ArticleSpotlightProps) {
  const readTime = 10

  return (
    <div className={cn("group relative", className)}>
      <Link href={getArticleUrl(type, slug)} className="block">
        {cover?.url && (
          <div
            className={cn(
              "relative h-[26.938rem] w-full overflow-clip rounded-xl",
            )}
          >
            <Image
              src={cover.url}
              alt={cover.alternativeText || ""}
              width={cover.width}
              height={cover.height}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#322B27]/90 to-[#322B27]/0" />
          </div>
        )}
        <div className="pointer-events-none absolute bottom-3.5 left-4 z-10 grid gap-y-3 lg:bottom-8 lg:left-10">
          {(services.length > 0 || technologies.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {[
                ...services.map((s) => ({ ...s, _type: "service" })),
                ...technologies.map((t) => ({ ...t, _type: "tech" })),
              ].map((item) => (
                <span
                  key={`${item._type}-${item.id}`}
                  className="text-accent-200 border-accent-200 pointer-events-auto max-w-max rounded-md border px-2 py-0.5 text-sm font-medium uppercase"
                >
                  {item.name}
                </span>
              ))}
            </div>
          )}
          <Title className="text-2xl text-neutral-100">{title}</Title>

          <ByLine
            date={formatDate(createdAt)}
            readTime={readTime}
            className="m-0 text-sm font-medium text-neutral-100"
          />
        </div>
      </Link>
    </div>
  )
}
