import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import Image from "@/components/ui/image"
import { Carousel, CarouselItem } from "@/components/ui/shadcn/carousel"
import { Media } from "@/lib/types"
import { cn } from "@/lib/utils"

type TestimonyItem = {
  description: BlocksContent
  role: string
  avatar: Media
}

export function CarouselTestimony({
  items = [],
  variant = "primary",
}: {
  items: TestimonyItem[]
  variant?: "primary" | "secondary"
}) {
  return (
    <div
      className={cn(
        variant === "primary"
          ? "bg-accent-100 noise py-32 [--noise-opacity:0.5] md:pb-16"
          : "text-neutral-dark-50 py-28",
      )}
    >
      <Carousel>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className={cn("container space-y-6 lg:max-w-[75%]")}>
              <div
                className={cn(
                  "lg:text-h1 mx-auto indent-28 text-xl leading-[1.1] font-light italic",
                )}
              >
                <BlocksRenderer content={item.description} />
              </div>
              <div className="flex items-center space-x-4">
                <Image
                  src={item.avatar.url}
                  alt={item.avatar.alternativeText || ""}
                  width={item.avatar.width}
                  height={item.avatar.height}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <p className={cn("text-xl leading-[1.3] font-bold")}>
                  {" "}
                  {item.role}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  )
}
