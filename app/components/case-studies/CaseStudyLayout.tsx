"use client"

import { CaseStudy } from "../../../types/case-study"
import { CaseStudyHero } from "./CaseStudyHero"
import { CaseStudyContent } from "./CaseStudyContent"
import { Footer } from "../layout/footer"
import { Modal } from "../ui/Modal"
import { useModal } from "../../hooks/useModal"
import { ContactFormData } from "../forms/ContactForm"

interface CaseStudyLayoutProps {
  caseStudy: CaseStudy
}

export function CaseStudyLayout({ caseStudy }: CaseStudyLayoutProps) {
  const { isOpen, openModal, closeModal } = useModal()

  const handleFormSubmit = async (data: ContactFormData) => {
    console.log('Contact form submitted:', data)
    alert('Thank you for your message! We\'ll get back to you soon.')
  }

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
      
      <Footer onOpenContactModal={openModal} />
      
      <Modal 
        isOpen={isOpen} 
        onClose={closeModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  )
}