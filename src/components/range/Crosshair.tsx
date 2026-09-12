'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface CrosshairProps {
  isLocked: boolean
  isFiring: boolean
  lastHit: boolean
  ammo: number
  maxAmmo: number
  isReloading: boolean
}

export function Crosshair({
  isLocked,
  isFiring,
  lastHit,
  ammo,
  maxAmmo,
  isReloading,
}: CrosshairProps) {
  // Perf: cursor position is written straight to the DOM — a React render
  // on every mousemove would fight the WebGL frame budget.
  const [visible, setVisible] = useState(false)
  const nodeRef = useRef<HTMLDivElement>(null)
  const shownRef = useRef(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!shownRef.current) {
        shownRef.current = true
        setVisible(true)
      }
      const node = nodeRef.current
      if (node) {
        node.style.left = `${e.clientX}px`
        node.style.top = `${e.clientY}px`
      }
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  if (!visible) return null

  const size = isFiring ? 56 : isLocked ? 44 : 36
  const color = isLocked ? '#FF3B30' : '#1D1D1F'

  return (
    <div
      ref={nodeRef}
      className="fixed pointer-events-none z-40 transition-opacity duration-150 select-none"
      style={{
        left: -100,
        top: -100,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer reticle circle */}
      <motion.div
        animate={{
          width: size,
          height: size,
          borderColor: color,
          rotate: isLocked ? 45 : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        className="relative rounded-full border-2 border-dashed flex items-center justify-center transition-colors"
        style={{
          boxShadow: isLocked
            ? '0 0 16px rgba(255,59,48,0.55)'
            : '0 0 0 3px rgba(255,253,245,0.75), 0 2px 8px rgba(29,29,31,0.35)',
        }}
      >
        {/* Center surgical laser dot */}
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}`,
          }}
        />

        {/* Crosshair ticks */}
        <div
          className="absolute -top-2 w-[2px] h-2"
          style={{ backgroundColor: color }}
        />
        <div
          className="absolute -bottom-2 w-[2px] h-2"
          style={{ backgroundColor: color }}
        />
        <div
          className="absolute -left-2 h-[2px] w-2"
          style={{ backgroundColor: color }}
        />
        <div
          className="absolute -right-2 h-[2px] w-2"
          style={{ backgroundColor: color }}
        />

        {/* Hit Marker 'X' confirmation */}
        {lastHit && (
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center font-mono font-black text-red-500 text-lg"
          >
            ✕
          </motion.div>
        )}
      </motion.div>

      {/* Target Lock indicator tag */}
      {isLocked && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-red-500/90 text-black font-mono text-[9px] font-bold tracking-widest uppercase whitespace-nowrap shadow-md"
        >
          TARGET LOCKED
        </motion.div>
      )}

      {/* Quick Ammo & Reload status underneath cursor */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none mt-1">
        {isReloading ? (
          <span className="px-1.5 py-0.5 rounded bg-amber-500/80 text-black font-mono text-[9px] font-bold animate-pulse">
            RELOADING...
          </span>
        ) : (
          <span className="text-[9px] font-mono text-[#1D1D1F]/70 tracking-widest font-semibold drop-shadow">
            {ammo}/{maxAmmo}
          </span>
        )}
      </div>
    </div>
  )
}
