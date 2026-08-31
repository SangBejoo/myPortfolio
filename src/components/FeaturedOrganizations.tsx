'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { ImageZoom } from './ImageZoom'

export function FeaturedOrganizations() {
  const [zoomImg, setZoomImg] = useState<{ src: string; title: string } | null>(null)
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto bg-[#F8FAFC] rounded-3xl my-8">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/5 shadow-sm text-[11px] font-mono tracking-widest mb-3 text-[#6B7280]">
          ALLIES • FACTIONS
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-black">Featured Organizations</h2>
        <div className="w-12 h-[3px] m-stripe rounded-full mx-auto mt-3" />
        <p className="text-[#6B7280] text-sm mt-2">Click logo to zoom 🔍</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Penerbit Erlangga', role: 'Staff Web Programmer', period: 'Feb 2026 — Present', desc: 'Building large-scale web platforms with Golang, React, PostgreSQL, Redis on GCP — Kami Melayani Ilmu Pengetahuan.', img: '/images/erlangga.jpg', current: true },
          { name: 'PT Blue Bird Group', role: 'Backend Developer', period: 'Oct 2024 — Jan 2025', desc: 'Parking & driver tracking microservices at national scale — production traffic, real consequences.', img: '/images/bluebird.png' },
          { name: 'Bangkit Academy', role: 'Cloud Computing Cohort', period: 'Jun 2023 — Dec 2023', desc: 'GCP, Infrastructure as Code, and cloud architecture design — the academy arc that forged my backend path.', img: '/images/bangkit.png' },
        ].map((org, i) => (
          <motion.div
            key={org.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative bmw-card rounded-2xl p-6 flex flex-col items-center text-center hover-glow overflow-hidden group"
          >
            {(org as any).current && (
              <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-mono font-bold tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> CURRENT
              </span>
            )}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <Image src={org.img} alt={org.name} fill className="object-contain object-center" />
            </div>
            <div
              className="relative w-28 h-28 mb-4 bg-white rounded-xl p-2 flex items-center justify-center overflow-hidden border border-black/5 cursor-zoom-in group-hover:border-[#009ADA]/20 transition-colors"
              onClick={() => setZoomImg({ src: org.img, title: org.name })}
            >
              <Image src={org.img} alt={org.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform" />
              <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">🔍</span>
            </div>
            <h3 className="text-black font-bold text-sm sm:text-base">{org.name}</h3>
            <p className="text-[#009ADA] text-xs font-mono mt-1">{org.role}</p>
            <p className="text-[#6B7280] text-xs font-mono">{org.period}</p>
            <p className="text-[#4B5563] text-sm leading-relaxed mt-3">{org.desc}</p>
          </motion.div>
        ))}
      </div>
      {zoomImg && <ImageZoom src={zoomImg.src} alt={zoomImg.title} isOpen={!!zoomImg} onClose={() => setZoomImg(null)} title={zoomImg.title} />}
    </section>
  )
}
