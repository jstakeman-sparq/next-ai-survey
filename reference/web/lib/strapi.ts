import { strapi } from "@strapi/client"
import { draftMode } from "next/headers"
import qs from "qs"
import type { Article, Author, Category, Page } from "@/lib/types"

export const STRAPI_API_URL = process.env.STRAPI_API_URL

export const client = strapi({ baseURL: STRAPI_API_URL + "/api" })

// Based on https://github.com/strapi/LaunchPad/blob/main/next/lib/strapi/fetchContentType.ts
export async function query(
  contentType: string,
  params: Record<string, unknown> = {},
  skipDraftMode = false,
) {
  let isEnabled = false
  if (!skipDraftMode) {
    const { isEnabled: isDraftModeEnabled } = await draftMode()
    isEnabled = isDraftModeEnabled
  }

  try {
    const queryParams = { ...params }

    if (isEnabled) {
      queryParams.status = "draft"
    }

    const url = new URL(`api/${contentType}`, STRAPI_API_URL)

    url.search = qs.stringify(queryParams, {
      encodeValuesOnly: true, // prettify URL
    })

    const res = await fetch(url, {
      next: { tags: [contentType] },
      cache: "no-store",
      // cache:
      //   isEnabled || process.env.NODE_ENV === "development"
      //     ? "no-cache"
      //     : "force-cache",
    })

    if (!res.ok) {
      // throw new Error(
      //   `Failed to fetch data (url=${url.toString()}, status=${res.status})`,
      // )
      console.error(
        `Failed to fetch data (url=${url.toString()}, status=${res.status})`,
      )
      return { data: [] }
    }

    return res.json()
  } catch (error) {
    console.error("strapi/query", error)
  }
}

export async function getGlobalData() {
  const { data } = (await query("global", { populate: "*" })) ?? { data: [] }
  return data
}

export async function getAllPages(): Promise<Page[]> {
  const { data } = (await query("pages")) ?? { data: [] }
  return data
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const { data } = await query("pages", {
    filters: { slug: { $eq: slug } },
    pLevel: 5, // we are using strapi-v5-plugin-populate-deep
    // populate: {
    //   blocks: { populate: "*" },
    // },
  })

  return data?.[0]
}

// export async function getPages(): Promise<Page[]> {
//   const { data } = (await query("pages", {}, true)) ?? { data: [] }
//   return data
// }

// export function getMediaUrl(url: string | null) {
//   if (url == null) return undefined
//   if (url.startsWith("data:")) return url
//   if (url.startsWith("http") || url.startsWith("//")) return url
//   return `${process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL}${url}`
// }

export type GetArticlesOptions = {
  /** Filter by Strapi publication status */
  status?: "published" | "draft"
  /** Filter by one or more category slugs */
  categorySlugs?: string[]
  /** Filter by one or more author ids */
  authorIds?: number[]
  /** Filter by one or more author names */
  authorNames?: string[]
}

export async function getArticles(
  options: GetArticlesOptions = {},
): Promise<Article[]> {
  const { status, categorySlugs, authorIds, authorNames } = options

  const filters: Record<string, unknown> = {}

  if (categorySlugs && categorySlugs.length > 0) {
    filters.categories = { slug: { $in: categorySlugs } }
  }
  if (authorIds && authorIds.length > 0) {
    filters.author = { id: { $in: authorIds } } as unknown
  }
  if (authorNames && authorNames.length > 0) {
    filters.author = { name: { $in: authorNames } } as unknown
  }

  const params: Record<string, unknown> = {
    populate: "*",
  }

  if (status) params.status = status
  if (Object.keys(filters).length > 0) params.filters = filters

  const { data } = await query("articles", params)
  return data
}

export async function getCategories(): Promise<Category[]> {
  const { data } = (await query("categories", {
    fields: ["id", "name", "slug", "description"],
  })) ?? { data: [] }
  return data
}

export async function getAuthors(): Promise<Author[]> {
  const { data } = (await query("authors", {})) ?? { data: [] }
  return data
}

export async function getArticleBySlug(
  slug: string,
  status: string,
): Promise<Article | undefined> {
  const { data } = (await query("articles", {
    filters: { slug: { $eq: slug } },
    status: status,
    pLevel: 5,
  })) ?? { data: [] }

  return data?.[0]
}
