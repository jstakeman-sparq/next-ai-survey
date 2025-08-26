import { Eyebrow } from "@/components/ui/eyebrow"
import { Title } from "@/components/ui/title"
import { cn } from "@/lib/utils"

interface KeyHighlightsProps {
  className?: string
  title: string
  eyebrow: string
  stats: {
    value: string
    label: string
  }[]
}

export function KeyHighlights({
  className,
  title,
  eyebrow,
  stats = [],
  ...props
}: KeyHighlightsProps) {
  return (
    <div className={cn(className)} {...props}>
      <Title className="mb-8 text-2xl font-bold md:mb-12">{title}</Title>
      <Eyebrow className="mb-6 md:mb-8">{eyebrow}</Eyebrow>
      <div className="bg-accent-200 text-neutral-dark-500 noise space-y-10 rounded-xl p-10 [--noise-blend-mode:var(--color-neutral-dark-500)] [--noise-opacity:0.5]">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col">
            <p className="text-stats font-bold">{stat.value}</p>
            <p className="text-lead text-balance">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
