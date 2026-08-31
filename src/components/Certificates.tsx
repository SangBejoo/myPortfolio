'use client'

import { motion } from 'framer-motion'
import { X, Award } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface Certificate {
  id: string
  name: string
  issuer: string
  imageUrl: string
  date?: string
  color?: string
}

const certificates: Certificate[] = [
  { id: 'bangkit', name: 'Cloud Computing Specialization', issuer: 'Bangkit Academy', imageUrl: '/images/certificates/bangkit-certificate.png', date: '2023', color: 'estoril' },
  { id: 'alibaba', name: 'Alibaba Cloud Associate', issuer: 'Alibaba Cloud', imageUrl: '/images/certificates/alibaba-certificate.jpg', color: 'daytona' },
  { id: 'ccit', name: 'CCIT Certification', issuer: 'CCIT', imageUrl: '/images/certificates/ccit-certificate.jpg', color: 'titan' },
  { id: 'toeic', name: 'TOEIC English Certificate', issuer: 'TOEIC', imageUrl: '/images/certificates/toeic-certificate.jpg', color: 'mineral' },
]

export function CertificateModal({ isOpen, certificate, onClose }: { isOpen: boolean; certificate: Certificate | null; onClose: () => void }) {
  if (!isOpen || !certificate) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bmw-carbon/90 backdrop-blur-md p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="m-stripe rounded-t-xl" />
        <button onClick={onClose} className="absolute -top-10 right-0 w-9 h-9 rounded-full btn-bmw-ghost flex items-center justify-center">
          <X size={16} />
        </button>
        <div className="relative w-full rounded-2xl overflow-hidden bmw-card">
          <Image src={certificate.imageUrl} alt={certificate.name} width={900} height={650} className="w-full h-auto" priority />
        </div>
        <p className="text-center text-bmw-titan mt-3 text-sm font-mono">{certificate.issuer} • {certificate.name}</p>
      </motion.div>
    </div>
  )
}

export default function Certificates() {
  const [selected, setSelected] = useState<Certificate | null>(null)
  return (
    <section id="certificates" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect text-[11px] font-mono tracking-widest mb-3">
            <Award size={12} className="text-bmw-daytona" /> CHAPTER 05 • ACHIEVEMENTS • MINERAL GREY ARCHIVE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-bmw-alpine">Certifications</h2>
          <div className="w-12 h-[3px] m-stripe rounded-full mx-auto mt-3" />
          <p className="text-bmw-mineral max-w-xl mx-auto mt-3 text-sm">Professional credentials — like badges on a driver’s racing suit.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelected(cert)}
              className="group cursor-pointer"
            >
              <div className="bmw-card rounded-2xl p-3 h-full flex flex-col hover-glow">
                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-bmw-sapphire">
                  <Image src={cert.imageUrl} alt={cert.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur text-white text-[10px] font-mono border border-white/10">{cert.issuer}</span>
                </div>
                <div className="pt-3 flex-1">
                  <h3 className="text-bmw-alpine font-semibold text-sm leading-tight group-hover:text-bmw-daytona transition-colors">{cert.name}</h3>
                  {cert.date && <p className="text-bmw-mineral text-xs mt-1 font-mono">{cert.date}</p>}
                </div>
                <div className="mt-3 pt-3 border-t border-bmw-titan/10 flex items-center justify-between">
                  <span className="text-bmw-mineral text-[11px] font-mono tracking-widest">VIEW CG</span>
                  <span className="w-6 h-6 rounded-full bg-bmw-estoril/10 border border-bmw-estoril/20 flex items-center justify-center text-bmw-daytona text-xs group-hover:bg-bmw-estoril group-hover:text-white transition-colors">↗</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <CertificateModal isOpen={selected !== null} certificate={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
