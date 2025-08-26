import Image from "next/image"

export function Team() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-[165px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Content */}
          <div>
            <p
              className="text-sm md:text-md lg:text-lg xl:text-xl uppercase text-gray-600 mb-4"
              style={{ lineHeight: '110%', letterSpacing: '6px' }}
            >
              <span className="line-through">OUR</span> YOUR TEAM
            </p>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-brand-dark mb-6"
              style={{ lineHeight: '95%', fontWeight: 'var(--font-weight-black)' }}
            >
              Humans + AI, Better Together
            </h2>
            <div className="space-y-6 text-md md:text-lg lg:text-xl xl:text-2xl text-gray-600">
              <p>
                Our team is made up of builders who use AI as a force multiplier.
                This means smarter signals, faster prototyping, and delivery systems
                that scale, tailored for high-velocity engineering and ops teams.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex items-center justify-center">
            <Image
              src="/images/teamImage.jpg"
              alt="Team Image"
              width={480}
              height={320}
              className="w-full max-w-[480px] h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}