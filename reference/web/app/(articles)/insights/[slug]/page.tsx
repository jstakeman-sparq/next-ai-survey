import { notFound } from "next/navigation"
import { Article } from "@/app/(articles)/article"
import { getArticleBySlug } from "@/lib/strapi"
import { ArticleType } from "@/lib/types"

export { generateMetadata } from "@/app/(articles)/metadata"

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params
  const { status } = (await searchParams) ?? { status: "published" }
  const article = await getArticleBySlug(slug, status as string)
  if (!article || article.type === ArticleType.CaseStudy) notFound()

  return <Article article={article} />
}
