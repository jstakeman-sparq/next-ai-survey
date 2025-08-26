import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statsVariants = cva("", {
  variants: {
    variant: {
      default: "text-neutral-light-100",
      secondary: "text-neutral-dark-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

type StatsVariant = VariantProps<typeof statsVariants>["variant"]

interface StatsProps {
  value?: string
  label?: string
  className?: string
  variant?: StatsVariant
}

function Stats({
  value,
  label,
  className,
  variant = "default",
  ...props
}: StatsProps) {
  const dotColor = variant === "default" ? "bg-background" : "bg-rust-300"

  return (
    <div className={cn(statsVariants({ variant }), className)} {...props}>
      <div
        className={cn(
          "grid grid-cols-1 xl:grid-cols-2 items-baseline gap-y-2 md:gap-x-4 mb-6 xl:mb-0",
        )}
      >
        {value && <span className="text-stats font-bold">{value}</span>}
        {label && (
          <p
            className={cn(
              "text-xl font-bold",
              variant === "default"
                ? "text-neutral-light-100"
                : "text-neutral-dark-500",
            )}
          >
            {label}
          </p>
        )}
      </div>

      <div className="relative h-2 w-full">
        <div
          className={cn("absolute top-0 left-0 right-0 h-[1px]", dotColor)}
        ></div>
        <div
          className={cn(
            "absolute -top-[2px] right-0 w-[5px] h-[5px] rounded-full",
            dotColor,
          )}
        ></div>
      </div>
    </div>
  )
}

export interface Stat {
  value: string
  label: string
}

export interface StatsStackProps {
  items: Stat[]
  className?: string
  variant?: "default" | "secondary"
}

export function StatsStack({ items, variant, className }: StatsStackProps) {
  return (
    <div className={cn("flex flex-col gap-6 w-full", className)}>
      {items.map((item, index) => (
        <Stats
          key={index}
          value={item.value}
          label={item.label}
          variant={variant}
        />
      ))}
    </div>
  )
}
