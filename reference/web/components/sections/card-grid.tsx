import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer"
import { Card } from "@/components/ui/card"
import { Title } from "@/components/ui/title"
import { Media } from "@/lib/types"

export function CardGrid({
  title,
  description,
  cards,
}: {
  title: string
  description?: BlocksContent
  cards: {
    title: string
    description: string
    image?: Media
    action: {
      url: string
      text: string
      external?: boolean
    }
  }[]
}) {
  return (
    <div className="py-24 lg:py-36">
      <div className="container">
        <div className="mb-8 grid gap-8 lg:mb-24">
          <Title
            as="h3"
            variant="display"
            className="text-h1 lg:text-display font-bold"
          >
            {title}
          </Title>
          {description && (
            <div className="[&_a]:decoration-accent-200 text-lead [&_a]:cursor-pointer [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-4">
              <BlocksRenderer content={description} />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {cards.length > 0 &&
            cards.map((card, index) => (
              <Card
                className="p-6 lg:p-9"
                key={index}
                title={card.title}
                description={card.description}
                image={card.image?.url}
                action={{
                  href: card.action.url,
                  label: card.action.text,
                }}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
