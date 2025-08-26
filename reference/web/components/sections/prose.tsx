"use client"

import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"

const Common = ({ body }: { body: BlocksContent }) => {
  return (
    <div className="prose prose-xl prose-a:text-rust-300 prose-ul:marker:text-neutral-dark-500 prose-p:text-neutral-dark-500 max-w-none tracking-[-0.01em]">
      <BlocksRenderer
        content={body}
        blocks={{
          heading: ({ children, level }) => {
            const idString = (Array.isArray(children) ? children : [])
              .map((child) => child.props.text)
              .join("-")
            const id = String(idString)
              .toLowerCase()
              .replace(/<\/?[^>]+(>|$)/g, "")
              .trim()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]+/g, "")

            switch (level) {
              case 1:
                return <h1 id={id}>{children}</h1>
              case 2:
                return <h2 id={id}>{children}</h2>
              case 3:
                return <h3 id={id}>{children}</h3>
              case 4:
                return <h4 id={id}>{children}</h4>
              case 5:
                return <h5 id={id}>{children}</h5>
              case 6:
                return <h6 id={id}>{children}</h6>
              default:
                return <h2 id={id}>{children}</h2>
            }
          },
        }}
      />
    </div>
  )
}

export function Prose({
  body,
  type,
}: {
  body: BlocksContent
  type?: "page" | "article"
}) {
  if (type === "page") {
    return (
      <section className="py-12 lg:py-24">
        <div className="container">
          <Common body={body} />
        </div>
      </section>
    )
  }

  return <Common body={body} />
}
