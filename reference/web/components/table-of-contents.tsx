"use client"

import { Article } from "@/lib/types"
import { HeadingItem, extractHeadingsFromBlocks } from "@/lib/utils"

export function TableOfContents({ content }: { content: Article["blocks"] }) {
  const headings = extractHeadingsFromBlocks(content)

  if (headings.length === 0) {
    return null
  }

  const handleScrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const getIndentClass = (level: number) => {
    switch (level) {
      case 1:
        return ""
      case 2:
        return "ml-0"
      case 3:
        return "ml-3"
      case 4:
        return "ml-6"
      case 5:
        return "ml-9"
      case 6:
        return "ml-12"
      default:
        return ""
    }
  }

  const renderHeading = (heading: HeadingItem, index: number) => (
    <li key={index} className={getIndentClass(heading.level)}>
      <button
        onClick={() => handleScrollToHeading(heading.id)}
        className="hover:text-muted-foreground block w-full cursor-pointer py-2.5 text-left leading-tight transition-colors"
      >
        {heading.text}
      </button>
    </li>
  )

  return (
    <nav className="text-lg">
      <h2 className="font-bold">
        <span className="sr-only">Table of Contents: </span>What&apos;s here
      </h2>
      <ul>{headings.map(renderHeading)}</ul>
    </nav>
  )
}
