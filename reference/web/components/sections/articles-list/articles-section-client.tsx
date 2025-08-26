"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useTransition } from "react"
import { Divider } from "@/components/ui/divider"
import { Title } from "@/components/ui/title"
import { AppliedFilters } from "@/components/sections/articles-list/applied-filters"
import { ArticlesGridClient } from "@/components/sections/articles-list/articles-grid-client"
import { FilterBar } from "@/components/sections/articles-list/filter-bar"
import { FilterProvider } from "@/components/sections/articles-list/filter-context"
import { Article, Author, Category } from "@/lib/types"

export function ArticlesSectionClient({
  categories,
  authors,
  articles,
}: {
  categories: Category[]
  authors: Author[]
  articles: Article[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const selectedCategoryValues = searchParams.get("category")
    ? [searchParams.get("category")!]
    : ["all"]
  const selectedAuthorValues = searchParams.get("author")
    ? [searchParams.get("author")!]
    : ["All"]

  const updateSearchParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      const currentValue = params.get(key)

      if (currentValue === value) {
        // Remove the value if it's already selected
        params.delete(key)
      } else {
        // Replace with the new value
        params.set(key, value)
      }

      startTransition(() => {
        router.replace(`?${params.toString()}`, { scroll: false })
      })
    },
    [router, searchParams],
  )

  const onCategorySelect = useCallback(
    (value: string) => {
      if (value === "all") {
        // Clear category filter
        const params = new URLSearchParams(searchParams.toString())
        params.delete("category")
        startTransition(() => {
          router.replace(`?${params.toString()}`, { scroll: false })
        })
      } else {
        updateSearchParams("category", value)
      }
    },
    [updateSearchParams, searchParams, router],
  )

  const onAuthorSelect = useCallback(
    (value: string) => {
      if (value === "All") {
        // Clear author filter
        const params = new URLSearchParams(searchParams.toString())
        params.delete("author")
        startTransition(() => {
          router.replace(`?${params.toString()}`, { scroll: false })
        })
      } else {
        updateSearchParams("author", value)
      }
    },
    [updateSearchParams, searchParams, router],
  )

  // Get selected categories and authors for applied filters (exclude "All")
  const selectedCategories = selectedCategoryValues
    .filter((slug) => slug !== "all")
    .map((slug) => categories.find((cat) => cat.slug === slug))
    .filter((cat): cat is Category => cat !== undefined)

  const selectedAuthors = selectedAuthorValues
    .filter((name) => name !== "All")
    .map((name) => authors.find((author) => author.name === name))
    .filter((author): author is Author => author !== undefined)

  const onClearAllFilters = useCallback(() => {
    startTransition(() => {
      router.replace(window.location.pathname, { scroll: false })
    })
  }, [router])

  const onRemoveCategory = useCallback(
    (slug: string) => {
      updateSearchParams("category", slug) // This will toggle it off
    },
    [updateSearchParams],
  )

  const onRemoveAuthor = useCallback(
    (name: string) => {
      updateSearchParams("author", name) // This will toggle it off
    },
    [updateSearchParams],
  )

  // Add "All" option to categories and authors
  const categoriesWithAll = [
    { id: "all", name: "All", slug: "all", articles: [], description: "" },
    ...categories,
  ]

  const allAuthor: Author = {
    id: "all",
    name: "All",
    role: "",
    email: "",
    avatar: {
      url: "",
      mime: "",
      formats: {
        large: { url: "", mime: "" },
        media: { url: "", mime: "" },
        small: { url: "", mime: "" },
        thumbnail: { url: "", mime: "" },
      },
    },
    social: {
      linkedin: "",
      instagram: "",
      x: "",
    },
    bio: [] as unknown as import("@strapi/blocks-react-renderer").BlocksContent,
  }

  const authorsWithAll: Author[] = [allAuthor, ...authors]

  return (
    <FilterProvider isPending={isPending}>
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <Title className="text-h1 lg:text-display font-bold">
            All Thoughts
          </Title>
          <FilterBar
            categories={categoriesWithAll}
            authors={authorsWithAll}
            selectedCategoryValues={selectedCategoryValues}
            selectedAuthorValues={selectedAuthorValues}
            onCategorySelect={onCategorySelect}
            onAuthorSelect={onAuthorSelect}
          />
        </div>
        <Divider className="md:my-6" theme="dark" />
        <AppliedFilters
          selectedCategories={selectedCategories}
          selectedAuthors={selectedAuthors}
          onClear={onClearAllFilters}
          onRemoveCategory={onRemoveCategory}
          onRemoveAuthor={onRemoveAuthor}
        />
      </div>

      <ArticlesGridClient articles={articles} />
    </FilterProvider>
  )
}
