'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  X,
  ExternalLink,
  Github,
  Award,
  Briefcase,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  FileText,
  Mail,
  Linkedin,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react'
import {
  portfolioData,
  ProjectData,
  CertificationData,
} from '@/data/portfolioData'

export type ActiveModalData =
  | { type: 'profile' }
  | { type: 'project'; project: ProjectData }
  | { type: 'cert'; cert: CertificationData }
  | { type: 'contact' }
  | null

interface ContentModalProps {
  data: ActiveModalData
  onClose: () => void
}

export function ContentModal({ data, onClose }: ContentModalProps) {
  const [copied, setCopied] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    setImgIndex(0)
  }, [data])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!data) return null

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ayubsubagiya@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#1D1D1F]/55">
        {/* Backdrop click to dismiss */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#FFFDF5] border-[3px] border-[#1D1D1F] rounded-2xl shadow-[8px_8px_0_#1D1D1F] text-[#1D1D1F] overflow-hidden"
        >
          {/* Top Tactical Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b-2 border-[#1D1D1F]/10 bg-[#F5F1E6]">
            <div className="flex items-center gap-2.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0A84FF] animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-[#0A84FF] uppercase font-bold">
                {data.type === 'profile' && 'INTEL DOSSIER // OPERATIVE PROFILE'}
                {data.type === 'project' &&
                  (data.project.boss
                    ? 'CRITICAL INTEL // FLAGSHIP BOSS PROJECT'
                    : 'MISSION REPORT // PROJECT INTEL')}
                {data.type === 'cert' && 'CREDENTIAL REPORT // CERTIFICATION'}
                {data.type === 'contact' && 'COMMUNICATION BEACON // DISPATCH'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#FF3B30]/10 border-2 border-[#1D1D1F]/20 hover:border-[#FF3B30] text-[#6E6E73] hover:text-[#FF3B30] font-mono text-xs flex items-center gap-1.5 transition-colors"
              aria-label="Close dossier"
            >
              <span>[ESC] CLOSE</span>
              <X size={14} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
            {/* 1. PROFILE DOSSIER */}
            {data.type === 'profile' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-[3px] border-[#1D1D1F] shadow-[4px_4px_0_#1D1D1F] shrink-0 bg-[#EFE9D8]">
                    <Image
                      src={portfolioData.profile.photos[0].src}
                      alt={portfolioData.profile.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#0A84FF]/20 border border-[#0A84FF]/40 text-[#0A84FF] font-mono text-[11px]">
                      <Sparkles size={11} /> {portfolioData.profile.role}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-mono text-[#1D1D1F]">
                      {portfolioData.profile.name}
                    </h2>
                    <p className="text-xs font-mono text-[#6E6E73]">
                      Codename: <span className="text-[#0A84FF] font-semibold">{portfolioData.profile.handle}</span> • {portfolioData.profile.location}
                    </p>
                    <p className="text-sm text-[#3A3A3C] leading-relaxed pt-1">
                      {portfolioData.profile.bio}
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {portfolioData.profile.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white border border-[#1D1D1F]/15 rounded-xl p-3 text-center"
                    >
                      <div className="text-xl font-mono font-bold text-[#0A84FF]">
                        {stat.value}
                      </div>
                      <div className="text-[11px] font-mono text-[#6E6E73] mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Experiences Highlights */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-mono tracking-widest text-[#0A84FF] uppercase font-bold flex items-center gap-1.5">
                    <Briefcase size={13} /> Active & Past Stations
                  </h3>
                  <div className="space-y-2.5">
                    {portfolioData.experiences.map((exp) => (
                      <div
                        key={exp.company}
                        className="bg-white border border-[#1D1D1F]/15 rounded-xl p-3.5 flex items-start gap-3"
                      >
                        <div                         className="relative w-10 h-10 rounded-lg overflow-hidden bg-white shrink-0 p-1 border border-[#1D1D1F]/15">
                          <Image
                            src={exp.logo}
                            alt={exp.company}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h4 className="font-mono text-sm font-bold text-[#1D1D1F]">
                              {exp.role}
                            </h4>
                            <span className="text-[11px] font-mono text-[#0A84FF]">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-xs font-mono text-[#6E6E73] mt-0.5">
                            {exp.company}
                          </p>
                          <p className="text-xs text-[#3A3A3C] mt-1.5 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap gap-2.5 pt-2 border-t border-white/10">
                  <a
                    href="https://linkedin.com/in/ayub-subagiya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077B5] hover:bg-[#0077B5]/80 text-white font-mono text-xs font-semibold transition-all"
                  >
                    <Linkedin size={14} /> View LinkedIn
                  </a>
                  <a
                    href="https://github.com/sangbejoo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1F2937] hover:bg-[#374151] text-white font-mono text-xs font-semibold transition-all border border-white/10"
                  >
                    <Github size={14} /> GitHub Repository
                  </a>
                  <a
                    href="/images/projects/Sertifikat Studi Idependent .pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-mono text-xs font-bold transition-all"
                  >
                    <FileText size={14} /> Download CV / Resume
                  </a>
                </div>
              </div>
            )}

            {/* 2. PROJECT DOSSIER */}
            {data.type === 'project' && (
              <div className="space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {data.project.boss && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 font-mono text-xs font-bold animate-pulse">
                        <ShieldAlert size={12} /> BOSS TARGET CLEARED
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0A84FF]/20 border border-[#0A84FF]/30 text-[#0A84FF] font-mono text-xs">
                      {data.project.organization.name}
                    </span>
                    <span className="text-xs font-mono text-[#6E6E73]">
                      ID: {data.project.id}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold font-mono text-[#1D1D1F]">
                    {data.project.name}
                  </h2>
                  <p className="text-xs font-mono text-amber-600 mt-1">
                    {data.project.subtitle}
                  </p>
                </div>

                {/* Screenshot Carousel */}
                {data.project.images && data.project.images.length > 0 && (
                  <div className="space-y-2">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#EFE9D8] border-2 border-[#1D1D1F]/10">
                      <Image
                        src={data.project.images[imgIndex]}
                        alt={`${data.project.name} preview`}
                        fill
                        className="object-contain"
                      />
                      {data.project.images.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              setImgIndex(
                                (imgIndex - 1 + data.project.images.length) %
                                  data.project.images.length
                              )
                            }
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-colors"
                            aria-label="Previous screenshot"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={() =>
                              setImgIndex(
                                (imgIndex + 1) % data.project.images.length
                              )
                            }
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-colors"
                            aria-label="Next screenshot"
                          >
                            <ChevronRight size={16} />
                          </button>
                          <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-black/70 border border-white/10 text-[10px] font-mono text-gray-300">
                            {imgIndex + 1} / {data.project.images.length}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {data.project.images.length > 1 && (
                      <div className="flex gap-1.5 overflow-x-auto pb-1">
                        {data.project.images.map((src, idx) => (
                          <button
                            key={src}
                            onClick={() => setImgIndex(idx)}
                              className={`relative w-14 h-9 rounded-md overflow-hidden border-2 shrink-0 transition-all ${
                                imgIndex === idx
                                  ? 'border-[#0A84FF] shadow-sm scale-105'
                                  : 'border-[#1D1D1F]/20 opacity-60 hover:opacity-100'
                              }`}
                          >
                            <Image
                              src={src}
                              alt="thumb"
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                <div className="bg-white border border-[#1D1D1F]/15 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-mono text-[#0A84FF] tracking-widest uppercase">
                    Architecture & Implementation
                  </div>
                  <p className="text-sm text-[#3A3A3C] leading-relaxed">
                    {data.project.description}
                  </p>
                  <div className="text-xs font-mono text-green-700 pt-1">
                    ★ Key Highlight: {data.project.highlight}
                  </div>
                </div>

                {/* Test Credentials if provided */}
                {data.project.testCredentials && (
                  <div className="bg-[#1E1B4B]/60 border border-indigo-500/30 rounded-xl p-3.5 text-xs font-mono">
                    <span className="text-indigo-300 font-bold">
                      DEMO CREDENTIALS:
                    </span>{' '}
                    Email:{' '}
                    <code className="text-white">
                      {data.project.testCredentials.email}
                    </code>{' '}
                    • Password:{' '}
                    <code className="text-white">
                      {data.project.testCredentials.password}
                    </code>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#6E6E73] tracking-widest uppercase flex items-center gap-1.5">
                    <Layers size={13} /> Tech Arsenal Deployed
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {data.project.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md bg-white border border-[#1D1D1F]/20 text-[#1D1D1F] font-mono text-xs"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap gap-3 pt-2 border-t border-white/10">
                  {data.project.demoUrl && (
                    <a
                      href={data.project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-mono text-xs font-bold transition-all shadow-md"
                    >
                      {data.project.demoText || 'Live System Demo'}{' '}
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {(data.project.codeLink || data.project.repoUrl) && (
                    <a
                      href={data.project.codeLink || data.project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F2937] hover:bg-[#374151] border border-white/20 text-white font-mono text-xs font-semibold transition-all"
                    >
                      <Github size={14} /> Source Repository
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* 3. CERTIFICATION DOSSIER */}
            {data.type === 'cert' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                  <div className="relative w-36 h-28 sm:w-44 sm:h-32 rounded-xl overflow-hidden border-[3px] border-amber-500/60 shadow-[4px_4px_0_#1D1D1F] shrink-0 bg-[#EFE9D8]">
                    <Image
                      src={data.cert.badgeImage}
                      alt={data.cert.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1.5 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-600 font-mono text-xs">
                      <Award size={12} /> {data.cert.issuer}
                    </div>
                    <h2 className="text-2xl font-bold font-mono text-[#1D1D1F]">
                      {data.cert.name}
                    </h2>
                    <p className="text-xs font-mono text-[#6E6E73]">
                      Issued: <span className="text-[#1D1D1F]">{data.cert.date}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-[#1D1D1F]/15 rounded-xl p-4 space-y-3">
                  <div className="text-xs font-mono text-amber-600 uppercase tracking-widest">
                    Verification & Curriculum Overview
                  </div>
                  <p className="text-sm text-[#3A3A3C] leading-relaxed">
                    {data.cert.description ||
                      'Validated professional industry qualification verifying competencies and applied engineering excellence.'}
                  </p>
                  {data.cert.skills && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {data.cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[11px]"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Links */}
                <div className="flex gap-3 pt-2 border-t border-white/10">
                  {data.cert.verifyUrl ? (
                    <a
                      href={data.cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all"
                    >
                      Verify Credential <ExternalLink size={14} />
                    </a>
                  ) : (
                    <a
                      href={data.cert.badgeImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#F5F5F7] border-2 border-[#1D1D1F] text-[#1D1D1F] font-mono text-xs font-semibold transition-all"
                    >
                      View Full Certificate Image <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* 4. CONTACT / CTA DOSSIER */}
            {data.type === 'contact' && (
              <div className="space-y-6">
                <div className="text-center sm:text-left space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#30D158]/15 border border-[#30D158]/50 text-green-700 font-mono text-xs">
                    <CheckCircle2 size={12} /> SECURE CHANNEL OPEN
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-mono text-[#1D1D1F]">
                    Establish Direct Connection
                  </h2>
                  <p className="text-sm text-[#3A3A3C] max-w-xl">
                    Whether you are recruiting for backend microservices, looking for a cloud architect, or proposing a high-impact engineering collaboration — direct channels are open.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div className="bg-white border border-[#30D158]/50 rounded-xl p-4 space-y-2">
                    <div className="text-xs font-mono text-green-700 uppercase tracking-widest flex items-center gap-1.5">
                      <Mail size={13} /> Direct Email
                    </div>
                    <div className="text-sm font-mono text-[#1D1D1F] font-bold select-all">
                      ayubsubagiya@gmail.com
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#30D158]/15 hover:bg-[#30D158]/25 border border-[#30D158]/50 text-green-700 font-mono text-xs transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check size={12} /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={12} /> Copy Address
                          </>
                        )}
                      </button>
                      <a
                        href="mailto:ayubsubagiya@gmail.com"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold transition-colors"
                      >
                        Send Email <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="bg-white border border-[#1D1D1F]/15 rounded-xl p-4 space-y-2">
                    <div className="text-xs font-mono text-[#0A84FF] uppercase tracking-widest flex items-center gap-1.5">
                      <Linkedin size={13} /> LinkedIn Network
                    </div>
                    <div className="text-sm font-mono text-[#1D1D1F] font-bold truncate">
                      linkedin.com/in/ayub-subagiya
                    </div>
                    <div className="pt-1">
                      <a
                        href="https://linkedin.com/in/ayub-subagiya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0077B5] hover:bg-[#0077B5]/80 text-white font-mono text-xs font-semibold transition-colors"
                      >
                        Connect on LinkedIn <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#1D1D1F]/15 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-center sm:text-left">
                    <h4 className="font-mono text-sm font-bold text-[#1D1D1F]">
                      Curriculum Vitae / Resume
                    </h4>
                    <p className="text-xs font-mono text-[#6E6E73]">
                      Standard PDF format detailing professional timeline and technical skills.
                    </p>
                  </div>
                  <a
                    href="/images/projects/Sertifikat Studi Idependent .pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#F5F5F7] border-2 border-[#1D1D1F] text-[#1D1D1F] font-mono text-xs font-bold transition-all shrink-0"
                  >
                    <FileText size={14} /> Open Resume PDF
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Footer with Resume Shooting Button */}
          <div className="px-5 py-3 border-t-2 border-[#1D1D1F]/10 bg-[#F5F1E6] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#6E6E73] hidden sm:inline">
              Target intel cached • Resume shooting anytime
            </span>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-mono text-xs font-bold tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <span>RESUME SHOOTING</span>
              <span className="opacity-80">[ESC]</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
