import { CaseStudyHighlight } from "../../../types/case-study"

interface KeyHighlightsProps {
  highlights: CaseStudyHighlight[]
}

export function KeyHighlights({ highlights }: KeyHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h3 className="text-lg sm:text-xl lg:text-xl font-bold text-brand-dark leading-tight mb-2">
          Key Highlights
        </h3>
        <p className="text-sm uppercase text-neutral-dark-200 font-medium tracking-wide leading-tight">
          Insights
        </p>
      </div>
      
      {/* Desktop: Single green box with stats contained in left column */}
      <div className="hidden lg:block bg-brand-cta rounded-lg p-6 lg:p-8">
        <div className="flex flex-col gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex flex-col">
              <div className="text-5xl lg:text-6xl xl:text-7xl font-light text-brand-dark leading-none mb-2">
                {highlight.value}
              </div>
              <div className="text-sm lg:text-base font-bold text-brand-dark leading-tight">
                {highlight.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile: Stack stats in individual boxes */}
      <div className="flex flex-col gap-6 lg:hidden">
        {highlights.map((highlight, index) => (
          <div key={index} className="bg-brand-cta rounded-lg p-6 flex flex-col">
            <div className="text-5xl font-light text-brand-dark leading-none mb-2">
              {highlight.value}
            </div>
            <div className="text-sm font-bold text-brand-dark leading-tight">
              {highlight.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}