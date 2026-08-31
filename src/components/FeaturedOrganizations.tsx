'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function FeaturedOrganizations() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect text-[11px] font-mono tracking-widest mb-3">
          ALLIES • FACTIONS
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-bmw-alpine">Featured Organizations</h2>
        <div className="w-12 h-[3px] m-stripe rounded-full mx-auto mt-3" />
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Penerbit Erlangga', role: 'Staff Web Programmer', period: 'Feb 2026 — Present', desc: 'Building large-scale web platforms with Golang, React, PostgreSQL, Redis on GCP — Kami Melayani Ilmu Pengetahuan. Active main route.', img: '/images/erlangga.jpg', current: true },
          { name: 'PT Blue Bird Group', role: 'Backend Developer', period: 'Oct 2024 — Jan 2025', desc: 'Parking & driver tracking microservices at national scale — production traffic, real consequences.', img: '/images/bluebird.png' },
          { name: 'Bangkit Academy', role: 'Cloud Computing Cohort', period: 'Jun 2023 — Dec 2023', desc: 'GCP, Infrastructure as Code, and cloud architecture design — the academy arc that forged my backend path.', img: '/images/bangkit.png' },
        ].map((org, i) => (
          <motion.div
            key={org.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative bmw-card rounded-2xl p-6 flex flex-col items-center text-center hover-glow overflow-hidden"
          >
            {(org as any).current && (
              <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-mono font-bold tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> CURRENT
              </span>
            )}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
              <Image src={org.img} alt={org.name} fill className="object-contain object-center" />
            </div>
            <div className="relative w-28 h-28 mb-4 bg-white rounded-xl p-2 flex items-center justify-center overflow-hidden">
              <Image src={org.img} alt={org.name} fill className="object-contain p-2" />
            </div>
            <h3 className="text-bmw-alpine font-bold text-sm sm:text-base">{org.name}</h3>
            <p className="text-bmw-daytona text-xs font-mono mt-1">{org.role}</p>
            <p className="text-bmw-mineral text-xs font-mono">{org.period}</p>
            <p className="text-bmw-titan text-sm leading-relaxed mt-3">{org.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
