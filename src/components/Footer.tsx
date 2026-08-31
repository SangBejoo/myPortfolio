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
    <footer id="contact" className="relative border-t border-bmw-titan/10 bg-bmw-carbon overflow-hidden">
      <div className="m-stripe" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-bmw-sapphire/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] blur-[60px] opacity-[0.04]" style={{ background: 'radial-gradient(ellipse, #0066B1 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect text-[11px] font-mono tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> FINAL CHAPTER • TRUE ENDING
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-bmw-alpine mb-3">Let&apos;s Build Something Great</h2>
          <p className="text-bmw-mineral max-w-xl mx-auto text-sm leading-relaxed">
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
              className="w-11 h-11 rounded-full bmw-card flex items-center justify-center hover:border-bmw-estoril/30 group transition-colors"
              aria-label={label}
            >
              <Icon size={18} className="text-bmw-titan group-hover:text-bmw-daytona transition-colors" />
            </a>
          ))}
        </motion.div>

        <div className="border-t border-bmw-titan/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-bmw-mineral text-xs font-mono">© {currentYear} Ayub Subagiya • BMW INDIVIDUAL • Alpine White 300 / Carbon Black</p>
          <p className="text-bmw-mineral/60 text-xs flex items-center gap-1.5">
            Crafted with <Heart size={12} className="text-bmw-mRed fill-bmw-mRed" /> using Next.js • Tailwind • Framer Motion • Visual Novel Magic
          </p>
        </div>

        {/* VN style bottom save */}
        <div className="mt-6 flex justify-center">
          <span className="px-3 py-1 rounded-full bg-bmw-alpine/[0.04] border border-bmw-titan/10 text-[10px] font-mono tracking-[0.18em] text-bmw-mineral">
            PRESS ANY KEY TO CONTINUE • THANK YOU FOR PLAYING ♡
          </span>
        </div>
      </div>
    </footer>
  )
}
