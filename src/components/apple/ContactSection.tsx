'use client'

import { useState } from 'react'
import { Mail, Copy, Check, Linkedin, Github, FileText, ArrowUpRight } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'

export function ContactSection() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ayubsubagiya@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-20">
      <div className="max-w-apple mx-auto px-4 sm:px-8">
        <div className="apple-card-elevated p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-apple-blue/10 border border-apple-blue/20 text-caption text-apple-blue font-medium">
            <span>Direct Inquiries</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-title1 font-bold text-apple-text tracking-tight">
              Let&apos;s build systems that scale.
            </h2>
            <p className="text-subhead text-apple-text-secondary max-w-lg mx-auto leading-relaxed">
              Available for backend engineering discussions, distributed microservices, GCP cloud architectures, or technical leadership.
            </p>
          </div>

          {/* Email Box */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
            <div className="flex items-center gap-2 px-3.5 h-10 rounded-lg bg-white border-2 border-[#1D1D1F]/15 font-mono text-body text-apple-text">
              <span>ayubsubagiya@gmail.com</span>
              <button
                onClick={handleCopyEmail}
                className="p-1 rounded text-apple-text-secondary hover:text-[#1D1D1F] transition-colors"
                title="Copy email address"
                aria-label="Copy email"
              >
                {copied ? <Check size={14} className="text-apple-green" /> : <Copy size={14} />}
              </button>
            </div>

            <a
              href="mailto:ayubsubagiya@gmail.com"
              className="apple-btn-primary w-full sm:w-auto"
            >
              <Mail size={15} />
              <span>Send Message</span>
            </a>
          </div>

          {/* Secondary Channels */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-apple-border text-caption text-apple-text-secondary font-medium">
            <a
              href="https://linkedin.com/in/ayub-subagiya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-apple-blue transition-colors"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
              <ArrowUpRight size={12} className="opacity-60" />
            </a>

            <span>•</span>

            <a
              href="https://github.com/sangbejoo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-apple-blue transition-colors"
            >
              <Github size={14} />
              <span>GitHub</span>
              <ArrowUpRight size={12} className="opacity-60" />
            </a>

            <span>•</span>

            <a
              href={portfolioData.profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-apple-blue transition-colors"
            >
              <FileText size={14} />
              <span>Resume PDF</span>
              <ArrowUpRight size={12} className="opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
