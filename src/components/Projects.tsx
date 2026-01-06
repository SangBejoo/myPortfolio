'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Badge } from './Badge'
import { ProjectGallery } from './ProjectGallery'

interface ProjectItem {
  id: string
  title: string
  description: string
  imageUrl: string
  images?: string[]
  skills: string[]
  highlight: string
  codeLink?: string
  demoLink?: string
  demoText?: string
  testCredentials?: {
    email: string
    password: string
  }
  featured?: boolean
  size?: 'large' | 'medium' | 'small'
}

const projects: ProjectItem[] = [
  {
    id: 'rusunawa',
    title: 'Rusunawa Management System',
    description: 'Microservices-based dormitory management platform with complex RBAC and payment integration. Achieved 100% success rate in black-box testing.',
    imageUrl: '/images/projects/rusunawa-main.png',
    images: [
      '/images/projects/rusunawa-main.png',
      '/images/projects/rusunawa-1.png',
      '/images/projects/rusunawa-2.png',
      '/images/projects/rusunawa-3.png',
      '/images/projects/rusunawa-4.png',
      '/images/projects/rusunawa-5.png',
      '/images/projects/rusunawa-6.png',
      '/images/projects/rusunawa-7.png',
      '/images/projects/rusunawa-8.png',
      '/images/projects/rusunawa-9.png',
      '/images/projects/rusunawa-10.png',
      '/images/projects/rusunawa-11.png',
      '/images/projects/rusunawa-12.png',
      '/images/projects/rusunawa-13.png',
      '/images/projects/rusunawa-14.png',
    ],
    skills: ['Go', 'gRPC', 'React', 'Docker', 'PostgreSQL', 'Midtrans'],
    highlight: 'Full-stack architecture with role-based access control',
    featured: true,
    size: 'large',
    codeLink: 'https://github.com/sangbejoo/rusunawa-api',
    demoLink: 'https://rusunawa.sangbejoo.site/tenant',
    demoText: 'Coming Soon',
  },
  {
    id: 'cbt',
    title: 'CBT (Computer Based Test) System',
    description: 'Full-stack online exam platform with fault-tolerant database schema to prevent data loss during high-load scenarios.',
    imageUrl: '/images/projects/cbt-main.png',
    images: [
      '/images/projects/cbt-main.png',
      '/images/projects/cbt-1.png',
      '/images/projects/cbt-2.png',
      '/images/projects/cbt-3.png',
      '/images/projects/cbt-4.png',
      '/images/projects/cbt-5.png',
      '/images/projects/cbt-6.png',
      '/images/projects/cbt-7.png',
      '/images/projects/cbt-8.png',
    ],
    skills: ['Golang', 'Next.js', 'MySQL', 'WebSockets'],
    highlight: 'Engineered for 99.9% uptime during exams',
    featured: true,
    size: 'medium',
    codeLink: 'https://github.com/sangbejoo/cbt-system',
    demoLink: 'https://cbt.sangbejoo.site/',
    testCredentials: {
      email: 'test@gmail.com',
      password: 'test@gmail.com',
    },
  },
  {
    id: 'parking',
    title: 'Parking Space Monitoring System',
    description: 'Real-time parking space tracking system using GoLang, gRPC, PostgreSQL GIS, and Tile38 for location-based services.',
    imageUrl: '/images/projects/parking-main.png',
    images: [
      '/images/projects/parking-main.png',
      '/images/projects/parking-1.png',
      '/images/projects/parking-2.png',
    ],
    skills: ['Golang', 'gRPC', 'PostgreSQL GIS', 'Tile38', 'GCP'],
    highlight: 'Real-time geospatial data processing',
    featured: true,
    size: 'medium',
    codeLink: 'https://github.com/sangbejoo/parking-system',
  },
  {
    id: 'chat-waifu',
    title: 'Chat Waifu',
    description: 'AI character chatbot experiment showcasing LLM integration and natural conversation flows.',
    imageUrl: '/images/projects/chatwaifu-main.png',
    images: [
      '/images/projects/chatwaifu-main.png',
      '/images/projects/chatwaifu-1.png',
      '/images/projects/chatwaifu-2.png',
      '/images/projects/chatwaifu-3.png',
      '/images/projects/chatwaifu-4.png',
    ],
    skills: ['Python', 'Flask', 'LLM APIs', 'Google Gemini'],
    highlight: 'AI-powered conversational interface',
    featured: true,
    size: 'small',
    demoLink: 'https://chatwaifu.sangbejoo.site/',
  },
  {
    id: 'capstone',
    title: 'Capstone Project',
    description: 'Comprehensive final year project demonstrating full-stack development skills and system integration capabilities.',
    imageUrl: '/images/projects/capstone-main.png',
    images: [
      '/images/projects/capstone-main.png',
      '/images/projects/capstone-1.png',
    ],
    skills: ['Full-Stack Development', 'System Design', 'Project Management'],
    highlight: 'Complete end-to-end software solution',
    featured: true,
    size: 'small',
  },
]

function ProjectCard({ project }: { project: ProjectItem }) {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const isLarge = project.size === 'large'
  const isMedium = project.size === 'medium'
  const hasGallery = project.images && project.images.length > 1

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        onClick={() => hasGallery && setGalleryOpen(true)}
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
              
              {/* Gallery Badge */}
              {hasGallery && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600/80 backdrop-blur rounded-full text-white text-xs font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <ImageIcon size={14} />
                  Gallery
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
              <p className="text-gray-400 text-sm">Project Image</p>
            </div>
          )}
        </div>

      {/* Content Container */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        {/* Title and Badge */}
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg sm:text-xl font-bold font-mono text-white group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            {project.featured && (
              <span className="px-2 py-1 bg-blue-600/20 border border-blue-600/40 text-blue-300 text-xs font-mono rounded whitespace-nowrap">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 flex-grow leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Highlight */}
        <p className="text-blue-400 text-xs font-mono mb-4 italic">{project.highlight}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>

        {/* Test Credentials for CBT */}
        {project.testCredentials && (
          <div className="mb-4 p-3 bg-blue-900/30 border border-blue-600/40 rounded text-xs text-blue-200 font-mono">
            <p className="font-bold mb-1">Test Credentials:</p>
            <p>Email: {project.testCredentials.email}</p>
            <p>Pass: {project.testCredentials.password}</p>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-700 flex-wrap">
          {hasGallery && (
            <button
              onClick={(e) => {
                e.preventDefault()
                setGalleryOpen(true)
              }}
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm font-mono"
            >
              <ImageIcon className="w-4 h-4" />
              Gallery
            </button>
          )}
          {project.codeLink && (
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm font-mono"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm font-mono"
            >
              <ExternalLink className="w-4 h-4" />
              {project.demoText || 'Demo'}
            </a>
          )}
        </div>
      </div>
    </motion.div>

    {/* Gallery Modal */}
    {hasGallery && project.images && (
      <ProjectGallery
        isOpen={galleryOpen}
        projectTitle={project.title}
        images={project.images}
        onClose={() => setGalleryOpen(false)}
      />
    )}
    </>
  )
}

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-mono text-white mb-4">Featured Projects</h2>
        <div className="w-12 h-1 bg-blue-600 rounded" />
        <p className="text-gray-400 mt-4 max-w-2xl">
          A curated selection of production-ready projects showcasing expertise in backend development, cloud architecture, and full-stack systems.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
        {projects.map((project) => (
          <div
            key={project.id}
            className={isLarge ? 'md:col-span-2 lg:col-span-2 md:row-span-2' : isMedium ? 'md:col-span-1' : 'col-span-1'}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  )
}

// Helper variables for grid sizing
const isLarge = false
const isMedium = false
