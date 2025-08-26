import { ArticlesSectionClient } from "@/components/sections/articles-list/articles-section-client"
import { getArticles, getAuthors, getCategories } from "@/lib/strapi"

export async function ArticlesList({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const categoryParam = params?.category as string | undefined
  const authorParam = params?.author as string | undefined

  // Get all data first
  const [allCategories, allAuthors] = await Promise.all([
    getCategories(),
    getAuthors(),
  ])

  const articles = await getArticles({
    categorySlugs: categoryParam ? [categoryParam] : undefined,
    authorNames: authorParam ? [authorParam] : undefined,
  })

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <ArticlesSectionClient 
          categories={allCategories} 
          authors={allAuthors}
          articles={articles}
        />
      </div>
    </section>
  )
}
