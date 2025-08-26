import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCaseStudyBySlug, getCaseStudySlugs } from '../../../lib/case-studies'
import { CaseStudyLayout } from '../../components/case-studies/CaseStudyLayout'

interface CaseStudyPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getCaseStudySlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Sparq',
      description: 'The requested case study could not be found.'
    }
  }

  return {
    title: `${caseStudy.title} | Sparq Case Studies`,
    description: caseStudy.seo?.description || caseStudy.subtitle,
    keywords: caseStudy.seo?.keywords?.join(', '),
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.subtitle,
      images: caseStudy.seo?.ogImage ? [{ url: caseStudy.seo.ogImage }] : [],
      type: 'article',
      publishedTime: caseStudy.publishDate,
      authors: [caseStudy.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.title,
      description: caseStudy.subtitle,
      images: caseStudy.seo?.ogImage ? [caseStudy.seo.ogImage] : [],
    }
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  return <CaseStudyLayout caseStudy={caseStudy} />
}