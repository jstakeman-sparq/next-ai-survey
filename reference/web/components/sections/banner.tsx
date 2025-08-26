import { Button } from "@/components/ui/button"
import Image from "@/components/ui/image"
import { Title } from "@/components/ui/title"
import { Media } from "@/lib/types"

export function Banner({
  title,
  image,
  action,
}: {
  title: string
  image: Media
  action: {
    url: string
    text: string
    external?: boolean
  }
}) {
  return (
    <div className="grid gap-8">
      <Title as="h4" className="text-h2 leading-[1.25] font-bold text-balance">
        {title}
      </Title>
      <Image
        src={image.url}
        alt={image.alternativeText || ""}
        width={image.width}
        height={image.height}
        className="rounded-lg"
      />
      <Button variant="secondary" href={action.url}>
        {action.text}
      </Button>
    </div>
  )
}
