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
            <Title 
              variant="display"
              className="text-white mb-8"
            >
              Humans + AI, Better Together
            </Title>

            <div className="space-y-6 mb-8">
              <p className="text-lg md:text-xl text-white/90">
                Our team is made up of builders who use AI as a force multiplier. This means 
                smarter signals, faster prototyping, and delivery systems that scale, tailored 
                for high-velocity engineering and ops teams.
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