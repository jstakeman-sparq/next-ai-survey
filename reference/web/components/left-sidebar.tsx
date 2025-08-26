import React, { lazy } from "react"
import type { Block } from "@/lib/types"

const Banner = lazy(() =>
  import("@/components/sections/banner").then((mod) => ({
    default: mod.Banner,
  })),
)

const KeyHighlights = lazy(() =>
  import("@/components/sections/key-highlights").then((mod) => ({
    default: mod.KeyHighlights,
  })),
)

const ListItems = lazy(() =>
  import("@/components/sections/list-items").then((mod) => ({
    default: mod.ListItems,
  })),
)

const blocksMap = {
  "shared.banner": Banner,
  "shared.key-highlights": KeyHighlights,
  "shared.list-items": ListItems,
} as const

interface Props {
  blocks: Block[]
}

export function LeftSidebar({ blocks }: Props) {
  console.log(blocks)
  return blocks?.map((block) => {
    const Component = blocksMap[block.__component as keyof typeof blocksMap]

    if (!Component) {
      console.warn(`No component found for: ${block.__component}`)
      return null
    }

    return (
      <React.Suspense key={`${block.__component}-${block.id}`} fallback={null}>
        {/* @ts-expect-error block.__component guarantees the right shape here */}
        <Component {...block} />
      </React.Suspense>
    )
  })
}
