import { Metadata } from 'next'
import Link from 'next/link'
import { getAllCaseStudies } from '../../lib/case-studies'
import { CaseStudiesPageClient } from './CaseStudiesPageClient'
import { Title } from '../components/ui/title'
import { Eyebrow } from '../components/ui/eyebrow'

export const metadata: Metadata = {
  title: 'Case Studies | Sparq AI Solutions',
  description: 'Explore real-world AI implementations and their impact. See how Sparq delivers business breakthroughs through AI-accelerated solutions.',
  keywords: 'AI case studies, artificial intelligence, business solutions, AI implementation, technology transformation'
}

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies()

  return <CaseStudiesPageClient caseStudies={caseStudies} />
}