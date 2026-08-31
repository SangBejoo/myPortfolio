interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: string
}

export function Badge({ children, className = "", variant = "default" }: BadgeProps) {
  const baseClasses = "px-2.5 py-1 border text-xs font-mono rounded-full transition-colors"
  const variantClasses = variant === "secondary" 
    ? "bg-bmw-estoril/15 border-bmw-estoril/30 text-bmw-daytona hover:bg-bmw-estoril/20"
    : "bg-bmw-alpine/[0.06] border-bmw-titan/15 text-bmw-alpine hover:bg-bmw-alpine/[0.10] hover:border-bmw-titan/25"

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  )
}
