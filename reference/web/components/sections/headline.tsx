import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer"
import { Eyebrow } from "@/components/ui/eyebrow"

export function Headline({
  eyebrow,
  content,
}: {
  eyebrow: string
  content: BlocksContent
}) {
  return (
    <section className="pt-36 pb-0 text-center lg:pt-48 lg:pb-40">
      <div className="container">
        <div className="grid gap-y-8">
          <Eyebrow>{eyebrow}</Eyebrow>

          <div className="text-h2 lg:text-display font-bold text-balance">
            <BlocksRenderer content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}
