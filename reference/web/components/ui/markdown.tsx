import snarkdown from "snarkdown"

type MarkdownProps = {
  content: string
  as?: React.ElementType
  className?: string
}

export function Markdown({
  content,
  as: Comp = "span",
  className,
}: MarkdownProps) {
  const html = snarkdown(content)
  return (
    <Comp className={className} dangerouslySetInnerHTML={{ __html: html }} />
  )
}
