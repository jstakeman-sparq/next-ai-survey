import { CheckCircle } from "@/components/icons/check-circle"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Title } from "@/components/ui/title"
import type { Area } from "@/lib/types"
import { cn } from "@/lib/utils"
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer"
import { cva, VariantProps } from "class-variance-authority"

const iconColor = cva(" ", 
 {
    variants: {
      variant: {
        primary: "bg-rust-100 text-rust-300",
        secondary: "bg-forest-100 text-forest-500",
        accent: "bg-accent-200 text-forest-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
)

type IconVariant = VariantProps<typeof iconColor>["variant"]


export function Expertise({
  eyebrow,
  title,
  description,
  areas,
  variant = "primary",
}: {
  variant?: IconVariant
  eyebrow: string
  title: string
  description: BlocksContent
  areas: Area[]
}) {
  return (
    <section className="py-24 lg:py-32">
      <div className="container">
       <div className="mb-8 lg:mb-20">
          <Eyebrow className="mb-8 lg:mb-6">
            {eyebrow}
          </Eyebrow>
          <Title as="h3" variant="display" className="text-h2 lg:text-display lg:max-w-2/3 mb-8 lg:mb-4">
            {title}
          </Title>
          <div className="lg:max-w-3xl text-lg lg:text-xl">
            <BlocksRenderer content={description}/>
          </div>
       </div>
      
        <div className="grid grid-cols-1 gap-12 lg:gap-18 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <div key={area.title} className="border-t border-neutral-light-400 py-6">
              <Title className="text-h2 font-bold mb-4">
                {area.title}
              </Title>
              <div className="mb-8">
                <BlocksRenderer content={area.description} />
              </div>
              <ul>
                {area.bullets?.map((item, index) => (
                  <div key={item.id ?? index} className="flex gap-x-2.5 my-4 items-center font-bold">
                    <CheckCircle className={cn("rounded-full", iconColor({ variant }))}/>
                    <li>{item.body}</li>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
