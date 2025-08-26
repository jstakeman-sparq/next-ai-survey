import { Badge } from "@/components/ui/badge"
import { ByLine } from "@/components/ui/by-line"
import { Divider } from "@/components/ui/divider"
import { ShareButton } from "@/components/ui/share-button"
import { Title } from "@/components/ui/title"
import { ArticleType, Author, Service, Technology } from "@/lib/types"

type ArticleHeaderProps = {
  title: string
  description: string
  date: string
  author?: Author
  type: ArticleType
  technologies: Technology[]
  services: Service[]
}

export function ArticleHeader({
  title,
  description,
  author,
  date,
  type,
  technologies = [],
  services = [],
}: ArticleHeaderProps) {
  const readTime = 10

  return (
    <section className="bg-neutral-dark-400 noise pt-24 pb-16 text-white md:pt-64">
      <div className="container">
        <Title as="h1" variant="hero" className="text-h1 md:text-hero">
          {title}
        </Title>

        <Divider />

        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:gap-0">
          <p className="text-xl">{description}</p>

          <div className="flex flex-col items-start gap-6 md:items-end">
            <div className="flex max-w-xl flex-wrap justify-start gap-4 md:justify-end">
              {technologies.map((technology) => (
                <Badge key={technology.id}>{technology.name}</Badge>
              ))}
              {services.map((service) => (
                <Badge key={service.id}>{service.name}</Badge>
              ))}
              <Badge>{type === ArticleType.Default ? "Insight" : type}</Badge>
            </div>

            <div className="flex gap-4">
              <ShareButton
                name="linkedin"
                title={title}
                description={description}
              />
              <ShareButton
                name="twitter"
                title={title}
                description={description}
              />
            </div>
          </div>
        </div>

        <ByLine author={author} date={date} readTime={readTime} />
      </div>
    </section>
  )
}
