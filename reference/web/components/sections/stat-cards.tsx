import { PostIt } from "@/components/ui/post-it"

interface StatCardsProps {
  items: {
    id: number
    value: string
    label: string
    image?: string | null
  }[]
}

export function StatCards({ items }: StatCardsProps) {
  return (
    <div className="gap-8 space-y-8 md:flex md:space-y-0">
      {items.map((item) => (
        <PostIt key={item.id} value={item.value} label={item.label} />
      ))}
    </div>
  )
}
