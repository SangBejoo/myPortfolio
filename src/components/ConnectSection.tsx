'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Linkedin, Github, ExternalLink, MessageCircle } from 'lucide-react'

export function ConnectSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bmw-card p-6 sm:p-10"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-bmw-estoril/[0.06] via-transparent to-bmw-daytona/[0.06]" />
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[60px] opacity-[0.06]" style={{ background: 'radial-gradient(circle, #1A8DDD 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-2xl overflow-hidden bmw-card p-1.5">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image src="/images/author/ayub.jpg" alt="Ayub" fill className="object-cover object-top" style={{ objectPosition: '50% 20%' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-bmw-carbon/60 to-transparent" />
                <span className="absolute top-2 left-2 px-2 py-1 rounded-full bg-bmw-estoril text-white text-[10px] font-mono tracking-widest">READY TO CHAT</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bmw-estoril/10 border border-bmw-estoril/20 text-bmw-daytona text-[11px] font-mono tracking-widest mb-3">
                <MessageCircle size={12} /> DIALOGUE CHOICE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-bmw-alpine leading-tight">Let&apos;s Build Something Great Together</h2>
              <p className="text-bmw-titan text-sm leading-relaxed mt-3">
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

            <a href="mailto:ayubsubagiya@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-bmw-estoril to-bmw-daytona hover:from-[#0077CC] hover:to-bmw-estoril text-white font-mono font-bold rounded-full shadow-[0_8px_24px_rgba(0,102,177,0.3)] transition-all">
              Start a Conversation <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
