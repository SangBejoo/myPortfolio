'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Github, Code2 } from 'lucide-react'
import { portfolioData, ProjectData } from '@/data/portfolioData'
import { ProjectDetailModal } from './ProjectDetailModal'

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [inspectProject, setInspectProject] = useState<ProjectData | null>(null)

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'erlangga', label: 'Penerbit Erlangga' },
    { id: 'bluebird', label: 'PT Blue Bird' },
    { id: 'bangkit', label: 'Bangkit' },
    { id: 'independent', label: 'Independent' },
  ]

  const filteredProjects =
    activeFilter === 'all'
      ? portfolioData.projects
      : portfolioData.projects.filter(
          (p) => p.organization.category === activeFilter
        )

  return (
    <section id="projects" className="py-16 border-b border-apple-border">
      <div className="max-w-apple mx-auto px-4 sm:px-8 space-y-8">
        {/* Section Header & Segmented Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-caption font-semibold text-apple-blue tracking-wider uppercase">
              <Code2 size={13} />
              <span>Engineered Systems</span>
            </div>
            <h2 className="text-title1 font-bold text-apple-text tracking-tight">
              Selected Projects
            </h2>
          </div>

          {/* Apple HIG Segmented Control */}
          <div className="inline-flex p-1 rounded-xl bg-apple-surface border border-apple-border self-start md:self-auto overflow-x-auto max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1 rounded-lg text-caption font-medium whitespace-nowrap transition-all border-2 ${
                  activeFilter === tab.id
                    ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-[2px_2px_0_rgba(29,29,31,0.25)]'
                    : 'border-transparent text-apple-text-secondary hover:text-apple-text'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="apple-card flex flex-col justify-between overflow-hidden group"
            >
              {/* Image Preview */}
              <div
                className="relative aspect-video w-full bg-[#EFE9D8] cursor-pointer overflow-hidden border-b border-apple-border"
                onClick={() => setInspectProject(project)}
              >
                <Image
                  src={project.images[0]}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161618] via-transparent to-transparent opacity-70" />

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="apple-badge !bg-black/60 !backdrop-blur !border-white/10 !text-white text-[11px]">
                    {project.organization.badge}
                  </span>

                  {project.boss && (
                    <span className="apple-badge !bg-apple-blue/20 !backdrop-blur !border-apple-blue/30 !text-apple-blue text-[11px]">
                      Flagship Architecture
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                  <span className="apple-btn-secondary !h-8 !text-caption !bg-white/90 !text-black !font-semibold">
                    Inspect Architecture
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-title3 font-bold text-apple-text tracking-tight group-hover:text-apple-blue transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-caption text-apple-blue font-medium">
                    {project.subtitle}
                  </p>
                  <p className="text-body text-apple-text-secondary leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-[#1D1D1F]/[0.04] border border-[#1D1D1F]/10 text-[11px] font-mono text-apple-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[11px] font-mono text-apple-text-tertiary">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Action Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-apple-border">
                    <button
                      onClick={() => setInspectProject(project)}
                      className="text-caption font-medium text-apple-blue hover:text-[#0071E3] hover:underline transition-colors"
                    >
                      View Details →
                    </button>

                    <div className="flex items-center gap-2">
                      {(project.codeLink || project.repoUrl) && (
                        <a
                          href={project.codeLink || project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                            className="p-1.5 rounded-md text-apple-text-secondary hover:text-[#1D1D1F] transition-colors"
                            title="View Repository"
                        >
                          <Github size={15} />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md text-apple-text-secondary hover:text-apple-blue transition-colors"
                          title="Open Live Demo"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspector Sheet */}
      <ProjectDetailModal
        project={inspectProject}
        onClose={() => setInspectProject(null)}
      />
    </section>
  )
}
