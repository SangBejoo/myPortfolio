'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { DialogueBox, useTypewriter } from './vn/DialogueBox'
import { ImageZoom } from './ImageZoom'

const vnAboutLines = [
  { speaker: 'AYUB', text: "About me? Think of me as the protagonist who picked the engineering route. Bekasi-born, backend-obsessed. I turn messy problems into clean, scalable systems." },
  { speaker: 'NARRATOR', text: "He has hands-on experience with Go, Python, PostgreSQL, and Google Cloud Platform — and a soft spot for distributed systems that just... work." },
  { speaker: 'AYUB', text: "Complex flows, real-time data, cloud automation — that's my daily grind. I learn fast, ship faster, and keep the architecture clean and resilient." },
]

const authorImages = [
  { src: '/images/author/ayub.jpg', label: 'Ayub — Formal (2025)', desc: 'Staff Web Programmer' },
  { src: '/images/author/profile.jpg', label: 'Ayub — Casual', desc: 'Outdoor • Orange' },
]

export function About() {
  const [idx, setIdx] = useState(0)
  const { displayed, done, skip } = useTypewriter(vnAboutLines[idx].text, 16, true)
  const [authorIdx, setAuthorIdx] = useState(0)
  const [zoomImg, setZoomImg] = useState<string | null>(null)

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F0F7FF] via-white to-white" />
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-[#009ADA] text-white text-[11px] font-mono tracking-widest">CHAPTER 01</span>
            <span className="text-[11px] font-mono tracking-[0.18em] text-[#6B7280]">CHARACTER PROFILE</span>
            <span className="hidden sm:inline-flex w-8 h-[1px] bg-black/10" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">About Me</h2>
          <div className="mt-3 w-12 h-[3px] m-stripe rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bmw-card p-2">
              <div
                className="relative aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden bg-[#F0F7FF] cursor-zoom-in group"
                onClick={() => setZoomImg(authorImages[authorIdx].src)}
              >
                <Image src={authorImages[authorIdx].src} alt={authorImages[authorIdx].label} fill className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500" priority style={{ objectPosition: '50% 18%' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                <div className="absolute inset-0 border border-black/5 rounded-xl pointer-events-none" />
                <div className="absolute inset-0 bg-[#009ADA]/0 group-hover:bg-[#009ADA]/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-black text-xs font-mono shadow">🔍 Click to Zoom</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#009ADA] text-white text-[11px] font-mono tracking-widest">STAFF WEB PROGRAMMER • ERLANGGA</span>
                  <span className="hidden sm:inline-flex px-2 py-1 rounded-full bg-white/90 backdrop-blur border border-black/10 text-black text-[10px] font-mono">{authorIdx === 0 ? 'FORMAL' : 'CASUAL'} • {authorIdx + 1}/2</span>
                </div>
              </div>
            </div>
            {/* Author switcher - use both images */}
            <div className="flex gap-2 mt-3">
              {authorImages.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => setAuthorIdx(i)}
                  className={`relative flex-1 rounded-xl overflow-hidden border-2 transition-all group ${authorIdx === i ? 'border-[#009ADA] shadow-md' : 'border-black/5 hover:border-black/15 opacity-70 hover:opacity-100'}`}
                >
                  <div className="relative aspect-[4/3]">
                    <Image src={img.src} alt={img.label} fill className="object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-1 left-1 right-1 text-[10px] font-mono text-white text-center leading-tight">{img.label}</span>
                    {authorIdx === i && <span className="absolute top-1 right-1 w-2 h-2 bg-[#009ADA] rounded-full border border-white" />}
                  </div>
                </button>
              ))}
              <button onClick={() => setZoomImg(authorImages[authorIdx].src)} className="px-3 rounded-xl bg-white border border-black/5 flex flex-col items-center justify-center gap-1 hover:border-[#009ADA]/20 text-xs font-mono text-[#6B7280] hover:text-black">
                <span className="text-lg">🔍</span> Zoom
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mt-3">
              {[
                { v: '2+', k: 'Years Exp', c: 'text-[#009ADA]' },
                { v: '10+', k: 'Projects', c: 'text-black' },
                { v: '4', k: 'Certs', c: 'text-[#6B7280]' },
              ].map((s) => (
                <div key={s.k} className="bmw-card rounded-2xl p-3 text-center">
                  <div className={`text-xl font-bold font-mono ${s.c}`}>{s.v}</div>
                  <div className="text-[11px] font-mono tracking-wide text-[#6B7280]">{s.k}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] font-mono text-[#6B7280] mt-2">↑ Tap image to zoom • Tap thumbnail to switch • Both photos are Ayub</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div onClick={() => (!done ? skip() : setIdx((v) => (v + 1) % vnAboutLines.length))} className="cursor-pointer">
              <DialogueBox
                speaker={vnAboutLines[idx].speaker}
                text={displayed}
                isTypingComplete={done}
                onSkipTypewriter={skip}
                onNext={() => setIdx((v) => (v + 1) % vnAboutLines.length)}
                onPrev={() => setIdx((v) => (v - 1 + vnAboutLines.length) % vnAboutLines.length)}
                hasNext
                hasPrev
              />
            </div>
            <div className="flex items-center justify-center gap-1.5">
              {vnAboutLines.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`h-1 rounded-full transition-all ${i === idx ? 'w-6 bg-[#009ADA]' : 'w-1.5 bg-black/15'}`} />
              ))}
              <span className="ml-2 text-[10px] font-mono tracking-widest text-[#6B7280]">DIALOGUE {idx + 1}/{vnAboutLines.length}</span>
            </div>

            <div className="bmw-card rounded-2xl p-5 space-y-3 text-sm leading-relaxed">
              <p className="text-black">Staff Web Programmer at Penerbit Erlangga (Feb 2026 — Present). I build elegant, efficient web systems — simple and intuitive on the surface, powerful architecture underneath.</p>
              <p className="text-[#6B7280]">GCP • Redis • PostgreSQL • Golang • React — with a love for scalable web apps and clean, maintainable code.</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Golang', 'React', 'PostgreSQL', 'Redis', 'GCP', 'System Design'].map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-[#F0F7FF] border border-[#009ADA]/15 text-black text-xs font-mono">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {zoomImg && <ImageZoom src={zoomImg} alt="Author" isOpen={!!zoomImg} onClose={() => setZoomImg(null)} title={authorImages.find(a => a.src === zoomImg)?.label || 'Ayub'} />}
    </section>
  )
}
