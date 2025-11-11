import { useState } from 'react'
import './App.css'
import parkingImg from './assets/image/parkingSpace/Screenshot 2024-12-02 142249.png'
import capstoneImg from './assets/image/capstone/Screenshot 2025-07-30 115909.png'
import rusunuaImg from './assets/image/rusunawa/image.png'
import chatWaifuImg from './assets/image/chatWaifu/image.png'
import chatWaifu1 from './assets/image/chatWaifu/image1.png'
import chatWaifu2 from './assets/image/chatWaifu/Screenshot 2025-11-11 122854.png'
import chatWaifu3 from './assets/image/chatWaifu/Screenshot 2025-11-11 122958.png'
import chatWaifu4 from './assets/image/chatWaifu/Screenshot 2025-11-11 123112.png'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import capstone1 from './assets/image/capstone/Screenshot 2025-07-30 115909.png'
import capstone2 from './assets/image/capstone/Screenshot_20231222_105511.png'
import parking1 from './assets/image/parkingSpace/Screenshot 2024-12-02 142249.png'
import parking2 from './assets/image/parkingSpace/Screenshot 2024-12-02 142405.png'
import parking3 from './assets/image/parkingSpace/Screenshot 2024-12-02 142930.png'

import rusunawa1 from './assets/image/rusunawa/Screenshot 2025-07-02 094102.png'
import rusunawa2 from './assets/image/rusunawa/Screenshot 2025-07-02 094405.png'
import rusunawa3 from './assets/image/rusunawa/Screenshot 2025-07-02 094411.png'
import rusunawa4 from './assets/image/rusunawa/Screenshot 2025-07-02 094505.png'
import rusunawa5 from './assets/image/rusunawa/Screenshot 2025-07-02 094635.png'
import rusunawa6 from './assets/image/rusunawa/Screenshot 2025-07-02 100017.png'
import rusunawa7 from './assets/image/rusunawa/Screenshot 2025-07-16 150849.png'
import rusunawa8 from './assets/image/rusunawa/Screenshot 2025-07-16 150911.png'

import sertifikatBangkit from './assets/image/sertifikat/sertifikat bangkit.png'
import sertifikatCcit from './assets/image/sertifikat/sertifikat ccit.jpg'
import sertifikatAlibaba from './assets/image/sertifikat/sertifikat-alibaba-cloud.jpg'
import sertifikatToeic from './assets/image/sertifikat/sertifikat-toeic.jpg'
const Menu = ({ showMenu, toggleMenu }: { showMenu: string, toggleMenu: () => void }) => {
  return (
    <div className={`menu-container ${showMenu}`}>
      <div className="overlay"></div>
      <div className="menu-items">
        <ul>
          <li><a href="#welcome-section" onClick={toggleMenu}>HOME</a></li>
          <li><a href="#about" onClick={toggleMenu}>ABOUT</a></li>
          <li><a href="#projects" onClick={toggleMenu}>PORTFOLIO</a></li>
          <li><a href="#certificates" onClick={toggleMenu}>CERTIFICATES</a></li>
          <li><a href="#contact" onClick={toggleMenu}>CONTACT</a></li>
        </ul>
        <SocialLinks />
      </div>
    </div>
  )
}

// Nav Component
const Nav = ({ toggleMenu, showMenu }: { toggleMenu: () => void, showMenu: string }) => {
  return (
    <nav id="navbar">
      <div className="nav-wrapper">
        <p className="brand">ayub<strong>subagiya</strong></p>
        <button
          onClick={toggleMenu}
          className={`menu-button ${showMenu === 'active' ? 'active' : ''}`}
        >
          <span></span>
        </button>
      </div>
    </nav>
  )
}

// Header Component
const Header = () => {
  return (
    <header id="welcome-section">
      <div className="forest"></div>
      <div className="silhouette"></div>
      <div className="moon"></div>
      <div className="container">
        <h1>
          <span className="line">I am</span>
          <span className="line">Ayub Subagiya</span>
          <span className="line">
            <span className="color">&</span> Back End Developer
          </span>
        </h1>
        <div className="buttons">
          <a href="#projects">my portfolio</a>
          <a href="#contact" className="cta">get in touch</a>
        </div>
      </div>
    </header>
  )
}

// About Component
const About = () => {
  return (
    <section id="about">
      <div className="wrapper">
        <article>
          <div className="title">
            <h3>Who's this guy?</h3>
            <p className="separator"></p>
          </div>
          <div className="desc full">
            <h4 className="subtitle">My name is Ayub Subagiya</h4>
            <p>Dedicated Back-End Developer with experience in microservices, cloud computing. Proficient in GoLang, PostgreSQL, and cloud technologies. Skilled in problem-solving, system architecture, and agile collaboration.</p>
          </div>
          <div className="title">
            <h3>What does he do?</h3>
            <p className="separator"></p>
          </div>
          <div className="desc">
            <h4 className="subtitle">I'm a programmer.</h4>
            <p>For the junior 👶 back-end I work with GoLang, PostgreSQL, and cloud technologies like Google Cloud Platform. I also work with Python for various projects.</p>
          </div>
          <div className="desc">
            <h4 className="subtitle">Also a learner.</h4>
            <p>I have experience in geospatial data processing, real-time systems, and collaborative development in agile environments.</p>
          </div>
        </article>
      </div>
    </section>
  )
}

// Project Component
const Project = ({ img, title, tech, repo, link, images = [], demoLinks, children }: { img: string, title: string, tech: string, repo?: string, link?: string, images?: string[], demoLinks?: {label: string, url: string}[], children: React.ReactNode }) => {
  const techIcons: { [key: string]: string } = {
    golang: 'fab fa-go',
    python: 'fab fa-python',
    postgresql: 'fas fa-database',
    gcp: 'fab fa-google'
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <div>
      <div className="project">
        <a className="project-link" href={link || 'http://'} target="_blank" rel="noopener noreferrer">
          <img className="project-image" src={img} alt={`Screenshot of ${title}`} />
        </a>
        <div className="project-details">
          <div className="project-tile">
            <p className="icons">
              {tech.split(' ').map((t: string) => (
                <i className={techIcons[t]} key={t}></i>
              ))}
            </p>
            {title}
          </div>
          {children}
          <div className="buttons">
            {repo && repo !== '#' && (
              <a href={repo} target="_blank" rel="noopener noreferrer">
                View source <i className="fas fa-external-link-alt"></i>
              </a>
            )}
            {link && link !== '#' && (
              <a href={link} target="_blank" rel="noopener noreferrer">
                Try it Live <i className="fas fa-external-link-alt"></i>
              </a>
            )}
            {demoLinks && demoLinks.map((demo, index) => (
              <a key={index} href={demo.url} target="_blank" rel="noopener noreferrer">
                {demo.label} <i className="fas fa-external-link-alt"></i>
              </a>
            ))}
          </div>
        </div>
      </div>
      {images.length > 0 && (
        <div className="project-slideshow">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="slide-image">
                <img src={image} alt={`${title} screenshot ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  )
}

// Projects Component
const Projects = () => {
  return (
    <section id="projects">
      <div className="projects-container">
        <div className="heading">
          <h3 className="title">My Work</h3>
          <p className="separator"></p>
          <p className="subtitle">
            Here's a selection of projects I've worked on recently. These showcase my skills in back-end development, cloud computing, and system architecture.
          </p>
        </div>
        <div className="projects-wrapper">
          <Project
            title="Parking Space Monitoring System"
            img={parkingImg}
            tech="golang postgresql gcp"
            repo="#"
            link="#"
            images={[parking1, parking2, parking3]}
          >
            <small>Blue Bird Group - 2024-2025</small>
            <p>Comprehensive parking space monitoring system using GoLang, gRPC, REST APIs, PostgreSQL GIS, and Tile38 for real-time location tracking.</p>
          </Project>
          <Project
            title="Capstone Project GCP"
            img={capstoneImg}
            tech="python gcp"
            repo="#"
            link="#"
            images={[capstone1, capstone2]}
          >
            <small>Bangkit Academy - 2023-2024</small>
            <p>Scalable application using Google Cloud services: Compute Engine, Cloud Storage, BigQuery, Vertex AI, and Cloud Functions.</p>
          </Project>
          <Project
            title="Skripsi Management Rusunawa"
            img={rusunuaImg}
            tech="golang react postgresql"
            repo="#"
            link="#"
            images={[rusunawa1, rusunawa2, rusunawa3, rusunawa4, rusunawa5, rusunawa6, rusunawa7, rusunawa8]}
            demoLinks={[
              {label: "Demo Penyewa", url: "https://rusunawa-frontend.vercel.app/tenant/login"},
              {label: "Demo Admin", url: "https://rusunawa-frontend.vercel.app/admin/login"}
            ]}
          >
            <small>Final Project - 2024-2025</small>
            <p>A comprehensive, production-ready room rental management system designed for student accommodation and dormitory management. Built with modern microservices architecture using Go, gRPC, React, and PostgreSQL. For full demo with backend, contact me to activate the backend.</p>
            <details style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '5px', cursor: 'pointer' }}>
              <summary style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>📋 Key Highlights</summary>
              <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                <p><strong>🎯 Project Overview:</strong> Rusunawa is a complete digital transformation solution for traditional room rental management. It addresses the challenges of manual booking processes, payment tracking, document management, and tenant administration through an integrated web-based platform.</p>
                <p><strong>🚀 Features:</strong></p>
                <ul style={{ marginLeft: '1.5rem' }}>
                  <li>Microservices Architecture: Scalable gRPC-based backend with REST gateway</li>
                  <li>Real-time Operations: Live updates and notifications</li>
                  <li>Payment Integration: Seamless Midtrans payment gateway</li>
                  <li>Document Management: Automated verification workflows</li>
                  <li>Analytics Dashboard: Comprehensive business intelligence</li>
                  <li>Mobile-First Design: Responsive UI for all devices</li>
                </ul>
              </div>
            </details>
          </Project>
          <Project
            title="Chat Waifu"
            img={chatWaifuImg}
            tech="python"
            link="https://web-production-d0fd.up.railway.app/"
            images={[chatWaifu1, chatWaifu2, chatWaifu3, chatWaifu4, chatWaifuImg]}
          >
            <small>Personal Project</small>
            <p>A Flask-based chatbot for Genshin Impact and Honkai Star Rail characters, featuring audio responses and customizable templates. Integrates AI models API from Google Gemini, OpenRouter, OpenAI, with Cloudinary for storage and Fish Audio SDK for audio.</p>
          </Project>
        </div>
      </div>
    </section>
  )
}

// Modal Component for Certificate Zoom
const CertificateModal = ({ isOpen, imageSrc, imageAlt, onClose }: { isOpen: boolean, imageSrc: string, imageAlt: string, onClose: () => void }) => {
  if (!isOpen) return null

  return (
    <div className="certificate-modal-backdrop" onClick={onClose}>
      <div className="certificate-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <img src={imageSrc} alt={imageAlt} className="modal-image" />
      </div>
    </div>
  )
}

// Certificates Component
const Certificates = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedAlt, setSelectedAlt] = useState('')

  const openModal = (imageSrc: string, imageAlt: string) => {
    setSelectedImage(imageSrc)
    setSelectedAlt(imageAlt)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <section id="certificates">
      <CertificateModal isOpen={modalOpen} imageSrc={selectedImage} imageAlt={selectedAlt} onClose={closeModal} />
      <div className="certificates-container">
        <div className="heading">
          <h3 className="title">Certificates</h3>
          <p className="separator"></p>
          <p className="subtitle">
            Here are some of my professional certifications that demonstrate my commitment to continuous learning and expertise in various technologies.
          </p>
        </div>
        <div className="certificates-wrapper">
          <div className="certificate-item">
            <img 
              src={sertifikatBangkit} 
              alt="Bangkit Certificate"
              onClick={() => openModal(sertifikatBangkit, 'Bangkit Certificate')}
              style={{ cursor: 'pointer' }}
            />
            <p>Bangkit Academy</p>
          </div>
          <div className="certificate-item">
            <img 
              src={sertifikatCcit} 
              alt="CCIT Certificate"
              onClick={() => openModal(sertifikatCcit, 'CCIT Certificate')}
              style={{ cursor: 'pointer' }}
            />
            <p>CCIT Certification</p>
          </div>
          <div className="certificate-item">
            <img 
              src={sertifikatAlibaba} 
              alt="Alibaba Cloud Certificate"
              onClick={() => openModal(sertifikatAlibaba, 'Alibaba Cloud Certificate')}
              style={{ cursor: 'pointer' }}
            />
            <p>Alibaba Cloud</p>
          </div>
          <div className="certificate-item">
            <img 
              src={sertifikatToeic} 
              alt="TOEIC Certificate"
              onClick={() => openModal(sertifikatToeic, 'TOEIC Certificate')}
              style={{ cursor: 'pointer' }}
            />
            <p>TOEIC</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitStatus('loading')

    try {
      // Using Formspree - emails go directly to ayubsubagiya@gmail.com
      const response = await fetch('https://formspree.io/f/xeovqkqe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setStatusMessage('✓ Email berhasil dikirim! Saya akan segera membalas pesan Anda.')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
        setStatusMessage('✗ Gagal mengirim email. Silakan coba lagi atau hubungi langsung via WhatsApp.')
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage('✗ Terjadi error. Silakan hubungi via WhatsApp: 089697979954')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact">
      <div className="container">
        <div className="heading-wrapper">
          <div className="heading">
            <h2 className="title">Get In Touch</h2>
            <p className="separator"></p>
            <p className="subtitle">
              Have a project in mind or just want to chat? I'd love to hear from you.
              Send me a message and let's discuss how we can work together.
            </p>
          </div>
          <div className="contact-info-wrapper">
            <SocialLinks />
            <div className="contact-details">
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <div>
                  <p className="contact-label">Phone</p>
                  <a href="https://wa.me/6289697979954" target="_blank" rel="noopener noreferrer">
                    +62 896 9797 9954
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <p className="contact-label">Email</p>
                  <a href="mailto:ayubsubagiya@gmail.com">ayubsubagiya@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <p className="contact-label">Location</p>
                  <p>Bekasi, Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form id="contact-form" onSubmit={handleSubmit}>
          <input 
            placeholder="Name" 
            name="name" 
            type="text" 
            value={formData.name}
            onChange={handleInputChange}
            required 
          />
          <input 
            placeholder="Email" 
            name="email" 
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
          <textarea 
            placeholder="Message" 
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
          <div className="form-actions">
            <input 
              className="button" 
              id="submit" 
              name="submit" 
              type="submit" 
              value={submitStatus === 'loading' ? 'Sending...' : 'Submit'}
              disabled={submitStatus === 'loading'}
            />
            {submitStatus === 'success' && <p className="success-message">{statusMessage}</p>}
            {submitStatus === 'error' && <p className="error-message">{statusMessage}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer>
      <div className="wrapper">
        <h3>AYUB SUBAGIYA</h3>
        <p>©2025 • ayubsubagiya@gmail.com</p>
      </div>
    </footer>
  )
}

// Social Links Component
const SocialLinks = () => {
  return (
    <div className="social">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-github"></i>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-linkedin"></i>
      </a>
      <a href="mailto:ayubsubagiya@gmail.com">
        <i className="fas fa-envelope"></i>
      </a>
    </div>
  )
}

// Main App Component
function App() {
  const [showMenu, setShowMenu] = useState('')

  const toggleMenu = () => {
    setShowMenu(showMenu === 'active' ? '' : 'active')
  }

  return (
    <>
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
