'use client'

import { motion } from 'framer-motion'

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
  skills: string[]
  icon?: string
}

const experiences: ExperienceItem[] = [
  {
    title: 'Backend Developer',
    company: 'PT Blue Bird Group',
    period: 'Oct 2024 — Jan 2025',
    description: 'Built parking management & real-time driver tracking microservices. High-concurrency handlers, optimized Postgres + Redis, Dockerized services humming like an M engine at 7k rpm.',
    skills: ['Golang', 'Gin', 'PostgreSQL', 'Redis', 'Docker', 'REST APIs'],
    icon: '🏢',
  },
  {
    title: 'Cloud Computing Cohort',
    company: 'Bangkit Academy',
    period: 'Jun 2023 — Dec 2023',
    description: 'Specialized in GCP, Terraform IaC, and CI/CD. Designed scalable backend for driver management — from Cloud Run to Kubernetes, all pipeline-green.',
    skills: ['GCP', 'Terraform', 'Kubernetes', 'Cloud Run', 'GitHub Actions', 'CI/CD'],
    icon: '☁️',
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2.5 py-1 rounded-full bg-bmw-estoril text-white text-[11px] font-mono tracking-widest">CHAPTER 02</span>
          <span className="text-[11px] font-mono tracking-[0.18em] text-bmw-titan">QUEST LOG • EXPERIENCE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-bmw-alpine">Experience</h2>
        <div className="mt-3 w-12 h-[3px] m-stripe rounded-full" />
        <p className="text-bmw-mineral text-sm mt-3 max-w-xl">Like main quests — each role unlocked new skills and a bigger map.</p>
      </motion.div>

      <div className="relative pl-6 sm:pl-8">
        {/* Timeline rail */}
        <div className="absolute left-[11px] sm:left-[14px] top-2 bottom-2 w-[2px] bg-bmw-titan/15 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-bmw-estoril via-bmw-daytona to-transparent opacity-60" />
        </div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative"
            >
              {/* Dot */}
              <div className="absolute -left-[18px] sm:-left-[22px] top-6 w-3 h-3 rounded-full bg-bmw-estoril border-2 border-bmw-carbon shadow-[0_0_10px_rgba(0,102,177,0.5)]" />
              <div className="absolute -left-[14px] sm:-left-[18px] top-[30px] w-[2px] h-6 bg-bmw-estoril/20 blur-[1px]" />

              <div className="bmw-card rounded-2xl p-5 sm:p-6 hover-glow group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div className="flex gap-3">
                    <span className="w-10 h-10 rounded-xl bg-bmw-estoril/10 border border-bmw-estoril/15 flex items-center justify-center text-lg shrink-0">
                      {exp.icon}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-bmw-alpine group-hover:text-bmw-daytona transition-colors">{exp.title}</h3>
                      <p className="text-bmw-daytona font-mono text-xs sm:text-sm">{exp.company}</p>
                    </div>
                  </div>
                  <span className="inline-flex self-start px-2.5 py-1 rounded-full bg-bmw-alpine/[0.06] border border-bmw-titan/15 text-bmw-mineral text-xs font-mono whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <p className="text-bmw-titan text-sm leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {exp.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-full bg-bmw-alpine/[0.06] border border-bmw-titan/12 text-bmw-alpine text-xs font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
