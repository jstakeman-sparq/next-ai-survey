"use client"

import { useCallback, useMemo } from "react"
import { LinkedIn } from "@/components/icons/linkedin"
import { Twitter } from "@/components/icons/twitter"

type ShareButtonProps = {
  name: string
  title?: string
  description?: string
}

const openShareWindow = (url: string) => {
  window.open(url, "_blank", "width=600,height=400")
}

export function ShareButton({ name, title, description }: ShareButtonProps) {
  const handleShare = useCallback(() => {
    const currentUrl = window.location.href
    const shareTitle = title || document.title
    const shareDescription = description || ""

    const encodedUrl = encodeURIComponent(currentUrl)

    switch (name) {
      case "linkedin":
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        openShareWindow(linkedinUrl)
        break
      case "twitter":
      case "x":
        const twitterText = `${shareTitle}${shareDescription ? ` - ${shareDescription}` : ""}`
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodedUrl}`
        openShareWindow(twitterUrl)
        break
      default:
        break
    }
  }, [name, title, description])

  const icon = useMemo(() => {
    switch (name) {
      case "linkedin":
        return <LinkedIn />
      case "twitter":
      case "x":
        return <Twitter />
      default:
        return null
    }
  }, [name])

  const ariaLabel = useMemo(() => `Share on ${name}`, [name])

  return (
    <button
      title={ariaLabel}
      onClick={handleShare}
      className="hover:text-neutral-dark-400 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white p-2 text-white transition-colors hover:bg-white"
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  )
}
