import { CloseFilled } from "@/components/icons/close-filled"
import { cn } from "@/lib/utils"

export function FilterPill({
  label,
  className,
  onClose,
}: {
  label: string
  className?: string
  onClose?: () => void
}) {
  return (
    <div
      className={cn(
        "bg-accent-200 text-neutral-dark-500 inline-flex items-center gap-2.5 rounded-full px-3 py-1 text-xs font-black uppercase",
        className,
      )}
    >
      <span>{label}</span>
      <button onClick={onClose} type="button">
        <CloseFilled />
      </button>
    </div>
  )
}
