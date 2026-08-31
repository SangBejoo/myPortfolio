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
      {/* Ambient glow behind character - BMW Estoril/Daytona */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[480px] h-[480px] rounded-full blur-[90px] opacity-20"
          style={{ background: 'radial-gradient(circle, #0066B1 0%, #1A8DDD 30%, transparent 70%)' }} />
        <div className="absolute w-[320px] h-[320px] rounded-full blur-[60px] opacity-10"
          style={{ background: 'radial-gradient(circle, #A8B0BB 0%, transparent 70%)' }} />
      </div>

      {/* Titan silver stage floor */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[86%] h-[1px] bg-gradient-to-r from-transparent via-bmw-titan/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[56%] h-[40px] blur-2xl opacity-20"
        style={{ background: 'radial-gradient(ellipse, #A8B0BB 0%, transparent 70%)' }} />

      {/* Character image */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`relative ${variant === 'hero' ? 'w-[340px] sm:w-[420px] h-[520px] sm:h-[620px]' : 'w-[300px] h-[460px]'} ${active ? '' : 'grayscale opacity-30'}`}
      >
        {/* Subtle outline glow */}
        <div className="absolute inset-0 rounded-[24px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-bmw-carbon via-transparent to-transparent opacity-60" />
        </div>

        <div className="relative w-full h-full">
          <Image
            src="/images/author/profile.jpg"
            alt="Ayub Subagiya - Character Sprite"
            fill
            className="object-cover object-top rounded-[20px]"
            priority
            style={{
              filter: active ? 'contrast(1.05) saturate(1.08)' : 'grayscale(1)',
              objectPosition: '50% 12%',
            }}
          />
          {/* VN anime color grading overlay */}
          <div className="absolute inset-0 rounded-[20px] opacity-[0.08] mix-blend-overlay" style={{ background: 'linear-gradient(180deg, #1A8DDD 0%, transparent 45%)' }} />
          {/* Vignette bottom */}
          <div className="absolute inset-0 rounded-[20px] bg-gradient-to-t from-bmw-carbon via-transparent to-transparent" />
          {/* BMW subtle border */}
          <div className="absolute inset-0 rounded-[20px] border border-bmw-titan/10 pointer-events-none" />
          <div className="absolute inset-0 rounded-[20px] shadow-[inset_0_1px_0_rgba(242,240,235,0.08)] pointer-events-none" />
        </div>

        {/* Floating name tag anime style */}
        {variant === 'hero' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass-effect-strong px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span className="text-xs font-mono font-semibold tracking-widest text-bmw-alpine">AYUB SUBAGIYA</span>
            <span className="text-[10px] font-mono text-bmw-titan tracking-widest">— AVAILABLE</span>
          </motion.div>
        )}
      </motion.div>

      {/* Side accent - BMW M color dots */}
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-1.5 opacity-30">
        <div className="w-1 h-8 bg-bmw-mBlue rounded-full" />
        <div className="w-1 h-8 bg-bmw-mPurple rounded-full" />
        <div className="w-1 h-8 bg-bmw-mRed rounded-full" />
      </div>
    </div>
  )
}

export function VNBackdrop({ variant = 'default' }: { variant?: 'default' | 'project' | 'tech' }) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-bmw-carbon">
      {/* Base carbon */}
      <div className="absolute inset-0 bg-[#04070D]" />
      {/* Subtle BMW grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,176,187,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(168,176,187,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Sapphire radial */}
      <div className="absolute inset-0 bg-gradient-to-b from-bmw-sapphire/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      {/* Estoril bloom top */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full blur-[80px] opacity-[0.08]"
        style={{ background: 'radial-gradient(ellipse, #0066B1 0%, transparent 70%)' }} />
      {/* Daytona accent */}
      {variant === 'project' && (
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] blur-[100px] opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #1A8DDD 0%, transparent 70%)' }} />
      )}
      {/* Scanline subtle */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px)' }} />
    </div>
  )
}
