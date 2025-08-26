"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import play from "@/assets/media/images/play.svg"
import { getMediaUrl } from "@/lib/media"
import { cn } from "@/lib/utils"

interface VideoProps {
  className?: string
  src: string
  poster: string
}

export function Video({ className, src, poster, ...props }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    const video = videoRef.current
    if (video) {
      video.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className={cn("relative", className)} onClick={handlePlay} {...props}>
      {!isPlaying && (
        <Image
          src={play}
          alt="Play"
          width="76"
          height="76"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 w-10 h-10 md:w-[4.75rem] md:h-[4.75rem]"
        />
      )}

      {src && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-lg"
          controls={isPlaying}
          poster={getMediaUrl(poster)}
          muted={false}
          autoPlay={false}
        >
          <source src={getMediaUrl(src)} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
