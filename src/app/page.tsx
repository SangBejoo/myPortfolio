import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { FeaturedOrganizations } from '@/components/FeaturedOrganizations'
import { ConnectSection } from '@/components/ConnectSection'
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
      <FeaturedOrganizations />
      <ConnectSection />
      <Experience />
      <Projects />
      <TechStack />
      <Certificates />
      <Footer />
    </main>
  )
}
