import { Title } from "../ui/title"
import { Eyebrow } from "../ui/eyebrow"
import Image from "next/image"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center">
      <div className="mb-6 flex justify-center">
        <Image
          src={icon}
          alt={title}
          width={80}
          height={80}
          className="w-16 h-16 md:w-20 md:h-20"
        />
      </div>
      <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 text-brand-dark">
        {title}
      </h3>
      <p className="text-neutral-dark-200 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export function Features() {
  return (
    <section className="py-24 lg:py-32 xl:py-40 bg-brand-light">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Eyebrow className="text-neutral-dark-200 mb-8">
            AI-ACCELERATED CAPABILITIES
          </Eyebrow>
          
          <Title 
            variant="display"
            className="text-brand-dark max-w-4xl mx-auto"
          >
            Four key service areas where AI multiplies our impact
          </Title>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <FeatureCard
            icon="/images/chip.png"
            title="Strategy & Vision"
            description="AI-powered market analysis and strategic roadmapping that identifies opportunities faster than traditional methods."
          />
          
          <FeatureCard
            icon="/images/chip.png"
            title="Design & Experience"
            description="Rapid prototyping and user testing accelerated by AI, delivering exceptional experiences in record time."
          />
          
          <FeatureCard
            icon="/images/chip.png"
            title="Engineering & Development"
            description="AI-assisted development workflows that maintain quality while dramatically increasing velocity."
          />
          
          <FeatureCard
            icon="/images/chip.png"
            title="Data & Intelligence"
            description="Advanced analytics and machine learning solutions that turn data into competitive advantages."
          />
        </div>
      </div>
    </section>
  )
}