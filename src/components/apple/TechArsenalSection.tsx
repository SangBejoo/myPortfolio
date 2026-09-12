'use client'

import { Layers } from 'lucide-react'
import { portfolioData, TechItem } from '@/data/portfolioData'

export function TechArsenalSection() {
  const categories: TechItem['category'][] = [
    'Languages',
    'Cloud & DevOps',
    'Databases & Cache',
    'Frameworks',
  ]

  return (
    <section id="arsenal" className="py-16 border-b border-apple-border">
      <div className="max-w-apple mx-auto px-4 sm:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-caption font-semibold text-apple-blue tracking-wider uppercase">
              <Layers size={13} />
              <span>Technology & Tooling</span>
            </div>
            <h2 className="text-title1 font-bold text-apple-text tracking-tight">
              Technical Arsenal
            </h2>
          </div>
          <p className="text-caption text-apple-text-secondary">
            Core stack chosen for concurrency, memory efficiency, and distributed scale.
          </p>
        </div>

        {/* Categorized Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const items = portfolioData.techStack.filter((t) => t.category === cat)
            return (
              <div
                key={cat}
                className="apple-card p-5 space-y-3.5"
              >
                <h3 className="text-caption font-semibold text-apple-text uppercase tracking-wider border-b border-apple-border pb-2">
                  {cat}
                </h3>

                <ul className="space-y-2.5">
                  {items.map((tech) => (
                    <li
                      key={tech.name}
                      className="flex items-center justify-between text-body"
                    >
                      <span className="flex items-center gap-2 font-medium text-apple-text">
                        <span className="text-base">{tech.icon}</span>
                        <span>{tech.name}</span>
                      </span>
                      {tech.level && (
                        <span className="text-[11px] font-mono text-apple-text-tertiary">
                          {tech.level}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
