import { BlocksContent } from "@strapi/blocks-react-renderer"
import type { ButtonProps } from "@/components/ui/button"

export type Block = {
  id: number
  __component: string
  [key: string]: unknown
}

export type Page = {
  slug: string
  title: string
  description: string
  blocks: Block[]
  type: PageType
}

export type Action = {
  text: string
  url: string
  isExternal: boolean
  variant: ButtonProps["variant"]
}

export type Media = {
  url: string
  alternativeText?: string
  mime: string
  width?: number
  height?: number
}

export type Article = {
  title: string
  description: string
  slug: string
  cover: Media
  categories: Category[]
  blocks: Block[]
  documentId: string
  id: number
  updatedAt: string
  createdAt: string
  type: ArticleType
  author: Author
  publishedAt: string
  leftSidebar: Block[]
  rightSidebar: Block[]
  technologies: Technology[]
  services: Service[]
}

export type Category = {
  id: string
  name: string
  slug: string
  articles: Article[]
  description: string
}

export type Author = {
  id: string
  name: string
  role: string
  email: string
  avatar: Media & {
    formats: {
      large: Media
      media: Media
      small: Media
      thumbnail: Media
    }
  }
  social: Social
  bio: BlocksContent
}

export type Bullet = {
  id: number
  body: string
}

export type Area = {
  title: string
  description: BlocksContent
  bullets: Bullet[]
}

export type Member = {
  name: string
  role: string
  description: string
  avatar: Media
  linkedin: string
}

export type Question = {
  id: number
  title: string
  content: BlocksContent
}

export type Email = {
  id: number
  label: string
  value: string
}

export type Social = {
  linkedin: string
  instagram: string
  x: string
}

export enum ArticleType {
  Default = "Default",
  CaseStudy = "Case Study",
  Video = "Video",
  PressRelease = "Press Release",
}

export enum PageType {
  Default = "Default",
  Industry = "Industry",
}

export type Technology = {
  id: string
  name: string
}

export type Service = {
  id: string
  name: string
}
