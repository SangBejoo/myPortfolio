'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { DialogueBox, useTypewriter } from './vn/DialogueBox'

const vnAboutLines = [
  { speaker: 'AYUB', text: "About me? Think of me as the protagonist who picked the engineering route. Bekasi-born, backend-obsessed. I turn messy problems into clean, scalable systems." },
  { speaker: 'NARRATOR', text: "He has hands-on experience with Go, Python, PostgreSQL, and Google Cloud Platform — and a soft spot for distributed systems that just... work." },
  { speaker: 'AYUB', text: "Complex flows, real-time data, cloud automation — that's my daily grind. I learn fast, ship faster, and keep the architecture elegant. Full White clean, Blue Ball bold." },
]

export function About() {
  const [idx, setIdx] = useState(0)
  const { displayed, done, skip } = useTypewriter(vnAboutLines[idx].text, 16, true)

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
              <div className="relative aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden bg-[#F0F7FF]">
                <Image src="/images/author/ayub.jpg" alt="Ayub Subagiya" fill className="object-cover object-top" priority style={{ objectPosition: '50% 18%' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                <div className="absolute inset-0 border border-black/5 rounded-xl pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#009ADA] text-white text-[11px] font-mono tracking-widest">STAFF WEB PROGRAMMER • ERLANGGA</span>
                  <span className="hidden sm:inline-flex px-2 py-1 rounded-full bg-white/90 backdrop-blur border border-black/10 text-black text-[10px] font-mono">CG • PROFILE</span>
                </div>
              </div>
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
              <p className="text-black">Staff Web Programmer at Penerbit Erlangga (Feb 2026 — Present). I build elegant, efficient web systems — Full White simplicity on the surface, Blue Ball energy underneath.</p>
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
    </section>
  )
}
