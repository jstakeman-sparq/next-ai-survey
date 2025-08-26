import { VariantProps, cva } from "class-variance-authority"
import { Eyebrow } from "@/components/ui/eyebrow"
import { StatsStack } from "@/components/ui/stats"
import { Title } from "@/components/ui/title"
import { cn } from "@/lib/utils"

const bgColors = cva("text-neutral-light-100", {
  variants: {
    variant: {
      primary: "bg-rust-300",
      secondary: "bg-forest-500",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

type bgVariant = VariantProps<typeof bgColors>["variant"]

type MetricsProps = {
  variant?: bgVariant
  title: string
  eyebrow: string
  stats: {
    label: string
    value: string
  }[]
}

export function Metrics({
  variant = "primary",
  eyebrow,
  title,
  stats = [],
}: MetricsProps) {
  return (
    <div className={cn("noise py-12 md:py-32", bgColors({ variant: variant }))}>
      <div className="relative z-10 container">
        <div className="grid grid-cols-8">
          <div className="col-span-8 flex flex-col justify-center gap-y-8 text-balance md:col-span-5">
            <div className="mb-16 grid gap-8 md:mb-0 md:gap-5">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {title && (
                <Title variant="hero" as="h3" className="text-h2 md:text-hero">
                  {title}
                </Title>
              )}
            </div>
          </div>
          <div className="col-span-8 flex md:col-span-3">
            <StatsStack items={stats} />
          </div>
        </div>
      </div>
    </div>
  )
}
