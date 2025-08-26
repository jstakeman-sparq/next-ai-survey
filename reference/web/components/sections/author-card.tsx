import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import Link from "next/link"
import { Divider } from "@/components/ui/divider"
import Image from "@/components/ui/image"
import { Instagram } from "@/components/icons/instagram"
import { LinkedIn } from "@/components/icons/linkedin"
import { Twitter } from "@/components/icons/twitter"
import { Author } from "@/lib/types"

export function AuthorCard(props: Author) {
  const { avatar, name, bio, social } = props

  return (
    <div>
      <Divider theme="dark" className="mt-0" />

      <div className="flex flex-col gap-6 md:flex-row">
        {avatar.url && (
          <Image
            src={avatar.url}
            alt={avatar.alternativeText || name || ""}
            width={avatar.width}
            height={avatar.height}
            className="h-24 w-24 object-cover"
          />
        )}

        <div className="flex flex-col gap-6">
          <div className="text-lead">
            {bio && <BlocksRenderer content={bio} />}
          </div>

          <div className="flex items-center gap-6">
            {social?.linkedin && (
              <Link
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn />
              </Link>
            )}
            {social?.instagram && (
              <Link
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram />
              </Link>
            )}
            {social?.x && (
              <Link href={social.x} target="_blank" rel="noopener noreferrer">
                <Twitter />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
