"use client"

import { FilterSelect } from "@/components/sections/articles-list/filter-select"
import { Author, Category } from "@/lib/types"

export function FilterBar({
  categories,
  authors,
  selectedCategoryValues = [],
  selectedAuthorValues = [],
  onCategorySelect,
  onAuthorSelect,
}: {
  categories: Category[]
  authors: Author[]
  selectedCategoryValues?: string[]
  selectedAuthorValues?: string[]
  onCategorySelect?: (value: string) => void
  onAuthorSelect?: (value: string) => void
}) {
  return (
    <div className="flex gap-4">
      <FilterSelect
        items={categories}
        selectedValues={selectedCategoryValues}
        onSelect={onCategorySelect}
        placeholder="Categories"
      />
      <FilterSelect
        items={authors}
        selectedValues={selectedAuthorValues}
        onSelect={onAuthorSelect}
        placeholder="Authors"
      />
    </div>
  )
}
