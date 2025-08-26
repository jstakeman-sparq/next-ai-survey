import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Divider } from "@/components/ui/divider"
import { Logo } from "@/components/ui/logo"
import { Title } from "@/components/ui/title"
import { SITE_NAME } from "@/lib/constants"

async function getFooter() {
  return {
    title: "Let’s build what matters.",
    description:
      "Whether you’re looking to move fast, solve something complex, or bring AI into the real world, we’re ready to get to work.",
    links: {
      services: [
        {
          label: "Product Strategy & Design",
          url: "/product-strategy-design/",
        },
        { label: "Data & Analytics", url: "/data-analytics/" },
        { label: "Product Engineering", url: "/product-engineering" },
        { label: "Artificial Intelligence", url: "/artificial-intelligence" },
        {
          label: "Business & Technology Consulting",
          url: "/business-tech-consulting",
        },
      ],
      navigation: [
        { label: "Home", url: "/" },
        { label: "What We Do", url: "/" },
        { label: "Industries", url: "/" },
        { label: "Insights", url: "/insights" },
        { label: "Results", url: "/" },
        { label: "Partnerships", url: "/" },
        { label: "Who We Are", url: "/about" },
      ],
      social: [
        { label: "LinkedIn", url: "/" },
        { label: "Facebook", url: "/" },
        { label: "X", url: "/" },
        { label: "Youtube", url: "/" },
        { label: "Instagram", url: "/" },
      ],
      contact: [
        { label: "inquiries@teamsparq.com", url: "/" },
        { label: "877-887-4774", url: "/" },
      ],
      legal: [
        { label: "Privacy Policy", url: "/privacy-policy" },
        { label: "Terms of Use", url: "/" },
        { label: "DMCA", url: "/" },
      ],
    },
  }
}

export async function Footer() {
  const { title, description, links } = await getFooter()

  return (
    <footer className="bg-neutral-dark-400 relative py-12 text-white xl:py-32">
      <video
        src="/videos/footer-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="bg-neutral-dark-400 absolute top-0 left-0 h-full w-full opacity-90" />
      <div className="relative container">
        <div className="grid grid-cols-8">
          <div className="col-span-8 md:col-span-6 xl:col-span-4">
            <Title variant="display" className="mb-4 md:mb-8">
              {title}
            </Title>
            <p className="text-balance md:text-xl md:font-bold">
              {description}
            </p>
          </div>
          <div className="col-span-8 mt-6 flex md:col-span-2 md:mt-0 md:justify-end xl:col-span-4">
            <Button variant="secondary" href="/">
              Grab some time
            </Button>
          </div>
        </div>
        <Divider className="my-12 md:mt-38 md:mb-12" />

        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-38 md:flex-row">
          {/* Services */}
          <div>
            <h3 className="mb-4 text-2xl font-bold">Services</h3>
            <div className="flex justify-between gap-12">
              <ul className="space-y-2">
                {links.services
                  // .slice(0, Math.ceil(links.services.length / 2))
                  .map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.url}>{link.label}</Link>
                    </li>
                  ))}
              </ul>
              {/* <ul className="space-y-2">
                {links.services
                  .slice(Math.ceil(links.services.length / 2))
                  .map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.url}>{link.label}</Link>
                    </li>
                  ))}
              </ul> */}
            </div>
          </div>
          {/* Navigation */}
          <div className="flex flex-row gap-12 md:flex-col">
            <div className="flex-1">
              <h3 className="mb-4 text-2xl font-bold">Navigation</h3>
              {links.navigation.length > 0 && (
                <div className="flex flex-col gap-12 md:flex-row md:justify-between">
                  {/* Mobile: full list */}
                  <ul className="space-y-2 md:hidden">
                    {links.navigation.map((link, idx) => (
                      <li key={idx}>
                        <Link href={link.url}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>

                  {/* Desktop: split lists */}
                  <ul className="hidden space-y-2 md:block">
                    {links.navigation.slice(0, 5).map((link, idx) => (
                      <li key={idx}>
                        <Link href={link.url}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="hidden space-y-2 md:block">
                    {links.navigation.slice(5).map((link, idx) => (
                      <li key={idx}>
                        <Link href={link.url}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Social Media Mobile*/}
            <div className="flex-1 md:hidden">
              <h3 className="mb-4 text-2xl font-bold">Social Media</h3>
              <ul className="space-y-2">
                {links.social.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.url}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Social Media desk*/}
          <div className="hidden md:inline-block">
            <h3 className="mb-4 text-2xl font-bold">Social Media</h3>
            <ul className="space-y-2">
              {links.social.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.url}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact Us */}
          <div>
            <h3 className="mb-4 text-2xl font-bold">Contact Us</h3>
            <ul className="space-y-2">
              {links.contact.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.url}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col-reverse items-start gap-y-8 md:grid md:grid-cols-8 md:items-center">
          <div className="col-span-1 mb-4 md:mb-0">
            <Link href="/">
              <Logo />
              <span className="sr-only">{SITE_NAME}</span>
            </Link>
          </div>
          <div className="col-span-6 flex md:justify-center">
            <div className="flex space-x-6 text-sm md:text-base">
              {links.legal.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.url}
                  className="underline underline-offset-4 opacity-75"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
