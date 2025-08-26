import { Title } from "../ui/title"
import { Eyebrow } from "../ui/eyebrow"

interface StatCardProps {
  number: string
  label: string
  description: string
}

function StatCard({ number, label, description }: StatCardProps) {
  return (
    <div className="text-center">
      <p className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-brand-orange mb-6">
        <span className="font-black">{number}</span>
        <br />
        <span className="font-light text-lg md:text-xl lg:text-2xl xl:text-3xl">
          {label}
        </span>
      </p>
      <p className="text-neutral-dark-200 leading-relaxed text-base md:text-lg lg:text-xl">
        {description}
      </p>
    </div>
  )
}

export function Stats() {
  return (
    <section 
      className="py-24 lg:py-32 xl:py-40"
      style={{ backgroundColor: '#F9DDD8' }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Eyebrow className="text-neutral-dark-200 mb-8">
            REAL OUTCOMES
          </Eyebrow>
          
          <div className="max-w-4xl mx-auto">
            <Title 
              variant="display"
              className="text-brand-dark"
              style={{ fontWeight: 900 }}
            >
              Built. Shipped. Delivered. Because slick products mean nothing without
              measurable results.
            </Title>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <StatCard
            number="40%"
            label="Faster Speed-to-Impact"
            description="From concept to market, our AI-accelerated approach cuts product development time without compromising quality."
          />
          
          <StatCard
            number="30%"
            label="Cost Savings"
            description="Our AI-enabled teams cost less than traditional teams without compromising on the quality and speed vital to success."
          />
          
          <StatCard
            number="78%"
            label="Client Retention"
            description="Our clients stay with us because we deliver consistent results that drive real business impact."
          />
        </div>
      </div>
    </section>
  )
}