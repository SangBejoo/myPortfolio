'use client'
import { motion } from 'framer-motion'
import { ChevronDown, Play, Pause, SkipForward } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

interface DialogueBoxProps {
  speaker: string
  text: string
  speakerColor?: string
  onNext?: () => void
  onPrev?: () => void
  hasNext?: boolean
  hasPrev?: boolean
  isTypingComplete?: boolean
  onSkipTypewriter?: () => void
  autoPlay?: boolean
  onToggleAuto?: () => void
  variant?: 'vn' | 'minimal'
}

export function DialogueBox({
  speaker,
  text,
  speakerColor,
  onNext,
  onPrev,
  hasPrev = false,
  isTypingComplete = true,
  onSkipTypewriter,
  autoPlay = false,
  onToggleAuto,
}: DialogueBoxProps) {
  return (
    <div className="vn-dialogue rounded-xl overflow-hidden w-full">
      {/* Nameplate */}
      <div className="flex items-center justify-between">
        <div className="vn-nameplate">
          <span className="w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse" />
          {speaker}
          <span className="hidden sm:inline opacity-60 font-normal ml-1">— {speakerColor || 'ESTORIL BLUE'}</span>
        </div>
        {/* Auto / controls */}
        <div className="flex items-center gap-1 pr-3">
          {onToggleAuto && (
            <button
              onClick={onToggleAuto}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest border transition-all flex items-center gap-1 ${
                autoPlay
                  ? 'bg-bmw-estoril border-bmw-estoril text-white'
                  : 'bg-transparent border-bmw-titan/20 text-bmw-titan hover:text-bmw-alpine hover:border-bmw-titan/40'
              }`}
            >
              {autoPlay ? <Pause size={10} /> : <Play size={10} />}
              AUTO
            </button>
          )}
          <button
            onClick={onSkipTypewriter}
            className="p-1.5 rounded-full border border-bmw-titan/15 text-bmw-titan hover:text-bmw-alpine hover:border-bmw-titan/30 transition-colors"
            title="Skip"
          >
            <SkipForward size={12} />
          </button>
        </div>
      </div>

      {/* Text area */}
      <div className="px-5 sm:px-7 pt-4 pb-5 relative min-h-[96px] flex flex-col justify-center">
        <p className="text-[15px] sm:text-[17px] leading-relaxed text-bmw-alpine font-light tracking-wide">
          {text}
          {!isTypingComplete && <span className="inline-block w-[2px] h-[1.1em] bg-bmw-daytona ml-0.5 -mb-1 animate-pulse" />}
        </p>

        {/* Bottom bar: hint + next */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-[10px] font-mono tracking-[0.18em] text-bmw-mineral uppercase">
            {isTypingComplete ? 'Click to continue • Press → or Space' : 'Click to skip typing'}
          </span>

          <div className="flex items-center gap-2">
            {hasPrev && onPrev && (
              <button
                onClick={onPrev}
                className="w-8 h-8 rounded-full btn-bmw-ghost flex items-center justify-center text-xs"
              >
                ‹
              </button>
            )}
            <button
              onClick={() => {
                if (!isTypingComplete && onSkipTypewriter) onSkipTypewriter()
                else onNext?.()
              }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isTypingComplete
                  ? 'btn-bmw-primary vn-next-indicator'
                  : 'bg-bmw-alpine/10 border border-bmw-alpine/20 text-bmw-alpine'
              }`}
              aria-label={isTypingComplete ? 'Next' : 'Skip typing'}
            >
              <ChevronDown size={16} className={isTypingComplete ? 'text-white' : 'text-bmw-alpine'} />
            </button>
          </div>
        </div>

        {/* M stripe bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-60">
          <div className="m-stripe h-full" />
        </div>
      </div>
    </div>
  )
}

// Typewriter hook
export function useTypewriter(text: string, speed: number = 18, enabled: boolean = true) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const prevTextRef = useRef(text)

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text)
      setDone(true)
      return
    }
    if (prevTextRef.current !== text) {
      setDisplayed('')
      setDone(false)
      prevTextRef.current = text
    }
    if (done && displayed === text) return

    let i = displayed.length
    if (i >= text.length) {
      setDone(true)
      return
    }
    const id = setTimeout(() => {
      // type 1-2 chars for natural VN feel
      const chunk = text.slice(i, i + 1)
      setDisplayed((prev) => prev + chunk)
      if (i + 1 >= text.length) setDone(true)
    }, speed)
    return () => clearTimeout(id)
  }, [text, displayed, speed, enabled, done])

  const skip = () => {
    setDisplayed(text)
    setDone(true)
  }

  const reset = (newText: string) => {
    setDisplayed('')
    setDone(false)
    prevTextRef.current = newText
  }

  return { displayed, done, skip, reset }
}

export function VNChoice({
  label,
  sublabel,
  onClick,
  variant = 'primary',
}: {
  label: string
  sublabel?: string
  onClick: () => void
  variant?: 'primary' | 'ghost'
}) {
  return (
    <motion.button
      whileHover={{ x: 4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative w-full text-left px-5 py-4 rounded-xl border overflow-hidden transition-all ${
        variant === 'primary'
          ? 'btn-bmw-primary'
          : 'btn-bmw-ghost'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      <div className="flex items-center justify-between relative z-10">
        <div>
          <div className="font-mono text-sm font-semibold tracking-wide">{label}</div>
          {sublabel && <div className="text-xs opacity-70 mt-0.5 font-light">{sublabel}</div>}
        </div>
        <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
          →
        </span>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-bmw-alpine/0 group-hover:bg-bmw-alpine/80 transition-colors" />
    </motion.button>
  )
}
