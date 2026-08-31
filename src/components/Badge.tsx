interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: string
}

export function Badge({ children, className = "", variant = "default" }: BadgeProps) {
  const baseClasses = "px-2.5 py-1 border text-xs font-mono rounded-full transition-colors"
  const variantClasses = variant === "secondary" 
    ? "bg-[#009ADA]/10 border-[#009ADA]/20 text-[#009ADA] hover:bg-[#009ADA]/15"
    : "bg-[#F0F7FF] border-black/5 text-black hover:bg-white hover:border-[#009ADA]/15"

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  )
}
