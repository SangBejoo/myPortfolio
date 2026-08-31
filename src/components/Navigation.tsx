'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Gamepad2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ThemeToggle } from './ThemeProvider'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24)
      const sections = ['hero', 'about', 'experience', 'projects', 'certificates', 'contact']
      let current = 'hero'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) current = id
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const menuItems = [
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'PROJECTS', href: '#projects', id: 'projects', badge: 'VN MODE' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-400 ${
        isScrolled ? 'glass-effect-strong shadow-[0_8px_32px_rgba(0,0,0,0.06)]' : 'bg-white/80 backdrop-blur-md border-b border-black/[0.04]'
      }`}
    >
      <div className="m-stripe" />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[56px] sm:h-[60px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#009ADA] to-[#0077B6] flex items-center justify-center text-white font-mono font-bold text-xs shadow-sm group-hover:scale-105 transition-transform">
            SB
          </div>
          <div className="hidden sm:block">
            <div className="font-mono font-bold text-black dark:text-white text-sm leading-none group-hover:text-[#009ADA] transition-colors">
              SangBejoo <span className="font-normal text-xs text-[#6B7280]">/ Ayub Subagiya</span>
            </div>
            <div className="text-[10px] font-mono tracking-[0.18em] text-[#6B7280] mt-0.5">BACKEND & CLOUD ENGINEER</div>
          </div>
          <span className="sm:hidden font-mono font-bold text-black dark:text-white text-sm">SangBejoo</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 rounded-full text-xs font-mono tracking-widest transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#009ADA] text-white shadow-[0_4px_12px_rgba(0,154,218,0.2)]'
                    : 'text-[#6B7280] hover:text-black hover:bg-black/[0.04] border border-transparent hover:border-black/10'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest ${isActive ? 'bg-white text-[#009ADA]' : 'bg-[#009ADA] text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-effect text-[11px] font-mono">
            <Gamepad2 size={12} className="text-[#009ADA]" />
            <span className="text-[#6B7280] hidden xl:inline">VN MODE</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-500">ON</span>
          </div>
          <ThemeToggle />
          <a href="mailto:ayubsubagiya@gmail.com" className="hidden sm:inline-flex px-4 py-2 rounded-full btn-bmw-primary text-xs font-mono font-semibold">
            HIRE ME →
          </a>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden w-9 h-9 rounded-full bg-white border border-black/10 flex items-center justify-center shadow-sm dark:bg-white/10 dark:border-white/10 dark:text-white" aria-label="Toggle menu">
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="md:hidden border border-black/10 glass-effect-strong mx-3 mb-3 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-2 space-y-1">
              {menuItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={`flex items-center justify-between px-4 py-3 rounded-xl font-mono text-sm tracking-wide transition-colors ${active === item.id ? 'bg-[#009ADA] text-white' : 'text-[#6B7280] hover:text-black hover:bg-black/[0.04]'}`}>
                  {item.label}
                  <span className="text-xs opacity-60">→</span>
                </a>
              ))}
              <div className="pt-2">
                <a href="mailto:ayubsubagiya@gmail.com" className="block w-full text-center py-3 rounded-xl btn-bmw-primary font-mono text-sm font-semibold">
                  HIRE ME — Start a route →
                </a>
              </div>
            </div>
            <div className="px-4 py-3 bg-[#F8FAFC] border-t border-black/5 flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-[#6B7280]">PRESS START TO CONTINUE</span>
              <span className="text-[10px] font-mono text-black/40">© 2026 AYUB</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
