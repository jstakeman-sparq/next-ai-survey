import * as React from "react"
import { cn } from "@/lib/utils"

type EyebrowProps<As extends React.ElementType> = {
  as?: As
  className?: string
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<As>

export function Eyebrow<As extends React.ElementType = "p">({
  as,
  className,
  children,
  ...rest
}: EyebrowProps<As>) {
  const Component = as || "p"

  return (
    <Component
      className={cn(
        "text-sm leading-[1.3] font-medium tracking-[0.3em] uppercase",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
