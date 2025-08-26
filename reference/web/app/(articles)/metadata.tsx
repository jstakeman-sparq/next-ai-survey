import { getArticleBySlug } from "@/lib/strapi"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug, "published")

  return {
    title: article?.title || slug,
    description: article?.description || "",
  }
}
