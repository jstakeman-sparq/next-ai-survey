import { CaseStudy } from "../../../types/case-study"
import { CaseStudyHero } from "./CaseStudyHero"
import { CaseStudyContent } from "./CaseStudyContent"
import { Footer } from "../layout/footer"

interface CaseStudyLayoutProps {
  caseStudy: CaseStudy
}

export function CaseStudyLayout({ caseStudy }: CaseStudyLayoutProps) {
  return (
    <div className="min-h-screen">
      <CaseStudyHero 
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        author={caseStudy.author}
        publishDate={caseStudy.publishDate}
        readTime={caseStudy.readTime}
        tags={caseStudy.tags}
      />
      
      <CaseStudyContent 
        overview={caseStudy.overview}
        industry={caseStudy.industry}
        challenge={caseStudy.challenge}
        approach={caseStudy.approach}
        solution={caseStudy.solution}
        results={caseStudy.results}
        quote={caseStudy.quote}
        technologies={caseStudy.technologies}
        services={caseStudy.services}
        keyHighlights={caseStudy.keyHighlights}
      />
      
      <Footer />
    </div>
  )
}