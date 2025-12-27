interface BadgeProps {
  label: string
}

export function Badge({ label }: BadgeProps) {
  return (
    <span className="px-3 py-1 bg-blue-600/20 border border-blue-600/40 text-blue-300 text-xs font-mono rounded-full hover:bg-blue-600/30 transition-colors">
      {label}
    </span>
  )
}
