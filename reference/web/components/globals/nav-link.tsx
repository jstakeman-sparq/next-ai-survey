"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function NavLink({ href, children, className = "" }: NavLinkProps) {
  const pathname = usePathname()
  const normalizedPathname = pathname.replace(/\/$/, "") || "/"
  const normalizedHref = href.replace(/\/$/, "") || "/"
  const isActive = normalizedPathname === normalizedHref

  return (
    <Link
      href={href}
      className={cn(
        "p-2 font-bold hover:bg-neutral-light-100/20 rounded-lg transition-colors duration-300 flex items-center gap-2",
        className,
      )}
    >
      {isActive && (
        <span
          className="w-2 h-2 rounded-full bg-current flex-shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </Link>
  )
}
