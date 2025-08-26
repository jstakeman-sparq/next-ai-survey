import { CaseStudyHighlight, CaseStudyQuote } from "../../../types/case-study"
import { KeyHighlights } from "./KeyHighlights"

interface CaseStudyContentProps {
  overview: string
  industry: string[]
  challenge: string
  approach: string
  solution: string
  results: string
  quote?: CaseStudyQuote
  technologies: string[]
  services: string[]
  keyHighlights: CaseStudyHighlight[]
}

export function CaseStudyContent({
  overview,
  industry,
  challenge,
  approach,
  solution,
  results,
  quote,
  technologies,
  services,
  keyHighlights
}: CaseStudyContentProps) {
  return (
    <section className="bg-brand-light py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
          
          {/* Right Main Content - Moved to top on mobile */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="flex flex-col gap-16 lg:gap-24">
              
              {/* Overview Section */}
              <div className="flex flex-col gap-6 lg:gap-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark leading-tight">
                  Overview
                </h3>
                <div 
                  className="text-lg sm:text-xl lg:text-xl text-brand-dark leading-relaxed prose prose-lg max-w-none prose-p:mb-4"
                  dangerouslySetInnerHTML={{ __html: overview }}
                />
              </div>

              {/* Industry Section */}
              <div className="flex flex-col gap-6 lg:gap-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark leading-tight">
                  Industry
                </h3>
                <div className="text-lg sm:text-xl lg:text-xl text-brand-dark leading-relaxed">
                  {industry.map((item, index) => (
                    <div key={index}>
                      {item}
                      {index < industry.length - 1 && <br />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge Section */}
              <div className="flex flex-col gap-6 lg:gap-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark leading-tight">
                  Challenge
                </h3>
                <div 
                  className="text-lg sm:text-xl lg:text-xl text-brand-dark leading-relaxed prose prose-lg max-w-none prose-p:mb-4"
                  dangerouslySetInnerHTML={{ __html: challenge }}
                />
              </div>

              {/* The Approach Section */}
              <div className="flex flex-col gap-6 lg:gap-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark leading-tight">
                  The Approach
                </h3>
                <div 
                  className="text-lg sm:text-xl lg:text-xl text-brand-dark leading-relaxed prose prose-lg max-w-none prose-p:mb-4"
                  dangerouslySetInnerHTML={{ __html: approach }}
                />
              </div>

              {/* The Solution Section */}
              <div className="flex flex-col gap-6 lg:gap-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark leading-tight">
                  The Solution
                </h3>
                <div 
                  className="text-lg sm:text-xl lg:text-xl text-brand-dark leading-relaxed prose prose-lg max-w-none prose-p:mb-4"
                  dangerouslySetInnerHTML={{ __html: solution }}
                />
              </div>

              {/* Quote Section (if provided) */}
              {quote && (
                <div className="bg-brand-cta rounded-xl p-6 lg:p-8 flex flex-col gap-6">
                  <blockquote className="text-2xl sm:text-3xl lg:text-4xl text-brand-dark leading-tight font-normal">
                    "{quote.text}"
                  </blockquote>
                  <cite className="text-sm lg:text-base text-brand-dark leading-tight not-italic">
                    {quote.attribution}
                  </cite>
                </div>
              )}

              {/* Results Section */}
              <div className="flex flex-col gap-6 lg:gap-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark leading-tight">
                  Results
                </h3>
                <div 
                  className="text-lg sm:text-xl lg:text-xl text-brand-dark leading-relaxed prose prose-lg max-w-none prose-p:mb-4"
                  dangerouslySetInnerHTML={{ __html: results }}
                />
              </div>

            </div>
          </div>

          {/* Left Sidebar - Moved to bottom on mobile */}
          <div className="lg:col-span-1 space-y-12 flex flex-col order-2 lg:order-1">
            
            {/* Key Highlights Section */}
            <KeyHighlights highlights={keyHighlights} />

            {/* Services/Solutions Section */}
            {services.length > 0 && (
              <div className="flex flex-col gap-6">
                <p className="text-sm uppercase text-neutral-dark-200 font-medium tracking-wide leading-tight">
                  Services/Solutions
                </p>
                <div className="flex flex-wrap gap-3">
                  {services.map((service, index) => (
                    <span 
                      key={index}
                      className="px-3 py-2 bg-accent-100 text-brand-dark text-sm font-bold uppercase rounded tracking-wide"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Section */}
            {technologies.length > 0 && (
              <div className="flex flex-col gap-6">
                <p className="text-sm uppercase text-neutral-dark-200 font-medium tracking-wide leading-tight">
                  Technology
                </p>
                <div className="text-lg text-brand-dark leading-relaxed">
                  {technologies.map((tech, index) => (
                    <div key={index}>
                      {tech}
                      {index < technologies.length - 1 && <br />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}