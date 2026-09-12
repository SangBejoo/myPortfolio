'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Layers, Key } from 'lucide-react'
import { ProjectData } from '@/data/portfolioData'

interface ProjectDetailModalProps {
  project: ProjectData | null
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => {
    setImgIdx(0)
  }, [project])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (project && project.images.length > 1) {
        if (e.key === 'ArrowLeft') {
          setImgIdx((prev) => (prev - 1 + project.images.length) % project.images.length)
        } else if (e.key === 'ArrowRight') {
          setImgIdx((prev) => (prev + 1) % project.images.length)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, project])

  if (!project) return null

  const hasMultipleImages = project.images && project.images.length > 1

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1D1D1F]/45 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#FFFDF5] border-[3px] border-[#1D1D1F] rounded-appleModal shadow-[8px_8px_0_#1D1D1F] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Apple Sheet Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b-2 border-[#1D1D1F]/10 bg-[#F5F1E6]">
          <div className="flex items-center gap-2">
            <span className="apple-badge !py-0.5 !text-[11px] !bg-apple-blue/10 !text-apple-blue !border-apple-blue/20">
              {project.organization.name}
            </span>
            {project.boss && (
              <span className="apple-badge !py-0.5 !text-[11px] !bg-amber-500/10 !text-amber-600 !border-amber-500/30">
                Flagship Platform
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#1D1D1F]/5 hover:bg-[#1D1D1F]/10 flex items-center justify-center text-apple-text-secondary hover:text-[#1D1D1F] transition-colors"
            aria-label="Close modal"
          >
            <X size={14} />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title & Subtitle */}
          <div>
            <h2 className="text-title2 font-bold text-apple-text tracking-tight">
              {project.name}
            </h2>
            <p className="text-caption text-apple-text-secondary mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Screenshot Carousel */}
          {project.images && project.images.length > 0 && (
            <div className="space-y-2.5">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#EFE9D8] border-2 border-[#1D1D1F]/10">
                <Image
                  src={project.images[imgIdx]}
                  alt={`${project.name} preview`}
                  fill
                  className="object-contain"
                  priority
                />

                {hasMultipleImages && (
                  <>
                    <button
                      onClick={() =>
                        setImgIdx((prev) => (prev - 1 + project.images.length) % project.images.length)
                      }
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur border border-white/10 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() =>
                        setImgIdx((prev) => (prev + 1) % project.images.length)
                      }
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur border border-white/10 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 border border-white/10 text-[10px] font-mono text-apple-text-secondary">
                      {imgIdx + 1} / {project.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {hasMultipleImages && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {project.images.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setImgIdx(i)}
                      className={`relative w-14 h-9 rounded-md overflow-hidden border shrink-0 transition-all ${
                        imgIdx === i
                          ? 'border-apple-blue shadow-sm opacity-100'
                          : 'border-apple-border opacity-50 hover:opacity-100'
                      }`}
                    >
                      <Image src={src} alt="thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Architecture Overview */}
          <div className="p-4 rounded-xl bg-white border-2 border-[#1D1D1F]/10 space-y-2">
            <div className="text-caption font-semibold text-apple-text uppercase tracking-wider">
              System Architecture & Core Engineering
            </div>
            <p className="text-body text-apple-text-secondary leading-relaxed">
              {project.description}
            </p>
            <div className="text-caption text-apple-blue pt-1">
              Key Metric: {project.highlight}
            </div>
          </div>

          {/* Demo Credentials if applicable */}
          {project.testCredentials && (
            <div className="p-3.5 rounded-xl bg-apple-blue/5 border border-apple-blue/20 text-caption font-mono flex items-center gap-2">
              <Key size={14} className="text-apple-blue shrink-0" />
              <div className="text-apple-text-secondary">
                <span className="text-apple-text font-medium">Demo Access:</span> Email:{' '}
                <code className="text-apple-text">{project.testCredentials.email}</code> • Password:{' '}
                <code className="text-apple-text">{project.testCredentials.password}</code>
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-caption font-semibold text-apple-text-secondary uppercase tracking-wider">
              <Layers size={13} />
              <span>Technology Stack</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-md bg-[#1D1D1F]/[0.04] border border-[#1D1D1F]/10 text-caption font-mono text-apple-text-secondary"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-3.5 border-t-2 border-[#1D1D1F]/10 bg-[#F5F1E6] flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2.5">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-primary !h-8 !text-caption"
              >
                <span>{project.demoText || 'Launch Platform'}</span>
                <ExternalLink size={13} />
              </a>
            )}
            {(project.codeLink || project.repoUrl) && (
              <a
                href={project.codeLink || project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-secondary !h-8 !text-caption"
              >
                <Github size={13} />
                <span>Source Code</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-caption font-mono text-apple-text-tertiary hover:text-apple-text"
          >
            Press Esc to dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
