import Link from "next/link"
import { ContactButton } from "@/components/ui/contact-button"
import { Logo } from "@/components/ui/logo"
import { Menu } from "@/components/ui/menu"
import { NavLink } from "@/components/globals/nav-link"
import { SITE_NAME } from "@/lib/constants"

const items = [
  { label: "What We Do", href: "/what-we-do" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Results", href: "/results" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Who We Are", href: "/about" },
]

export function Header() {
  return (
    <header
      className="absolute top-0 z-10 w-full py-5 data-[theme=dark]:text-white"
      data-theme="dark"
    >
      <div className="px-5 md:px-8 lg:px-10">
        <div className="flex w-full items-center xl:gap-18">
          <Link href="/" title="Go to homepage" className="relative z-20">
            <Logo />
            <span className="sr-only">{SITE_NAME}</span>
          </Link>

          <nav className="hidden flex-1 text-lg xl:block">
            <ul className="flex gap-6">
              {items.map((item) => (
                <li key={item.label}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden xl:block">
            <ContactButton />
          </div>

          <div className="ml-auto flex items-center gap-4 xl:hidden">
            <ContactButton />
            <Menu />
          </div>
        </div>
      </div>
    </header>
  )
}
