'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { Badge } from './Badge'

interface ProjectItem {
  id: string
  title: string
  description: string
  imageUrl: string
  skills: string[]
  highlight: string
  codeLink?: string
  demoLink?: string
  featured?: boolean
  size?: 'large' | 'medium' | 'small'
}

interface ProjectProps {
  project: ProjectItem
  onGalleryClick?: (project: ProjectItem) => void
}

export function Project({ project, onGalleryClick }: ProjectProps) {
  const isLarge = project.size === 'large'
  const isMedium = project.size === 'medium'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative group overflow-hidden rounded-lg glass-effect hover-glow cursor-pointer h-full flex flex-col ${
        isLarge ? 'row-span-2 col-span-2' : isMedium ? 'col-span-1' : 'col-span-1'
      }`}
    >
      {/* Image Container */}
      <div className="relative w-full overflow-hidden bg-gray-900 flex-shrink-0" style={{ paddingTop: isLarge ? '50%' : '60%' }}>
        {project.imageUrl !== '/images/placeholder.png' ? (
          <>
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes={isLarge ? '100%' : '50%'}
              priority={project.featured}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
            <p className="text-gray-400 text-sm">Project Image</p>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        {/* Title and Links */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-2 ml-2">
            {onGalleryClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onGalleryClick(project)
                }}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors group/btn"
                title="View Gallery"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover/btn:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            )}
            {project.codeLink && (
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors group/link"
                title="View Code"
              >
                <Github className="w-4 h-4 text-gray-400 group-hover/link:text-blue-400 transition-colors" />
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors group/link"
                title="View Demo"
              >
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover/link:text-blue-400 transition-colors" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
          {project.description}
        </p>

        {/* Highlight */}
        <p className="text-blue-400 text-xs font-medium mb-4 italic">
          {project.highlight}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
