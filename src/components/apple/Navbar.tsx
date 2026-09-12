'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'

export function Navbar({ onEnterRange }: { onEnterRange?: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Arsenal', href: '#arsenal' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'apple-nav shadow-sm' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-apple mx-auto px-4 sm:px-8 h-12 flex items-center justify-between">
        {/* Monogram Brand */}
        <Link
          href="#overview"
          className="flex items-center gap-2.5 text-apple-text hover:text-white transition-colors group"
        >
          <span className="w-6 h-6 rounded-md bg-[#1D1D1F]/5 group-hover:bg-apple-blue transition-colors flex items-center justify-center font-mono text-[11px] font-bold text-[#1D1D1F] group-hover:text-white">
            SB
          </span>
          <span className="text-body font-semibold tracking-tight text-[#1D1D1F]">
            {portfolioData.profile.handle}
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-caption text-apple-text-secondary hover:text-apple-text transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          {onEnterRange && (
            <button
              onClick={onEnterRange}
              className="inline-flex items-center justify-center gap-2 h-8 px-3.5 rounded-md bg-[#0A84FF] hover:bg-[#0071E3] text-white text-caption font-medium transition-colors"
              title="Play the interactive 3D shooting-range portfolio"
            >
              <span>Enter the Range</span>
            </button>
          )}
          <a
            href="mailto:ayubsubagiya@gmail.com"
            className="apple-btn-primary !h-8 !px-3.5 !text-caption !rounded-md"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-md text-apple-text-secondary hover:text-[#1D1D1F]"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden apple-nav border-t border-white/[0.08] px-5 py-4 space-y-3">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-body text-apple-text-secondary hover:text-[#1D1D1F] py-1"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 space-y-2">
            {onEnterRange && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onEnterRange()
                }}
                className="w-full h-9 rounded-md bg-[#0A84FF] hover:bg-[#0071E3] text-white text-caption font-medium transition-colors"
              >
                Enter the Range
              </button>
            )}
            <a
              href="mailto:ayubsubagiya@gmail.com"
              className="apple-btn-primary w-full !h-9 text-caption justify-center"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
