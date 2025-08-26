import Link from "next/link"
import { CaseStudyAuthor } from "../../../types/case-study"

interface CaseStudyHeroProps {
  title: string
  subtitle: string
  author: CaseStudyAuthor
  publishDate: string
  readTime: string
  tags: string[]
}

export function CaseStudyHero({
  title,
  subtitle,
  author,
  publishDate,
  readTime,
  tags
}: CaseStudyHeroProps) {
  return (
    <section className="relative bg-brand-dark text-white">
      {/* Sparq Logo/Brand in upper left */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <Link href="/" className="inline-block">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-brand-light leading-tight tracking-tight hover:opacity-80 transition-opacity">
            Sparq
          </h1>
        </Link>
      </div>

      {/* Spacer between logo and content */}
      <div className="h-16 sm:h-20 md:h-24 lg:h-32 xl:h-40"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
        <div className="w-full">
          {/* Main Headline */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-light leading-tight tracking-tight mb-8 max-w-4xl">
              {title}
            </h2>

            {/* Divider line */}
            <div className="w-full mb-8">
              <div className="h-px bg-white/50"></div>
            </div>

            {/* Subtitle and Tags Row */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
              {/* Left: Subtitle */}
              <div className="flex-1">
                <p className="text-base sm:text-lg md:text-xl lg:text-xl font-medium text-brand-light leading-relaxed max-w-2xl">
                  {subtitle}
                </p>
              </div>

              {/* Right: Tags */}
              <div className="flex flex-col gap-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-2 bg-brand-cta text-brand-dark text-sm font-bold uppercase rounded tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Author and Meta Info at bottom */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm uppercase text-brand-light font-medium tracking-wide leading-tight">
                  Insights from {author.name}
                </p>
              </div>
            </div>
            <div className="text-sm uppercase text-neutral-light-400 font-medium tracking-wide leading-tight">
              {publishDate} – {readTime}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}