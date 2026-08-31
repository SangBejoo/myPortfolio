'use client'

import { motion } from 'framer-motion'

interface TechIcon {
  name: string
  icon: React.ReactNode
}

const techStack: TechIcon[] = [
  { name: 'Go', icon: '⚡' },
  { name: 'Python', icon: '🐍' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Kubernetes', icon: '☸️' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MySQL', icon: '🐬' },
  { name: 'Next.js', icon: '▲' },
  { name: 'GCP', icon: '☁️' },
  { name: 'Terraform', icon: '📦' },
  { name: 'Gin', icon: '🍸' },
  { name: 'gRPC', icon: '🔗' },
  { name: 'Redis', icon: '🔴' },
]

export function TechStack() {
  return (
    <section id="tech" className="py-16 sm:py-20 px-4 overflow-hidden relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-bmw-sapphire/[0.03] to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto mb-10 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect text-[11px] font-mono tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-bmw-daytona animate-pulse" /> CHAPTER 04 • ARSENAL • TITAN SILVER EDITION
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-bmw-alpine">Tech Stack</h2>
        <div className="w-12 h-[3px] m-stripe rounded-full mx-auto mt-3" />
        <p className="text-bmw-mineral text-sm mt-3">Like tuning a BMW — every tool chosen for precision.</p>
      </motion.div>

      <div className="relative overflow-hidden py-2">
        <motion.div
          animate={{ x: [0, -1400] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="flex gap-3 whitespace-nowrap"
        >
          {[...techStack, ...techStack, ...techStack].map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-2.5 px-5 py-3 bmw-card rounded-full min-w-fit group cursor-pointer hover:border-bmw-estoril/30 transition-colors"
            >
              <span className="text-lg">{tech.icon}</span>
              <span className="font-mono text-bmw-alpine font-semibold text-sm group-hover:text-bmw-daytona transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
        <div className="absolute top-0 left-0 w-24 sm:w-40 h-full bg-gradient-to-r from-bmw-carbon to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 sm:w-40 h-full bg-gradient-to-l from-bmw-carbon to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
