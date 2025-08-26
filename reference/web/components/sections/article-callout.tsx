import { ArticleCreator } from "@/components/ui/article-creator"
import { Article, Author } from "@/lib/types"

export function ArticleCallout({
  author,
  article,
}: {
  author?: Author
  article?: Article
}) {
  return (
    <div>
      {article && article.title && article.cover && article.slug && (
        <ArticleCreator
          {...article}
          {...author}
          variant="secondary"
          showDescription={false}
        />
      )}
    </div>
  )
}
