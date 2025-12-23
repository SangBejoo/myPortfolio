import { useState } from 'react'
import './App.css'
import Menu from './components/Menu'
import Nav from './components/Nav'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingParticles from './components/FloatingParticles'

function App() {
  const [showMenu, setShowMenu] = useState('')

  const toggleMenu = () => {
    setShowMenu(showMenu === 'active' ? '' : 'active')
  }

  return (
    <>
      <FloatingParticles />
      <Menu showMenu={showMenu} toggleMenu={toggleMenu} />
      <Nav toggleMenu={toggleMenu} showMenu={showMenu} />
      <Header />
      <About />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </>
  )
}

export default App


