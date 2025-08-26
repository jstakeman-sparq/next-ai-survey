import { VariantProps, cva } from "class-variance-authority"
import snarkdown from "snarkdown"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import Image from "@/components/ui/image"
import { Marquee, MarqueeWrapper } from "@/components/ui/marquee"
import { Paragraph } from "@/components/ui/paragraph"
import { StatsStack } from "@/components/ui/stats"
import { Title } from "@/components/ui/title"
import bgBorderMobile from "@/assets/media/images/bg-border-team-mobile.svg"
import bgImage from "@/assets/media/images/bg-world.svg"
import bgBorder from "@/assets/media/images/gb-border-team.svg"
import { cn } from "@/lib/utils"

const bgColors = cva("", {
  variants: {
    variant: {
      primary: "bg-rust-100",
      secondary: "bg-forest-100",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

type bgVariant = VariantProps<typeof bgColors>["variant"]

type TeamProps = {
  variant?: bgVariant
  eyebrow: string
  title: string
  description?: string
  stats: {
    label: string
    value: string
  }[]
  action?: {
    text: string
    url: string
    isExternal: boolean
    variant: string
  }[]
  photos?: {
    url: string
    width: number
    height: number
    alternativeText: string
  }[]
}

export function Team({
  variant = "primary",
  eyebrow,
  title,
  description,
  action = [],
  stats = [],
  photos = [],
}: TeamProps) {
  const eyebrowHtml = snarkdown(eyebrow)

  return (
    <div
      className={cn(
        "noise relative overflow-hidden pt-24 pb-36 [--noise-blend-mode:color-burn] md:py-52",
        "[&:has(+footer)_.world]:md:-bottom-15",
        bgColors({ variant: variant }),
      )}
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-y-20 md:gap-y-0 lg:grid-cols-8 lg:gap-x-16">
          <div className="col-span-5 gap-y-8 text-balance">
            <div className="flex max-w-2xl flex-col gap-y-8">
              {eyebrow && (
                <Eyebrow>
                  <span dangerouslySetInnerHTML={{ __html: eyebrowHtml }} />
                </Eyebrow>
              )}
              {title && (
                <Title variant="hero" as="h3" className="text-h2 md:text-hero">
                  {title}
                </Title>
              )}
              {description && (
                <Paragraph className="text-lead">{description}</Paragraph>
              )}
              {action?.[0]?.url && action?.[0]?.text && (
                <Button variant="primary" size="lg">
                  {action[0].text}
                </Button>
              )}
            </div>
          </div>
          <div className="col-span-3">
            <StatsStack items={stats} variant="secondary" />
          </div>
        </div>
      </div>

      <Image
        src={bgImage}
        alt=""
        className="world absolute bottom-32 left-1/2 -translate-x-1/2 md:-bottom-10"
      />

      <div className="mt-64 md:mt-[21.125rem]">
        <div className="relative">
          {photos?.length > 0 && (
            <MarqueeWrapper>
              <Marquee pauseOnHover duration={30} gap={2}>
                {photos.map((photo, index) => {
                  if (!photo.url) return null
                  return (
                    <Image
                      key={index}
                      src={photo.url}
                      alt={photo.alternativeText || `Photo ${index + 1}`}
                      width={0}
                      height={0}
                      sizes="(max-width: 768px)"
                      className="h-[14.25rem] w-[8.438rem] rounded-xl object-cover md:w-[9.5rem]"
                    />
                  )
                })}
              </Marquee>
            </MarqueeWrapper>
          )}
          <Image
            src={bgBorder}
            alt=""
            className="absolute top-1/2 left-1/2 z-10 hidden min-w-80 -translate-x-1/2 -translate-y-1/2 lg:block"
          />
          <Image
            src={bgBorderMobile}
            alt=""
            className="absolute top-1/2 left-1/2 z-10 block -translate-x-1/2 -translate-y-1/2 lg:hidden"
          />
        </div>
      </div>
    </div>
  )
}
