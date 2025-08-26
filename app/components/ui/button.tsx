import { VariantProps, cva } from "class-variance-authority"
import Link from "next/link"
import { cn } from "../../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold disabled:pointer-events-none disabled:opacity-50 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-orange",
  {
    variants: {
      variant: {
        default: "bg-brand-dark text-white hover:bg-brand-dark/90",
        primary: "bg-brand-cta text-brand-dark hover:bg-brand-cta-hover",
        secondary: "bg-brand-orange text-white hover:bg-brand-orange/90",
        outline: "border border-current hover:bg-current hover:text-white",
      },
      size: {
        sm: "h-[2.625rem] px-4 py-2 text-sm",
        default: "h-[2.625rem] px-6 py-3 text-base",
        lg: "h-[3.125rem] px-8 py-4 text-lg md:text-xl",
        xl: "h-[3.75rem] px-10 py-5 text-xl md:text-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
  asChild?: boolean
}

export function Button({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  )
}