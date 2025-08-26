"use client"

import { Header } from "./components/layout/header"
import { Hero } from "./components/sections/hero"
import { ValueProposition } from "./components/sections/value-proposition"
import { Stats } from "./components/sections/stats"
import { Features } from "./components/sections/features"
import { Team } from "./components/sections/team"
import { Footer } from "./components/layout/footer"
import { Modal } from "./components/ui/Modal"
import { useModal } from "./hooks/useModal"
import { ContactFormData } from "./components/forms/ContactForm"

export default function Home() {
  const { isOpen, openModal, closeModal } = useModal()

  const handleFormSubmit = async (data: ContactFormData) => {
    // Here you would typically send the data to your server/API
    console.log('Contact form submitted:', data)
    
    // For now, just show an alert
    alert('Thank you for your message! We\'ll get back to you soon.')
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ValueProposition />
      <Stats />
      <Features />
      <Team />
      <Footer onOpenContactModal={openModal} />
      
      <Modal 
        isOpen={isOpen} 
        onClose={closeModal}
        onSubmit={handleFormSubmit}
      />
    </main>
  )
}
