import { FilterPill } from "@/components/sections/articles-list/filter-pill"
import { Category, Author } from "@/lib/types"

export function AppliedFilters({
  selectedCategories = [],
  selectedAuthors = [],
  onClear,
  onRemoveCategory,
  onRemoveAuthor,
}: {
  selectedCategories?: Category[]
  selectedAuthors?: Author[]
  onClear: () => void
  onRemoveCategory: (slug: string) => void
  onRemoveAuthor: (name: string) => void
}) {
  const hasFilters = selectedCategories.length > 0 || selectedAuthors.length > 0
  
  return (
    <div className="flex items-center gap-4 min-h-[2rem]">
      {hasFilters ? (
        <>
          <button
            onClick={onClear}
            className="cursor-pointer underline decoration-2 underline-offset-3"
          >
            Clear all
          </button>
          {selectedCategories.map((category) => (
            <FilterPill
              key={`category-${category.slug}`}
              label={category.name}
              onClose={() => onRemoveCategory(category.slug)}
            />
          ))}
          {selectedAuthors.map((author) => (
            <FilterPill
              key={`author-${author.id}`}
              label={author.name}
              onClose={() => onRemoveAuthor(author.name)}
            />
          ))}
        </>
      ) : (
        <span className="text-sm text-gray-500">No filters applied</span>
      )}
    </div>
  )
}
