export interface CaseStudyAuthor {
  name: string
  avatar: string
  bio: string
}

export interface CaseStudyHighlight {
  value: string
  description: string
}

export interface CaseStudyQuote {
  text: string
  attribution: string
}

export interface CaseStudyRelatedArticle {
  title: string
  date: string
  readTime: string
  tag: string
  slug: string
}

export interface CaseStudySEO {
  description: string
  keywords: string[]
  ogImage?: string
}

export interface CaseStudy {
  // Metadata
  slug: string
  title: string
  subtitle: string
  publishDate: string
  readTime: string
  tags: string[]
  
  // Author information
  author: CaseStudyAuthor
  
  // Key metrics
  keyHighlights: CaseStudyHighlight[]
  
  // Content sections
  overview: string
  industry: string[]
  challenge: string
  approach: string
  solution: string
  results: string
  
  // Optional quote
  quote?: CaseStudyQuote
  
  // Technical details
  technologies: string[]
  services: string[]
  
  // Related content
  relatedArticles: CaseStudyRelatedArticle[]
  
  // SEO
  seo?: CaseStudySEO
}

export interface CaseStudyFrontmatter {
  title: string
  subtitle: string
  publishDate: string
  readTime: string
  tags: string[]
  author: CaseStudyAuthor
  keyHighlights: CaseStudyHighlight[]
  industry: string[]
  quote?: CaseStudyQuote
  technologies: string[]
  services: string[]
  relatedArticles: CaseStudyRelatedArticle[]
  seo?: CaseStudySEO
}

export interface CaseStudyContent {
  frontmatter: CaseStudyFrontmatter
  content: string
  slug: string
}