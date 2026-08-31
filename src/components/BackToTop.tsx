'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y > 400)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (y / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // also allow keyboard: press Home
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Home' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        scrollToTop()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-2"
        >
          {/* Progress ring */}
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(0,154,218,0.12)" strokeWidth="3" />
              <motion.circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#009ADA"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ duration: 0.3 }}
                style={{ pathLength: progress / 100 }}
                strokeDasharray="113"
                strokeDashoffset={113 - (113 * progress) / 100}
              />
            </svg>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top (or press Home)"
              className="absolute inset-1 rounded-full bg-white dark:bg-[#0A1020] border border-black/5 dark:border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex items-center justify-center hover:bg-[#009ADA] hover:text-white dark:hover:bg-[#009ADA] group transition-colors"
            >
              <ChevronUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <span className="px-2 py-1 rounded-full bg-white dark:bg-[#0A1020] border border-black/5 dark:border-white/10 shadow text-[9px] font-mono tracking-widest text-[#6B7280] dark:text-white/60">
            TOP
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Also a inline "Back to top" link for footer
export function BackToTopInline() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-white/10 border border-black/5 dark:border-white/10 text-xs font-mono text-[#6B7280] dark:text-white/70 hover:text-black dark:hover:text-white hover:border-[#009ADA]/30 transition-colors"
    >
      <ArrowUp size={12} /> Back to top
    </button>
  )
}
