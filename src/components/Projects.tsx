
import Project from './Project';
import parkingImg from '../assets/image/parkingSpace/Screenshot 2024-12-02 142249.png'
import capstoneImg from '../assets/image/capstone/Screenshot 2025-07-30 115909.png'
import rusunuaImg from '../assets/image/rusunawa/image.png'
import chatWaifuImg from '../assets/image/chatWaifu/image.png'
import chatWaifu1 from '../assets/image/chatWaifu/image1.png'
import chatWaifu2 from '../assets/image/chatWaifu/Screenshot 2025-11-11 122854.png'
import chatWaifu3 from '../assets/image/chatWaifu/Screenshot 2025-11-11 122958.png'
import chatWaifu4 from '../assets/image/chatWaifu/Screenshot 2025-11-11 123112.png'
import capstone1 from '../assets/image/capstone/Screenshot 2025-07-30 115909.png'
import capstone2 from '../assets/image/capstone/Screenshot_20231222_105511.png'
import parking1 from '../assets/image/parkingSpace/Screenshot 2024-12-02 142249.png'
import parking2 from '../assets/image/parkingSpace/Screenshot 2024-12-02 142405.png'
import parking3 from '../assets/image/parkingSpace/Screenshot 2024-12-02 142930.png'
import rusunawa1 from '../assets/image/rusunawa/Screenshot 2025-07-02 094102.png'
import rusunawa2 from '../assets/image/rusunawa/Screenshot 2025-07-02 094405.png'
import rusunawa3 from '../assets/image/rusunawa/Screenshot 2025-07-02 094411.png'
import rusunawa4 from '../assets/image/rusunawa/Screenshot 2025-07-02 094505.png'
import rusunawa5 from '../assets/image/rusunawa/Screenshot 2025-07-02 094635.png'
import rusunawa6 from '../assets/image/rusunawa/Screenshot 2025-07-02 100017.png'
import rusunawa7 from '../assets/image/rusunawa/Screenshot 2025-07-16 150849.png'
import rusunawa8 from '../assets/image/rusunawa/Screenshot 2025-07-16 150911.png'

const Projects = () => {
    return (
      <section id="projects">
        <div className="projects-container">
          <div className="heading fade-in-up">
            <h3 className="title section-title fade-in-up">My Works</h3>
            <p className="separator fade-in-up"></p>
            <p className="subtitle fade-in-up">
              Here's a selection of projects I've worked on recently. These showcase my skills in back-end development, cloud computing, and system architecture.
            </p>
          </div>
          <div className="projects-wrapper">
            <div className="fade-in-left stagger-1">
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
            </div>
            <div className="fade-in-right stagger-2">
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
            </div>
            <div className="fade-in-left stagger-3">
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
                <details style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                  <summary style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1.1rem', color: 'var(--text-light)' }}>📋 Key Highlights</summary>
                  <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                    <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: 'var(--primary-light)' }}>🎯 Project Overview</h4>
                    <p style={{ color: 'var(--text-muted)' }}>Rusunawa is a complete digital transformation solution for traditional room rental management. It addresses the challenges of manual booking processes, payment tracking, document management, and tenant administration through an integrated web-based platform.</p>
  
                    <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary-light)' }}>🚀 Features</h4>
                    <ul style={{ marginLeft: '1.5rem', listStyleType: 'none', padding: 0 }}>
                      <li style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--secondary-light)' }}>Microservices Architecture:</strong> Scalable gRPC-based backend with REST gateway</li>
                      <li style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--secondary-light)' }}>Real-time Operations:</strong> Live update </li>
                      <li style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--secondary-light)' }}>Payment Integration:</strong> Seamless Sandbox Midtrans payment gateway</li>
                      <li style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--secondary-light)' }}>Document Management:</strong> Automated verification workflows</li>
                      <li style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--secondary-light)' }}>Analytics Dashboard:</strong> Comprehensive business intelligence</li>
                      <li style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--secondary-light)' }}>Mobile-First Design:</strong> Responsive UI for all devices</li>
                    </ul>
                  </div>
                </details>
              </Project>
            </div>
            <div className="fade-in-right stagger-4">
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
        </div>
      </section>
    )
}

export default Projects;
