'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
  skills: string[]
  logo: string
}

const experiences: ExperienceItem[] = [
  {
    title: 'Staff Web Programmer',
    company: 'Penerbit Erlangga',
    period: 'Feb 2026 — Present',
    description: 'Building and maintaining large-scale web platforms for Indonesia\'s leading publisher, including Intelecto (LMS & digital book ecosystem). Developing high-traffic systems with Golang & React, optimized PostgreSQL + Redis, deployed on GCP — delivering Kami Melayani Ilmu Pengetahuan at scale.',
    skills: ['GCP', 'Redis', 'PostgreSQL', 'Golang', 'React', 'LMS'],
    logo: '/images/erlangga.jpg',
  },
  {
    title: 'Backend Developer',
    company: 'PT Blue Bird Group',
    period: 'Oct 2024 — Jan 2025',
    description: 'Built parking management & real-time driver tracking microservices. High-concurrency handlers, optimized Postgres + Redis, Dockerized services with high performance and low latency.',
    skills: ['Golang', 'Gin', 'PostgreSQL', 'Redis', 'Docker', 'REST APIs'],
    logo: '/images/bluebird.png',
  },
  {
    title: 'Cloud Computing Cohort',
    company: 'Bangkit Academy',
    period: 'Jun 2023 — Dec 2023',
    description: 'Specialized in GCP, Terraform IaC, and CI/CD. Designed scalable backend for driver management — from Cloud Run to Kubernetes, all pipeline-green.',
    skills: ['GCP', 'Terraform', 'Kubernetes', 'Cloud Run', 'GitHub Actions', 'CI/CD'],
    logo: '/images/bangkit.png',
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto bg-white">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2.5 py-1 rounded-full bg-[#009ADA] text-white text-[11px] font-mono tracking-widest">CHAPTER 02</span>
          <span className="text-[11px] font-mono tracking-[0.18em] text-[#6B7280]">QUEST LOG • EXPERIENCE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">Experience</h2>
        <div className="mt-3 w-12 h-[3px] m-stripe rounded-full" />
        <p className="text-[#6B7280] text-sm mt-3 max-w-xl">Like main quests — each role unlocked new skills and a bigger map.</p>
      </motion.div>

      <div className="relative pl-6 sm:pl-8">
        <div className="absolute left-[11px] sm:left-[14px] top-2 bottom-2 w-[2px] bg-[#009ADA]/10 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-[#009ADA] via-[#009ADA]/60 to-transparent opacity-60" />
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
              <div className="absolute -left-[18px] sm:-left-[22px] top-6 w-3 h-3 rounded-full bg-[#009ADA] border-2 border-white shadow-[0_0_10px_rgba(0,154,218,0.3)]" />
              <div className="absolute -left-[14px] sm:-left-[18px] top-[30px] w-[2px] h-6 bg-[#009ADA]/15 blur-[1px]" />

              <div className="bmw-card rounded-2xl p-5 sm:p-6 hover-glow group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-black/10 shadow-sm p-1.5 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-[#009ADA]/30 transition-colors">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        fill
                        className="object-contain p-1 rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-black group-hover:text-[#009ADA] transition-colors">{exp.title}</h3>
                      <p className="text-[#009ADA] font-mono text-xs sm:text-sm">{exp.company}</p>
                    </div>
                  </div>
                  <span className="inline-flex self-start px-2.5 py-1 rounded-full bg-[#F0F7FF] border border-[#009ADA]/10 text-[#6B7280] text-xs font-mono whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <p className="text-[#374151] text-sm leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {exp.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-full bg-[#F0F7FF] border border-[#009ADA]/10 text-black text-xs font-mono">
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
