import { Eyebrow } from "@/components/ui/eyebrow"
import { Technology } from "@/lib/types"

interface TechnologiesListProps {
  items?: Technology[]
  className?: string
}

export function TechnologiesList({
  items = [],
  className,
}: TechnologiesListProps) {
  return (
    <div className={className}>
      <Eyebrow className="mb-6 md:mb-8">Technology</Eyebrow>
      <ul className="w-full list-disc space-y-2 pl-4 text-lg marker:text-neutral-600">
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
