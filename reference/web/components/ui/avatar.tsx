import Image, { type CustomImageProps } from "@/components/ui/image"

export function Avatar({ src, alt, ...rest }: CustomImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className="w-12 h-12 rounded-full object-cover"
      {...rest}
    />
  )
}
