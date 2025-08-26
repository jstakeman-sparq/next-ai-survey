import * as React from "react"
import { cn } from "@/lib/utils"

type ParagraphProps<As extends React.ElementType> = {
  as?: As
  className?: string
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<As>

export function Paragraph<As extends React.ElementType = "p">({
  as,
  className,
  children,
  ...rest
}: ParagraphProps<As>) {
  const Component = as || "p"

  return (
    <Component className={cn("text-xl", className)} {...rest}>
      {children}
    </Component>
  )
}
