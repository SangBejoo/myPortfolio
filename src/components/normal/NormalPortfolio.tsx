'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Crosshair,
  Award,
  Briefcase,
  Layers,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  FileText,
  ShieldAlert,
  Sparkles,
  MapPin,
  Check,
  Copy,
  Target,
} from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'
import { ContentModal, ActiveModalData } from '../range/ContentModal'

interface NormalPortfolioProps {
  onReturnToRange: () => void
}

export function NormalPortfolio({ onReturnToRange }: NormalPortfolioProps) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [activeModal, setActiveModal] = useState<ActiveModalData>(null)
  const [copied, setCopied] = useState(false)

  const filteredProjects =
    selectedFilter === 'all'
      ? portfolioData.projects
      : portfolioData.projects.filter(
          (p) => p.organization.category === selectedFilter
        )

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ayubsubagiya@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#04070D] text-white selection:bg-[#009ADA]/30 font-sans">
      {/* Top Tactical Sticky Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-[#070B16]/90 backdrop-blur-md border-b border-[#009ADA]/20 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#009ADA] flex items-center justify-center font-mono font-bold text-white text-xs shadow-md">
            SB
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-white leading-none">
              {portfolioData.profile.name}{' '}
              <span className="text-gray-400 font-normal">
                ({portfolioData.profile.handle})
              </span>
            </div>
            <div className="text-[10px] font-mono text-[#00ADEF] mt-0.5">
              BACKEND & CLOUD SYSTEMS
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-300">
          <a href="#profile" className="hover:text-[#00ADEF] transition-colors">
            PROFILE
          </a>
          <a href="#experience" className="hover:text-[#00ADEF] transition-colors">
            EXPERIENCE
          </a>
          <a href="#projects" className="hover:text-[#00ADEF] transition-colors">
            PROJECTS
          </a>
          <a href="#certifications" className="hover:text-[#00ADEF] transition-colors">
            CERTS
          </a>
          <a href="#tech" className="hover:text-[#00ADEF] transition-colors">
            ARSENAL
          </a>
          <a href="#contact" className="hover:text-[#00ADEF] transition-colors">
            CONTACT
          </a>
        </div>

        {/* Big Interactive "Enter 3D Shooting Range" CTA */}
        <button
          onClick={onReturnToRange}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#009ADA] to-[#0077B6] hover:from-[#00ADEF] hover:to-[#009ADA] text-white font-mono text-xs font-bold tracking-wider shadow-[0_0_20px_rgba(0,154,218,0.5)] transition-all active:scale-95"
        >
          <Crosshair size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
          <span>3D SHOOTING RANGE</span>
        </button>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
        {/* 1. HERO PROFILE SECTION */}
        <section id="profile" className="pt-4 scroll-mt-24">
          <div className="bg-[#080D1A] border-2 border-[#009ADA]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#009ADA]/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Photo Switcher */}
              <div className="lg:col-span-4 flex flex-col items-center gap-3">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#009ADA] shadow-[0_0_30px_rgba(0,154,218,0.3)] bg-black">
                  <Image
                    src={portfolioData.profile.photos[activePhotoIdx].src}
                    alt={portfolioData.profile.photos[activePhotoIdx].label}
                    fill
                    className="object-cover object-top transition-all duration-300"
                    priority
                  />
                  <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-black/70 backdrop-blur border border-white/10 text-[10px] font-mono text-center text-gray-200">
                    {portfolioData.profile.photos[activePhotoIdx].label} •{' '}
                    {portfolioData.profile.photos[activePhotoIdx].desc}
                  </div>
                </div>

                <div className="flex gap-2">
                  {portfolioData.profile.photos.map((img, i) => (
                    <button
                      key={img.src}
                      onClick={() => setActivePhotoIdx(i)}
                      className={`px-3 py-1 rounded-lg border font-mono text-xs transition-all ${
                        activePhotoIdx === i
                          ? 'bg-[#009ADA] border-[#00ADEF] text-white shadow-sm'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {i === 0 ? 'Formal View' : 'Casual View'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bio & Details */}
              <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#009ADA]/20 border border-[#009ADA]/40 text-[#00ADEF] font-mono text-xs">
                  <Sparkles size={12} /> {portfolioData.profile.role}
                </div>

                <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white">
                  {portfolioData.profile.name}
                </h1>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-mono text-gray-400">
                  <span className="flex items-center gap-1 text-[#00ADEF]">
                    <Target size={13} /> {portfolioData.profile.handle}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {portfolioData.profile.location}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                  {portfolioData.profile.bio}
                </p>

                {/* Core Stats Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {portfolioData.profile.stats.map((st) => (
                    <div
                      key={st.label}
                      className="bg-[#0F172A] border border-white/10 rounded-xl p-3 text-center"
                    >
                      <div className="text-xl font-mono font-bold text-[#00ADEF]">
                        {st.value}
                      </div>
                      <div className="text-[11px] font-mono text-gray-400 mt-0.5">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
                  <a
                    href="mailto:ayubsubagiya@gmail.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#009ADA] hover:bg-[#00ADEF] text-white font-mono text-xs font-bold transition-all shadow-md"
                  >
                    <Mail size={14} /> Direct Message
                  </a>
                  <a
                    href="https://linkedin.com/in/ayub-subagiya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0077B5] hover:bg-[#0077B5]/80 text-white font-mono text-xs font-semibold transition-all"
                  >
                    <Linkedin size={14} /> LinkedIn
                  </a>
                  <a
                    href="https://github.com/sangbejoo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-semibold transition-all"
                  >
                    <Github size={14} /> GitHub
                  </a>
                  <a
                    href="/images/projects/Sertifikat Studi Idependent .pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 font-mono text-xs font-semibold transition-all"
                  >
                    <FileText size={14} /> Resume PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. EXPERIENCE SECTION */}
        <section id="experience" className="scroll-mt-24 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <div className="font-mono text-xs text-[#00ADEF] tracking-widest uppercase font-bold">
                TIMELINE // EXPERIENCE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                Professional Experience
              </h2>
            </div>
            <Briefcase size={22} className="text-[#00ADEF]" />
          </div>

          <div className="space-y-4">
            {portfolioData.experiences.map((exp) => (
              <div
                key={exp.company}
                className="bg-[#080D1A] border border-white/10 hover:border-[#009ADA]/40 rounded-2xl p-5 sm:p-6 transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl bg-white/10 p-1.5 shrink-0 border border-white/10 overflow-hidden">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h3 className="font-mono text-base sm:text-lg font-bold text-white">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-xs text-[#00ADEF]">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 whitespace-nowrap self-start sm:self-center">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-0.5 rounded-md bg-[#0F172A] border border-[#009ADA]/20 text-xs font-mono text-gray-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. PROJECTS SECTION */}
        <section id="projects" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-3">
            <div>
              <div className="font-mono text-xs text-[#00ADEF] tracking-widest uppercase font-bold">
                ENGINEERING SHOWCASE // {portfolioData.projects.length} PROJECTS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                Featured Projects
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'erlangga', label: 'Erlangga' },
                { id: 'bluebird', label: 'Blue Bird' },
                { id: 'bangkit', label: 'Bangkit' },
                { id: 'independent', label: 'Independent' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3 py-1 rounded-lg font-mono text-xs transition-all ${
                    selectedFilter === tab.id
                      ? 'bg-[#009ADA] text-white font-bold shadow-sm'
                      : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`bg-[#080D1A] rounded-2xl overflow-hidden border flex flex-col transition-all hover:shadow-2xl ${
                  project.boss
                    ? 'border-red-500/50 hover:border-red-400'
                    : 'border-white/10 hover:border-[#009ADA]/40'
                }`}
              >
                {/* Project Image Preview */}
                <div
                  className="relative aspect-video w-full bg-black cursor-pointer group"
                  onClick={() => setActiveModal({ type: 'project', project })}
                >
                  <Image
                    src={project.images[0]}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-transparent to-transparent opacity-80" />

                  {project.boss && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-red-600 text-white font-mono text-[10px] font-bold tracking-wider shadow-md flex items-center gap-1 animate-pulse">
                      <ShieldAlert size={11} /> FLAGSHIP BOSS TARGET
                    </span>
                  )}

                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur text-white font-mono text-[10px] border border-white/10">
                    {project.organization.badge}
                  </span>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <span className="px-3 py-1.5 rounded-xl bg-white/90 text-black font-mono text-xs font-bold shadow">
                      Inspect Intel Dossier ↗
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-mono text-lg font-bold text-white">
                      {project.name}
                    </h3>
                    <p className="text-xs font-mono text-amber-400 mt-0.5">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-gray-300 line-clamp-3 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap gap-1">
                      {project.stack.slice(0, 5).map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                        >
                          {s}
                        </span>
                      ))}
                      {project.stack.length > 5 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono text-gray-500">
                          +{project.stack.length - 5}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <button
                        onClick={() =>
                          setActiveModal({ type: 'project', project })
                        }
                        className="text-xs font-mono font-bold text-[#00ADEF] hover:underline"
                      >
                        Read Full Intel →
                      </button>

                      <div className="flex gap-2">
                        {(project.codeLink || project.repoUrl) && (
                          <a
                            href={project.codeLink || project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
                            title="GitHub Repository"
                          >
                            <Github size={14} />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-[#009ADA] hover:bg-[#00ADEF] text-white"
                            title="Live Demo"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CERTIFICATIONS SECTION */}
        <section id="certifications" className="scroll-mt-24 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <div className="font-mono text-xs text-amber-400 tracking-widest uppercase font-bold">
                CREDENTIALS // INDUSTRY ACCREDITATIONS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                Certifications
              </h2>
            </div>
            <Award size={22} className="text-amber-400" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolioData.certifications.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setActiveModal({ type: 'cert', cert })}
                className="bg-[#080D1A] border border-white/10 hover:border-amber-400/50 rounded-2xl p-4 flex flex-col justify-between cursor-pointer group transition-all"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/40 border border-white/10">
                    <Image
                      src={cert.badgeImage}
                      alt={cert.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {cert.name}
                    </h4>
                    <p className="text-xs font-mono text-gray-400 mt-0.5">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>{cert.date}</span>
                  <span className="text-amber-400 font-bold group-hover:underline">
                    View Credential ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. TECH ARSENAL SECTION */}
        <section id="tech" className="scroll-mt-24 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <div className="font-mono text-xs text-[#00ADEF] tracking-widest uppercase font-bold">
                TOOLING // PROFICIENCY
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                Technical Arsenal
              </h2>
            </div>
            <Layers size={22} className="text-[#00ADEF]" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {portfolioData.techStack.map((tech) => (
              <div
                key={tech.name}
                className="bg-[#080D1A] border border-white/10 hover:border-[#009ADA]/40 rounded-xl p-3.5 flex items-center gap-3 transition-colors"
              >
                <span className="text-2xl">{tech.icon}</span>
                <div className="min-w-0">
                  <div className="font-mono text-xs sm:text-sm font-bold text-white truncate">
                    {tech.name}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 truncate">
                    {tech.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CONTACT SECTION */}
        <section id="contact" className="scroll-mt-24">
          <div className="bg-[#080D1A] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-2 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs">
                SECURE CHANNEL
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">
                Let&apos;s Build Systems Together
              </h2>
              <p className="text-sm text-gray-300">
                Ready for high-throughput microservices, GCP cloud architectures, or distributed backend systems. Let&apos;s talk engineering.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 max-w-lg mx-auto">
              <div className="flex items-center gap-2 bg-[#0F172A] border border-white/15 rounded-xl px-3.5 py-2">
                <span className="font-mono text-xs text-white">
                  ayubsubagiya@gmail.com
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1 rounded hover:bg-white/10 text-emerald-400"
                  title="Copy email"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>

              <a
                href="mailto:ayubsubagiya@gmail.com"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold transition-all"
              >
                Send Email
              </a>
              <a
                href="https://linkedin.com/in/ayub-subagiya"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#0077B5] hover:bg-[#0077B5]/80 text-white font-mono text-xs font-semibold transition-all"
              >
                LinkedIn
              </a>
            </div>

            <div className="pt-4">
              <button
                onClick={onReturnToRange}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#009ADA] to-[#0077B6] hover:from-[#00ADEF] hover:to-[#009ADA] text-white font-mono text-xs font-bold tracking-wider shadow-[0_0_25px_rgba(0,154,218,0.5)] transition-all"
              >
                <Crosshair size={14} />
                <span>LAUNCH 3D SHOOTING RANGE</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#070B16] py-8 text-center text-xs font-mono text-gray-400 space-y-2">
        <p>© 2026 Ayub Subagiya (SangBejoo) • All rights reserved</p>
        <p className="text-[11px] text-gray-400">
          Crafted with Next.js 16 • Three.js • Web Audio API • TailwindCSS
        </p>
      </footer>

      {/* Active Content Modal */}
      <ContentModal
        data={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  )
}
