import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-neutral-dark-100 selection:bg-primary selection:text-primary-foreground bg-neutral-light-200 text-neutral-dark-500 flex h-12 w-full min-w-0 rounded px-5 py-[0.875rem] text-lg transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium placeholder:opacity-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:bg-neutral-light-300 focus-visible:ring-neutral-dark-300 focus-visible:ring-offset-neutral-light-100 focus-visible:ring-2 focus-visible:ring-offset-2",
        "aria-invalid:bg-rust-100 aria-invalid:ring-rust-300 aria-invalid:ring-2",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
