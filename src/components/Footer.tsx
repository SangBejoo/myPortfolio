'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: 'https://github.com/sangbejoo', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/ayub-subagiya', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:ayubsubagiya@gmail.com', label: 'Email' },
  ]

  return (
    <footer id="contact" className="border-t border-gray-800 bg-gradient-to-b from-black to-gray-900/30 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white mb-4">Let's Build Something Great</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Interested in collaborating? Feel free to reach out via email or connect on social media.
          </p>
          <a
            href="mailto:ayubsubagiya@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-mono rounded-lg transition-all duration-300 hover-glow"
          >
            Get In Touch
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-12"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-effect rounded-lg hover:bg-blue-600/20 hover:border-blue-600/40 transition-all group"
              aria-label={label}
            >
              <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-500 text-sm mb-2">
              © {currentYear} Ayub Subagiya. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Crafted with{' '}
              <span className="inline-block mx-1">❤️</span>
              using Next.js, Tailwind CSS, and Framer Motion
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
