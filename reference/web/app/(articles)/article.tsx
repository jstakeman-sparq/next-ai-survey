import { Related } from "@/components/ui/related"
import { ArticleHeader } from "@/components/article-header"
import { Content } from "@/components/content"
import { LeftSidebar } from "@/components/left-sidebar"
import { RightSidebar } from "@/components/right-sidebar"
import { AuthorCard } from "@/components/sections/author-card"
import { NextArticles } from "@/components/sections/next-articles"
import { ServicesList } from "@/components/sections/services-list"
import { TechnologiesList } from "@/components/sections/technologies-list"
import { TableOfContents } from "@/components/table-of-contents"
import { ArticleType, Article as TArticle } from "@/lib/types"
import { cn, formatDate } from "@/lib/utils"

export function Article({ article }: { article: TArticle }) {
  return (
    <article>
      <ArticleHeader
        title={article.title}
        description={article.description}
        author={article.author}
        date={formatDate(article.publishedAt)}
        type={article.type}
        technologies={article.technologies ?? []}
        services={article.services ?? []}
      />

      <div className="container">
        <div
          className={cn(
            "grid grid-cols-12 gap-8",
            article.type === ArticleType.CaseStudy && "lg:gap-x-20",
          )}
        >
          <div
            className={cn(
              "col-span-12 lg:col-span-3",
              article.type === ArticleType.CaseStudy && "lg:col-span-4",
            )}
          >
            <div className="py-12 lg:py-24">
              {article.type !== ArticleType.CaseStudy ? (
                <>
                  <TableOfContents content={article.blocks} />
                  <LeftSidebar blocks={article.leftSidebar} />
                </>
              ) : (
                <>
                  <LeftSidebar blocks={article.leftSidebar} />
                  <ServicesList items={article.services || []} />
                  <TechnologiesList items={article.technologies || []} />
                </>
              )}
            </div>
          </div>

          <div
            className={cn(
              "col-span-12 lg:col-span-6",
              article.type === ArticleType.CaseStudy && "lg:col-span-7",
            )}
          >
            <div className="flex flex-col gap-10 py-12 lg:gap-20 lg:py-24">
              <Content blocks={article.blocks} type="article" />
              {article.type === ArticleType.CaseStudy && (
                <ServicesList variant="content" items={article.services} />
              )}
            </div>
          </div>

          <div
            className={cn(
              "col-span-12 lg:col-span-3",
              article.type === ArticleType.CaseStudy && "lg:col-span-1",
            )}
          >
            <div className="py-12 lg:py-24">
              <RightSidebar blocks={article.rightSidebar} />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9 lg:col-start-4">
            <AuthorCard {...article.author} />
          </div>
        </div>

        {article.type !== ArticleType.CaseStudy && <NextArticles />}

        <Related />
      </div>
    </article>
  )
}
