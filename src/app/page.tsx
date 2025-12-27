import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import Certificates from '@/components/Certificates'
import { TechStack } from '@/components/TechStack'

export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <Certificates />
      <Footer />
    </main>
  )
}
