'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Download, Github, Linkedin, MapPin, CheckCircle2 } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'

export function Hero() {
  const [photoIdx, setPhotoIdx] = useState(0)

  return (
    <section id="overview" className="pt-24 sm:pt-32 pb-16 border-b border-apple-border">
      <div className="max-w-apple mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Typographic Content Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-apple-surface border border-apple-border text-caption text-apple-text-secondary">
              <span className="w-2 h-2 rounded-full bg-apple-green animate-pulse" />
              <span>Staff Web Programmer</span>
              <span className="text-apple-text-tertiary">•</span>
              <span className="text-apple-text font-medium">Penerbit Erlangga</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-title1 sm:text-largeTitle font-bold text-apple-text tracking-tight leading-tight">
                {portfolioData.profile.name}
              </h1>
              <p className="text-title3 sm:text-title2 text-apple-blue font-medium tracking-tight">
                {portfolioData.profile.role}
              </p>
            </div>

            {/* Concise Bio */}
            <p className="text-subhead text-apple-text-secondary max-w-2xl leading-relaxed">
              {portfolioData.profile.bio}
            </p>

            {/* Location & Quick Meta */}
            <div className="flex items-center gap-4 text-caption text-apple-text-tertiary font-mono">
              <span className="flex items-center gap-1.5 text-apple-text-secondary">
                <MapPin size={13} className="text-apple-blue" />
                {portfolioData.profile.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-apple-text-secondary">
                <CheckCircle2 size={13} className="text-apple-green" />
                Open for High-Impact Roles
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#projects" className="apple-btn-primary">
                <span>View Selected Systems</span>
                <ArrowRight size={14} />
              </a>

              <a
                href={portfolioData.profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-secondary"
              >
                <Download size={14} />
                <span>Download CV</span>
              </a>

              <a
                href="https://github.com/sangbejoo"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-secondary !px-3"
                aria-label="GitHub Profile"
              >
                <Github size={15} />
              </a>

              <a
                href="https://linkedin.com/in/ayub-subagiya"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-secondary !px-3"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={15} />
              </a>
            </div>
          </div>

          {/* Compact Photo Card Column */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-appleCard overflow-hidden border border-apple-border bg-apple-surface shadow-md group">
              <Image
                src={portfolioData.profile.photos[photoIdx].src}
                alt={portfolioData.profile.photos[photoIdx].label}
                fill
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 font-mono">
                <span>{portfolioData.profile.photos[photoIdx].desc}</span>
              </div>
            </div>

            {/* Photo toggle chips */}
            <div className="flex gap-1.5 mt-3">
              {portfolioData.profile.photos.map((p, idx) => (
                <button
                  key={p.src}
                  onClick={() => setPhotoIdx(idx)}
                    className={`px-2.5 py-1 rounded-md text-caption font-mono transition-all border-2 ${
                      photoIdx === idx
                        ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-[2px_2px_0_rgba(29,29,31,0.25)]'
                        : 'bg-transparent border-transparent text-apple-text-tertiary hover:text-apple-text-secondary'
                    }`}
                >
                  {idx === 0 ? 'Formal' : 'Field'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Compact Metrics Strip (Apple Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 pt-8 border-t border-apple-border">
          {portfolioData.profile.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-apple-surface/60 border border-apple-border"
            >
              <div className="text-title2 font-bold text-apple-text tracking-tight">
                {stat.value}
              </div>
              <div className="text-caption font-medium text-apple-text-secondary mt-0.5">
                {stat.label}
              </div>
              {stat.detail && (
                <div className="text-[11px] text-apple-text-tertiary mt-1 font-mono">
                  {stat.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
