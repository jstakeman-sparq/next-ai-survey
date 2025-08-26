import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { CaseStudy, CaseStudyContent, CaseStudyFrontmatter } from '../types/case-study'

const caseStudiesDirectory = join(process.cwd(), 'content/case-studies')

export function getCaseStudySlugs(): string[] {
  try {
    const files = readdirSync(caseStudiesDirectory)
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace(/\.md$/, ''))
  } catch (error) {
    // Return empty array if directory doesn't exist yet
    return []
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const fullPath = join(caseStudiesDirectory, `${slug}.md`)
    const fileContents = readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Process content sections from the markdown content
    const contentSections = await parseContentSections(content)
    
    const frontmatter = data as CaseStudyFrontmatter
    
    return {
      slug,
      title: frontmatter.title,
      subtitle: frontmatter.subtitle,
      publishDate: frontmatter.publishDate,
      readTime: frontmatter.readTime,
      tags: frontmatter.tags,
      author: frontmatter.author,
      keyHighlights: frontmatter.keyHighlights,
      overview: contentSections.overview,
      industry: frontmatter.industry,
      challenge: contentSections.challenge,
      approach: contentSections.approach,
      solution: contentSections.solution,
      results: contentSections.results,
      quote: frontmatter.quote,
      technologies: frontmatter.technologies,
      services: frontmatter.services,
      relatedArticles: frontmatter.relatedArticles,
      seo: frontmatter.seo
    }
  } catch (error) {
    console.error(`Error loading case study ${slug}:`, error)
    return null
  }
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const slugs = getCaseStudySlugs()
  const caseStudies = await Promise.all(
    slugs.map(slug => getCaseStudyBySlug(slug))
  )
  
  // Filter out null values and sort by publish date
  return caseStudies
    .filter((caseStudy): caseStudy is CaseStudy => caseStudy !== null)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
}

export async function processCaseStudyContent(content: string): Promise<string> {
  const processedContent = await remark()
    .use(html)
    .process(content)
  
  return processedContent.toString()
}

async function parseContentSections(content: string) {
  // Split content by markdown headings to extract sections
  const sections = {
    overview: '',
    challenge: '',
    approach: '',
    solution: '',
    results: ''
  }
  
  const lines = content.split('\n')
  let currentSection = ''
  let currentContent: string[] = []
  
  for (const line of lines) {
    if (line.startsWith('## ')) {
      // Save previous section
      if (currentSection && currentContent.length > 0) {
        const sectionKey = getSectionKey(currentSection)
        if (sections.hasOwnProperty(sectionKey)) {
          const markdownContent = currentContent.join('\n').trim()
          sections[sectionKey] = await processCaseStudyContent(markdownContent)
        }
      }
      
      // Start new section
      currentSection = line.replace('## ', '').trim()
      currentContent = []
    } else if (currentSection && line.trim()) {
      currentContent.push(line)
    }
  }
  
  // Save last section
  if (currentSection && currentContent.length > 0) {
    const sectionKey = getSectionKey(currentSection)
    if (sections.hasOwnProperty(sectionKey)) {
      const markdownContent = currentContent.join('\n').trim()
      sections[sectionKey] = await processCaseStudyContent(markdownContent)
    }
  }
  
  return sections
}

function getSectionKey(sectionTitle: string): keyof { overview: string; challenge: string; approach: string; solution: string; results: string } {
  const normalized = sectionTitle.toLowerCase().replace(/[^a-z]/g, '')
  
  // Map section titles to our expected keys
  if (normalized.includes('overview')) return 'overview'
  if (normalized.includes('challenge')) return 'challenge'
  if (normalized.includes('approach')) return 'approach'
  if (normalized.includes('solution')) return 'solution'
  if (normalized.includes('results')) return 'results'
  
  // Default fallback
  return 'overview'
}

export function getCaseStudyPaths() {
  const slugs = getCaseStudySlugs()
  return slugs.map(slug => ({
    params: { slug }
  }))
}