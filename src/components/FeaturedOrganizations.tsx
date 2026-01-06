'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function FeaturedOrganizations() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-mono text-white mb-4">Featured Organizations</h2>
        <div className="w-12 h-1 bg-blue-600 rounded mx-auto" />
      </motion.div>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bangkit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden rounded-lg glass-effect p-8 hover-glow min-h-[300px] flex flex-col justify-center items-center"
        >
          {/* Background Image */}
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
            <Image
              src="/images/bangkit.png"
              alt="Bangkit"
              fill
              className="object-contain object-center"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center space-y-4">
            <div className="relative w-32 h-32 mx-auto">
              <Image
                src="/images/bangkit.png"
                alt="Bangkit Academy"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Bangkit Academy</h3>
              <p className="text-gray-400 text-sm">Cloud Computing Cohort</p>
              <p className="text-gray-500 text-xs mt-2">Jun 2023 - Dec 2023</p>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Specialized in Google Cloud Platform, Infrastructure as Code, and cloud architecture design.
            </p>
          </div>
        </motion.div>

        {/* Blue Bird Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden rounded-lg glass-effect p-8 hover-glow min-h-[300px] flex flex-col justify-center items-center"
        >
          {/* Background Image */}
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
            <Image
              src="/images/bluebird.png"
              alt="Blue Bird Group"
              fill
              className="object-contain object-center"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center space-y-4">
            <div className="relative w-32 h-32 mx-auto">
              <Image
                src="/images/bluebird.png"
                alt="Blue Bird Group"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">PT Blue Bird Group</h3>
              <p className="text-gray-400 text-sm">Backend Developer</p>
              <p className="text-gray-500 text-xs mt-2">Oct 2024 - Jan 2025</p>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Developed parking management and driver tracking microservices with scalable architecture.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
