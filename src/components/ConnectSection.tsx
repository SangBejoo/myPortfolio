'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react'

export function ConnectSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-lg glass-effect hover-glow p-12"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-cyan-600/10 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 rounded-lg overflow-hidden glass-effect p-2 hover-glow group">
              <Image
                src="/images/author/profile.jpg"
                alt="Ayub Subagiya"
                fill
                className="object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-md" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Let's Build Something Great Together
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm always open to exciting projects and collaborations. Whether you have a project in mind or just want to chat about tech, feel free to reach out.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://linkedin.com/in/sangbejoo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-mono text-sm hover-glow"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
              <a
                href="https://github.com/sangbejoo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 font-mono text-sm hover-glow"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                href="mailto:ayubsubagiya@gmail.com"
                className="inline-flex items-center gap-3 px-6 py-3 border border-gray-600 hover:border-gray-400 text-white rounded-lg transition-all duration-300 font-mono text-sm hover:bg-white/5"
              >
                <Mail className="w-5 h-5" />
                Email
              </a>
            </div>

            {/* CTA Button */}
            <div>
              <a
                href="mailto:ayubsubagiya@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-lg transition-all duration-300 hover-glow group"
              >
                Start a Conversation
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
