import { cn } from "../../../lib/utils"

interface TitleProps {
  children: React.ReactNode
  variant?: "hero" | "display" | "h1" | "h2" | "h3"
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  style?: React.CSSProperties
}

export function Title({
  children,
  variant = "h1",
  className,
  as: Component = "h1",
  style,
}: TitleProps) {
  const variants = {
    hero: "text-2xl md:text-4xl lg:text-6xl xl:text-hero font-black leading-tight tracking-tight",
    display: "text-xl md:text-3xl lg:text-5xl xl:text-display font-black leading-tight tracking-tight",
    h1: "text-lg md:text-2xl lg:text-4xl xl:text-h1 font-bold leading-tight tracking-tight",
    h2: "text-base md:text-xl lg:text-2xl xl:text-h2 font-bold leading-tight tracking-tight",
    h3: "text-base md:text-lg lg:text-xl font-semibold leading-tight",
  }

  return (
    <Component className={cn(variants[variant], className)} style={style}>
      {children}
    </Component>
  )
}