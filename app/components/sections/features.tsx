"use client"

import Image from "next/image"
import { useEffect } from "react"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  isLast?: boolean
}

function FeatureCard({ icon, title, description, isLast }: FeatureCardProps) {
  return (
    <div className={`flex flex-col bg-white rounded-lg p-6 mt-2 min-w-55 ${isLast ? '2xl:min-h-[480px]' : ''}`}>
      <div className="flex-none">
        <div className="mb-4">
          <Image
            src={icon}
            alt="Chip Icon"
            width={72}
            height={72}
          />
        </div>
        <h3 
          className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-brand-dark mb-4"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      <div className="flex-grow"></div>
      <p className="text-sm md:text-md lg:text-lg xl:text-xl text-gray-600 flex-none">
        {description}
      </p>
    </div>
  )
}

export function Features() {
  useEffect(() => {
    function adjustCardWindow() {
      const cardContainer = document.querySelector('.card-container') as HTMLElement
      const cardWindow = document.querySelector('.card-window') as HTMLElement
      
      if (!cardContainer || !cardWindow) return
      
      const originalWidth = 682
      const originalHeight = 372
      const containerRect = cardContainer.getBoundingClientRect()
      const windowRect = cardWindow.getBoundingClientRect()
      
      const containerWidth = containerRect.width
      const containerHeight = containerRect.height
      const originalAspectRatio = originalWidth / originalHeight
      const containerAspectRatio = containerWidth / containerHeight
      
      let scaledWidth: number, scaledHeight: number
      
      if (containerAspectRatio > originalAspectRatio) {
        scaledWidth = containerWidth
        scaledHeight = containerWidth / originalAspectRatio
      } else {
        scaledHeight = containerHeight
        scaledWidth = containerHeight * originalAspectRatio
      }
      
      const offsetLeft = windowRect.left - containerRect.left
      cardWindow.style.backgroundSize = `${scaledWidth}px ${scaledHeight}px`
      cardWindow.style.backgroundPosition = `-${offsetLeft}px -16px`
    }
    
    window.addEventListener('load', adjustCardWindow)
    window.addEventListener('resize', adjustCardWindow)
    
    // Call immediately in case the component loads after window load
    adjustCardWindow()
    
    return () => {
      window.removeEventListener('load', adjustCardWindow)
      window.removeEventListener('resize', adjustCardWindow)
    }
  }, [])

  return (
    <section className="bg-[#F3F4F5] min-h-screen flex flex-col">
      {/* Header Section - Vertically Centered */}
      <div className="mb-16 lg:mb-34 flex">
        <div className="max-w-28/32 mt-8 sm:mt-12 md:mt-16 lg:mt-32 xl:mt-44 2xl:mt-52 ml-8 sm:ml-24 md:ml-24 lg:ml-32 xl:ml-48 2xl:ml-56">
          <div>
            <p 
              className="text-sm md:text-md lg:text-lg xl:text-xl uppercase text-gray-600 mb-4 font-semibold"
              style={{ lineHeight: '110%', letterSpacing: '6px' }}
            >
              WHAT YOU'LL GET
            </p>
            
            <h2 
              className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl text-brand-dark mb-6"
              style={{ lineHeight: '95%', fontWeight: 'var(--font-weight-black)' }}
            >
              What AI-Accelerated<br />Actually Means
            </h2>
            
            <p className="text-md md:text-lg lg:text-xl xl:text-2xl max-w-24/32 md:max-w-16/32 text-gray-600">
              AI-accelerated doesn't just mean offloading work to bots. It means
              smarter signals, faster prototyping, and delivery systems that scale,
              tailored for high-velocity engineering and ops teams.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section - Image Card + Feature Cards */}
      <div className="2xl:max-w-[2300px] pr-8 mr-auto pb-20">
        <div className="flex flex-col 2xl:flex-row">
          {/* Image Card - Left Side */}
          <div className="shrink-0 hidden 2xl:block">
            <div className="card-container max-w-100 min-[1920px]:max-w-160 h-125 min-[1600px]:aspect-[11/9] aspect-auto overflow-hidden rounded-lg relative">
              <div className="card-background"></div>
              <div 
                className="card-window"
                style={{
                  backgroundSize: '916.667px 500px',
                  backgroundPosition: '-168px -16px'
                }}
              ></div>
            </div>
          </div>

          {/* Feature Cards - Right Side */}
          <div className="flex-1 pl-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-10">
              <FeatureCard
                icon="/images/chip.png"
                title="Product strategy<br />with AI built in"
                description="Clarify what's worth building using AI-assisted signal distillation and domain modeling"
              />
              
              <FeatureCard
                icon="/images/chip.png"
                title="Design & validation<br />at speed"
                description="Accelerate feedback loops with AI prototyping and fast user testing."
              />
              
              <FeatureCard
                icon="/images/chip.png"
                title="Engineering + AI =<br />velocity"
                description="Code smarter with embedded AI tools and reusable scaffolding"
              />
              
              <FeatureCard
                icon="/images/chip.png"
                title="Continuous<br />optimization"
                description="Evolve products using behavioral signals and adaptive tuning"
                isLast={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}