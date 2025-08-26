import Link from "next/link"
import { Instagram } from "@/components/icons/instagram"
import { LinkedIn } from "@/components/icons/linkedin"
import { getGlobalData } from "@/lib/strapi"
import { Email, Social } from "@/lib/types"

const getSocialIcon = (key: string) => {
  switch (key) {
    case "linkedin":
      return <LinkedIn className="h-5 w-5" />
    case "instagram":
      return <Instagram className="h-5 w-5" />
    default:
      return null
  }
}

export async function ContactInfo() {
  const data = await getGlobalData()
  const emails = (data.emails ?? []) as Email[]
  const social = data.social as Social

  return (
    <div className="mb-16 space-y-8 lg:mb-0">
      {emails.map((email) => {
        return (
          <div key={email.id}>
            <h3 className="mb-1 text-lg">{email.label}</h3>
            <Link
              href={`mailto:${email.value}`}
              className="text-neutral-dark-500 hover:text-neutral-dark-700 text-[1.375rem] font-bold underline"
            >
              clients@teamsparq.com
            </Link>
          </div>
        )
      })}

      {social && Object.keys(social).length > 0 && (
        <div>
          <h3 className="mb-4 text-lg">Find Sparq in the Wild</h3>
          <div className="flex space-x-4">
            {Object.entries(social).map(([key, value]) => {
              if (!value || typeof value !== "string") return null
              return (
                <Link
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-neutral-dark-500 hover:bg-neutral-dark-500 flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:text-white"
                >
                  {getSocialIcon(key)}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
