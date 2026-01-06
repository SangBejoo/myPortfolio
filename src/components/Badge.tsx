interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: string
}

export function Badge({ children, className = "", variant = "default" }: BadgeProps) {
  const baseClasses = "px-3 py-1 border text-xs font-mono rounded-full transition-colors"
  const variantClasses = variant === "secondary" 
    ? "bg-blue-600/20 border-blue-600/40 text-blue-300 hover:bg-blue-600/30"
    : "bg-gray-600/20 border-gray-600/40 text-gray-300 hover:bg-gray-600/30"

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  )
}
