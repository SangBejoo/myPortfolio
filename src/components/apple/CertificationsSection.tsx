'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Award, ExternalLink, X } from 'lucide-react'
import { portfolioData, CertificationData } from '@/data/portfolioData'

export function CertificationsSection() {
  const [activeCert, setActiveCert] = useState<CertificationData | null>(null)

  return (
    <section id="certifications" className="py-16 border-b border-apple-border">
      <div className="max-w-apple mx-auto px-4 sm:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-caption font-semibold text-apple-blue tracking-wider uppercase">
              <Award size={13} />
              <span>Accreditations</span>
            </div>
            <h2 className="text-title1 font-bold text-apple-text tracking-tight">
              Certifications
            </h2>
          </div>
          <p className="text-caption text-apple-text-secondary">
            Industry-validated qualifications and specialized engineering credentials.
          </p>
        </div>

        {/* 4-Col Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolioData.certifications.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setActiveCert(cert)}
              className="apple-card p-4 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                {/* Badge Image Thumbnail */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#EFE9D8] border border-apple-border">
                  <Image
                    src={cert.badgeImage}
                    alt={cert.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-subhead font-semibold text-apple-text group-hover:text-apple-blue transition-colors line-clamp-2">
                    {cert.name}
                  </h3>
                  <p className="text-caption text-apple-text-secondary line-clamp-1">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-apple-border flex items-center justify-between text-[11px] font-mono">
                <span className="text-apple-text-tertiary">{cert.date}</span>
                <span className="text-apple-blue font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  View ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D1D1F]/45 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="relative max-w-xl w-full bg-[#FFFDF5] border-[3px] border-[#1D1D1F] rounded-appleModal p-6 shadow-[8px_8px_0_#1D1D1F] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="apple-badge !text-apple-blue !bg-apple-blue/10 !border-apple-blue/20">
                {activeCert.issuer}
              </span>
              <button
                onClick={() => setActiveCert(null)}
                className="w-7 h-7 rounded-full bg-[#1D1D1F]/5 hover:bg-[#1D1D1F]/10 flex items-center justify-center text-apple-text-secondary hover:text-[#1D1D1F]"
              >
                <X size={14} />
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#EFE9D8] border border-apple-border">
              <Image
                src={activeCert.badgeImage}
                alt={activeCert.name}
                fill
                className="object-contain"
              />
            </div>

            <div>
              <h3 className="text-title3 font-bold text-apple-text">
                {activeCert.name}
              </h3>
              <p className="text-caption text-apple-text-secondary mt-1">
                Issued: {activeCert.date}
              </p>
              {activeCert.description && (
                <p className="text-body text-apple-text-secondary mt-2 leading-relaxed">
                  {activeCert.description}
                </p>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              {activeCert.verifyUrl && (
                <a
                  href={activeCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-btn-primary !h-8 !text-caption"
                >
                  <span>Verify Credential</span>
                  <ExternalLink size={13} />
                </a>
              )}
              <button
                onClick={() => setActiveCert(null)}
                className="apple-btn-secondary !h-8 !text-caption"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
