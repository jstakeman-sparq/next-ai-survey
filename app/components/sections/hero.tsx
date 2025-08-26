"use client"

import { Title } from "../ui/title"
import { Button } from "../ui/button"
import { Divider } from "../ui/divider"
import { Eyebrow } from "../ui/eyebrow"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero1.jpg')",
        }}
      />
      
      {/* Progressive Blur Overlay System */}
      <div className="absolute left-0 right-0 z-10" style={{ bottom: '12rem', height: '14rem' }}>
        {/* Blur Layer 1 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(35, 20, 5, 0.15)',
            backdropFilter: 'blur(0.5px)',
            mask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5%)',
          }}
        />
        {/* Blur Layer 2 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(35, 20, 5, 0.25)',
            backdropFilter: 'blur(4px)',
            mask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%)',
          }}
        />
        {/* Blur Layer 3 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(35, 20, 5, 0.35)',
            backdropFilter: 'blur(8px)',
            mask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%)',
          }}
        />
        {/* Blur Layer 4 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(35, 20, 5, 0.45)',
            backdropFilter: 'blur(16px)',
            mask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%)',
          }}
        />
        {/* Blur Layer 5 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(35, 20, 5, 0.45)',
            backdropFilter: 'blur(32px)',
            mask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%)',
          }}
        />
        {/* Blur Layer 6 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(35, 20, 5, 0.45)',
            backdropFilter: 'blur(64px)',
            mask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%)',
          }}
        />
      </div>

      {/* Solid Background at Bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-54"
        style={{ background: '#231405' }}
      />

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex items-end">
        <div className="container-custom pb-20 w-full">
          <div className="text-left">
            {/* Main Headline */}
            <Title 
              variant="hero"
              className="mb-8"
              style={{ lineHeight: '100%' }}
            >
              Move Fast. Ship Even Faster. AI-accelerated product execution for
              when speed isn't optional.
            </Title>

            {/* Divider */}
            <Divider />

            {/* Bottom Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-16 items-baseline">
              {/* Left: CTA Button */}
              <div className="xl:col-span-2">
                <Button 
                  variant="primary"
                  size="xl"
                  href="/case-studies/using-ai-to-solve-a-stadiums-biggest-entry-headache"
                  className="font-semibold"
                >
                  Explore an AI Success Story
                </Button>
              </div>

              {/* Right: Label */}
              <div className="xl:col-span-1 hidden lg:block">
                <Eyebrow className="text-gray-200 text-lg md:text-xl lg:text-2xl">
                  SOLUTIONS WITH IMPACT
                </Eyebrow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}