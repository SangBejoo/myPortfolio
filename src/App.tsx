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
import authorImg from './assets/image/author/IMG_20210606_145729_903.jpg'

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
          <div className="about-content">
            <div className="profile-image-container">
              <img src={authorImg} alt="Ayub Subagiya" className="profile-image" />
              <div className="profile-glow"></div>
            </div>
            <div className="about-text">
              <div className="desc full">
                <h4 className="subtitle">My name is Ayub Subagiya</h4>
                <p>Dedicated Back-End Developer with experience in microservices, cloud computing. Proficient in GoLang, PostgreSQL, and cloud technologies. Skilled in problem-solving, system architecture, and agile collaboration.</p>
              </div>
            </div>
          </div>
          <div className="title">
            <h3>What does he do?</h3>
            <p className="separator"></p>
          </div>
          <div className="skills-grid">
            <div className="desc">
              <h4 className="subtitle">I'm a programmer.</h4>
              <p>For the junior 👶 back-end I work with GoLang, PostgreSQL, and cloud technologies like Google Cloud Platform. I also work with Python for various projects.</p>
            </div>
            <div className="desc">
              <h4 className="subtitle">Also a learner.</h4>
              <p>I have experience in geospatial data processing, real-time systems, and collaborative development in agile environments.</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

// Tech Icon Component
const TechIcon = ({ tech }: { tech: string }) => {
  const icons: { [key: string]: React.ReactNode } = {
    golang: (
      <svg viewBox="0 0 32 32" width="24" height="24" className="tech-svg-icon">
        <path d="M5.987,17.15c-.04.826.865.444,1.239.186.355-.245.459-.041.49-.525a7.937,7.937,0,0,0,.039-.955,2.342,2.342,0,0,0-1.56.4c-.227.165-.651.69-.208.9" style={{fill:'#f6d2a2'}}/>
        <path d="M7.894,7.309C4.731,6.42,7.083,2.4,9.622,4.052Z" style={{fill:'#6ad7e5'}}/>
        <path d="M21.944,3.75c2.5-1.758,4.765,2.209,1.856,3.207Z" style={{fill:'#6ad7e5'}}/>
        <path d="M22.483,27.317c.636.393,1.8,1.583.844,2.16-.916.839-1.429-.921-2.234-1.165A2.225,2.225,0,0,1,22.483,27.317Z" style={{fill:'#f6d2a2'}}/>
        <path d="M11.124,28.662c-.746.115-1.166.789-1.788,1.131-.586.35-.811-.112-.863-.206-.092-.042-.084.039-.226-.1C7.7,28.625,8.812,28,9.39,27.572,10.195,27.409,10.7,28.107,11.124,28.662Z" style={{fill:'#f6d2a2'}}/>
        <path d="M8.026,6.2c-.417-.221-.723-.52-.468-1,.236-.447.675-.4,1.092-.178Z"/>
        <path d="M23.141,5.778c.417-.221.723-.52.468-1-.236-.447-.675-.4-1.092-.178Z"/>
        <path d="M26.013,17.046c-.04.826-.865.444-1.239.186-.355-.245-.459-.041-.49-.525a7.936,7.936,0,0,1-.039-.955,2.342,2.342,0,0,1,1.56.4c.227.165.651.69.208.9" style={{fill:'#f6d2a2'}}/>
        <path d="M15.683,2.079c3.166,0,6.134.453,7.681,3.495,1.389,3.409.895,7.086,1.107,10.689.182,3.094.585,6.668-.85,9.536-1.51,3.016-5.283,3.775-8.392,3.664-2.442-.087-5.391-.884-6.769-3.115-1.617-2.617-.851-6.509-.734-9.421.139-3.449-.934-6.91.2-10.285,1.176-3.5,4.346-4.293,7.758-4.563" style={{fill:'#6ad7e5'}}/>
        <path d="M16.242,6.329c.568,3.3,5.97,2.431,5.194-.9-.7-2.988-5.383-2.161-5.194.9" style={{fill:'#ffffff'}}/>
        <path d="M9.788,6.863C10.524,9.74,15.13,9,14.956,6.118c-.208-3.456-5.873-2.789-5.169.745" style={{fill:'#ffffff'}}/>
        <path d="M16.894,10.294a7.45,7.45,0,0,1,.016,1.369c-.11.207-.325.229-.51.313a.751.751,0,0,1-.575-.449,9.72,9.72,0,0,1,.041-1.549Z" style={{fill:'#ffffff'}}/>
        <ellipse cx="11.058" cy="6.394" rx="0.778" ry="0.842"/>
        <ellipse cx="11.412" cy="6.584" rx="0.183" ry="0.214" style={{fill:'#fff'}}/>
        <ellipse cx="17.574" cy="6.184" rx="0.765" ry="0.842"/>
        <ellipse cx="17.922" cy="6.374" rx="0.18" ry="0.214" style={{fill:'#fff'}}/>
        <path d="M14.671,10.247c-.339.822.189,2.467,1.11,1.254a9.72,9.72,0,0,1,.041-1.549Z" style={{fill:'#ffffff'}}/>
        <path d="M14.787,8.663a1,1,0,0,0-.821,1.4c.435.788,1.407-.07,2.013.011.7.014,1.268.737,1.827.131.622-.674-.268-1.331-.964-1.624Z" style={{fill:'#f6d2a2'}}/>
        <path d="M14.708,8.63C14.661,7.535,16.75,7.4,17,8.315s-2.186,1.128-2.289.316Z"/>
      </svg>
    ),
    postgresql: (
      <svg viewBox="-4 0 264 264" width="24" height="24" className="tech-svg-icon">
        <path d="M255.008 158.086c-1.535-4.649-5.556-7.887-10.756-8.664-2.452-.366-5.26-.21-8.583.475-5.792 1.195-10.089 1.65-13.225 1.738 11.837-19.985 21.462-42.775 27.003-64.228 8.96-34.689 4.172-50.492-1.423-57.64C233.217 10.847 211.614.683 185.552.372c-13.903-.17-26.108 2.575-32.475 4.549-5.928-1.046-12.302-1.63-18.99-1.738-12.537-.2-23.614 2.533-33.079 8.15-5.24-1.772-13.65-4.27-23.362-5.864-22.842-3.75-41.252-.828-54.718 8.685C6.622 25.672-.937 45.684.461 73.634c.444 8.874 5.408 35.874 13.224 61.48 4.492 14.718 9.282 26.94 14.237 36.33 7.027 13.315 14.546 21.156 22.987 23.972 4.731 1.576 13.327 2.68 22.368-4.85 1.146 1.388 2.675 2.767 4.704 4.048 2.577 1.625 5.728 2.953 8.875 3.74 11.341 2.835 21.964 2.126 31.027-1.848.056 1.612.099 3.152.135 4.482.06 2.157.12 4.272.199 6.25.537 13.374 1.447 23.773 4.143 31.049.148.4.347 1.01.557 1.657 1.345 4.118 3.594 11.012 9.316 16.411 5.925 5.593 13.092 7.308 19.656 7.308 3.292 0 6.433-.432 9.188-1.022 9.82-2.105 20.973-5.311 29.041-16.799 7.628-10.86 11.336-27.217 12.007-52.99.087-.729.167-1.425.244-2.088l.16-1.362 1.797.158.463.031c10.002.456 22.232-1.665 29.743-5.154 5.935-2.754 24.954-12.795 20.476-26.351" fill="#336791"/>
        <path d="M108.076 81.525c-2.68-.373-5.107-.028-6.335.902-.69.523-.904 1.129-.962 1.546-.154 1.105.62 2.327 1.096 2.957 1.346 1.784 3.312 3.01 5.258 3.28.282.04.563.058.842.058 3.245 0 6.196-2.527 6.456-4.392.325-2.336-3.066-3.893-6.355-4.35M196.86 81.599c-.256-1.831-3.514-2.353-6.606-1.923-3.088.43-6.082 1.824-5.832 3.659.2 1.427 2.777 3.863 5.827 3.863.258 0 .518-.017.78-.054 2.036-.282 3.53-1.575 4.24-2.32 1.08-1.136 1.706-2.402 1.591-3.225" fill="#FFF"/>
        <path d="M247.802 160.025c-1.134-3.429-4.784-4.532-10.848-3.28-18.005 3.716-24.453 1.142-26.57-.417 13.995-21.32 25.508-47.092 31.719-71.137 2.942-11.39 4.567-21.968 4.7-30.59.147-9.463-1.465-16.417-4.789-20.665-13.402-17.125-33.072-26.311-56.882-26.563-16.369-.184-30.199 4.005-32.88 5.183-5.646-1.404-11.801-2.266-18.502-2.376-12.288-.199-22.91 2.743-31.704 8.74-3.82-1.422-13.692-4.811-25.765-6.756-20.872-3.36-37.458-.814-49.294 7.571-14.123 10.006-20.643 27.892-19.38 53.16.425 8.501 5.269 34.653 12.913 59.698 10.062 32.964 21 51.625 32.508 55.464 1.347.449 2.9.763 4.613.763 4.198 0 9.345-1.892 14.7-8.33a529.832 529.832 0 0 1 20.261-22.926c4.524 2.428 9.494 3.784 14.577 3.92.01.133.023.266.035.398a117.66 117.66 0 0 0-2.57 3.175c-3.522 4.471-4.255 5.402-15.592 7.736-3.225.666-11.79 2.431-11.916 8.435-.136 6.56 10.125 9.315 11.294 9.607 4.074 1.02 7.999 1.523 11.742 1.523 9.103 0 17.114-2.992 23.516-8.781-.197 23.386.778 46.43 3.586 53.451 2.3 5.748 7.918 19.795 25.664 19.794 2.604 0 5.47-.303 8.623-.979 18.521-3.97 26.564-12.156 29.675-30.203 1.665-9.645 4.522-32.676 5.866-45.03 2.836.885 6.487 1.29 10.434 1.289 8.232 0 17.731-1.749 23.688-4.514 6.692-3.108 18.768-10.734 16.578-17.36z" fill="#FFF"/>
      </svg>
    ),
    python: <i className="fab fa-python"></i>,
    gcp: <i className="fab fa-google"></i>,
    react: <i className="fab fa-react"></i>
  }
  
  return <span className="tech-icon">{icons[tech] || <i className="fas fa-code"></i>}</span>
}

// Project Component
const Project = ({ img, title, tech, repo, link, images = [], demoLinks, children }: { img: string, title: string, tech: string, repo?: string, link?: string, images?: string[], demoLinks?: {label: string, url: string}[], children: React.ReactNode }) => {
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
        <a className="project-link" href={link || '#'} target="_blank" rel="noopener noreferrer">
          <img className="project-image" src={img} alt={`Screenshot of ${title}`} />
        </a>
        <div className="project-details">
          <div className="project-tile">
            <p className="icons">
              {tech.split(' ').map((t: string) => (
                <TechIcon key={t} tech={t} />
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
            <small>Final Project - 2024-2025 ver 1</small>
            <p>A comprehensive, v1 production ready room rental management system designed for student accommodation and dormitory management. Built with modern microservices architecture using Go for Back-End, React for Front-End, and PostgreSQL. We know this Project need more to do so!</p>
            <details style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '5px', cursor: 'pointer' }}>
              <summary style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1.1rem' }}>📋 Key Highlights</summary>
              <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: '#333' }}>🎯 Project Overview</h4>
                <p>Rusunawa is a complete digital transformation solution for traditional room rental management. It addresses the challenges of manual booking processes, payment tracking, document management, and tenant administration through an integrated web-based platform.</p>
                
                <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: '#333' }}>🚀 Features</h4>
                <ul style={{ marginLeft: '1.5rem', listStyleType: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}><strong>Microservices Architecture:</strong> Scalable gRPC-based backend with REST gateway</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>Real-time Operations:</strong> Live update </li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>Payment Integration:</strong> Seamless Sandbox Midtrans payment gateway</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>Document Management:</strong> Automated verification workflows</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>Analytics Dashboard:</strong> Comprehensive business intelligence</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>Mobile-First Design:</strong> Responsive UI for all devices</li>
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
