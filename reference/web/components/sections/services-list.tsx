import { Eyebrow } from "@/components/ui/eyebrow"
import { Service } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ServicesListProps {
  className?: string
  variant?: "sidebar" | "content"
  items?: Service[]
}

export function ServicesList({
  className,
  variant = "sidebar",
  items = [],
}: ServicesListProps) {
  return (
    <div className={cn("py-10", className)}>
      <Eyebrow className="mb-6 md:mb-8">Services/solutions</Eyebrow>

      <div
        className={cn(
          "gap-3",
          variant === "sidebar" ? "flex flex-col" : "flex flex-wrap",
        )}
      >
        {items.map((item) => (
          <span
            key={item.id}
            className="bg-accent-100 text-neutral-dark-500 max-w-fit truncate rounded-sm px-4 py-2 text-sm font-bold uppercase"
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  )
}
