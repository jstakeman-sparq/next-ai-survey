import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const titleVariants = cva("font-bold", {
  variants: {
    variant: {
      stats: "text-stats",
      hero: "text-hero",
      display: "text-display",
      default: "text-h1",
      subtitle: "text-h2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  className?: string
}

export function Title({
  children,
  as: As = "h2",
  variant = "default",
  className,
  ...props
}: TitleProps) {
  return (
    <As className={cn(titleVariants({ variant }), className)} {...props}>
      {children}
    </As>
  )
}
