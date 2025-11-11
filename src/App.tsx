import { useState } from 'react'
import parkingImg from './assets/image/parkingSpace/Screenshot 2024-12-02 142249.png'
import capstoneImg from './assets/image/capstone/Screenshot 2025-07-30 115909.png'
import rusunuaImg from './assets/image/rusunawa/image.png'
import chatWaifuImg from './assets/image/chatWaifu/image.png'
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

// Menu Component
const Menu = ({ showMenu, toggleMenu }: { showMenu: string, toggleMenu: () => void }) => {
  return (
    <div className={`menu-container ${showMenu}`}>
      <div className="overlay"></div>
      <div className="menu-items">
        <ul>
          <li><a href="#welcome-section" onClick={toggleMenu}>HOME</a></li>
          <li><a href="#about" onClick={toggleMenu}>ABOUT</a></li>
          <li><a href="#projects" onClick={toggleMenu}>PORTFOLIO</a></li>
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
            <h4 className="subtitle">My name is Ayub.</h4>
            <p>Dedicated Back-End Developer with experience in microservices, cloud computing. Proficient in GoLang, PostgreSQL, and cloud technologies. Skilled in problem-solving, system architecture, and agile collaboration.</p>
          </div>
          <div className="title">
            <h3>What does he do?</h3>
            <p className="separator"></p>
          </div>
          <div className="desc">
            <h4 className="subtitle">I'm a programmer.</h4>
            <p>For the back-end I work with GoLang, PostgreSQL, and cloud technologies like Google Cloud Platform. I also work with Python for various projects.</p>
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
const Project = ({ img, title, tech, repo, link, images = [], children }: { img: string, title: string, tech: string, repo?: string, link?: string, images?: string[], children: React.ReactNode }) => {
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
            <a href={repo || 'http://'} target="_blank" rel="noopener noreferrer">
              View source <i className="fas fa-external-link-alt"></i>
            </a>
            <a href={link || 'http://'} target="_blank" rel="noopener noreferrer">
              Try it Live <i className="fas fa-external-link-alt"></i>
            </a>
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
          >
            <small>Final Project - 2024-2025</small>
            <p>A comprehensive, production-ready room rental management system designed for student accommodation and dormitory management. Built with modern microservices architecture using Go, gRPC, React, and PostgreSQL.</p>
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
            repo="#"
            link="#"
            images={[chatWaifuImg]}
          >
            <small>Personal Project</small>
            <p>A Flask-based chatbot application that allows users to engage with multiple characters from Genshin Impact and Honkai Star Rail. The application supports audio responses, customizable templates, and integrates various AI models to enhance user interaction.</p>
            <details style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '5px', cursor: 'pointer' }}>
              <summary style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>📋 Tech Stack & Configuration</summary>
              <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                <p><strong>Backend:</strong> Python Flask</p>
                <p><strong>AI Models:</strong> Google Cloud, NVIDIA, OpenAI</p>
                <p><strong>Storage & Audio:</strong> Cloudinary, Fish Audio SDK</p>
                <p><strong>Frontend:</strong> HTML5, CSS3, JavaScript</p>
                <p style={{ marginTop: '1rem' }}><strong>⚙️ Configuration:</strong></p>
                <ul style={{ marginLeft: '1.5rem' }}>
                  <li>Character Templates: Character personalities and behaviors are defined in CHARACTER_TEMPLATES dictionary in main.py</li>
                  <li>AI Models: Configure model priorities and rate limits in AUTO_MODEL_SELECTION and FALLBACK_MODELS sections</li>
                  <li>Audio Settings: Manage audio response generation through Fish Audio SDK configurations</li>
                </ul>
              </div>
            </details>
          </Project>
        </div>
      </div>
    </section>
  )
}

// Contact Component
const Contact = () => {
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
          <SocialLinks />
        </div>
        <form id="contact-form" action="#" method="post">
          <input placeholder="Name" name="name" type="text" required />
          <input placeholder="Email" name="email" type="email" required />
          <textarea placeholder="Message" name="message" required></textarea>
          <input className="button" id="submit" name="submit" type="submit" value="Submit" />
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
      <Contact />
      <Footer />
    </>
  )
}

export default App
