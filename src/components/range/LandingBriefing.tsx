'use client'

import { motion } from 'framer-motion'
import {
  Crosshair,
  Volume2,
  VolumeX,
  Eye,
  Play,
  Shield,
  Keyboard,
  MousePointer,
} from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'

interface LandingBriefingProps {
  onEnterRange: () => void
  onSkipToNormal: () => void
  isMuted: boolean
  onToggleMute: () => void
  reducedMotion?: boolean
  isMobile?: boolean
}

export function LandingBriefing({
  onEnterRange,
  onSkipToNormal,
  isMuted,
  onToggleMute,
  reducedMotion = false,
  isMobile = false,
}: LandingBriefingProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-[#F5F1E6] text-[#1D1D1F] overflow-hidden">
      {/* Background Cybernetic Grid & Depth Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(10,132,255,0.15) 0%, transparent 60%),
              linear-gradient(to right, rgba(29,29,31,0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(29,29,31,0.07) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 40px 40px, 40px 40px',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0A84FF] via-[#0A84FF] to-[#0058C7]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#0A84FF]/10 blur-[120px] rounded-full" />
      </div>

      {/* Main Tactical Card */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl w-full bg-[#FFFDF5] border-[3px] border-[#1D1D1F] rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0_#1D1D1F] flex flex-col items-center text-center space-y-6"
      >
        {/* Operative Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A84FF]/15 border border-[#0A84FF]/30 text-[#0A84FF] font-mono text-xs tracking-widest uppercase">
          <Crosshair size={13} className="animate-spin" style={{ animationDuration: '8s' }} />
          <span>DOODLE SHOOTING RANGE // V2.0</span>
        </div>

        {/* Title & Role */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-[#1D1D1F] leading-none">
            {portfolioData.profile.name.toUpperCase()}
          </h1>
          <p className="text-sm sm:text-base font-mono text-[#0A84FF] font-semibold">
            {portfolioData.profile.role}
          </p>
          <p className="text-xs sm:text-sm text-[#6E6E73] max-w-lg mx-auto pt-1 leading-relaxed">
            Welcome to the doodle portfolio range. Hand-drawn targets pop up <strong>one by one</strong> in a paper arena — pop them all with your doodle blaster to unlock project intel, certifications, and contacts.
          </p>
        </div>

        {/* Brief Instructions Matrix (PRD §5: aim = mouse, shoot = click) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full pt-2">
          <div className="bg-white border border-[#1D1D1F]/15 rounded-2xl p-3 flex flex-col items-center text-center space-y-1 shadow-[3px_3px_0_rgba(29,29,31,0.12)]">
            <div className="w-8 h-8 rounded-lg bg-[#0A84FF]/20 flex items-center justify-center text-[#0A84FF]">
              <MousePointer size={16} />
            </div>
            <span className="font-mono text-xs font-bold text-[#1D1D1F]">MOUSE AIM</span>
            <span className="text-[10px] font-mono text-[#6E6E73]">Aim reticle & Left Click to shoot</span>
          </div>

          <div className="bg-white border border-[#1D1D1F]/15 rounded-2xl p-3 flex flex-col items-center text-center space-y-1 shadow-[3px_3px_0_rgba(29,29,31,0.12)]">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Shield size={16} />
            </div>
            <span className="font-mono text-xs font-bold text-[#1D1D1F]">BOSS TARGET</span>
            <span className="text-[10px] font-mono text-[#6E6E73]">Intelecto LMS requires 3 direct hits</span>
          </div>

          <div className="bg-white border border-[#1D1D1F]/15 rounded-2xl p-3 flex flex-col items-center text-center space-y-1 shadow-[3px_3px_0_rgba(29,29,31,0.12)]">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Keyboard size={16} />
            </div>
            <span className="font-mono text-xs font-bold text-[#1D1D1F]">KEYBOARD</span>
            <span className="text-[10px] font-mono text-[#6E6E73]">Tab to cycle • Enter/Space to shoot</span>
          </div>
        </div>

        {/* Mobile simplified-fallback notice (PRD §3: desktop-first, mouse aim) */}
        {isMobile && (
          <div className="w-full rounded-2xl border border-[#FF9F0A]/40 bg-[#FF9F0A]/10 px-4 py-2.5 text-[11px] font-mono text-[#FF9F0A] leading-relaxed">
            MOBILE DETECTED — the range is tuned for desktop mouse aim. Tap-to-shoot works,
            but for the full intel in under 30 seconds use NORMAL PORTFOLIO below.
          </div>
        )}

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full pt-3">
          {/* Primary: ENTER THE RANGE */}
          <button
            onClick={onEnterRange}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-mono font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-[4px_4px_0_#1D1D1F] transition-all active:scale-[0.98] group"
          >
            <Play size={16} className="group-hover:translate-x-0.5 transition-transform fill-white" />
            <span>ENTER THE RANGE</span>
          </button>

          {/* Secondary: SKIP TO NORMAL PORTFOLIO (Fast Recruiter View < 30s) */}
          <button
            onClick={onSkipToNormal}
            className="py-3.5 px-6 rounded-2xl bg-white hover:bg-[#F5F5F7] border-2 border-[#1D1D1F] hover:border-[#1D1D1F] text-[#1D1D1F] font-mono font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0_#1D1D1F]"
            title="Recruiters: Jump straight to the classic standard portfolio in 1 second"
          >
            <Eye size={14} />
            <span>NORMAL PORTFOLIO (FAST VIEW)</span>
          </button>
        </div>

        {/* Bottom Audio preference notice & Accessibility */}
        <div className="flex items-center justify-between w-full pt-2 border-t-2 border-[#1D1D1F]/10 text-[11px] font-mono text-[#6E6E73]">
          <button
            onClick={onToggleMute}
            className="flex items-center gap-1.5 hover:text-[#0A84FF] transition-colors"
          >
            {isMuted ? <VolumeX size={14} className="text-red-400" /> : <Volume2 size={14} className="text-emerald-400" />}
            <span>AUDIO SFX: {isMuted ? 'MUTED' : 'ENABLED'}</span>
          </button>

          <span className="hidden sm:inline text-[#6E6E73]">
            Powered by Three.js & Web Audio API
          </span>
        </div>
      </motion.div>
    </div>
  )
}
