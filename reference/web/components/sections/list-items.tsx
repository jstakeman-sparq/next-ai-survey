import { Eyebrow } from "@/components/ui/eyebrow"
import { cn } from "@/lib/utils"

interface ListItemsProps {
  className?: string
  eyebrow: string
  items: {
    value: string
  }[]
}

export function ListItems({ className, eyebrow, items = [] }: ListItemsProps) {
  return (
    <div className={cn("py-10", className)}>
      <Eyebrow className="mb-6 md:mb-8">{eyebrow}</Eyebrow>
      <ul className="text-lead list-disc pl-5 leading-[1.35]">
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  )
}
