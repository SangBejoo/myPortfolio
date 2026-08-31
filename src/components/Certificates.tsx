'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { ImageZoom } from './ImageZoom'

interface Certificate {
  id: string
  name: string
  issuer: string
  imageUrl: string
  date?: string
}

const certificates: Certificate[] = [
  { id: 'bangkit', name: 'Cloud Computing Specialization', issuer: 'Bangkit Academy', imageUrl: '/images/certificates/bangkit-certificate.png', date: '2023' },
  { id: 'alibaba', name: 'Alibaba Cloud Associate', issuer: 'Alibaba Cloud', imageUrl: '/images/certificates/alibaba-certificate.jpg' },
  { id: 'ccit', name: 'CCIT Certification', issuer: 'CCIT', imageUrl: '/images/certificates/ccit-certificate.jpg' },
  { id: 'toeic', name: 'TOEIC English Certificate', issuer: 'TOEIC', imageUrl: '/images/certificates/toeic-certificate.jpg' },
]

export function CertificateModal({ isOpen, certificate, onClose }: { isOpen: boolean; certificate: Certificate | null; onClose: () => void }) {
  if (!isOpen || !certificate) return null
  return (
    <ImageZoom src={certificate.imageUrl} alt={certificate.name} isOpen={isOpen} onClose={onClose} title={`${certificate.name} — ${certificate.issuer}`} />
  )
}

export default function Certificates() {
  const [selected, setSelected] = useState<Certificate | null>(null)
  return (
    <section id="certificates" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
      <div className="max-w-[1100px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/5 shadow-sm text-[11px] font-mono tracking-widest mb-3 text-[#6B7280]">
            <Award size={12} className="text-[#009ADA]" /> CHAPTER 05 • ACHIEVEMENTS • BLUE ARCHIVE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">Certifications</h2>
          <div className="w-12 h-[3px] m-stripe rounded-full mx-auto mt-3" />
          <p className="text-[#6B7280] max-w-xl mx-auto mt-3 text-sm">Professional credentials — like badges on a driver’s racing suit.</p>
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
                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-[#F0F7FF] border border-black/5">
                  <Image src={cert.imageUrl} alt={cert.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full bg-white/90 backdrop-blur text-black text-[10px] font-mono border border-black/10">{cert.issuer}</span>
                </div>
                <div className="pt-3 flex-1">
                  <h3 className="text-black font-semibold text-sm leading-tight group-hover:text-[#009ADA] transition-colors">{cert.name}</h3>
                  {cert.date && <p className="text-[#6B7280] text-xs mt-1 font-mono">{cert.date}</p>}
                </div>
                <div className="mt-3 pt-3 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[#6B7280] text-[11px] font-mono tracking-widest">VIEW CG</span>
                  <span className="w-6 h-6 rounded-full bg-[#009ADA]/10 border border-[#009ADA]/15 flex items-center justify-center text-[#009ADA] text-xs group-hover:bg-[#009ADA] group-hover:text-white transition-colors">↗</span>
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
