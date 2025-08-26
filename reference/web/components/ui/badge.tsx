export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-bold bg-accent-200 uppercase text-neutral-dark-500 px-3 py-1 rounded-sm">
      {children}
    </span>
  )
}
