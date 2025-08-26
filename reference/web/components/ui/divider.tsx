import { cn } from "@/lib/utils"

export function Divider({
  className,
  theme = "light",
}: {
  className?: string
  theme?: "light" | "dark"
}) {
  return (
    <div
      className={cn(
        "bg-neutral-light-100 my-6 h-[1px] w-full opacity-50 md:my-12",
        theme === "dark" && "bg-neutral-light-500",
        className,
      )}
    />
  )
}
