export function getMediaUrl(url: string | null) {
  if (url == null) return undefined
  if (url.startsWith("data:")) return url
  if (url.startsWith("http") || url.startsWith("//")) return url
  return `${process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL}${url}`
}