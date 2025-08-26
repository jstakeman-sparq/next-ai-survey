import { Header } from "./components/layout/header"
import { Hero } from "./components/sections/hero"
import { ValueProposition } from "./components/sections/value-proposition"
import { Stats } from "./components/sections/stats"
import { Features } from "./components/sections/features"
import { Team } from "./components/sections/team"
import { Footer } from "./components/layout/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ValueProposition />
      <Stats />
      <Features />
      <Team />
      <Footer />
    </main>
  )
}
