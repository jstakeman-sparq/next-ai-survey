import NextImage, { ImageProps, StaticImageData } from "next/image"
import { getMediaUrl } from "@/lib/media"

export interface CustomImageProps extends Omit<ImageProps, "src"> {
  src: string | StaticImageData
}

export default function Image({ src, ...props }: CustomImageProps) {
  const imageUrl = typeof src === "string" ? getMediaUrl(src) : src

  if (!imageUrl) return null

  return <NextImage src={imageUrl} {...props} />
}
