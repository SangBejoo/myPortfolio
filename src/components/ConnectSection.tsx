'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { Mail, Linkedin, Github, ExternalLink, MessageCircle } from 'lucide-react'
import { ImageZoom } from './ImageZoom'

export function ConnectSection() {
  const [zoom, setZoom] = useState<string | null>(null)
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bmw-card p-6 sm:p-10"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#009ADA]/[0.04] via-transparent to-[#009ADA]/[0.04]" />
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[60px] opacity-[0.06]" style={{ background: 'radial-gradient(circle, #009ADA 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex flex-col items-center gap-3">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-2xl overflow-hidden bg-white border border-black/5 p-1.5 shadow-sm cursor-zoom-in group" onClick={() => setZoom('/images/author/profile.jpg')}>
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image src="/images/author/profile.jpg" alt="Ayub — Casual" fill className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500" style={{ objectPosition: '50% 15%' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                <span className="absolute top-2 left-2 px-2 py-1 rounded-full bg-[#009ADA] text-white text-[10px] font-mono tracking-widest">READY TO CHAT</span>
                <span className="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-white/90 backdrop-blur border border-black/5 text-black text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">🔍 Zoom</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setZoom('/images/author/profile.jpg')} className="w-12 h-12 rounded-lg overflow-hidden border-2 border-[#009ADA] shadow-sm relative">
                <Image src="/images/author/profile.jpg" alt="thumb 1" fill className="object-cover" />
              </button>
              <button onClick={() => setZoom('/images/author/ayub.jpg')} className="w-12 h-12 rounded-lg overflow-hidden border border-black/10 opacity-70 hover:opacity-100 relative">
                <Image src="/images/author/ayub.jpg" alt="thumb 2" fill className="object-cover" />
              </button>
              <span className="text-[10px] font-mono text-[#6B7280] self-center ml-1">2 photos • click to zoom</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#009ADA]/10 border border-[#009ADA]/15 text-[#009ADA] text-[11px] font-mono tracking-widest mb-3">
                <MessageCircle size={12} /> DIALOGUE CHOICE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black leading-tight">Let&apos;s Build Something Great Together</h2>
              <p className="text-[#6B7280] text-sm leading-relaxed mt-3">
                Choose your route — LinkedIn, GitHub, or direct email. Every great project starts with a single message. What will you pick?
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a href="https://linkedin.com/in/sangbejoo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 btn-bmw-primary rounded-full font-mono text-sm">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href="https://github.com/sangbejoo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 btn-bmw-ghost rounded-full font-mono text-sm">
                <Github size={16} /> GitHub
              </a>
              <a href="mailto:ayubsubagiya@gmail.com" className="inline-flex items-center gap-2 px-5 py-2.5 btn-bmw-ghost rounded-full font-mono text-sm">
                <Mail size={16} /> Email
              </a>
            </div>

            <a href="mailto:ayubsubagiya@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#009ADA] to-[#0077B6] hover:from-[#00ADEF] hover:to-[#009ADA] text-white font-mono font-bold rounded-full shadow-[0_8px_24px_rgba(0,154,218,0.18)] transition-all">
              Start a Conversation <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>
      </motion.div>
      {zoom && <ImageZoom src={zoom} alt="Ayub" isOpen={!!zoom} onClose={() => setZoom(null)} title={zoom.includes('profile') ? 'Ayub — Casual' : 'Ayub — Formal'} />}
    </section>
  )
}
