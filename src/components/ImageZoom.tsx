'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface ImageZoomProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
  title?: string
}

export function ImageZoom({ src, alt, isOpen, onClose, title }: ImageZoomProps) {
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [start, setStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setScale(1)
      setPos({ x: 0, y: 0 })
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === '+' || e.key === '=') setScale(s => Math.min(4, s + 0.25))
      if (e.key === '-' || e.key === '_') setScale(s => Math.max(0.5, s - 0.25))
      if (e.key === '0') { setScale(1); setPos({ x: 0, y: 0 }) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setScale(s => Math.min(4, Math.max(0.5, s + delta)))
  }

  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return
    setDragging(true)
    setStart({ x: e.clientX - pos.x, y: e.clientY - pos.y })
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return
    setPos({ x: e.clientX - start.x, y: e.clientY - start.y })
  }
  const onMouseUp = () => setDragging(false)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col bg-white/95 dark:bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <div className="m-stripe" />
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur shrink-0"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#009ADA] flex items-center justify-center text-white">
              <ZoomIn size={14} />
            </div>
            <div>
              <p className="text-sm font-mono font-semibold text-black dark:text-white">{title || alt}</p>
              <p className="text-xs font-mono text-[#6B7280] dark:text-white/60">{Math.round(scale * 100)}% • Scroll to zoom • Drag to pan • ESC to close</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setScale(s => Math.max(0.5, s - 0.25))} className="w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center hover:border-[#009ADA]/30">
              <ZoomOut size={14} />
            </button>
            <button onClick={() => setScale(s => Math.min(4, s + 0.25))} className="w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center hover:border-[#009ADA]/30">
              <ZoomIn size={14} />
            </button>
            <button onClick={() => { setScale(1); setPos({ x: 0, y: 0 }) }} className="w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center hover:border-[#009ADA]/30" title="Reset (0)">
              <RotateCcw size={14} />
            </button>
            <a href={src} download target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center hover:border-[#009ADA]/30" onClick={e => e.stopPropagation()}>
              <Download size={14} />
            </a>
            <button onClick={onClose} className="w-9 h-9 rounded-full btn-bmw-primary flex items-center justify-center ml-1">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Image stage */}
        <div
          ref={containerRef}
          className="flex-1 relative overflow-hidden flex items-center justify-center p-4 sm:p-8 cursor-grab active:cursor-grabbing select-none"
          onClick={e => e.stopPropagation()}
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <motion.div
            animate={{ scale, x: pos.x, y: pos.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative max-w-[90vw] max-h-[75vh] w-auto h-auto"
            style={{ cursor: scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'zoom-in' }}
            onClick={() => scale === 1 && setScale(2)}
          >
            {/* use img for zoom to allow natural size */}
            <img
              src={src}
              alt={alt}
              className="max-w-[90vw] max-h-[75vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-black/5 dark:border-white/10"
              draggable={false}
            />
          </motion.div>

          {/* hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/70 dark:bg-white/10 backdrop-blur text-white text-xs font-mono border border-white/10 pointer-events-none">
            {scale === 1 ? 'Click image to zoom • Scroll to zoom' : `Zoom ${Math.round(scale*100)}% • Drag to pan`}
          </div>
        </div>

        {/* Footer thumb */}
        <div className="shrink-0 p-3 border-t border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/20 backdrop-blur text-center">
          <p className="text-xs font-mono text-[#6B7280] dark:text-white/60">SangBejoo Portfolio • Click outside to close</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Wrapper to make any image zoomable on click
export function ZoomableImage({
  src,
  alt,
  className,
  wrapperClassName,
  title,
  fill,
  style,
  priority,
}: {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  title?: string
  fill?: boolean
  style?: React.CSSProperties
  priority?: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div onClick={() => setOpen(true)} className={`cursor-zoom-in group relative ${wrapperClassName || ''}`}>
        {fill ? (
          <Image src={src} alt={alt} fill className={className} style={style} priority={priority} />
        ) : (
          <img src={src} alt={alt} className={className} style={style} />
        )}
        <div className="absolute inset-0 bg-[#009ADA]/0 group-hover:bg-[#009ADA]/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="px-2 py-1 rounded-full bg-white/90 backdrop-blur text-black text-xs font-mono shadow flex items-center gap-1">
            <ZoomIn size={12} /> Zoom
          </span>
        </div>
      </div>
      <ImageZoom src={src} alt={alt} isOpen={open} onClose={() => setOpen(false)} title={title || alt} />
    </>
  )
}
