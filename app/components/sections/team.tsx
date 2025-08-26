import { Title } from "../ui/title"
import { Eyebrow } from "../ui/eyebrow"
import { Button } from "../ui/button"
import Image from "next/image"

export function Team() {
  return (
    <section className="py-24 lg:py-32 xl:py-40 bg-brand-dark text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <Eyebrow className="text-white/80 mb-8">
              METHODOLOGY & DELIVERY
            </Eyebrow>
            
            <Title 
              variant="display"
              className="text-white mb-8"
            >
              Our product engineering system is built to ship, not just prototype.
            </Title>

            <div className="space-y-6 mb-8">
              <p className="text-lg md:text-xl text-white/90">
                We combine proven methodologies with cutting-edge AI tools to deliver
                production-ready solutions that scale.
              </p>
              <p className="text-lg md:text-xl text-white/90">
                Every project follows our systematic approach: strategy, design,
                engineering, and intelligence working in harmony.
              </p>
            </div>

            <Button 
              variant="primary"
              size="lg"
              href="/contact"
            >
              Start Your Project
            </Button>
          </div>

          {/* Right Content */}
          <div className="relative">
            <Image
              src="/images/teamImage.jpg"
              alt="Sparq Team"
              width={600}
              height={400}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}