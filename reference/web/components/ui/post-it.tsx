import { cn } from "@/lib/utils"

interface PostItProps {
  className?: string
  value: string
  label: string
}

export function PostIt({ className, value, label, ...props }: PostItProps) {
  return (
    <div className={cn(className)} {...props}>
      <div className="bg-accent-200 text-neutral-dark-500 noise grid w-max rounded-xl p-8 [--noise-blend-mode:var(--color-neutral-dark-500)] [--noise-opacity:0.5]">
        <span className="text-stats font-bold">{value}</span>
        <span className="text-lead">{label}</span>
      </div>
    </div>
  )
}
