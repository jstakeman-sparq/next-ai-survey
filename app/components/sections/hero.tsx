"use client"

import { Divider } from "../ui/divider"

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

      {/* Sparq Logo/Brand in upper left */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-16 xl:px-[165px] py-8">
        <h1
          className="font-display text-xl md:text-2xl lg:text-3xl xl:text-4xl"
          style={{
            color: '#F3F4F5',
            fontFamily: 'Satoshi',
            fontStyle: 'normal',
            fontWeight: 900,
            lineHeight: '90%',
            letterSpacing: '-1.297px'
          }}
        >
          Sparq
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-end">
        <div className="px-4 sm:px-8 lg:px-16 xl:px-[165px] pb-20 z-11 w-full">
          <div className="text-left">
            {/* Main Headline */}
            <h2
              className="text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-black mb-18 font-display"
              style={{ lineHeight: '100%' }}
            >
              Move Fast. Ship Even Faster. AI-accelerated product execution for
              when speed isn't optional.
            </h2>

            {/* Divider */}
            <Divider />

            {/* Bottom Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-16 items-baseline">
              {/* Left: CTA Button */}
              <div className="xl:col-span-2">
                <p
                  className="text-sm uppercase text-gray-600"
                  style={{ lineHeight: '110%', letterSpacing: '6px' }}
                >
                </p>
                <a
                  href="/case-studies/using-ai-to-solve-a-stadiums-biggest-entry-headache"
                  className="bg-brand-cta hover:bg-brand-cta-hover text-black font-semibold px-6 py-3 rounded-lg text-md md:text-lg lg:text-xl xl:text-2xl transition-all duration-200 inline-block"
                >
                  Explore an AI Success Story
                </a>
              </div>

              {/* Right: Label */}
              <div className="xl:col-span-1 hidden lg:block">
                <p
                  className="text-md md:text-lg lg:text-xl xl:text-2xl text-gray-200"
                  style={{ letterSpacing: '0.05em' }}
                >
                  SOLUTIONS WITH IMPACT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}