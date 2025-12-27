'use client'

import { motion } from 'framer-motion'

interface TechIcon {
  name: string
  icon: React.ReactNode
}

// Tech icons as simple SVG representations
const techStack: TechIcon[] = [
  { name: 'Go', icon: '🐹' },
  { name: 'Python', icon: '🐍' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Kubernetes', icon: '☸️' },
  { name: 'PostgreSQL', icon: '🗄️' },
  { name: 'MySQL', icon: '🗄️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'GCP', icon: '☁️' },
  { name: 'Terraform', icon: '📦' },
  { name: 'Gin', icon: '🍸' },
  { name: 'gRPC', icon: '⚡' },
  { name: 'Redis', icon: '🔴' },
]

export function TechStack() {
  return (
    <section className="py-20 px-4 overflow-hidden bg-gradient-to-b from-black to-gray-900/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto mb-12"
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-mono text-white mb-4 text-center">Tech Stack</h2>
        <div className="w-12 h-1 bg-blue-600 rounded mx-auto" />
      </motion.div>

      {/* Marquee Container */}
      <div className="relative overflow-hidden">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-8 whitespace-nowrap"
        >
          {/* First set */}
          {techStack.map((tech, index) => (
            <motion.div
              key={`${tech.name}-1-${index}`}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-3 px-6 py-4 glass-effect rounded-lg min-w-fit group cursor-pointer hover-glow"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{tech.icon}</span>
              <span className="font-mono text-white font-semibold text-sm sm:text-base group-hover:text-blue-400 transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}

          {/* Duplicate set for seamless loop */}
          {techStack.map((tech, index) => (
            <motion.div
              key={`${tech.name}-2-${index}`}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-3 px-6 py-4 glass-effect rounded-lg min-w-fit group cursor-pointer hover-glow"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{tech.icon}</span>
              <span className="font-mono text-white font-semibold text-sm sm:text-base group-hover:text-blue-400 transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Gradient fade edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black via-transparent to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
