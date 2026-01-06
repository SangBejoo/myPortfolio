'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Grid3x3, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface ProjectGalleryProps {
  isOpen: boolean
  projectTitle: string
  images: string[]
  onClose: () => void
  demoLink?: string
  demoText?: string
  testCredentials?: {
    email: string
    password: string
  }
}

export function ProjectGallery({ isOpen, projectTitle, images, onClose, demoLink, demoText, testCredentials }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single')

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full h-full max-w-6xl max-h-[90vh] mx-auto relative flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-700 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{projectTitle} Gallery</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setViewMode(viewMode === 'single' ? 'grid' : 'single')}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  title="Toggle view mode"
                >
                  <Grid3x3 size={20} className="text-gray-300 hover:text-white" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-300 hover:text-white" />
                </button>
              </div>
            </div>
            
            {/* Demo Section */}
            {demoLink && (
              <div className="space-y-3">
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-mono"
                >
                  <ExternalLink size={16} />
                  Try Live: {demoText || 'Demo'}
                </a>
                
                {testCredentials && (
                  <div className="p-3 bg-blue-900/30 border border-blue-600/40 rounded text-sm text-blue-200 font-mono">
                    <p className="font-bold mb-1">Test Credentials:</p>
                    <p>Email: {testCredentials.email}</p>
                    <p>Password: {testCredentials.password}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {viewMode === 'single' ? (
              // Single Image View
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`${projectTitle} - Image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
                    >
                      <ChevronLeft size={24} className="text-white" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
                    >
                      <ChevronRight size={24} className="text-white" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur">
                  <p className="text-white text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                  </p>
                </div>
              </div>
            ) : (
              // Grid View
              <div className="p-6 overflow-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setCurrentIndex(index)
                        setViewMode('single')
                      }}
                      className={`relative aspect-square rounded-lg overflow-hidden group cursor-pointer transition-all ${
                        currentIndex === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${projectTitle} - Thumbnail ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">View</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail Strip (Single View Only) */}
          {viewMode === 'single' && images.length > 1 && (
            <div className="px-6 py-4 border-t border-gray-700 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                      currentIndex === index ? 'ring-2 ring-blue-500 scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
