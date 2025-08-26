import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import { ArticleSpotlight } from "@/components/ui/article-spotlight"
import { Title } from "@/components/ui/title"
import { Article } from "@/lib/types"

export function Spotlight({
  title,
  description,
  article,
}: {
  title: string
  description: BlocksContent
  article?: Article
}) {
  console.log(title, description, article)
  return (
    <div className="py-12 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-10 lg:gap-32">
          <div className="col-span-1 lg:col-span-4">
            <Title
              as="h3"
              variant="display"
              className="text-h1 lg:text-hero mb-6 font-bold lg:mb-14"
            >
              {title}
            </Title>
            <div className="max-w-2/3 text-xl lg:max-w-1/2">
              <BlocksRenderer content={description} />
            </div>
          </div>

          <div className="relative col-span-1 md:col-span-4 xl:col-span-6">
            {article && article.title && article.cover && article.slug && (
              <ArticleSpotlight {...article} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
