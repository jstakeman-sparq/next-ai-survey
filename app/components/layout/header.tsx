import { Title } from "../ui/title"
import Link from "next/link"

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between">
          <Title 
            variant="h2"
            as="h1"
            className="text-white font-black text-xl md:text-2xl lg:text-3xl xl:text-4xl"
          >
            <Link href="/">Sparq</Link>
          </Title>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/case-studies" 
              className="text-white hover:text-brand-cta transition-colors font-medium"
            >
              Case Studies
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}