'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Gamepad2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24)
      // simple active detection
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
        isScrolled ? 'glass-effect-strong shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'bg-bmw-carbon/40 backdrop-blur-sm'
      }`}
    >
      {/* BMW M stripe - always visible */}
      <div className="m-stripe" />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[56px] sm:h-[60px] flex items-center justify-between gap-4">
        {/* Logo - BMW roundel inspired */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-bmw-titan/20 bg-bmw-carbon flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            {/* BMW quarter colors */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-90">
              <div className="bg-[#0066B1]" />
              <div className="bg-white" />
              <div className="bg-white" />
              <div className="bg-[#0066B1]" />
            </div>
            <div className="absolute inset-[3px] rounded-full border border-bmw-carbon bg-bmw-carbon/0" />
            <span className="relative text-[10px] font-black tracking-tighter text-white drop-shadow">as</span>
          </div>
          <div className="hidden sm:block">
            <div className="font-mono font-bold text-bmw-alpine text-sm leading-none group-hover:text-bmw-daytona transition-colors">AYUB SUBAGIYA</div>
            <div className="text-[10px] font-mono tracking-[0.18em] text-bmw-mineral">BMW INDIVIDUAL • VISUAL NOVEL EDITION</div>
          </div>
          <span className="sm:hidden font-mono font-bold text-bmw-alpine">as.</span>
        </Link>

        {/* Desktop Menu - VN chapter style */}
        <div className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 rounded-full text-xs font-mono tracking-widest transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-bmw-estoril text-white shadow-[0_4px_12px_rgba(0,102,177,0.25)]'
                    : 'text-bmw-titan hover:text-bmw-alpine hover:bg-bmw-alpine/5 border border-transparent hover:border-bmw-titan/15'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest ${isActive ? 'bg-white text-bmw-estoril' : 'bg-bmw-estoril text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </a>
            )
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-effect text-[11px] font-mono">
            <Gamepad2 size={12} className="text-bmw-daytona" />
            <span className="text-bmw-mineral">VN MODE</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400">ON</span>
          </div>
          <a
            href="mailto:ayubsubagiya@gmail.com"
            className="hidden sm:inline-flex px-4 py-2 rounded-full btn-bmw-primary text-xs font-mono font-semibold"
          >
            HIRE ME →
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-9 h-9 rounded-full btn-bmw-ghost flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - VN drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden border-t border-bmw-titan/10 glass-effect-strong mx-3 mb-3 rounded-2xl overflow-hidden"
          >
            <div className="p-2 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-mono text-sm tracking-wide transition-colors ${
                    active === item.id ? 'bg-bmw-estoril text-white' : 'text-bmw-titan hover:text-bmw-alpine hover:bg-bmw-alpine/5'
                  }`}
                >
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
            <div className="px-4 py-3 bg-bmw-alpine/[0.02] border-t border-bmw-titan/10 flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-bmw-mineral">PRESS START TO CONTINUE</span>
              <span className="text-[10px] font-mono text-bmw-titan">© 2026 AYUB</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
