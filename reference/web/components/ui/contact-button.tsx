import { Button, ButtonProps } from "@/components/ui/button"

export function ContactButton({
  variant,
}: {
  variant?: ButtonProps["variant"]
}) {
  return (
    <Button href="/contact" variant={variant}>
      Let&apos;s talk
    </Button>
  )
}
