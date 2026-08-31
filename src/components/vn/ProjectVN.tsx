'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Github, Maximize2, X, Grid3x3, Building2, Sparkles, Filter } from 'lucide-react'
import { DialogueBox, useTypewriter } from './DialogueBox'
import { ImageZoom } from '../ImageZoom'

interface CGDialogue {
  speaker?: string
  text: string
  speakerColor?: string
}

interface ProjectOrg {
  name: string
  logo?: string
  category: 'erlangga' | 'bluebird' | 'bangkit' | 'independent'
  badge: string
}

interface VNProject {
  id: string
  title: string
  subtitle: string
  organization: ProjectOrg
  description: string
  vnLine: string
  imageUrl: string
  images?: string[]
  cgDialogues?: CGDialogue[]
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
    id: 'intelecto',
    title: 'Intelecto — LMS & Digital Book Platform',
    subtitle: 'SCENE 01 — Erlangga Unified Education Ecosystem',
    organization: {
      name: 'Penerbit Erlangga',
      logo: '/images/erlangga.jpg',
      category: 'erlangga',
      badge: 'ERLANGGA',
    },
    description: 'Comprehensive education platform developed at Penerbit Erlangga combining modern LMS classroom workflows, interactive digital book reader, homework grading, and multi-tenant school administration.',
    vnLine: 'Kami Melayani Ilmu Pengetahuan at digital scale. Intelecto connects schools, teachers, and students with high-concurrency microservices, digital book streaming, and live classroom analytics.',
    imageUrl: '/images/projects/intelecto/Screenshot 2026-08-31 222117.png',
    images: [
      '/images/projects/intelecto/Screenshot 2026-08-31 222117.png',
      '/images/projects/intelecto/Screenshot 2026-08-31 222131.png',
      '/images/projects/intelecto/Screenshot 2026-08-31 222149.png',
      '/images/projects/intelecto/Screenshot 2026-08-31 222237.png',
      '/images/projects/intelecto/Screenshot 2026-08-31 222248.png',
      '/images/projects/intelecto/Screenshot 2026-08-31 222254.png',
      '/images/projects/intelecto/Screenshot 2026-08-31 222259.png',
      '/images/projects/intelecto/Screenshot 2026-08-31 222330.png',
      '/images/projects/intelecto/Screenshot 2026-08-31 222335.png',
      '/images/projects/intelecto/Screenshot 2026-08-31 222344.png',
      '/images/projects/intelecto/Screenshot 2026-08-31 222354.png',
    ],
    cgDialogues: [
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Welcome to Intelecto by Penerbit Erlangga! A modern unified LMS & Digital Book ecosystem connecting hundreds of schools, teachers, and students across Indonesia.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "The interactive digital library portal. Students access rich curated curriculum textbooks, multimedia audiobooks, and interactive exercises on any device.",
      },
      {
        speaker: 'SYSTEM',
        speakerColor: 'LMS CORE',
        text: "[CLASSROOM ENGINE] Real-time learning management module initialized. Teachers schedule lesson plans, create virtual classrooms, and distribute learning assets.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Digital book reader interface with fast streaming rendering, bookmarking, and interactive annotations without heavy client memory footprints.",
      },
      {
        speaker: 'ARCHITECT',
        speakerColor: 'GCP & REDIS',
        text: "Optimized content caching via Redis and GCP CDN ensures instant page flipping and zero delay even during peak national school study hours.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Teacher's assignment and homework dispatch console. Supports deadline triggers, auto-reminders, and diverse submission formats.",
      },
      {
        speaker: 'SYSTEM',
        speakerColor: 'ANALYTICS',
        text: "[STUDENT PROGRESS TRACKED] Automated student competency metrics, reading time analytics, and assignment submission timelines aggregated for educators.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "School administration dashboard. Multi-tenant hierarchy allowing school principals and curriculum coordinators to manage classes and teacher access.",
      },
      {
        speaker: 'NARRATOR',
        speakerColor: 'EDUTECH',
        text: "Bridging traditional publishing with cutting-edge EdTech — delivering 'Kami Melayani Ilmu Pengetahuan' at digital scale for modern education.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Comprehensive quiz and assessment builder with automated grading and instant feedback loops directly tied to the Erlangga digital syllabus.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Intelecto platform running smoothly in production! Scalable backend microservices delivering high-reliability education technology every single day.",
      },
    ],
    skills: ['Golang', 'React', 'GCP', 'PostgreSQL', 'Redis', 'Digital Books', 'LMS'],
    highlight: 'Production EdTech • Multi-Tenant • Digital Reader • Concurrency',
    speaker: 'AYUB',
    demoLink: 'https://lms-intelecto.erlangga.co.id',
    demoText: 'Live Platform',
  },
  {
    id: 'cbt',
    title: 'CBT — Computer Based Test',
    subtitle: 'SCENE 02 — Fault-Tolerant Exam Engine',
    organization: {
      name: 'Penerbit Erlangga',
      logo: '/images/erlangga.jpg',
      category: 'erlangga',
      badge: 'ERLANGGA',
    },
    description: 'Fault-tolerant CBT exam engine with real-time auto-save, anti-cheat device lock, and high-concurrency submission handling at Penerbit Erlangga scale.',
    vnLine: 'The exam must never fail. Every answer is saved instantly via Redis, even when hundreds submit in the last second.',
    imageUrl: '/images/projects/cbt-main.png',
    images: ['/images/projects/cbt-main.png','/images/projects/cbt-1.png','/images/projects/cbt-2.png','/images/projects/cbt-3.png','/images/projects/cbt-4.png','/images/projects/cbt-5.png','/images/projects/cbt-6.png','/images/projects/cbt-7.png','/images/projects/cbt-8.png'],
    cgDialogues: [
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "The exam timer is ticking! This is the CBT Exam Engine — crafted in Golang for zero exam downtime, zero data loss, and rock-solid reliability.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Student authentication with active device locking. Prevents concurrent duplicate logins, ensuring the exam is taken strictly on the verified terminal.",
      },
      {
        speaker: 'SYSTEM',
        speakerColor: 'WEBSOCKET SYNC',
        text: "[SYNC TICK] Real-time server-side time synchronization prevents local clock tampering. Every answer option is auto-saved to Redis instantly.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Intuitive question navigator and answer sheet. Candidates can flag doubtful questions for review, skip sections, and see real-time progress counters.",
      },
      {
        speaker: 'ARCHITECT',
        speakerColor: 'HIGH CONCURRENCY',
        text: "When hundreds of students click 'Submit' at the very last second, connection pooling and bulk write batches protect the database from crashing.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Teacher's question bank authoring suite. Supports rich-text questions, mathematical equations, image attachments, and dynamic option shuffling.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Exam scheduling and classroom token generator. Instructors can configure strict time windows, randomized question orders, and passing grades.",
      },
      {
        speaker: 'SYSTEM',
        speakerColor: 'AUTO GRADER',
        text: "[GRADING COMPLETED] Instant score computation, statistical grade distribution curves, and difficulty item analysis generated in seconds.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "99.9% uptime and zero dropped submissions across high-stakes examination sessions. Scalable backend engineering at its best!",
      },
    ],
    skills: ['Golang', 'Next.js', 'MySQL', 'WebSockets'],
    highlight: '99.9% uptime • Real-time sync • Anti-Cheat',
    speaker: 'AYUB',
    codeLink: 'https://github.com/sangbejoo/cbt-system',
    demoLink: 'https://cbt.sangbejoo.site/',
    demoText: 'Try Live',
    testCredentials: { email: 'test@gmail.com', password: 'test@gmail.com' },
  },
  {
    id: 'parking',
    title: 'Parking Space Monitoring',
    subtitle: 'SCENE 03 — Real-Time Geospatial Fleet System',
    organization: {
      name: 'PT Blue Bird Group',
      logo: '/images/bluebird.png',
      category: 'bluebird',
      badge: 'BLUE BIRD',
    },
    description: 'Real-time parking tracking with Go + gRPC, PostgreSQL GIS and Tile38. Engineered during my tenure at PT Blue Bird Group.',
    vnLine: 'Every parking slot, mapped in real time. GIS + Tile38 + gRPC streaming — it knows where every taxi is before you do.',
    imageUrl: '/images/projects/parking-main.png',
    images: ['/images/projects/parking-main.png','/images/projects/parking-1.png','/images/projects/parking-2.png'],
    cgDialogues: [
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Real-time Geospatial Fleet & Parking System developed during my time at Blue Bird Group. Managing high-density vehicle movements across operational depots.",
      },
      {
        speaker: 'ARCHITECT',
        speakerColor: 'POSTGIS + TILE38',
        text: "High-frequency GPS coordinate streams processed via gRPC and Tile38 in-memory geofencing to detect vehicle lot occupancy in sub-50ms latency.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Live dispatcher dashboard showing geospatial slot heatmaps and instant perimeter alerts — giving fleet coordinators complete visibility 24/7.",
      },
    ],
    skills: ['Golang', 'gRPC', 'PostgreSQL GIS', 'Tile38', 'GCP', 'Docker'],
    highlight: 'Geospatial GIS • Real-time Tile38 • Fleet Scale',
    speaker: 'AYUB',
    codeLink: 'https://github.com/sangbejoo/parking-system',
  },
  {
    id: 'rusunawa',
    title: 'Rusunawa Management System',
    subtitle: 'SCENE 04 — Microservices Dormitory Platform',
    organization: {
      name: 'Independent / Open Source',
      category: 'independent',
      badge: 'INDEPENDENT',
    },
    description: 'Full microservices dormitory management with complex RBAC, Midtrans payments, and 100% black-box testing success.',
    vnLine: 'The dormitory never sleeps. Every check-in, every payment — I made the system handle it without blinking. Microservices, RBAC, Midtrans... all talking through gRPC.',
    imageUrl: '/images/projects/rusunawa-main.png',
    images: ['/images/projects/rusunawa-main.png','/images/projects/rusunawa-1.png','/images/projects/rusunawa-2.png','/images/projects/rusunawa-3.png','/images/projects/rusunawa-4.png','/images/projects/rusunawa-5.png','/images/projects/rusunawa-6.png','/images/projects/rusunawa-7.png','/images/projects/rusunawa-8.png','/images/projects/rusunawa-9.png','/images/projects/rusunawa-10.png','/images/projects/rusunawa-11.png','/images/projects/rusunawa-12.png','/images/projects/rusunawa-13.png','/images/projects/rusunawa-14.png'],
    cgDialogues: [
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Welcome to the Rusunawa Mission Command. A full microservices architecture orchestrating dormitory operations, tenant lifecycle, and billing without breaking a sweat.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Here's the main dashboard overview. Real-time metrics at a glance — total room occupancies, pending requests, and monthly revenue counters updated live.",
      },
      {
        speaker: 'SYSTEM',
        speakerColor: 'RBAC CORE',
        text: "[SECURITY INITIALIZED] Multi-tier Role-Based Access Control active. Granular middleware guards every route for Superadmin, Staff, and Tenant tiers.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Room allocation matrix. Real-time availability tracking prevents double-booking scenarios even during peak semester registration rushes.",
      },
      {
        speaker: 'ARCHITECT',
        speakerColor: 'GO gRPC',
        text: "Notice how snappy the data queries are? Optimized PostgreSQL indexing and gRPC binary serialization slashed API response times down to single digits.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Seamless Midtrans payment gateway integration. Automated Snap token generation, webhook verification, and idempotent transaction recording.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Automated billing and invoice generation. At the start of each billing cycle, a Go worker queue calculates utility fees and dispatches invoices asynchronously.",
      },
      {
        speaker: 'SYSTEM',
        speakerColor: 'PAYMENT GATEWAY',
        text: "[PAYMENT EVENT] Webhook callback validated via HMAC signature. Instant ledger reconciliation and digital receipt generated on the fly.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Maintenance ticketing dispatch. Tenants can report facility issues with photo attachments, tracking resolution status in real time.",
      },
      {
        speaker: 'NARRATOR',
        speakerColor: 'SYSTEM DESIGN',
        text: "Every interface state — loading spinners, error boundaries, empty states — was designed to keep complex enterprise flows crystal clear and intuitive.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Staff management and verification portal. Fast batch approvals for new occupant applications with document validation workflows.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Comprehensive financial audit reports and CSV/PDF export engine. Built with streaming response buffers to prevent memory spikes on large datasets.",
      },
      {
        speaker: 'ARCHITECT',
        speakerColor: 'DOCKER CONTAINER',
        text: "All microservices are containerized with Docker Alpine images and deployed with health checks and graceful shutdowns for high availability.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "100% black-box test coverage achieved! Boundary tests, unauthorized tokens, expired sessions, and race conditions all passed without flaw.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Rusunawa route complete! A rock-solid, production-grade microservices system built from the ground up. Ready for the next scene?",
      },
    ],
    skills: ['Go', 'gRPC', 'React', 'Docker', 'PostgreSQL', 'Midtrans'],
    highlight: '100% test coverage • RBAC • Payments',
    speaker: 'AYUB',
    codeLink: 'https://github.com/sangbejoo/rusunawa-api',
    demoLink: 'https://rusunawa.sangbejoo.site/tenant',
    demoText: 'Live Preview',
  },
  {
    id: 'chat-waifu',
    title: 'Chat Waifu',
    subtitle: 'SCENE 05 — Anime AI Companion',
    organization: {
      name: 'Personal / AI Project',
      category: 'independent',
      badge: 'PERSONAL',
    },
    description: 'LLM-powered character chatbot — my anime-inspired experiment with Gemini with SSE streaming and mood expression engine.',
    vnLine: 'Ehehe... this one is different. An AI that talks like a visual novel heroine. My love letter to anime interfaces.',
    imageUrl: '/images/projects/chatwaifu-main.png',
    images: ['/images/projects/chatwaifu-main.png','/images/projects/chatwaifu-1.png','/images/projects/chatwaifu-2.png','/images/projects/chatwaifu-3.png','/images/projects/chatwaifu-4.png'],
    cgDialogues: [
      {
        speaker: 'WAIFU',
        speakerColor: 'SAKURA PINK',
        text: "Senpai~! Welcome to my route! I'm your interactive AI companion powered by Google Gemini and custom prompt engineering!",
      },
      {
        speaker: 'WAIFU',
        speakerColor: 'SAKURA PINK',
        text: "Look at my expressions! Ayub coded state-based mood animations, so my emotions change dynamically based on the conversation context!",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Under the hood, it utilizes streaming SSE (Server-Sent Events) from Flask and Gemini API with smart conversational memory buffering.",
      },
      {
        speaker: 'WAIFU',
        speakerColor: 'SAKURA PINK',
        text: "You can customize my personality traits too! Am I a cheerful kouhai, a sharp tsundere, or your supportive pair programmer today?",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Blending generative LLMs with visual novel interactive storytelling — creating an engaging experience that feels truly alive!",
      },
    ],
    skills: ['Python', 'Flask', 'LLM APIs', 'Gemini'],
    highlight: 'Anime UI • LLM • Character AI',
    speaker: 'WAIFU',
    demoLink: 'https://chatwaifu.sangbejoo.site/',
  },
  {
    id: 'capstone',
    title: 'Capstone Project',
    subtitle: 'SCENE 06 — End-to-End Cloud System',
    organization: {
      name: 'Bangkit Academy',
      logo: '/images/bangkit.png',
      category: 'bangkit',
      badge: 'BANGKIT',
    },
    description: 'Comprehensive final cloud showcase — infrastructure as code, container orchestration, and full-stack architecture unified.',
    vnLine: 'The final chapter. Everything I learned at Bangkit Academy, compiled into one cloud system.',
    imageUrl: '/images/projects/capstone-main.png',
    images: ['/images/projects/capstone-main.png','/images/projects/capstone-1.png'],
    cgDialogues: [
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "The Capstone Project — the graduation arc of the Bangkit Cloud Computing Academy. An end-to-end microservices ecosystem on Google Cloud Platform.",
      },
      {
        speaker: 'AYUB',
        speakerColor: 'SANGBEJOO',
        text: "Automated with Terraform Infrastructure as Code, Cloud Run autoscaling, CI/CD GitHub Actions pipelines, and zero-downtime rolling deployments.",
      },
    ],
    skills: ['GCP', 'Terraform', 'Cloud Run', 'CI/CD', 'Full-Stack'],
    highlight: 'End-to-end • GCP Cloud Run • Terraform',
    speaker: 'AYUB',
  },
]

const filterTabs = [
  { id: 'all', label: 'ALL PROJECTS', icon: Sparkles },
  { id: 'erlangga', label: 'Penerbit Erlangga', logo: '/images/erlangga.jpg' },
  { id: 'bluebird', label: 'PT Blue Bird', logo: '/images/bluebird.png' },
  { id: 'bangkit', label: 'Bangkit Academy', logo: '/images/bangkit.png' },
  { id: 'independent', label: 'Personal & Other', icon: Building2 },
]

export function ProjectVN() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [index, setIndex] = useState(0)
  const [cgIndex, setCgIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [auto, setAuto] = useState(false)
  const [zoomSrc, setZoomSrc] = useState<string | null>(null)

  const filteredProjects = selectedFilter === 'all'
    ? vnProjects
    : vnProjects.filter((p) => p.organization.category === selectedFilter)

  // Ensure index is within filtered projects bounds
  const safeIndex = index >= filteredProjects.length ? 0 : index
  const project = filteredProjects[safeIndex] || vnProjects[0]
  const totalCG = project.images?.length || 1

  const currentDialogue = project.cgDialogues?.[cgIndex] || {
    speaker: project.speaker || 'AYUB',
    speakerColor: project.speaker === 'WAIFU' ? 'SAKURA PINK' : 'SANGBEJOO',
    text: project.vnLine,
  }

  const { displayed, done, skip } = useTypewriter(currentDialogue.text, 16, true)

  useEffect(() => { setCgIndex(0) }, [safeIndex, selectedFilter])

  useEffect(() => {
    if (!auto || !done) return
    const t = setTimeout(() => {
      if (cgIndex < totalCG - 1) setCgIndex((v) => v + 1)
      else if (safeIndex < filteredProjects.length - 1) setIndex((v) => v + 1)
      else setIndex(0)
    }, 3200)
    return () => clearTimeout(t)
  }, [auto, done, cgIndex, totalCG, safeIndex, filteredProjects.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        if (!done) skip()
        else if (cgIndex < totalCG - 1) setCgIndex((v) => v + 1)
        else setIndex((v) => (v + 1) % filteredProjects.length)
      }
      if (e.key === 'ArrowLeft') {
        if (cgIndex > 0) setCgIndex((v) => v - 1)
        else setIndex((v) => (v - 1 + filteredProjects.length) % filteredProjects.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [done, cgIndex, totalCG, filteredProjects.length, skip])

  const nextCG = () => setCgIndex((v) => (v + 1) % totalCG)
  const prevCG = () => setCgIndex((v) => (v - 1 + totalCG) % totalCG)
  const nextProject = () => setIndex((v) => (v + 1) % filteredProjects.length)
  const prevProject = () => setIndex((v) => (v - 1 + filteredProjects.length) % filteredProjects.length)

  return (
    <section id="projects" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto bg-white dark:bg-[#04070D]">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-[#009ADA] text-white text-[11px] font-mono tracking-widest">CHAPTER 03</span>
            <span className="text-[11px] font-mono tracking-[0.18em] text-[#6B7280]">CG GALLERY • VISUAL NOVEL MODE</span>
            <span className="hidden sm:inline-flex w-8 h-[1px] bg-black/10 dark:bg-white/10" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white tracking-tight">Featured Projects</h2>
          <p className="text-[#6B7280] mt-2 max-w-xl text-sm leading-relaxed">Click <span className="text-black dark:text-white font-mono font-semibold">NEXT</span> like a visual novel — each project is a CG with dialogue.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#6B7280]">{safeIndex + 1} / {filteredProjects.length} PROJECTS</span>
          <div className="w-24 h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
            <div className="h-full bg-[#009ADA] transition-all duration-500" style={{ width: `${((safeIndex + 1) / filteredProjects.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Organization Grouping & Filter Bar */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#6B7280] mr-1">
          <Filter size={13} />
          <span>ROUTE:</span>
        </div>
        {filterTabs.map((tab) => {
          const isActive = selectedFilter === tab.id
          const count = tab.id === 'all'
            ? vnProjects.length
            : vnProjects.filter((p) => p.organization.category === tab.id).length

          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedFilter(tab.id)
                setIndex(0)
                setCgIndex(0)
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap border ${
                isActive
                  ? 'bg-[#009ADA] text-white border-[#009ADA] shadow-sm shadow-[#009ADA]/20 font-semibold'
                  : 'bg-white dark:bg-white/5 border-black/10 dark:border-white/10 text-[#6B7280] hover:text-black dark:hover:text-white hover:border-[#009ADA]/30'
              }`}
            >
              {tab.logo ? (
                <div className="relative w-4 h-4 rounded-full overflow-hidden bg-white shrink-0 border border-black/10">
                  <Image src={tab.logo} alt="" fill className="object-contain" />
                </div>
              ) : tab.icon ? (
                <tab.icon size={13} className={isActive ? 'text-white' : 'text-[#009ADA]'} />
              ) : null}
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-[#6B7280]'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-[1.35fr_0.85fr] gap-5">
        <div className="relative group">
          <div className="relative rounded-2xl overflow-hidden bmw-card aspect-[16/10] bg-[#F0F7FF] dark:bg-[#0A1020]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${project.id}-${cgIndex}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 cursor-zoom-in group/cg"
                onClick={() => setZoomSrc(project.images?.[cgIndex] || project.imageUrl)}
              >
                <Image
                  src={project.images?.[cgIndex] || project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 750px"
                  className="object-cover group-hover/cg:scale-[1.01] transition-transform"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(180deg, rgba(0,154,218,0.15) 0%, transparent 40%)' }} />
                <div className="absolute inset-0 bg-[#009ADA]/0 group-hover/cg:bg-[#009ADA]/5 transition-colors flex items-center justify-center opacity-0 group-hover/cg:opacity-100">
                  <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-black text-xs font-mono shadow border border-black/5">🔍 Click to Zoom</span>
                </div>
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur border border-black/5 dark:border-white/10 text-[11px] font-mono tracking-widest text-black dark:text-white flex items-center gap-1.5 shadow-sm">
                    {project.organization.logo && (
                      <span className="relative w-4 h-4 rounded-full overflow-hidden inline-block shrink-0 border border-black/10 bg-white">
                        <Image src={project.organization.logo} alt="" fill className="object-contain p-0.5" />
                      </span>
                    )}
                    {project.subtitle}
                  </span>
                  <span className="hidden sm:inline-flex px-2 py-1 rounded-full bg-[#009ADA] text-white text-[11px] font-mono shadow-sm">
                    CG {cgIndex + 1}/{totalCG}
                  </span>
                </div>
                {cgIndex === 0 && done && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur text-black dark:text-white text-xs font-mono border border-black/5 shadow">Click dialogue →</span>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {totalCG > 1 && (
              <>
                <button onClick={prevCG} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-[#009ADA] hover:text-white hover:border-[#009ADA] flex items-center justify-center transition-colors shadow" aria-label="Previous image">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={nextCG} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-[#009ADA] hover:text-white hover:border-[#009ADA] flex items-center justify-center transition-colors shadow" aria-label="Next image">
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 bg-gradient-to-t from-black/60 to-transparent">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                <button onClick={() => setShowGallery(true)} className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/20 backdrop-blur border border-white/20 text-white hover:bg-[#009ADA] hover:border-[#009ADA] flex items-center justify-center transition-colors" title="Open gallery">
                  <Grid3x3 size={16} />
                </button>
                {(project.images || [project.imageUrl]).slice(0, 8).map((img, i) => (
                  <button key={i} onClick={() => setCgIndex(i)} className={`flex-shrink-0 w-14 h-9 rounded-lg overflow-hidden border-2 transition-all ${i === cgIndex ? 'border-[#009ADA] scale-105' : 'border-white/20 opacity-80 hover:opacity-100'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
                {totalCG > 8 && <span className="text-xs text-white/70 font-mono">+{totalCG - 8}</span>}
                <div className="ml-auto pl-2">
                  <button onClick={() => setShowGallery(true)} className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black text-xs font-mono font-semibold hover:bg-[#F0F7FF] transition-colors shadow">
                    <Maximize2 size={12} /> GALLERY
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 m-stripe rounded-full opacity-60" />
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {filteredProjects.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} className={`transition-all rounded-full ${i === safeIndex ? 'w-6 h-1.5 bg-[#009ADA]' : 'w-1.5 h-1.5 bg-black/15 dark:bg-white/20 hover:bg-black/30'}`} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div onClick={() => (!done ? skip() : cgIndex < totalCG - 1 ? nextCG() : nextProject())} className="cursor-pointer">
            <DialogueBox
              speaker={currentDialogue.speaker || project.speaker || 'AYUB'}
              speakerColor={currentDialogue.speakerColor || (project.speaker === 'WAIFU' ? 'SAKURA PINK' : 'SANGBEJOO')}
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

          <div className="bmw-card rounded-2xl p-5 sm:p-6 flex-1 bg-white dark:bg-[#0A1020]">
            {/* Organization Tag */}
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-black/5 dark:border-white/10">
              {project.organization.logo ? (
                <div className="relative w-5 h-5 rounded-md overflow-hidden bg-white border border-black/10 shadow-xs flex-shrink-0">
                  <Image src={project.organization.logo} alt={project.organization.name} fill className="object-contain p-0.5" />
                </div>
              ) : (
                <Building2 size={15} className="text-[#009ADA]" />
              )}
              <span className="text-xs font-mono font-bold text-black dark:text-white">
                {project.organization.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#009ADA]/10 border border-[#009ADA]/20 text-[#009ADA] font-semibold ml-auto">
                {project.organization.badge}
              </span>
            </div>

            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-xl font-bold text-black dark:text-white leading-tight">{project.title}</h3>
              <span className="px-2 py-1 rounded-full bg-[#009ADA]/10 border border-[#009ADA]/15 text-[#009ADA] text-[11px] font-mono whitespace-nowrap">
                PROJECT {String(safeIndex + 1).padStart(2, '0')}
              </span>
            </div>
            <p className="text-sm text-[#374151] dark:text-[#D1D5DB] leading-relaxed">{project.description}</p>
            <p className="text-xs font-mono text-[#009ADA] mt-3 italic">▸ {project.highlight}</p>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.skills.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-full bg-[#F0F7FF] dark:bg-white/10 border border-[#009ADA]/10 text-black dark:text-white text-xs font-mono">
                  {s}
                </span>
              ))}
            </div>

            {project.testCredentials && (
              <div className="mt-4 p-3 rounded-xl bg-[#009ADA]/5 border border-[#009ADA]/15 text-xs font-mono text-black dark:text-white">
                <div className="font-bold text-[#009ADA] mb-1">TEST CREDENTIALS</div>
                <div>Email: {project.testCredentials.email}</div>
                <div>Pass: {project.testCredentials.password}</div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-5">
              {project.codeLink && (
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white text-sm font-mono hover:border-[#009ADA]/30">
                  <Github size={14} /> Code
                </a>
              )}
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full btn-bmw-primary text-sm font-mono">
                  <ExternalLink size={14} /> {project.demoText || 'Demo'}
                </a>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-5 pt-5 border-t border-black/5 dark:border-white/10">
              <button onClick={prevProject} className="px-3 py-2.5 rounded-xl bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white text-sm font-mono flex items-center justify-center gap-1.5 hover:border-[#009ADA]/30">
                <ChevronLeft size={14} /> PREV PROJECT
              </button>
              <button onClick={nextProject} className="px-3 py-2.5 rounded-xl btn-bmw-primary text-sm font-mono flex items-center justify-center gap-1.5">
                NEXT PROJECT <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showGallery && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-white/95 dark:bg-black/90 backdrop-blur-md flex flex-col" onClick={() => setShowGallery(false)}>
            <div className="m-stripe" />
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-black/5 dark:border-white/10" onClick={(e) => e.stopPropagation()}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {project.organization.logo && (
                    <div className="relative w-4 h-4 rounded-full overflow-hidden bg-white border border-black/10">
                      <Image src={project.organization.logo} alt="" fill className="object-contain" />
                    </div>
                  )}
                  <span className="text-xs font-mono text-[#009ADA] font-semibold">{project.organization.name}</span>
                </div>
                <h3 className="text-black dark:text-white font-bold">{project.title} — CG Gallery</h3>
                <p className="text-xs font-mono text-[#6B7280] dark:text-white/60">{totalCG} images • Click to view • Click image to zoom 🔍</p>
              </div>
              <button onClick={() => setShowGallery(false)} className="w-9 h-9 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 sm:p-6" onClick={() => setShowGallery(false)}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-6xl mx-auto" onClick={(e) => e.stopPropagation()}>
                {(project.images || [project.imageUrl]).map((img, i) => (
                  <div
                    key={i}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-black/5 dark:border-white/10 hover:border-[#009ADA]/30 transition-colors bg-[#F0F7FF] dark:bg-white/5"
                  >
                    <button onClick={() => { setCgIndex(i); setShowGallery(false) }} className="absolute inset-0 w-full h-full">
                      <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-white/90 text-black text-[10px] font-mono border border-black/5">CG {i + 1}</span>
                    </button>
                    <button onClick={() => setZoomSrc(img)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur border border-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-[#009ADA] hover:text-white transition-all text-black">🔍</button>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs font-mono text-[#6B7280] mt-4">Click CG to view • Click 🔍 to zoom • Click outside to close</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {zoomSrc && <ImageZoom src={zoomSrc} alt={project.title} isOpen={!!zoomSrc} onClose={() => setZoomSrc(null)} title={`${project.title} — CG ${cgIndex + 1}`} />}
    </section>
  )
}
