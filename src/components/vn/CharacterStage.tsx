'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface CharacterStageProps {
  active?: boolean
  variant?: 'hero' | 'about'
}

export function CharacterStage({ active = true, variant = 'hero' }: CharacterStageProps) {
  return (
    <div className="relative flex items-end justify-center select-none pointer-events-none">
      {/* Ambient glow behind character - BMW Blue Ball on white */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[520px] h-[520px] rounded-full blur-[80px] opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #009ADA 0%, #E0F0FF 45%, transparent 70%)' }} />
        <div className="absolute w-[340px] h-[340px] rounded-full blur-[50px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #009ADA 0%, transparent 70%)' }} />
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[86%] h-[1px] bg-gradient-to-r from-transparent via-[#009ADA]/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[56%] h-[40px] blur-2xl opacity-[0.06]"
        style={{ background: 'radial-gradient(ellipse, #009ADA 0%, transparent 70%)' }} />

      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`relative ${variant === 'hero' ? 'w-[340px] sm:w-[420px] h-[520px] sm:h-[620px]' : 'w-[300px] h-[460px]'} ${active ? '' : 'grayscale opacity-30'}`}
      >
        <div className="absolute inset-0 rounded-[24px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40" />
        </div>

        <div className="relative w-full h-full">
          <Image
            src="/images/author/ayub.jpg"
            alt="Ayub Subagiya - Character Sprite"
            fill
            className="object-cover object-top rounded-[20px]"
            priority
            style={{
              filter: active ? 'contrast(1.02) saturate(1.05)' : 'grayscale(1)',
              objectPosition: '50% 22%',
            }}
          />
          <div className="absolute inset-0 rounded-[20px] opacity-[0.04] mix-blend-overlay" style={{ background: 'linear-gradient(180deg, #009ADA 0%, transparent 45%)' }} />
          <div className="absolute inset-0 rounded-[20px] bg-gradient-to-t from-white/60 via-transparent to-transparent" />
          <div className="absolute inset-0 rounded-[20px] border border-black/5 pointer-events-none" />
          <div className="absolute inset-0 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] pointer-events-none" />
        </div>

        {variant === 'hero' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.08)] px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span className="text-xs font-mono font-semibold tracking-widest text-black">AYUB SUBAGIYA</span>
            <span className="text-[10px] font-mono text-[#6B7280] tracking-widest">— AVAILABLE</span>
          </motion.div>
        )}
      </motion.div>

      <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-1.5 opacity-20">
        <div className="w-1 h-8 bg-[#009ADA] rounded-full" />
        <div className="w-1 h-8 bg-[#8E44AD] rounded-full" />
        <div className="w-1 h-8 bg-[#E30613] rounded-full" />
      </div>
    </div>
  )
}

export function VNBackdrop({ variant = 'default' }: { variant?: 'default' | 'project' | 'tech' }) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,154,218,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,154,218,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7FF] via-white to-white" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full blur-[60px] opacity-[0.10]"
        style={{ background: 'radial-gradient(ellipse, #009ADA 0%, transparent 70%)' }} />
      {variant === 'project' && (
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] blur-[100px] opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #009ADA 0%, transparent 70%)' }} />
      )}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,154,218,0.03) 2px, rgba(0,154,218,0.03) 3px)' }} />
    </div>
  )
}
