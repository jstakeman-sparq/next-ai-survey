"use client"

import { useSearchParams } from "next/navigation"
import { ArticleCard } from "@/components/ui/article-card"
import { ArticlesSkeletonGrid } from "@/components/sections/articles-list/article-skeleton"
import { useFilter } from "@/components/sections/articles-list/filter-context"
import { Article } from "@/lib/types"

export function ArticlesGridClient({ articles }: { articles: Article[] }) {
  const { isPending } = useFilter()
  const searchParams = useSearchParams()

  const categoryParam = searchParams.get("category")
  const authorParam = searchParams.get("author")

  if (isPending) {
    return <ArticlesSkeletonGrid />
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          No articles found
        </h3>
        <p className="text-gray-500">
          {categoryParam || authorParam
            ? "Try adjusting your filters to see more results."
            : "There are no articles available at the moment."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          {...article}
          showDescription={false}
          showDate={true}
        />
      ))}
    </div>
  )
}
