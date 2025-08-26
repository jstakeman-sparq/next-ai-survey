import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer"
import { cn } from "@/lib/utils"

export function Callout({
  content,
  subcontent,
  variant,
}: {
  content: BlocksContent
  subcontent?: BlocksContent
  variant?: "full" | "compact"
}) {
  return (
    <div
      className={cn(
        "bg-accent-200 noise text-neutral-dark-500 rounded-xl p-8 [--noise-blend-mode:var(--color-neutral-dark-500)] [--noise-opacity:0.5]",
        variant === "full" ? "grid gap-8" : " ",
      )}
    >
      <div
        className={cn(
          "font-bold",
          variant === "compact"
            ? "text-xl leading-[1.3]"
            : "text-h1 leading-[1.2]",
        )}
      >
        <BlocksRenderer content={content} />
      </div>
      {subcontent && (
        <div className="max-w-64 text-sm leading-[1.5]">
          <BlocksRenderer content={subcontent} />
        </div>
      )}
    </div>
  )
}
