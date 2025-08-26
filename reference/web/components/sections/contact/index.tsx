import { Button } from "@/components/ui/button"
import { Title } from "@/components/ui/title"
import { ContactForm } from "@/components/sections/contact/contact-form"
import { Action } from "@/lib/types"
import { ContactInfo } from "./contact-info"

export function Contact({
  title,
  booking,
}: {
  title: string
  booking?: Action
}) {
  return (
    <section className="py-12 lg:py-34">
      <div className="container">
        <div className="grid grid-cols-12 gap-4 md:gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-5">
            <ContactInfo />
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="mb-6 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:gap-12">
              <Title variant="subtitle" className="text-balance">
                {title}
              </Title>

              {booking && (
                <Button
                  variant="secondary"
                  size="sm"
                  href={booking.url}
                  {...(booking.isExternal && {
                    target: "_blank",
                    rel: "noreferrer noopener",
                  })}
                >
                  {booking.text}
                </Button>
              )}
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
