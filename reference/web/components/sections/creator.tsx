import Link from "next/link"
import { ArticleCreator } from "@/components/ui/article-creator"
import { Button } from "@/components/ui/button"
import Image from "@/components/ui/image"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import { Article, Author } from "@/lib/types"

export function Creator({
  title,
  author,
  article,
}: {
  title: string
  author?: Author
  article?: Article
}) {
  if (!author) return null

  return (
    <section className="py-8">
      <div className="container">
        <Title variant="display" className="mb-16">
          {title}
        </Title>
        <div className="bg-neutral-light-200 rounded-xl px-4 py-6 md:p-12">
          <div className="mb-6 flex flex-col items-start justify-between gap-6 md:mb-8 md:flex-row md:items-end">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
              {author.avatar.url && (
                <div className="max-w-24">
                  <Image
                    src={author.avatar.url}
                    alt={author.avatar.alternativeText || ""}
                    width={author.avatar.width}
                    height={author.avatar.height}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div>
                  <Title
                    as="h4"
                    variant="subtitle"
                    className="text-h2 font-bold"
                  >
                    {author.name}
                  </Title>
                  <Paragraph className="text-lg">{author.role}</Paragraph>
                </div>

                {/* Categories  */}
                {/* {author.categories.length > 0 && ( */}
                <div className="flex flex-wrap gap-2 md:gap-4">
                  {/* {author.categories.map((category) => ( */}
                  <Link
                    // href={/categories/${category.slug}}
                    // key={category.id}
                    href="#"
                    className="text-rust-300 bg-rust-100 w-max rounded-sm px-2.5 py-1.5 text-xs font-black uppercase"
                  >
                    PRODUCT STRATEGY
                  </Link>
                  <Link
                    href="#"
                    className="text-rust-300 bg-rust-100 w-max rounded-sm px-2.5 py-1.5 text-xs font-black uppercase"
                  >
                    IA
                  </Link>
                  {/* ))} */}
                </div>
              </div>
            </div>

            <Button variant="secondary" href="#">
              View all insights
            </Button>
          </div>

          {article && article.title && article.cover && article.slug && (
            <ArticleCreator {...article} {...author} />
          )}
        </div>
      </div>
    </section>
  )
}
