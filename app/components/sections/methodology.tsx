"use client"

import Image from "next/image"

interface MethodologyCardProps {
  icon: string
  title: string
  subtitle: string
  description: string
}

function MethodologyCard({ icon, title, subtitle, description }: MethodologyCardProps) {
  return (
    <div className="flex flex-col gap-6">
      <Image
        src={icon}
        alt="Check Icon"
        width={60}
        height={60}
        className="mb-2"
      />
      <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
        {title}
      </h3>
      <p className="text-md md:text-lg lg:text-xl xl:text-2xl opacity-80">
        {subtitle}
      </p>
      <p className="text-white hover:no-underline mt-auto">
        {description}
      </p>
    </div>
  )
}

export function Methodology() {
  return (
    <section className="bg-brand-dark text-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-[165px]">
        {/* Two Column Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Left Column - Content */}
          <div>
            <p 
              className="text-sm md:text-md lg:text-lg xl:text-xl uppercase mb-4"
              style={{ lineHeight: '110%', letterSpacing: '6px' }}
            >
              HOW WE DELIVER
            </p>
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-6"
              style={{ lineHeight: '95%', fontWeight: 'var(--font-weight-black)' }}
            >
              Sparq's AI-enabled product engineering system
            </h2>
            <p className="text-md md:text-lg lg:text-xl xl:text-2xl opacity-80">
              Sparq blends AI-native product workflows with proven execution
              systems. Whether you're modernizing legacy platforms or building
              net-new experiences, we accelerate outcomes through modular,
              data-driven engagements.
            </p>
          </div>

          {/* Right Column - Methodology Diagram */}
          <div className="flex items-center justify-center">
            <div className="p-8 w-full" style={{ backgroundColor: '#16110F' }}>
              <Image
                src="/images/sparq-methodology.svg"
                alt="Sparq Methodology Diagram"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          <MethodologyCard
            icon="/images/check.png"
            title="AI-Accelerated discovery"
            subtitle="Align signals + capacity plans"
            description="Helped a financial service provider reduce call volume by 30% and save $5.4m annually."
          />

          <MethodologyCard
            icon="/images/check.png"
            title="MVP in half the time"
            subtitle="Co-pilot dev + validation sprints"
            description="Enabled a 33% faster market entry for a national healthcare network."
          />

          <MethodologyCard
            icon="/images/check.png"
            title="Continuous impact"
            subtitle="Live metrics + adaptive ops"
            description="Drove 150% reduction in bag validation time and 100% compliance accuracy for a US stadium."
          />
        </div>
      </div>
    </section>
  )
}