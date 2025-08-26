import { Title } from "../ui/title"
import Link from "next/link"

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container-custom py-8">
        <Title 
          variant="h2"
          as="h1"
          className="text-white font-black text-xl md:text-2xl lg:text-3xl xl:text-4xl"
        >
          <Link href="/">Sparq</Link>
        </Title>
      </div>
    </header>
  )
}