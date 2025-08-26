import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Content } from "@/components/content"
import { getPageBySlug } from "@/lib/strapi"

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  return {
    title: page?.title || slug,
    description: page?.description || "",
  }
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) notFound()

  return (
    <Content blocks={page?.blocks} searchParams={searchParams} type="page" />
  )
}
