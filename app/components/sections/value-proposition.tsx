import Image from "next/image"

export function ValueProposition() {
  return (
    <section className="bg-brand-orange min-h-screen text-white py-24 lg:py-33 xl:py-30">
      <div className="max-w-25/32 2xl:max-w-30/32 3xl:max-w-26/32 mx-auto px-4">
        <div className="flex flex-col 2xl:flex-row 2xl:items-center gap-2">
          {/* Left Content */}
          <div className="flex-1">
            <p
              className="text-sm md:text-md lg:text-lg xl:text-xl uppercase text-white mb-4"
              style={{ lineHeight: '110%', letterSpacing: '5px' }}
            >
              WHAT WE SOLVE
            </p>

            <h2
              className="text-xl md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-7xl mb-6"
              style={{ lineHeight: '120%', fontWeight: 'var(--font-weight-black)' }}
            >
              We don't just deliver services, we deliver transformative outcomes.
            </h2>

            <p
              className="text-md md:text-lg lg:text-xl xl:text-2xl opacity-90 max-w-2xl pb-8"
            >
              Sparq blends strategy, design, engineering, and AI to cut through the
              complexity and create measurable impact, fast.
            </p>
            <p
              className="text-md md:text-lg lg:text-xl xl:text-2xl opacity-90 max-w-2xl"
            >
              Our approach is modular and adaptive: whether you're building from
              scratch, scaling, or modernizing, we meet you where you are and move
              you where you need to go.
            </p>
          </div>

          {/* Right Content - Video */}
          <div className="flex-1 flex 2xl:justify-center">
            <Image
              src="/images/videoThumbnail.jpg"
              alt="Product Demo Video"
              width={800}
              height={600}
              className="w-full 2xl:max-w-31/32 h-auto rounded-2xl pt-8 lg:pt-12 xl:pt-16 2xl:pt-8"
            />
          </div>
        </div>

      </div>

      {/* Full-width Logo Band */}
      <div className="w-full mt-16 hidden sm:block">
        <Image
          src="/images/logo-band.png"
          alt="Partner Logos"
          width={1200}
          height={100}
          className="w-full object-cover mix-blend-multiply"
        />
      </div>

      {/* Pull Quote */}
      <div className="container mx-auto px-4 mt-16">
        <p
          className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl opacity-80"
          style={{ fontWeight: 400 }}
        >
          Reduced mechanical engineering time for a leading manufacturer by over
          95%.
        </p>
      </div>
    </section>
  )
}