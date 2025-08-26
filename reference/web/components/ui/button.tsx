import { VariantProps, cva } from "class-variance-authority"
import Link, { LinkProps } from "next/link"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "overflow-hidden w-max cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-lg font-bold disabled:pointer-events-none disabled:opacity-50 shrink-0  transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-dark-400",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-dark-300 text-neutral-light-100 hover:bg-neutral-dark-500",
        primary: "bg-rust-300 text-neutral-light-100 hover:bg-rust-400",
        secondary: "bg-accent-200 text-neutral-dark-500 hover:bg-accent-100",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground", // 👈 add
      },
      size: {
        sm: "h-[2.625rem] px-6 py-3 text-lg",
        default: "h-[2.625rem] px-6 py-3",
        lg: "h-[3.125rem] px-[1.875rem] py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const rippleColors = {
  primary: "bg-rust-300",
  secondary: "bg-accent-200",
  default: "",
  outline: "",
}

type ButtonBaseProps = {
  href?: string
  children: React.ReactNode
  className?: string
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>

type NextLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">

export type ButtonProps = ButtonBaseProps & Partial<NextLinkProps>

const isInternal = (href: string) => href.startsWith("/")

export function Button({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  const hasRipple = variant !== "default"

  const rippleColor = rippleColors[variant ?? "default"]

  let Component: React.ElementType = "button"
  const baseProps = {
    className: cn(
      "relative overflow-hidden group inline-flex items-center justify-center",
      buttonVariants({ variant, size, className }),
    ),
    ...props,
  }

  if (href) {
    if (isInternal(href)) {
      Component = Link
    } else {
      Component = "a"
    }
  }

  const componentProps = {
    ...baseProps,
    ...(href && { href }),
    ...(href &&
      !isInternal(href) && { target: "_blank", rel: "noopener noreferrer" }),
  }

  return (
    <Component {...componentProps}>
      {hasRipple && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              "group-active:absolute group-active:scale-150 group-active:animate-ping group-active:rounded-full",
              "group-active:h-[3.5em] group-active:w-[3.5em]",
              rippleColor,
            )}
          />
        </span>
      )}
      <span className="relative z-1">{children}</span>
    </Component>
  )
}
