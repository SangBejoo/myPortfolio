'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'
import { TypingEffect } from './TypingEffect'

export function Hero() {
  const roles = [
    'Backend Developer',
    'Cloud Infrastructure Engineer',
    'Microservices Architect',
    'Go Developer',
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Animated background grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-black" />
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl opacity-20 animate-pulse" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Name */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-mono text-white leading-tight">
            Ayub Subagiya
          </h1>

          {/* Typing role effect */}
          <div className="h-16 sm:h-20 flex items-center justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
              <TypingEffect phrases={roles} speed={80} delayBetweenPhrases={3000} />
              <span className="animate-pulse">|</span>
            </h2>
          </div>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Building scalable microservices and robust cloud architectures. Specialized in Go, GCP, and modern DevOps practices.
          </p>

          {/* Location badge */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Bekasi, Indonesia
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          >
            {/* Primary Button */}
            <Link href="#projects">
              <button className="group px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-mono rounded-lg transition-all duration-300 flex items-center gap-2 hover-glow">
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            {/* Secondary Button */}
            <a
              href="/resume.pdf"
              download
              className="px-8 py-3 border border-gray-600 hover:border-gray-400 text-white font-mono rounded-lg transition-all duration-300 flex items-center gap-2 hover:bg-white/5"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </motion.div>

          {/* Social links preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-6 text-gray-400 text-sm pt-4"
          >
            <a href="https://github.com/sangbejoo" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/ayub-subagiya" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              LinkedIn
            </a>
            <a href="mailto:ayubsubagiya@gmail.com" className="hover:text-blue-400 transition-colors">
              Email
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border border-gray-600 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-gray-600 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
