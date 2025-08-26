import { cva } from "class-variance-authority"
import { Avatar } from "@/components/ui/avatar"
import type { Author } from "@/lib/types"
import { cn } from "@/lib/utils"

const dateStyles = cva(" ", {
  variants: {
    variant: {
      primary: "text-neutral-light-500",
      secondary:
        "mb-4 text-sm leading-[1.3] font-medium text-neutral-dark-500 mt-2",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

type ByLineProps = {
  author?: Author
  date: string
  readTime?: number
  variant?: "primary" | "secondary"
  className?: string
}

export function ByLine({
  author,
  date,
  readTime,
  variant = "primary",
  className,
}: ByLineProps) {
  const formattedReadTime =
    readTime != null
      ? variant === "secondary"
        ? `— ${readTime} min`
        : `— ${readTime} minute read`
      : null

  return (
    <div className="flex items-center gap-4">
      {author && (
        <Avatar
          src={author.avatar.url}
          alt={author.name}
          width={author.avatar.width}
          height={author.avatar.height}
        />
      )}
      <div className="text-neutral-light-100 flex flex-col gap-2 text-xs font-medium tracking-[0.3em] uppercase md:flex-row md:gap-4 md:text-sm">
        {author && <div>Insights from {author.name}</div>}
        <div className={cn(dateStyles({ variant }), className)}>
          {date} {formattedReadTime}
        </div>
      </div>
    </div>
  )
}
