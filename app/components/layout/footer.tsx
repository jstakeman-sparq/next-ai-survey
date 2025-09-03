"use client"

import Link from "next/link"
import Script from "next/script"

interface FooterProps {
  onOpenContactModal?: () => void
}

export function Footer({ onOpenContactModal }: FooterProps) {
  return (
    <footer className="bg-[#3C3633] text-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-[165px]">
        {/* CTA Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mb-24">
          <div className="max-w-2xl">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6"
              style={{ lineHeight: '95%' }}
            >
              Let's Build What Matters. Connect with a Sparq Expert Today
            </h2>
            <p className="text-md md:text-lg lg:text-xl xl:text-2xl opacity-80">
              Whether you're scaling platforms or rethinking operations, we'll help
              you ship smarter, not just faster.
            </p>
          </div>
          <button
            onClick={onOpenContactModal}
            className="bg-[#E85C3F] hover:bg-opacity-90 text-white px-8 py-4 rounded-lg text-md md:text-lg lg:text-xl xl:text-2xl transition-all duration-200 cursor-pointer lg:flex-shrink-0"
          >
            Grab some time
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-white opacity-20 mb-12"></div>

        {/* Footer Bottom */}
        <div className="flex justify-between items-start">
          {/* Logo and Links */}
          <div className="flex flex-col gap-8">
            <Link href="/" className="text-2xl font-bold">
              Sparq
            </Link>
            <div className="flex gap-8 text-sm opacity-60">
              <Link href="/" className="hover:opacity-100">
                © 2025 Sparq.
              </Link>
              <Link href="/privacy" className="hover:opacity-100">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-right">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <a
              href="mailto:inquiries@teamsparq.com"
              className="block text-sm opacity-60 hover:opacity-100"
            >
              inquiries@teamsparq.com
            </a>
            <a
              href="tel:877-619-3894"
              className="block text-sm opacity-60 hover:opacity-100"
            >
              877-619-3894
            </a>
          </div>
        </div>
      </div>
      <Script>
  {`(function (w,d,o,u,a,m) {
      w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments);
      },w[o].e=1*new Date();w[o].u=u;a=d.createElement('script'),
      m=d.getElementsByTagName('script')[0];a.async=1;
      a.src=u+'/mcfx.js';m.parentNode.insertBefore(a, m);
    })(window, document, 'mcfx', 'https://tsparq.teamsparq.com');
  mcfx('create', 44632);`}
</Script>
<script type="text/javascript" async src="//cdn.leadmanagerfx.com/phone/js/44632"></script>
    </footer>
  )
}