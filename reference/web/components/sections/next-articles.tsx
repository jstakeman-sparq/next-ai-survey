import { ArticleCard } from "@/components/ui/article-card"
import { Divider } from "@/components/ui/divider"
import { Eyebrow } from "@/components/ui/eyebrow"
import { getArticles } from "@/lib/strapi"
import { cn } from "@/lib/utils"

export async function NextArticles({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const categoryParam = params?.category as string | undefined
  const authorParam = params?.author as string | undefined

  const articles = await getArticles({
    categorySlugs: categoryParam ? [categoryParam] : undefined,
    authorNames: authorParam ? [authorParam] : undefined,
  })

  const nextArticles = articles.slice(0, 2)

  return (
    <section>
      <Divider theme="dark" />

      <Eyebrow className="mb-8 md:mb-12">Next from this series</Eyebrow>

      <div className={cn("grid gap-y-10 md:gap-y-12")}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3 lg:gap-y-0">
          {nextArticles.map((article) => (
            <ArticleCard
              key={article.id}
              {...article}
              showDate={true}
              showDescription={false}
              showTags={false}
              isFeatured={false}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
