'use client'

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Crosshair } from 'lucide-react'
import { Navbar } from '@/components/apple/Navbar'
import { Hero } from '@/components/apple/Hero'
import { ExperienceSection } from '@/components/apple/ExperienceSection'
import { ProjectsSection } from '@/components/apple/ProjectsSection'
import { CertificationsSection } from '@/components/apple/CertificationsSection'
import { TechArsenalSection } from '@/components/apple/TechArsenalSection'
import { ContactSection } from '@/components/apple/ContactSection'
import { Footer } from '@/components/apple/Footer'
import { LandingBriefing } from '@/components/range/LandingBriefing'
import { audioSystem } from '@/utils/audioSystem'

// PRD §10: heavy 3D assets lazy-load only after the "Enter the Range" gesture.
const ShootingRangeScene = dynamic(
  () => import('@/components/range/ShootingRangeScene').then((m) => m.ShootingRangeScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-3 bg-black text-white">
        <Crosshair size={28} className="animate-spin text-[#0A84FF]" style={{ animationDuration: '3s' }} />
        <p className="font-mono text-xs tracking-widest text-gray-400">LOADING RANGE…</p>
      </div>
    ),
  }
)

type View = 'briefing' | 'range' | 'normal'

export default function Home() {
  const [view, setView] = useState<View>('briefing')
  const [isMuted, setIsMuted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // PRD §8: prefers-reduced-motion + mobile detection; ?view=normal deep link for recruiters.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('view') === 'normal') {
      setView('normal')
    }
    setIsMuted(audioSystem.getMuted())

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarseMq = window.matchMedia('(pointer: coarse)')
    const sync = () => {
      setReducedMotion(motionMq.matches)
      setIsMobile(coarseMq.matches || window.innerWidth < 768)
    }
    sync()
    motionMq.addEventListener('change', sync)
    coarseMq.addEventListener('change', sync)
    window.addEventListener('resize', sync)
    return () => {
      motionMq.removeEventListener('change', sync)
      coarseMq.removeEventListener('change', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])

  // PRD §7: AudioContext must be created/resumed on a user gesture.
  const handleEnterRange = useCallback(() => {
    audioSystem.init()
    setView('range')
  }, [])

  const handleSkipToNormal = useCallback(() => setView('normal'), [])
  const handleBackToBriefing = useCallback(() => setView('briefing'), [])

  const handleToggleMute = useCallback(() => {
    audioSystem.init()
    setIsMuted(audioSystem.toggleMute())
  }, [])

  if (view === 'briefing') {
    return (
      <main className="min-h-screen bg-black">
        <LandingBriefing
          onEnterRange={handleEnterRange}
          onSkipToNormal={handleSkipToNormal}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          reducedMotion={reducedMotion}
          isMobile={isMobile}
        />
        {/* Crawler/no-JS fallback pointer (PRD §10: content stays discoverable) */}
        <noscript>
          <div style={{ padding: 24, textAlign: 'center' }}>
            <a href="?view=normal">View the standard portfolio (no JavaScript required)</a>
          </div>
        </noscript>
      </main>
    )
  }

  if (view === 'range') {
    return (
      <main className="min-h-screen bg-black">
        <ShootingRangeScene
          onSwitchToNormalView={handleSkipToNormal}
          reducedMotion={reducedMotion}
          isMobile={isMobile}
        />
      </main>
    )
  }

  // Normal view: server-rendered plain portfolio (PRD M1 fallback + §8 accessibility).
  return (
    <div className="min-h-screen bg-[#F5F1E6] text-apple-text selection:bg-apple-blue/30 selection:text-[#1D1D1F] font-sans antialiased">
      {/* Apple HIG Top Navigation Bar (+ range re-entry CTA) */}
      <Navbar onEnterRange={handleBackToBriefing} />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <TechArsenalSection />
        <ContactSection />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Floating re-entry to the range */}
      <button
        onClick={handleBackToBriefing}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-mono text-xs font-bold tracking-wider shadow-lg transition-all active:scale-95"
        title="Play the interactive 3D shooting-range portfolio"
      >
        <Crosshair size={14} />
        <span>ENTER THE RANGE</span>
      </button>
    </div>
  )
}
