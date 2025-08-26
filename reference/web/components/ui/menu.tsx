"use client"

import { gsap } from "gsap"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ContactButton } from "@/components/ui/contact-button"
import { X } from "@/components/icons/x"
import { useMediaQuery } from "@/hooks/use-media-query"

const menuItems = [
  { label: "What We Do", href: "/what-we-do" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Results", href: "/results" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Who We Are", href: "/about" },
]

export function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const pathname = usePathname()

  const isMobile = useMediaQuery("(max-width: 1279px)") // xl breakpoint is 1280px

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, isMobile])

  // Close menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false)
    }
  }, [isMobile])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen])

  // Handle menu animations
  useEffect(() => {
    if (!menuRef.current || !isMobile) return

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Create new timeline
    const tl = gsap.timeline()
    timelineRef.current = tl

    if (isOpen) {
      // Reset initial state for items
      gsap.set(itemsRef.current, {
        opacity: 0,
        x: -30,
        visibility: "hidden",
      })

      // Animate menu in
      tl.set(menuRef.current, { display: "block" })
        .fromTo(
          menuRef.current,
          { x: "100%" },
          {
            x: 0,
            duration: 0.5,
            ease: "cubic-bezier(0.86, 0, 0.07, 1)",
          },
        )
        .to(
          itemsRef.current,
          {
            opacity: 1,
            x: 0,
            visibility: "visible",
            duration: 0.4,
            stagger: 0.08,
            ease: "cubic-bezier(0.86, 0, 0.07, 1)",
          },
          0.3,
        )
    } else {
      // Animate menu out - items first, then layer
      tl.to(itemsRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.25,
        stagger: 0.04,
        ease: "cubic-bezier(0.86, 0, 0.07, 1)",
      })
        .to(
          menuRef.current,
          {
            x: "100%",
            duration: 0.35,
            ease: "cubic-bezier(0.86, 0, 0.07, 1)",
          },
          "-=0.1",
        )
        .set(menuRef.current, { display: "none" })
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [isOpen, isMobile])

  return (
    <>
      <button
        className="relative z-20 ml-auto flex h-8 w-12 cursor-pointer items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <span className="w-12 text-center text-base font-medium">Menu</span>
        )}
      </button>

      <div
        ref={menuRef}
        className="bg-neutral-dark-400 noise fixed top-0 left-0 z-10 h-screen w-full p-6 pt-32"
        style={{ transform: "translateX(100%)", display: "none" }}
      >
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto pb-8">
            {menuItems.map((item, index) => (
              <div
                key={item.href}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el
                }}
                style={{
                  opacity: 0,
                  transform: "translateX(-30px)",
                  visibility: "hidden",
                }}
              >
                <Link href={item.href} className="block text-2xl font-bold">
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
          <div
            ref={(el) => {
              if (el) itemsRef.current[menuItems.length] = el
            }}
            style={{
              opacity: 0,
              transform: "translateX(-30px)",
              visibility: "hidden",
            }}
            className="flex-shrink-0 border-t border-white/10 pt-8"
          >
            <ContactButton variant="primary" />
          </div>
        </div>
      </div>
    </>
  )
}
