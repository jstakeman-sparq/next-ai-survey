"use client"

import Link from 'next/link'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { Modal } from '../components/ui/Modal'
import { useModal } from '../hooks/useModal'
import { ContactFormData } from '../components/forms/ContactForm'
import { Title } from '../components/ui/title'
import { Eyebrow } from '../components/ui/eyebrow'
import { CaseStudy } from '../../types/case-study'

interface CaseStudiesPageClientProps {
  caseStudies: CaseStudy[]
}

export function CaseStudiesPageClient({ caseStudies }: CaseStudiesPageClientProps) {
  const { isOpen, openModal, closeModal } = useModal()

  const handleFormSubmit = async (data: ContactFormData) => {
    console.log('Contact form submitted:', data)
    alert('Thank you for your message! We\'ll get back to you soon.')
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 lg:py-32 xl:py-40 bg-brand-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Eyebrow className="text-neutral-dark-200 mb-8">
              AI IN THE WILD
            </Eyebrow>
            
            <Title 
              variant="display"
              className="text-brand-dark max-w-4xl mx-auto mb-6"
            >
              Real AI Impact Stories
            </Title>
            
            <p className="text-lg md:text-xl text-neutral-dark-200 leading-relaxed max-w-3xl mx-auto">
              Explore how AI transforms businesses across industries. Each case study showcases 
              measurable outcomes and the strategic approach behind breakthrough solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy) => (
                <Link 
                  key={caseStudy.slug}
                  href={`/case-studies/${caseStudy.slug}`}
                  className="group block bg-brand-light rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-neutral-light-300 hover:border-brand-cta"
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseStudy.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-brand-cta text-brand-dark text-xs font-bold uppercase rounded tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-brand-dark leading-tight mb-3 group-hover:text-brand-orange transition-colors">
                    {caseStudy.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-neutral-dark-200 leading-relaxed mb-4 line-clamp-3">
                    {caseStudy.subtitle}
                  </p>

                  {/* Key Highlight Preview */}
                  {caseStudy.keyHighlights.length > 0 && (
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <div className="text-2xl font-light text-brand-dark leading-none mb-1">
                        {caseStudy.keyHighlights[0].value}
                      </div>
                      <div className="text-xs font-bold text-brand-dark leading-tight">
                        {caseStudy.keyHighlights[0].description}
                      </div>
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-neutral-dark-100">
                    <span>{caseStudy.readTime}</span>
                    <span>{caseStudy.publishDate}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-neutral-dark-200 mb-4">
                No case studies available yet.
              </p>
              <p className="text-neutral-dark-100">
                Check back soon for exciting AI transformation stories.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer onOpenContactModal={openModal} />
      
      <Modal 
        isOpen={isOpen} 
        onClose={closeModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  )
}