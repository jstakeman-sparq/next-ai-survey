import * as React from "react"
import { cn } from "@/lib/utils"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "file:text-foreground placeholder:text-neutral-dark-100 selection:bg-primary selection:text-primary-foreground bg-neutral-light-200 text-neutral-dark-500 flex min-h-[80px] w-full min-w-0 resize-none rounded px-4 py-3 text-lg transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium placeholder:opacity-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:bg-neutral-light-300 focus-visible:ring-neutral-dark-300 focus-visible:ring-offset-neutral-light-100 focus-visible:ring-2 focus-visible:ring-offset-2",
          "aria-invalid:bg-rust-100 aria-invalid:ring-rust-300 aria-invalid:ring-2",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea }
