'use client'

import { ArrowUp } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-apple-border bg-apple-surface-subtle py-10 text-caption text-apple-text-tertiary">
      <div className="max-w-apple mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span>© {new Date().getFullYear()} {portfolioData.profile.name}</span>
          <span className="hidden sm:inline">•</span>
          <span>Staff Web Programmer @ Penerbit Erlangga</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono">Clean • Compact • Zero-Lag</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1D1D1F]/5 hover:bg-[#1D1D1F]/10 text-apple-text-secondary hover:text-[#1D1D1F] transition-colors"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  )
}
