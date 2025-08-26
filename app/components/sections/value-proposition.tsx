import { Title } from "../ui/title"
import { Eyebrow } from "../ui/eyebrow"
import Image from "next/image"

export function ValueProposition() {
  return (
    <section className="bg-brand-orange min-h-screen text-white py-24 lg:py-32 xl:py-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col 2xl:flex-row 2xl:items-center gap-16">
          {/* Left Content */}
          <div className="flex-1">
            <Eyebrow className="text-white mb-6">
              WHAT WE SOLVE
            </Eyebrow>

            <Title 
              variant="display"
              className="mb-8 text-white"
              style={{ fontWeight: 900 }}
            >
              We don't just deliver services, we deliver transformative outcomes.
            </Title>

            <div className="space-y-6 max-w-2xl">
              <p className="text-lg md:text-xl lg:text-2xl opacity-90">
                Sparq blends strategy, design, engineering, and AI to cut through the
                complexity and create measurable impact, fast.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl opacity-90">
                Our approach is modular and adaptive: whether you're building from
                scratch, scaling, or modernizing, we meet you where you are and move
                you where you need to go.
              </p>
            </div>
          </div>

          {/* Right Content - Video */}
          <div className="flex-1 flex 2xl:justify-center">
            <Image
              src="/images/videoThumbnail.jpg"
              alt="Product Demo Video"
              width={800}
              height={600}
              className="w-full 2xl:max-w-2xl h-auto rounded-2xl"
            />
          </div>
        </div>

        {/* Logo Band */}
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
        <div className="mt-16">
          <p className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl opacity-80 font-normal max-w-4xl mx-auto">
            "Reduced mechanical engineering time for a leading manufacturer by over 95%."
          </p>
        </div>
      </div>
    </section>
  )
}