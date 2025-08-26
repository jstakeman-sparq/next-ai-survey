import { ArticleCard } from "@/components/ui/article-card"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import type { Article } from "@/lib/types"
import { cn } from "@/lib/utils"

type ShowcaseProps = {
  title?: string
  eyebrow?: string
  description?: string
  action?: {
    text: string
    url: string
    isExternal: boolean
    variant: "default" | "primary" | "secondary"
  }
  articles?: Article[]
  className?: string
  variant?: "full" | "compact"
}

export async function Showcase({
  variant = "full",
  eyebrow,
  title,
  description,
  action,
  articles = [],
  className,
}: ShowcaseProps) {
  const first = articles[0]
  const secondAndThird = articles.slice(1, 3)
  const remaining = articles.slice(3)

  return (
    <div className={cn("pb-24 md:pb-32", className)}>
      <div className="container">
        {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
        <div
          className={cn(
            "mb-12 md:mb-20",
            action && "items-end justify-between md:flex",
          )}
        >
          <>
            {title && (
              <Title
                className={cn(
                  "text-h1 md:text-hero mb-6 leading-[1.1] md:mb-0",
                  variant === "compact" && "lg:max-w-3xl",
                )}
              >
                {title}
              </Title>
            )}
            {description && (
              <Paragraph className="mt-6 text-lg lg:max-w-3xl">
                {description}
              </Paragraph>
            )}
          </>
          {action && (
            <Button
              className={cn(description ? "mt-6" : "")}
              variant={action.variant}
            >
              {action.text}
            </Button>
          )}
        </div>

        {articles.length > 0 && (
          <div className={cn("grid gap-y-10 md:gap-y-12")}>
            <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-4 lg:gap-y-0">
              {first && (
                <ArticleCard
                  {...first}
                  className="bg-primary/5 rounded-xl lg:col-span-2 lg:row-span-2"
                />
              )}

              {secondAndThird.length > 0 && (
                <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:col-span-2 lg:gap-y-0">
                  {secondAndThird.map((item) => (
                    <ArticleCard key={item.documentId} {...item} />
                  ))}
                </div>
              )}
            </div>

            {variant === "full" && remaining.length > 0 && (
              <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
                {remaining.map((item) => (
                  <ArticleCard
                    key={item.documentId}
                    {...item}
                    className="bg-muted/50 rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
