'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full aspect-square rounded-lg overflow-hidden glass-effect p-2 hover-glow group">
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

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I'm a passionate Backend Developer and Cloud Infrastructure Engineer based in Bekasi, Indonesia. With expertise in building scalable microservices and robust cloud architectures, I specialize in modern backend technologies and DevOps practices.
              </p>

              <p>
                My journey in tech has been focused on solving real-world problems through efficient, scalable solutions. I have hands-on experience with Go, Python, PostgreSQL, and Google Cloud Platform, combined with a deep understanding of distributed systems and microservices patterns.
              </p>

              <p>
                Currently, I'm working on projects that involve complex system design, real-time data processing, and cloud infrastructure automation. I'm constantly learning and staying updated with the latest industry trends and best practices.
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="glass-effect p-4 rounded-lg text-center hover-glow">
                <div className="text-2xl font-bold text-blue-400">3+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="glass-effect p-4 rounded-lg text-center hover-glow">
                <div className="text-2xl font-bold text-cyan-400">10+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="glass-effect p-4 rounded-lg text-center hover-glow">
                <div className="text-2xl font-bold text-purple-400">4</div>
                <div className="text-sm text-gray-400">Certifications</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
