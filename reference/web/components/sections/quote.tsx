import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import { cn } from "@/lib/utils"

export function Quote({
  content,
  author,
  variant = "primary",
}: {
  content: BlocksContent
  author: string
  variant?: "primary" | "secondary"
}) {
  return (
    <div
      className={cn(
        variant === "primary"
          ? "bg-rust-300 text-neutral-light-100 noise py-24 [--noise-opacity:0.5]"
          : "text-neutral-dark-50 py-28",
      )}
    >
      <div
        className={cn(
          "container",
          variant === "primary" ? "space-y-12" : "space-y-8 lg:space-y-12",
        )}
      >
        <div
          className={cn(
            "leading-[1.1] font-bold",
            variant === "primary"
              ? "text-h1 lg:text-display lg:max-w-4xl"
              : "text-h2 lg:text-display lg:max-w-5xl",
          )}
        >
          <BlocksRenderer content={content} />
        </div>
        <p
          className={cn(
            variant === "primary" ? "max-w-2xs text-lg" : "text-lead max-w-lg",
          )}
        >
          {author}
        </p>
      </div>
    </div>
  )
}
