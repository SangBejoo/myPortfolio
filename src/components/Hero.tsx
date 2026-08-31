'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, Sparkles, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { DialogueBox, useTypewriter } from './vn/DialogueBox'
import { CharacterStage, VNBackdrop } from './vn/CharacterStage'

const vnScenes = [
  {
    speaker: 'AYUB',
    line: "Yo... welcome to my route. I'm Ayub Subagiya (SangBejoo) — Backend Developer who builds systems: precise, powerful, and built to last.",
  },
  {
    speaker: 'AYUB',
    line: "I craft scalable microservices in Go, orchestrate cloud on GCP, and make distributed systems feel... effortless. Like a midnight drive on an empty highway.",
  },
  {
    speaker: 'SYSTEM',
    line: "★ NEW CHAPTER UNLOCKED: Explore projects like a Visual Novel — press NEXT, watch the CGs, read the dialogue. Your choices matter.",
  },
]

const roles = ['Backend Developer', 'Cloud Infrastructure Engineer', 'Microservices Architect', 'Go Developer']

function MiniTyping({ phrases }: { phrases: string[] }) {
  const [idx, setIdx] = useState(0)
  const [txt, setTxt] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const full = phrases[idx]
    const t = setTimeout(() => {
      if (!deleting) {
        if (txt.length < full.length) setTxt(full.slice(0, txt.length + 1))
        else setTimeout(() => setDeleting(true), 1800)
      } else {
        if (txt.length > 0) setTxt(full.slice(0, txt.length - 1))
        else {
          setDeleting(false)
          setIdx((v) => (v + 1) % phrases.length)
        }
      }
    }, deleting ? 30 : 70)
    return () => clearTimeout(t)
  }, [txt, deleting, idx, phrases])
  return <span>{txt}<span className="animate-pulse text-[#009ADA]">▌</span></span>
}

export function Hero() {
  const [sceneIdx, setSceneIdx] = useState(0)
  const [auto, setAuto] = useState(false)
  const scene = vnScenes[sceneIdx]
  const { displayed, done, skip } = useTypewriter(scene.line, 18, true)

  useEffect(() => {
    if (!auto || !done) return
    const t = setTimeout(() => setSceneIdx((v) => (v + 1) % vnScenes.length), 2800)
    return () => clearTimeout(t)
  }, [auto, done, sceneIdx])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (!done) skip()
        else setSceneIdx((v) => (v + 1) % vnScenes.length)
      }
      if (e.key === 'ArrowLeft' && done) setSceneIdx((v) => (v - 1 + vnScenes.length) % vnScenes.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [done, skip])

  useEffect(() => {}, [sceneIdx])

  return (
    <section id="hero" className="relative min-h-[96vh] flex flex-col overflow-hidden bg-white dark:bg-[#04070D]">
      <VNBackdrop />
      <div className="h-[3px] m-stripe shrink-0" />

      <div className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch lg:items-center">
        <div className="flex-1 flex flex-col min-h-[420px] lg:min-h-[560px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#009ADA]/15 shadow-sm text-[11px] font-mono tracking-widest mb-4"
          >
            <Sparkles size={12} className="text-[#009ADA]" />
            <span className="text-[#6B7280]">CHAPTER</span>
            <span className="text-black font-bold">00 — PROLOGUE</span>
            <span className="w-1 h-1 rounded-full bg-[#6B7280]" />
            <span className="text-[#6B7280] hidden sm:inline">BACKEND & CLOUD SYSTEMS</span>
          </motion.div>

          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[40px] sm:text-[54px] lg:text-[62px] font-bold leading-[0.9] tracking-tight"
            >
              <span className="text-black">Ayub</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009ADA] via-[#00B4E6] to-black">Subagiya</span>
            </motion.h1>

            <div className="h-[1px] w-24 bg-gradient-to-r from-[#009ADA] to-transparent" />

            <div className="h-10 sm:h-12 flex items-center">
              <h2 className="text-[18px] sm:text-[22px] lg:text-[26px] font-mono font-medium text-[#6B7280]">
                <MiniTyping phrases={roles} />
              </h2>
            </div>

            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#6B7280] max-w-[560px]">
              Building scalable microservices & robust cloud architectures — <span className="text-black font-medium">Go • GCP • Microservices</span> with high performance & clean code.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/10 shadow-sm text-xs text-black">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <MapPin size={12} className="text-[#6B7280]" />
                Bekasi, Indonesia — Available for new routes
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#009ADA]/10 border border-[#009ADA]/15 text-[#009ADA] text-[11px] font-mono tracking-widest">
                ● STAFF WEB PROGRAMMER • ERLANGGA
              </span>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="#projects">
                <button className="group px-6 sm:px-7 py-3 btn-bmw-primary rounded-full font-mono text-sm font-semibold flex items-center gap-2">
                  START STORY — View Projects
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a
                href="https://drive.google.com/uc?export=download&id=1iAbqnpnaV7YnCzQo6ahikiVp_oHmTBTB"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-7 py-3 btn-bmw-ghost rounded-full font-mono text-sm font-semibold flex items-center gap-2"
              >
                <Download size={16} /> Download CV
              </a>
            </div>

            <div className="flex gap-4 pt-2 text-xs font-mono">
              <a href="https://github.com/sangbejoo" target="_blank" rel="noopener noreferrer" className="text-[#6B7280] hover:text-[#009ADA] transition-colors">GitHub →</a>
              <a href="https://linkedin.com/in/ayub-subagiya" target="_blank" rel="noopener noreferrer" className="text-[#6B7280] hover:text-[#009ADA] transition-colors">LinkedIn →</a>
              <a href="mailto:ayubsubagiya@gmail.com" className="text-[#6B7280] hover:text-[#009ADA] transition-colors">Email →</a>
            </div>
          </div>

          <div className="mt-auto pt-6 hidden lg:block">
            <div onClick={() => (!done ? skip() : setSceneIdx((v) => (v + 1) % vnScenes.length))} className="cursor-pointer">
              <DialogueBox
                speaker={scene.speaker}
                speakerColor={scene.speaker === 'SYSTEM' ? 'SYSTEM' : 'SANGBEJOO'}
                text={displayed}
                isTypingComplete={done}
                onSkipTypewriter={skip}
                onNext={() => setSceneIdx((v) => (v + 1) % vnScenes.length)}
                onPrev={() => setSceneIdx((v) => (v - 1 + vnScenes.length) % vnScenes.length)}
                hasNext
                hasPrev={sceneIdx > 0}
                autoPlay={auto}
                onToggleAuto={() => setAuto((v) => !v)}
              />
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {vnScenes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSceneIdx(i)}
                  className={`h-1 rounded-full transition-all ${i === sceneIdx ? 'w-6 bg-[#009ADA]' : 'w-1.5 bg-black/15'}`}
                />
              ))}
              <span className="ml-2 text-[10px] font-mono tracking-widest text-[#6B7280]">DIALOGUE {sceneIdx + 1}/{vnScenes.length} • CLICK OR PRESS →</span>
            </div>
          </div>
        </div>

        <div className="lg:w-[460px] shrink-0 flex flex-col items-center">
          <CharacterStage active variant="hero" />
          <div className="w-full mt-6 lg:hidden">
            <div onClick={() => (!done ? skip() : setSceneIdx((v) => (v + 1) % vnScenes.length))} className="cursor-pointer">
              <DialogueBox
                speaker={scene.speaker}
                text={displayed}
                isTypingComplete={done}
                onSkipTypewriter={skip}
                onNext={() => setSceneIdx((v) => (v + 1) % vnScenes.length)}
                onPrev={() => setSceneIdx((v) => (v - 1 + vnScenes.length) % vnScenes.length)}
                hasNext
                hasPrev={sceneIdx > 0}
                autoPlay={auto}
                onToggleAuto={() => setAuto((v) => !v)}
              />
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {vnScenes.map((_, i) => (
                <button key={i} onClick={() => setSceneIdx(i)} className={`h-1 rounded-full transition-all ${i === sceneIdx ? 'w-6 bg-[#009ADA]' : 'w-1.5 bg-black/15'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] text-[#6B7280]">SCROLL FOR NEXT CHAPTER</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-black/15 to-transparent" />
      </motion.div>
    </section>
  )
}
