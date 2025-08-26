import React, { lazy } from "react"
import type { Block } from "@/lib/types"

const Hero = lazy(() =>
  import("@/components/sections/hero").then((mod) => ({
    default: mod.Hero,
  })),
)

const Highlights = lazy(() =>
  import("@/components/sections/highlights").then((mod) => ({
    default: mod.Highlights,
  })),
)

const Impact = lazy(() =>
  import("@/components/sections/impact").then((mod) => ({
    default: mod.Impact,
  })),
)

const Metrics = lazy(() =>
  import("@/components/sections/metrics").then((mod) => ({
    default: mod.Metrics,
  })),
)

const Showcase = lazy(() =>
  import("@/components/sections/showcase").then((mod) => ({
    default: mod.Showcase,
  })),
)

const Team = lazy(() =>
  import("@/components/sections/team").then((mod) => ({
    default: mod.Team,
  })),
)

const Headline = lazy(() =>
  import("@/components/sections/headline").then((mod) => ({
    default: mod.Headline,
  })),
)

const Bullets = lazy(() =>
  import("@/components/sections/bullets").then((mod) => ({
    default: mod.Bullets,
  })),
)

const Video = lazy(() =>
  import("@/components/sections/video").then((mod) => ({
    default: mod.Video,
  })),
)

const Story = lazy(() =>
  import("@/components/sections/story").then((mod) => ({
    default: mod.Story,
  })),
)

const Leaders = lazy(() =>
  import("@/components/sections/leaders").then((mod) => ({
    default: mod.Leaders,
  })),
)

const Expertise = lazy(() =>
  import("@/components/sections/expertise").then((mod) => ({
    default: mod.Expertise,
  })),
)

const Statement = lazy(() =>
  import("@/components/sections/statement").then((mod) => ({
    default: mod.Statement,
  })),
)

const Quote = lazy(() =>
  import("@/components/sections/quote").then((mod) => ({
    default: mod.Quote,
  })),
)

const CardGrid = lazy(() =>
  import("@/components/sections/card-grid").then((mod) => ({
    default: mod.CardGrid,
  })),
)

const Spotlight = lazy(() =>
  import("@/components/sections/spotlight").then((mod) => ({
    default: mod.Spotlight,
  })),
)

const Contact = lazy(() =>
  import("@/components/sections/contact").then((mod) => ({
    default: mod.Contact,
  })),
)

const Creator = lazy(() =>
  import("@/components/sections/creator").then((mod) => ({
    default: mod.Creator,
  })),
)

const ArticlesList = lazy(() =>
  import("@/components/sections/articles-list").then((mod) => ({
    default: mod.ArticlesList,
  })),
)

const Faq = lazy(() =>
  import("@/components/sections/faq").then((mod) => ({
    default: mod.Faq,
  })),
)

const Prose = lazy(() =>
  import("@/components/sections/prose").then((mod) => ({
    default: mod.Prose,
  })),
)

const Callout = lazy(() =>
  import("@/components/sections/callout").then((mod) => ({
    default: mod.Callout,
  })),
)

const ArticleCallout = lazy(() =>
  import("@/components/sections/article-callout").then((mod) => ({
    default: mod.ArticleCallout,
  })),
)

const StatCards = lazy(() =>
  import("@/components/sections/stat-cards").then((mod) => ({
    default: mod.StatCards,
  })),
)

const FilledLink = lazy(() =>
  import("@/components/sections/filled-link").then((mod) => ({
    default: mod.FilledLink,
  })),
)

const Capabilities = lazy(() =>
  import("@/components/sections/capabilities").then((mod) => ({
    default: mod.Capabilities,
  })),
)

const Feature = lazy(() =>
  import("@/components/sections/feature").then((mod) => ({
    default: mod.Feature,
  })),
)

const GlobeSpotlight = lazy(() =>
  import("@/components/sections/globe-spotlight").then((mod) => ({
    default: mod.GlobeSpotlight,
  })),
)

const CarouselTestimony = lazy(() =>
  import("@/components/sections/carousel-testimony").then((mod) => ({
    default: mod.CarouselTestimony,
  })),
)

const blocksMap = {
  "sections.hero": Hero,
  "sections.highlights": Highlights,
  "sections.impact": Impact,
  "sections.metrics": Metrics,
  "sections.showcase": Showcase,
  "sections.team": Team,
  "sections.headline": Headline,
  "sections.bullets": Bullets,
  "sections.video": Video,
  "sections.story": Story,
  "sections.leaders": Leaders,
  "sections.expertise": Expertise,
  "sections.statement": Statement,
  "sections.quote": Quote,
  "sections.card-grid": CardGrid,
  "sections.spotlight": Spotlight,
  "sections.contact": Contact,
  "sections.creator": Creator,
  "sections.articles-list": ArticlesList,
  "sections.faq": Faq,
  "shared.prose": Prose,
  "shared.callout": Callout,
  "shared.article-callout": ArticleCallout,
  "shared.stat-cards": StatCards,
  "shared.filled-link": FilledLink,
  "sections.capabilities": Capabilities,
  "sections.feature": Feature,
  "sections.globe-spotlight": GlobeSpotlight,
  "sections.carousel-testimony": CarouselTestimony,
} as const

interface Props {
  blocks: Block[]
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  type: "page" | "article"
}

export function Content({ blocks, searchParams, type }: Props) {
  console.log(blocks)
  return blocks?.map((block) => {
    const Component = blocksMap[block.__component as keyof typeof blocksMap]

    if (!Component) {
      console.warn(`No component found for: ${block.__component}`)
      return null
    }

    // Pass searchParams to ArticlesList component specifically
    // Pass type prop to shared.prose component
    let props = block
    if (block.__component === "sections.articles-list") {
      props = { ...block, searchParams }
    } else if (block.__component === "shared.prose") {
      props = { ...block, type }
    }

    return (
      <React.Suspense key={`${block.__component}-${block.id}`} fallback={null}>
        {/* @ts-expect-error block.__component guarantees the right shape here */}
        <Component {...props} />
      </React.Suspense>
    )
  })
}
