'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const socialLinks = [
    { icon: Github, href: 'https://github.com/sangbejoo', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/ayub-subagiya', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:ayubsubagiya@gmail.com', label: 'Email' },
  ]

  return (
    <footer id="contact" className="relative border-t border-black/5 bg-white overflow-hidden">
      <div className="m-stripe" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#F0F7FF] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] blur-[60px] opacity-[0.06]" style={{ background: 'radial-gradient(ellipse, #009ADA 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/5 shadow-sm text-[11px] font-mono tracking-widest mb-4 text-[#6B7280]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> FINAL CHAPTER • TRUE ENDING
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-3">Let&apos;s Build Something Great</h2>
          <p className="text-[#6B7280] max-w-xl mx-auto text-sm leading-relaxed">
            Your story + my code — let&apos;s make the next route unforgettable. Reach out for collaborations, freelance, or just to talk tech & anime.
          </p>
          <a
            href="mailto:ayubsubagiya@gmail.com"
            className="mt-6 inline-flex items-center gap-2 px-7 py-3 btn-bmw-primary rounded-full font-mono text-sm font-semibold"
          >
            Get In Touch <ExternalLink size={14} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-10"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-white border border-black/10 flex items-center justify-center hover:border-[#009ADA]/30 hover:shadow-md group transition-all"
              aria-label={label}
            >
              <Icon size={18} className="text-[#6B7280] group-hover:text-[#009ADA] transition-colors" />
            </a>
          ))}
        </motion.div>

        <div className="border-t border-black/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-[#6B7280] text-xs font-mono">© {currentYear} Ayub Subagiya • BMW • Full White #FFFFFF • Blue Ball #009ADA</p>
          <p className="text-[#6B7280]/70 text-xs flex items-center gap-1.5">
            Crafted with <Heart size={12} className="text-[#E30613] fill-[#E30613]" /> Next.js • Tailwind • Visual Novel Magic
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <span className="px-3 py-1 rounded-full bg-[#F0F7FF] border border-black/5 text-[10px] font-mono tracking-[0.18em] text-[#6B7280]">
            PRESS ANY KEY TO CONTINUE • THANK YOU FOR PLAYING ♡
          </span>
        </div>
      </div>
    </footer>
  )
}
