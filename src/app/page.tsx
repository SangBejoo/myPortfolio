'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { FeaturedOrganizations } from '@/components/FeaturedOrganizations'
import { ConnectSection } from '@/components/ConnectSection'
import { Experience } from '@/components/Experience'
import { ProjectVN } from '@/components/vn/ProjectVN'
import Certificates from '@/components/Certificates'
import { TechStack } from '@/components/TechStack'
import { useEffect, useState } from 'react'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="bg-white text-black overflow-x-hidden selection:bg-bmw-estoril/20">
      <Navigation />
      {/* Progress tachometer bar under nav */}
      <div className="fixed top-[59px] sm:top-[63px] left-0 right-0 z-40 pointer-events-none">
        <div className="h-[2px] bg-bmw-titan/10">
          <div className="h-full bg-gradient-to-r from-bmw-estoril to-bmw-daytona transition-all duration-150" style={{ width: `${scrollProgress}%`, boxShadow: '0 0 8px rgba(0,102,177,0.5)' }} />
        </div>
      </div>

      <div className="pt-[59px] sm:pt-[63px]">
        <Hero />
        <About />
        <FeaturedOrganizations />
        <ConnectSection />
        <Experience />
        <ProjectVN />
        <TechStack />
        <Certificates />
        <Footer />
      </div>

      {/* VN-style bottom hint on mobile */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 hidden sm:flex pointer-events-none">
        <span className="px-3 py-1 rounded-full glass-effect-strong text-[10px] font-mono tracking-widest text-bmw-mineral opacity-60">
          ◀ click dialogue • arrow keys • auto ▶
        </span>
      </div>
    </main>
  )
}
