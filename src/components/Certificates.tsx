'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface Certificate {
  id: string
  name: string
  issuer: string
  imageUrl: string
  date?: string
}

const certificates: Certificate[] = [
  {
    id: 'bangkit',
    name: 'Cloud Computing Specialization',
    issuer: 'Bangkit Academy',
    imageUrl: '/images/certificates/bangkit-certificate.png',
    date: '2023',
  },
  {
    id: 'alibaba',
    name: 'Alibaba Cloud Associate',
    issuer: 'Alibaba Cloud',
    imageUrl: '/images/certificates/alibaba-certificate.jpg',
  },
  {
    id: 'ccit',
    name: 'CCIT Certification',
    issuer: 'CCIT',
    imageUrl: '/images/certificates/ccit-certificate.jpg',
  },
  {
    id: 'toeic',
    name: 'TOEIC English Certificate',
    issuer: 'TOEIC',
    imageUrl: '/images/certificates/toeic-certificate.jpg',
  },
]

export function CertificateModal({
  isOpen,
  certificate,
  onClose,
}: {
  isOpen: boolean
  certificate: Certificate | null
  onClose: () => void
}) {
  if (!isOpen || !certificate) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X size={28} />
        </button>
        <div className="relative w-full rounded-lg overflow-hidden bg-gray-900 shadow-2xl">
          <Image
            src={certificate.imageUrl}
            alt={certificate.name}
            width={800}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>
        <p className="text-center text-gray-300 mt-4 text-sm">{certificate.issuer}</p>
      </motion.div>
    </div>
  )
}

export default function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Certifications
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional credentials and continuous learning achievements
          </p>
        </motion.div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedCertificate(cert)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg glass-effect p-4 h-full flex flex-col hover-glow transition-all duration-300">
                {/* Image */}
                <div className="relative w-full h-40 mb-4 overflow-hidden rounded-md bg-gray-800">
                  <Image
                    src={cert.imageUrl}
                    alt={cert.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Text Content */}
                <div className="flex-grow">
                  <h3 className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">{cert.issuer}</p>
                  {cert.date && <p className="text-gray-500 text-xs mt-2">{cert.date}</p>}
                </div>

                {/* Hover CTA */}
                <div className="mt-4 pt-4 border-t border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-blue-400 text-xs font-medium">Click to enlarge</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <CertificateModal
        isOpen={selectedCertificate !== null}
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  )
}
