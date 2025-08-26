"use client"

import { Title } from "../ui/title"
import Link from "next/link"

interface FooterProps {
  onOpenContactModal?: () => void
}

export function Footer({ onOpenContactModal }: FooterProps) {
  return (
    <footer className="bg-brand-dark text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* CTA Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16 pb-12 border-b border-white/20">
          <div className="flex-1">
            <Title variant="h1" className="text-white mb-4">
              Let's Build What Matters. Connect with a Sparq Expert Today
            </Title>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
              Whether you're scaling platforms or rethinking operations, we'll help
              you ship smarter, not just faster.
            </p>
          </div>
          <button
            onClick={onOpenContactModal}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-4 rounded-lg text-md md:text-lg lg:text-xl xl:text-2xl transition-all duration-200 cursor-pointer lg:flex-shrink-0"
          >
            Grab some time
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Title variant="h2" className="text-white mb-4">
              Sparq
            </Title>
            <p className="text-white/80 mb-6">
              AI-accelerated product execution for when speed isn't optional.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-white/80">
              <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/ai-readiness" className="hover:text-white transition-colors">AI Readiness Assessment</Link></li>
              <li><Link href="/methodology" className="hover:text-white transition-colors">Our Methodology</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="mailto:hello@teamsparq.com" className="hover:text-white transition-colors">hello@teamsparq.com</a></li>
              <li>
                <button
                  onClick={onOpenContactModal}
                  className="text-white/80 hover:text-white transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 Sparq. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}