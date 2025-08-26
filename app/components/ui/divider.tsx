import { cn } from "../../../lib/utils"

interface DividerProps {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return (
    <div className={cn("w-full mb-8", className)}>
      <svg
        width="100%"
        height="1"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="0.5"
          x2="100"
          y2="0.5"
          className="stroke-current opacity-50"
          strokeWidth="0.875"
        />
      </svg>
    </div>
  )
}