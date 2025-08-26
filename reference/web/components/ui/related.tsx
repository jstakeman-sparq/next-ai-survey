import Link from "next/link"
import { ByLine } from "@/components/ui/by-line"
import { Divider } from "@/components/ui/divider"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Title } from "@/components/ui/title"
import { getArticles } from "@/lib/strapi"
import { cn, formatDate, getArticleUrl } from "@/lib/utils"

export async function Related({
  searchParams,
}: {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined
  }>
}) {
  const params = await searchParams
  const categoryParam = params?.category as string | undefined
  const authorParam = params?.author as string | undefined

  const articles = await getArticles({
    categorySlugs: categoryParam ? [categoryParam] : undefined,
    authorNames: authorParam ? [authorParam] : undefined,
  })

  const nextArticles = articles.slice(0, 3)
  const readTime = 10

  return (
    <section className="py-20">
      <Divider theme="dark" />

      <Eyebrow className="mb-8 md:mb-12">Related</Eyebrow>

      <div className="grid gap-y-10 md:gap-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3 lg:gap-y-0">
          {nextArticles.map((article, index) => {
            const isLastColumn = index === nextArticles.length - 1
            return (
              <Link
                href={getArticleUrl(article.type, article.slug)}
                key={article.id}
                className={cn(
                  index !== nextArticles.length - 1 &&
                    "border-neutral-light-500 border-b pb-6",
                  "md:pb-0",
                  !isLastColumn &&
                    index !== nextArticles.length - 1 &&
                    "lg:border-neutral-light-500 lg:border-r lg:pr-8",
                  "lg:border-b-0",
                )}
              >
                {((article.services?.length ?? 0) > 0 ||
                  (article.technologies?.length ?? 0) > 0) && (
                  <div className="flex flex-wrap gap-1">
                    {[
                      ...(article.services ?? []).map((s) => ({
                        ...s,
                        _type: "service",
                      })),
                      ...(article.technologies ?? []).map((t) => ({
                        ...t,
                        _type: "tech",
                      })),
                    ].map((item) => (
                      <span
                        key={`${item._type}-${item.id}`}
                        className="bg-rust-100 text-rust-300 max-w-max rounded-sm border border-transparent p-1.5 text-xs font-black uppercase"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                )}

                <Title
                  variant="hero"
                  as="h3"
                  className="group-hover:text-rust-400 text-h2 mt-4 transition-colors duration-300"
                >
                  {article.title}
                </Title>

                <ByLine
                  variant="secondary"
                  date={formatDate(article.createdAt)}
                  readTime={readTime}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
