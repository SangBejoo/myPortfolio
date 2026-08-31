'use client'
import { motion } from 'framer-motion'

interface Chapter {
  id: string
  label: string
  title: string
  href?: string
}

export const chapters: Chapter[] = [
  { id: 'prologue', label: '00', title: 'PROLOGUE', href: '#hero' },
  { id: 'about', label: '01', title: 'ABOUT', href: '#about' },
  { id: 'experience', label: '02', title: 'EXPERIENCE', href: '#experience' },
  { id: 'projects', label: '03', title: 'PROJECTS', href: '#projects' },
  { id: 'stack', label: '04', title: 'TECH STACK', href: '#tech' },
  { id: 'certs', label: '05', title: 'CERTS', href: '#certificates' },
  { id: 'contact', label: '06', title: 'CONTACT', href: '#contact' },
]

export function VNProgress({
  activeId,
  progress = 0,
  onSelect,
}: {
  activeId: string
  progress?: number // 0-100 scroll progress
  onSelect?: (id: string) => void
}) {
  return (
    <div className="w-full">
      {/* Top M stripe */}
      <div className="m-stripe" />
      {/* Progress bar BMW style - like tachometer */}
      <div className="bmw-progress">
        <motion.div
          className="bmw-progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>

      {/* Chapter rail */}
      <div className="bg-bmw-carbon/90 backdrop-blur-xl border-b border-bmw-titan/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5 gap-2 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] text-bmw-mineral">
                <span className="w-1.5 h-1.5 rounded-full bg-bmw-estoril animate-pulse" />
                CHAPTER SELECT
              </span>
              <span className="sm:hidden text-[10px] font-mono tracking-widest text-bmw-mineral">CHAPTERS</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5">
              {chapters.map((ch) => {
                const isActive = ch.id === activeId
                return (
                  <a
                    key={ch.id}
                    href={ch.href}
                    onClick={(e) => {
                      if (onSelect) {
                        e.preventDefault()
                        onSelect(ch.id)
                        document.querySelector(ch.href!)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                    }}
                    className={`group relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border text-[11px] font-mono tracking-wide transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-bmw-estoril border-bmw-estoril text-white shadow-[0_4px_12px_rgba(0,102,177,0.3)]'
                        : 'bg-bmw-alpine/[0.03] border-bmw-titan/15 text-bmw-titan hover:text-bmw-alpine hover:border-bmw-titan/30 hover:bg-bmw-alpine/[0.06]'
                    }`}
                  >
                    <span className={`text-[10px] font-bold ${isActive ? 'text-white/80' : 'text-bmw-mineral'}`}>{ch.label}</span>
                    <span className="hidden sm:inline">{ch.title}</span>
                    <span className="sm:hidden">{ch.title.slice(0, 3)}</span>
                    {isActive && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-bmw-daytona rounded-full" />}
                  </a>
                )
              })}
            </div>

            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-bmw-mineral">
              <span className="w-6 h-[1px] bg-bmw-titan/20" />
              SANGBEJOO
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SaveIndicator({ slot = 1 }: { slot?: number }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-effect text-[11px] font-mono">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)] animate-pulse" />
      <span className="text-bmw-mineral">SAVE</span>
      <span className="text-bmw-alpine font-semibold">SLOT {String(slot).padStart(2, '0')}</span>
      <span className="text-bmw-titan/60">•</span>
      <span className="text-bmw-titan hidden sm:inline">{new Date().toLocaleDateString('en-GB')}</span>
    </div>
  )
}
