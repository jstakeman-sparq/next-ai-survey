import Link from "next/link"
import { ArrowRight } from "@/components/icons/arrow-right"

export function FilledLink({
  filledLink,
}: {
  filledLink: {
    url: string
    text: string
    external?: boolean
  }
}) {
  return (
    <Link
      href={filledLink.url}
      target={filledLink.external ? "_blank" : "_self"}
      rel={filledLink.external ? "noopener noreferrer" : undefined}
      className="bg-accent-100 decoration-neutral-dark-500 text-neutral-dark-500 mt-[-4rem] inline-flex w-fit flex-1 items-center rounded-s-sm px-2 py-1.5 text-lg font-bold underline underline-offset-4 md:mt-[-6rem] md:w-max md:gap-0.5"
    >
      {filledLink.text}
      <ArrowRight className="w-full max-w-6" />
    </Link>
  )
}
