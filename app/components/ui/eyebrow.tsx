import { cn } from "../../../lib/utils"

interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p 
      className={cn(
        "text-sm md:text-base lg:text-lg uppercase tracking-[0.3em] font-medium opacity-80 mb-4",
        className
      )}
    >
      {children}
    </p>
  )
}