'use client'

import Image from 'next/image'
import { Briefcase } from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 border-b border-apple-border">
      <div className="max-w-apple mx-auto px-4 sm:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-caption font-semibold text-apple-blue tracking-wider uppercase">
              <Briefcase size={13} />
              <span>Career Trajectory</span>
            </div>
            <h2 className="text-title1 font-bold text-apple-text tracking-tight">
              Work Experience
            </h2>
          </div>
          <p className="text-caption text-apple-text-secondary">
            Production microservices, cloud operations, and distributed systems.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-4">
          {portfolioData.experiences.map((exp) => (
            <div
              key={exp.company}
              className="apple-card p-5 sm:p-6 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3.5">
                  <div                     className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-apple-border p-1 shrink-0">
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-subhead font-semibold text-apple-text">
                      {exp.role}
                    </h3>
                    <div className="text-caption text-apple-blue font-medium">
                      {exp.company}
                    </div>
                  </div>
                </div>

                <span className="text-caption font-mono text-apple-text-tertiary self-start sm:self-center">
                  {exp.period}
                </span>
              </div>

              <p className="text-body text-apple-text-secondary leading-relaxed">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                      className="px-2.5 py-0.5 rounded-md bg-[#1D1D1F]/[0.04] border border-[#1D1D1F]/10 text-[11px] font-mono text-apple-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
