'use client'

import { motion } from 'framer-motion'
import { Badge } from './Badge'

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
  skills: string[]
}

const experiences: ExperienceItem[] = [
  {
    title: 'Backend Developer',
    company: 'PT Blue Bird Group',
    period: 'Oct 2024 - Jan 2025',
    description: 'Developed internal parking management and real-time driver tracking microservices. Built scalable systems handling concurrent requests with optimized database queries.',
    skills: ['Golang', 'Gin', 'PostgreSQL', 'Redis', 'Docker', 'REST APIs'],
  },
  {
    title: 'Cloud Computing Cohort',
    company: 'Bangkit Academy',
    period: 'Jun 2023 - Dec 2023',
    description: 'Specialized in Google Cloud Platform (GCP), Infrastructure as Code with Terraform, and CI/CD pipelines. Built scalable backend architecture for a driver management application.',
    skills: ['GCP', 'Terraform', 'Kubernetes', 'Cloud Run', 'GitHub Actions', 'CI/CD'],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-mono text-white mb-4">Experience</h2>
        <div className="w-12 h-1 bg-blue-600 rounded" />
      </motion.div>

      {/* Timeline */}
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline dot */}
            <div className="absolute -left-6 top-1 w-3 h-3 bg-blue-600 rounded-full" />

            {/* Timeline line (except for last item) */}
            {index !== experiences.length - 1 && (
              <div className="absolute -left-3.5 top-6 w-0.5 h-32 bg-gradient-to-b from-blue-600 to-transparent" />
            )}

            {/* Card */}
            <div className="ml-8 glass-effect p-6 rounded-lg hover-glow group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold font-mono text-white group-hover:text-blue-400 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-blue-400 font-mono text-sm mt-1">{exp.company}</p>
                </div>
                <span className="text-gray-400 text-sm font-mono mt-2 sm:mt-0 whitespace-nowrap">
                  {exp.period}
                </span>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

              {/* Skills badges */}
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
