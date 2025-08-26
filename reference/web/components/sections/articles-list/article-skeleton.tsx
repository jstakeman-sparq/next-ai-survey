import { Skeleton } from "@/components/ui/skeleton"

export function ArticleSkeleton() {
  return (
    <div>
      {/* Image skeleton */}
      <Skeleton className="bg-neutral-light-300 mb-4 h-[28.125rem] w-full rounded-xl" />

      {/* Title skeleton */}
      <Skeleton className="bg-neutral-light-300 mb-2 h-8 w-3/4" />

      {/* Description skeleton */}
      <Skeleton className="bg-neutral-light-300 mb-2 h-4 w-full" />
      <Skeleton className="bg-neutral-light-300 mb-4 h-4 w-2/3" />

      {/* Category tags skeleton */}
      <div className="flex gap-1">
        <Skeleton className="bg-neutral-light-300 h-6 w-20 rounded-sm" />
        <Skeleton className="bg-neutral-light-300 h-6 w-16 rounded-sm" />
      </div>
    </div>
  )
}

export function ArticlesSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
      {Array.from({ length: 6 }, (_, i) => (
        <ArticleSkeleton key={i} />
      ))}
    </div>
  )
}
