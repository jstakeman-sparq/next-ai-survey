import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"
import { ArticleType, type Block } from "@/lib/types"
import { BlocksContent } from "@strapi/blocks-react-renderer"

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-stats",
        "text-hero",
        "text-display",
        "text-h1",
        "text-h2",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]

  const month = months[date.getMonth()]
  const day = date.getDate().toString().padStart(2, "0")
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}

export function getArticleUrl(type: ArticleType, slug: string) {
  return type === ArticleType.CaseStudy
    ? `/results/${slug}`
    : `/insights/${slug}`
}

export type HeadingItem = {
  id: string
  text: string
  level: number
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

type BlockNode = {
  type: string
  level?: number
  text?: string
  children?: BlockNode[]
  [key: string]: unknown
}

function extractHeadingsFromBlocksContent(content: BlocksContent): HeadingItem[] {
  if (!content || !Array.isArray(content)) {
    return []
  }

  const headings: HeadingItem[] = []
  
  function traverse(nodes: BlockNode[]): void {
    for (const node of nodes) {
      if (node.type === "heading" && node.level && node.level >= 1 && node.level <= 6) {
        const text = extractTextFromNode(node)
        if (text.trim()) {
          headings.push({
            id: slugify(text),
            text: text.trim(),
            level: node.level,
          })
        }
      }
      
      if (node.children && Array.isArray(node.children)) {
        traverse(node.children)
      }
    }
  }
  
  traverse(content as BlockNode[])
  return headings
}

function extractTextFromNode(node: BlockNode): string {
  if (node.type === "text") {
    return node.text || ""
  }
  
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join("")
  }
  
  return ""
}

export function extractHeadingsFromBlocks(blocks: Block[]): HeadingItem[] {
  if (!blocks || !Array.isArray(blocks)) {
    return []
  }

  const proseBlocks = blocks.filter(block => block.__component === "shared.prose")
  const allHeadings: HeadingItem[] = []
  
  for (const block of proseBlocks) {
    if (block.body && Array.isArray(block.body)) {
      const headings = extractHeadingsFromBlocksContent(block.body as BlocksContent)
      allHeadings.push(...headings)
    }
  }
  
  return allHeadings
}
