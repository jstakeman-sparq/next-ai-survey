import { type VariantProps, cva } from "class-variance-authority"
import Link from "next/link"
import Image from "@/components/ui/image"
import { cn } from "@/lib/utils"

const boxVariants = cva("block", {
  defaultVariants: {
    variant: "primary",
  },
  variants: {
    variant: {
      primary: "border border-neutral-light-500 rounded-xl p-6",
      secondary: "border-none",
    },
  },
})

type CardVariant = VariantProps<typeof boxVariants>["variant"]

interface CardProps {
  title: string
  description?: string
  image?: string
  variant?: CardVariant
  action?: { href: string; label: string; external?: boolean }
  className?: string
}

const imageSize = {
  primary: 48,
  secondary: 64,
}

export function Card({
  title,
  description,
  image,
  variant = "primary",
  action,
  className,
  ...props
}: CardProps) {
  return (
    <div className={cn(boxVariants({ variant }), className)} {...props}>
      {image && (
        <Image
          src={image}
          alt=""
          width={imageSize[variant!]}
          height={imageSize[variant!]}
          className={cn(
            "aspect-square object-cover",
            variant === "primary" ? "mb-5" : "mb-5 md:mb-8",
          )}
        />
      )}

      <h3
        className={cn(
          "font-bold text-balance",
          variant === "primary" && "mb-5 text-2xl",
          variant === "secondary" && "md:text-h2 mb-8 text-2xl md:mb-5",
        )}
      >
        {title}
      </h3>

      {description && (
        <p className={cn("text-lg", variant === "secondary" ? "mb-5" : "")}>
          {description}
        </p>
      )}

      {action && (
        <Link
          className="text-lg underline underline-offset-2 hover:no-underline"
          href={action.href}
          target={action.external ? "_blank" : undefined}
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}
