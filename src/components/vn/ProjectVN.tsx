'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Github, Maximize2, X, Grid3x3 } from 'lucide-react'
import { DialogueBox, useTypewriter } from './DialogueBox'

interface VNProject {
  id: string
  title: string
  subtitle: string
  description: string
  vnLine: string // dialogue line for VN box
  imageUrl: string
  images?: string[]
  skills: string[]
  highlight: string
  codeLink?: string
  demoLink?: string
  demoText?: string
  speaker?: string
  testCredentials?: { email: string; password: string }
}

const vnProjects: VNProject[] = [
  {
    id: 'rusunawa',
    title: 'Rusunawa Management System',
    subtitle: 'SCENE 01 — Microservices Dormitory Platform',
    description: 'Full microservices dormitory management with complex RBAC, Midtrans payments, and 100% black-box testing success. Production-grade tenancy flows at scale.',
    vnLine: 'The dormitory never sleeps. Every check-in, every payment — I made the system handle it without blinking. Microservices, RBAC, Midtrans... all talking through gRPC like a well-tuned straight-six.',
    imageUrl: '/images/projects/rusunawa-main.png',
    images: ['/images/projects/rusunawa-main.png','/images/projects/rusunawa-1.png','/images/projects/rusunawa-2.png','/images/projects/rusunawa-3.png','/images/projects/rusunawa-4.png','/images/projects/rusunawa-5.png','/images/projects/rusunawa-6.png','/images/projects/rusunawa-7.png','/images/projects/rusunawa-8.png','/images/projects/rusunawa-9.png','/images/projects/rusunawa-10.png','/images/projects/rusunawa-11.png','/images/projects/rusunawa-12.png','/images/projects/rusunawa-13.png','/images/projects/rusunawa-14.png'],
    skills: ['Go', 'gRPC', 'React', 'Docker', 'PostgreSQL', 'Midtrans'],
    highlight: '100% test coverage • RBAC • Payments',
    speaker: 'AYUB',
    codeLink: 'https://github.com/sangbejoo/rusunawa-api',
    demoLink: 'https://rusunawa.sangbejoo.site/tenant',
    demoText: 'Live Preview',
  },
  {
    id: 'cbt',
    title: 'CBT — Computer Based Test',
    subtitle: 'SCENE 02 — Fault-Tolerant Exam Engine',
    description: 'Online exam platform engineered for 99.9% uptime. Fault-tolerant schema, WebSockets for real-time sync, zero data loss under exam pressure.',
    vnLine: 'No second chances during an exam. I built this to never lose a single answer — even when hundreds hit submit at once. The schema is bulletproof, the sockets are live.',
    imageUrl: '/images/projects/cbt-main.png',
    images: ['/images/projects/cbt-main.png','/images/projects/cbt-1.png','/images/projects/cbt-2.png','/images/projects/cbt-3.png','/images/projects/cbt-4.png','/images/projects/cbt-5.png','/images/projects/cbt-6.png','/images/projects/cbt-7.png','/images/projects/cbt-8.png'],
    skills: ['Golang', 'Next.js', 'MySQL', 'WebSockets'],
    highlight: '99.9% uptime • Real-time sync',
    speaker: 'AYUB',
    codeLink: 'https://github.com/sangbejoo/cbt-system',
    demoLink: 'https://cbt.sangbejoo.site/',
    demoText: 'Try Live',
    testCredentials: { email: 'test@gmail.com', password: 'test@gmail.com' },
  },
  {
    id: 'parking',
    title: 'Parking Space Monitoring',
    subtitle: 'SCENE 03 — Real-Time Geospatial System',
    description: 'Real-time parking tracking with Go + gRPC, PostgreSQL GIS and Tile38. Built at Blue Bird Group for live driver & space telemetry.',
    vnLine: 'Every parking slot, mapped in real time. GIS + Tile38 + gRPC streaming — it knows where every car is before you do. This one ran inside Blue Bird operations.',
    imageUrl: '/images/projects/parking-main.png',
    images: ['/images/projects/parking-main.png','/images/projects/parking-1.png','/images/projects/parking-2.png'],
    skills: ['Golang', 'gRPC', 'PostgreSQL GIS', 'Tile38', 'GCP'],
    highlight: 'Geospatial • Real-time • GCP',
    speaker: 'AYUB',
    codeLink: 'https://github.com/sangbejoo/parking-system',
  },
  {
    id: 'chat-waifu',
    title: 'Chat Waifu',
    subtitle: 'SCENE 04 — Anime AI Companion',
    description: 'LLM-powered character chatbot with natural conversation flows — my anime-inspired experiment with Gemini and expressive dialogue.',
    vnLine: 'Ehehe... this one is different. An AI that talks like a visual novel heroine. Gemini-powered, fully expressive. My love letter to anime interfaces.',
    imageUrl: '/images/projects/chatwaifu-main.png',
    images: ['/images/projects/chatwaifu-main.png','/images/projects/chatwaifu-1.png','/images/projects/chatwaifu-2.png','/images/projects/chatwaifu-3.png','/images/projects/chatwaifu-4.png'],
    skills: ['Python', 'Flask', 'LLM APIs', 'Gemini'],
    highlight: 'Anime UI • LLM • Character AI',
    speaker: 'WAIFU',
    demoLink: 'https://chatwaifu.sangbejoo.site/',
  },
  {
    id: 'capstone',
    title: 'Capstone Project',
    subtitle: 'SCENE 05 — End-to-End System',
    description: 'Comprehensive final showcase — architecture, full-stack, and project management unified into one cohesive system.',
    vnLine: 'The final chapter. Everything I learned, compiled into one system. From design to deploy, start to finish — a complete arc.',
    imageUrl: '/images/projects/capstone-main.png',
    images: ['/images/projects/capstone-main.png','/images/projects/capstone-1.png'],
    skills: ['Full-Stack', 'System Design', 'PM'],
    highlight: 'End-to-end • System Design',
    speaker: 'AYUB',
  },
]

export function ProjectVN() {
  const [index, setIndex] = useState(0)
  const [cgIndex, setCgIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [auto, setAuto] = useState(false)

  const project = vnProjects[index]
  const totalCG = project.images?.length || 1

  // typewriter for VN line
  const { displayed, done, skip } = useTypewriter(project.vnLine, 16, true)

  // reset CG when project changes
  useEffect(() => {
    setCgIndex(0)
  }, [index])

  // autoplay like VN auto mode
  useEffect(() => {
    if (!auto || !done) return
    const t = setTimeout(() => {
      if (cgIndex < totalCG - 1) setCgIndex((v) => v + 1)
      else if (index < vnProjects.length - 1) setIndex((v) => v + 1)
      else setIndex(0)
    }, 3200)
    return () => clearTimeout(t)
  }, [auto, done, cgIndex, totalCG, index])

  // keyboard like VN
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        if (!done) skip()
        else if (cgIndex < totalCG - 1) setCgIndex((v) => v + 1)
        else setIndex((v) => (v + 1) % vnProjects.length)
      }
      if (e.key === 'ArrowLeft') {
        if (cgIndex > 0) setCgIndex((v) => v - 1)
        else setIndex((v) => (v - 1 + vnProjects.length) % vnProjects.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [done, cgIndex, totalCG, skip])

  const nextCG = () => setCgIndex((v) => (v + 1) % totalCG)
  const prevCG = () => setCgIndex((v) => (v - 1 + totalCG) % totalCG)
  const nextProject = () => setIndex((v) => (v + 1) % vnProjects.length)
  const prevProject = () => setIndex((v) => (v - 1 + vnProjects.length) % vnProjects.length)

  return (
    <section id="projects" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto">
      {/* Header - VN Chapter Title */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-bmw-estoril text-white text-[11px] font-mono tracking-widest">CHAPTER 03</span>
            <span className="text-[11px] font-mono tracking-[0.18em] text-bmw-titan">CG GALLERY • VISUAL NOVEL MODE</span>
            <span className="hidden sm:inline-flex w-8 h-[1px] bg-bmw-titan/20" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-bmw-alpine tracking-tight">Featured Projects</h2>
          <p className="text-bmw-mineral mt-2 max-w-xl text-sm leading-relaxed">Click <span className="text-bmw-alpine font-mono">NEXT</span> like a visual novel — each scene is a CG with dialogue. Use ← → or click the dialogue to advance.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-bmw-mineral">{index + 1} / {vnProjects.length} SCENES</span>
          <div className="w-24 h-1.5 rounded-full bg-bmw-titan/10 overflow-hidden">
            <div className="h-full bg-bmw-estoril transition-all duration-500" style={{ width: `${((index + 1) / vnProjects.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Main VN Stage */}
      <div className="grid lg:grid-cols-[1.35fr_0.85fr] gap-5">
        {/* CG Stage - left */}
        <div className="relative group">
          <div className="relative rounded-2xl overflow-hidden bmw-card aspect-[16/10] bg-black">
            {/* Main CG */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${project.id}-${cgIndex}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={project.images?.[cgIndex] || project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Cinematic vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ background: 'linear-gradient(180deg, rgba(0,102,177,0.25) 0%, transparent 40%)' }} />
                {/* Top scene label */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-[11px] font-mono tracking-widest text-bmw-alpine">
                    {project.subtitle}
                  </span>
                  <span className="hidden sm:inline-flex px-2 py-1 rounded-full bg-bmw-estoril text-white text-[11px] font-mono">
                    CG {cgIndex + 1}/{totalCG}
                  </span>
                </div>
                {/* Center play hint if first view */}
                {cgIndex === 0 && done && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur text-white/80 text-xs font-mono border border-white/10">Click dialogue to continue →</span>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* CG Nav */}
            {totalCG > 1 && (
              <>
                <button onClick={prevCG} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/45 backdrop-blur border border-white/10 text-white hover:bg-bmw-estoril hover:border-bmw-estoril flex items-center justify-center transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={nextCG} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/45 backdrop-blur border border-white/10 text-white hover:bg-bmw-estoril hover:border-bmw-estoril flex items-center justify-center transition-colors">
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* Bottom film strip */}
            <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setShowGallery(true)}
                  className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/10 backdrop-blur border border-white/15 text-white hover:bg-bmw-estoril hover:border-bmw-estoril flex items-center justify-center transition-colors"
                  title="Open gallery"
                >
                  <Grid3x3 size={16} />
                </button>
                {(project.images || [project.imageUrl]).slice(0, 8).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCgIndex(i)}
                    className={`flex-shrink-0 w-14 h-9 rounded-lg overflow-hidden border-2 transition-all ${i === cgIndex ? 'border-bmw-daytona scale-105' : 'border-white/10 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
                {totalCG > 8 && <span className="text-xs text-white/60 font-mono">+{totalCG - 8}</span>}
                <div className="ml-auto flex items-center gap-1.5 pl-2">
                  <button onClick={() => setShowGallery(true)} className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bmw-alpine text-bmw-carbon text-xs font-mono font-semibold hover:bg-white transition-colors">
                    <Maximize2 size={12} /> GALLERY
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* M stripe under CG */}
          <div className="mt-2 m-stripe rounded-full opacity-60" />

          {/* Scene selector dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {vnProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`transition-all rounded-full ${i === index ? 'w-6 h-1.5 bg-bmw-estoril' : 'w-1.5 h-1.5 bg-bmw-titan/30 hover:bg-bmw-titan/60'}`}
              />
            ))}
          </div>
        </div>

        {/* Right - Dialogue + Details */}
        <div className="flex flex-col gap-4">
          {/* VN Dialogue */}
          <div onClick={() => (!done ? skip() : cgIndex < totalCG - 1 ? nextCG() : nextProject())} className="cursor-pointer">
            <DialogueBox
              speaker={project.speaker || 'AYUB'}
              speakerColor={project.speaker === 'WAIFU' ? 'SAKURA PINK' : 'ESTORIL BLUE'}
              text={displayed}
              isTypingComplete={done}
              onSkipTypewriter={skip}
              onNext={() => (cgIndex < totalCG - 1 ? nextCG() : nextProject())}
              onPrev={() => (cgIndex > 0 ? prevCG() : prevProject())}
              hasNext
              hasPrev
              autoPlay={auto}
              onToggleAuto={() => setAuto((v) => !v)}
            />
          </div>

          {/* Project details card */}
          <div className="bmw-card rounded-2xl p-5 sm:p-6 flex-1">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-xl font-bold text-bmw-alpine leading-tight">{project.title}</h3>
              <span className="px-2 py-1 rounded-full bg-bmw-estoril/15 border border-bmw-estoril/30 text-bmw-daytona text-[11px] font-mono whitespace-nowrap">
                SCENE {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <p className="text-sm text-bmw-titan leading-relaxed">{project.description}</p>
            <p className="text-xs font-mono text-bmw-daytona mt-3 italic">▸ {project.highlight}</p>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.skills.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-full bg-bmw-alpine/[0.06] border border-bmw-titan/15 text-bmw-alpine text-xs font-mono">
                  {s}
                </span>
              ))}
            </div>

            {project.testCredentials && (
              <div className="mt-4 p-3 rounded-xl bg-bmw-estoril/10 border border-bmw-estoril/20 text-xs font-mono text-bmw-alpine">
                <div className="font-bold text-bmw-daytona mb-1">TEST CREDENTIALS</div>
                <div>Email: {project.testCredentials.email}</div>
                <div>Pass: {project.testCredentials.password}</div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-5">
              {project.codeLink && (
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full btn-bmw-ghost text-sm font-mono">
                  <Github size={14} /> Code
                </a>
              )}
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full btn-bmw-primary text-sm font-mono">
                  <ExternalLink size={14} /> {project.demoText || 'Demo'}
                </a>
              )}
            </div>

            {/* VN Choices - Next project */}
            <div className="grid grid-cols-2 gap-2 mt-5 pt-5 border-t border-bmw-titan/10">
              <button
                onClick={prevProject}
                className="px-3 py-2.5 rounded-xl btn-bmw-ghost text-sm font-mono flex items-center justify-center gap-1.5"
              >
                <ChevronLeft size={14} /> PREV SCENE
              </button>
              <button
                onClick={nextProject}
                className="px-3 py-2.5 rounded-xl btn-bmw-primary text-sm font-mono flex items-center justify-center gap-1.5"
              >
                NEXT SCENE <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full gallery modal - BMW styled */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bmw-carbon/95 backdrop-blur-md flex flex-col"
            onClick={() => setShowGallery(false)}
          >
            <div className="m-stripe" />
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-bmw-titan/10" onClick={(e) => e.stopPropagation()}>
              <div>
                <h3 className="text-white font-bold">{project.title} — CG Gallery</h3>
                <p className="text-xs font-mono text-bmw-titan">{totalCG} images • Click to view</p>
              </div>
              <button onClick={() => setShowGallery(false)} className="w-9 h-9 rounded-full btn-bmw-ghost flex items-center justify-center">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
                {(project.images || [project.imageUrl]).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCgIndex(i)
                      setShowGallery(false)
                    }}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-bmw-titan/15 hover:border-bmw-estoril/50 transition-colors"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">CG {i + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
