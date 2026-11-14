export interface ProfileContact {
  type: string
  label: string
  url: string
  icon: string
}

export interface ProfileStat {
  label: string
  value: string
  detail?: string
}

export interface ProfileData {
  name: string
  handle: string
  role: string
  tagline: string
  bio: string
  location: string
  photos: { src: string; label: string; desc: string }[]
  stats: ProfileStat[]
  contacts: ProfileContact[]
  resumeUrl?: string
}

export interface CertificationData {
  id: string
  name: string
  issuer: string
  date: string
  badgeImage: string
  verifyUrl?: string
  skills?: string[]
  description?: string
}

export interface ProjectData {
  id: string
  name: string
  subtitle: string
  organization: {
    name: string
    badge: string
    category: 'erlangga' | 'bluebird' | 'bangkit' | 'independent'
    logo?: string
  }
  description: string
  highlight: string
  stack: string[]
  images: string[]
  codeLink?: string
  repoUrl?: string
  demoUrl?: string
  demoText?: string
  boss?: boolean
  bossHealth?: number
  testCredentials?: { email: string; password: string }
}

export interface ExperienceData {
  role: string
  company: string
  period: string
  description: string
  skills: string[]
  logo: string
}

export interface TechItem {
  name: string
  category: 'Languages' | 'Cloud & DevOps' | 'Databases & Cache' | 'Frameworks'
  icon: string
  level?: string
}

export interface PortfolioConfig {
  profile: ProfileData
  certifications: CertificationData[]
  projects: ProjectData[]
  experiences: ExperienceData[]
  techStack: TechItem[]
}

export const portfolioData: PortfolioConfig = {
  profile: {
    name: 'Ayub Subagiya',
    handle: 'SangBejoo',
    role: 'Staff Web Programmer & Cloud Backend Engineer',
    tagline: 'Precision backend microservices, resilient cloud architectures, and scalable distributed systems.',
    bio: 'Bekasi-born, backend-obsessed software engineer specializing in Golang, Google Cloud Platform, and distributed systems. Currently engineering high-concurrency education platforms at Penerbit Erlangga, with previous experience shipping geospatial fleet microservices at PT Blue Bird Group and graduating from the Bangkit Academy Cloud Computing path.',
    location: 'Bekasi / Jakarta, Indonesia',
    photos: [
      { src: '/images/author/ayub.jpg', label: 'Ayub — Formal', desc: 'Staff Web Programmer @ Erlangga' },
      { src: '/images/author/profile.jpg', label: 'Ayub — Casual', desc: 'Field & Outdoor' },
    ],
    stats: [
      { label: 'Years Experience', value: '2+', detail: 'Enterprise & Microservices' },
      { label: 'Production Systems', value: '10+', detail: 'High Concurrency' },
      { label: 'Certifications', value: '4', detail: 'Cloud & Professional' },
      { label: 'Core Stack', value: 'Go / GCP', detail: 'Postgres & Redis' },
    ],
    contacts: [
      { type: 'email', label: 'Email', url: 'mailto:ayubsubagiya@gmail.com', icon: 'Mail' },
      { type: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/ayub-subagiya', icon: 'Linkedin' },
      { type: 'github', label: 'GitHub', url: 'https://github.com/sangbejoo', icon: 'Github' },
      { type: 'resume', label: 'Download CV', url: '/images/projects/Sertifikat Studi Idependent .pdf', icon: 'FileText' },
    ],
    resumeUrl: '/images/projects/Sertifikat Studi Idependent .pdf',
  },
  certifications: [
    {
      id: 'bangkit-cloud',
      name: 'Cloud Computing Specialization',
      issuer: 'Bangkit Academy led by Google, Tokopedia, Gojek & Traveloka',
      date: '2023',
      badgeImage: '/images/certificates/bangkit-certificate.png',
      skills: ['Google Cloud Platform', 'Terraform IaC', 'Kubernetes', 'Cloud Architecture'],
      description: 'Rigorous 900+ hour Google Cloud computing curriculum covering microservices architecture, Terraform infrastructure as code, containerized deployments, and production reliability.',
      verifyUrl: 'https://grow.google/intl/id_id/bangkit/',
    },
    {
      id: 'alibaba-cloud',
      name: 'Alibaba Cloud Associate (ACA)',
      issuer: 'Alibaba Cloud Certification',
      date: '2023',
      badgeImage: '/images/certificates/alibaba-certificate.jpg',
      skills: ['ECS', 'SLB', 'RDS', 'Cloud Security'],
      description: 'Certified associate proficiency in architecting distributed web applications, auto-scaling server clusters, and managing cloud databases on Alibaba Cloud infrastructure.',
    },
    {
      id: 'ccit-cert',
      name: 'CCIT FTUI Professional Qualification',
      issuer: 'Center for Computing and Information Technology FTUI',
      date: '2023',
      badgeImage: '/images/certificates/ccit-certificate.jpg',
      skills: ['Software Engineering', 'Algorithms', 'Databases'],
      description: 'Validated software development, algorithms, relational database modeling, and practical enterprise application engineering fundamentals.',
    },
    {
      id: 'toeic-english',
      name: 'TOEIC English Proficiency Certificate',
      issuer: 'Educational Testing Service (ETS)',
      date: '2023',
      badgeImage: '/images/certificates/toeic-certificate.jpg',
      skills: ['Technical English', 'International Collaboration'],
      description: 'Certified professional English communication skills for cross-border software teams, technical documentation, and collaborative engineering environments.',
    },
  ],
  projects: [
    {
      id: 'intelecto',
      name: 'Intelecto — LMS & Digital Book Ecosystem',
      subtitle: 'FLAGSHIP BOSS TARGET // High-Concurrency Multi-Tenant Platform & Parent Portal',
      organization: {
        name: 'Penerbit Erlangga',
        category: 'erlangga',
        badge: 'ERLANGGA',
        logo: '/images/erlangga.jpg',
      },
      boss: true,
      bossHealth: 3,
      description: 'Comprehensive national education platform developed at Penerbit Erlangga connecting schools, teachers, students, and parents. Unifies modern LMS classroom workflows, interactive digital book reader, homework grading, Computer-Based Testing (CBT), multi-tenant school administration, and the Intelecto Parent companion ecosystem for real-time student attendance, grade monitoring, and school communications.',
      highlight: 'BOSS TARGET • Production Scale • High Concurrency • Multi-Tenant • Digital Reader • Intelecto Parent',
      stack: ['Golang', 'React', 'GCP', 'PostgreSQL', 'Redis', 'Digital Books', 'LMS', 'Parent Portal'],
      images: [
        '/images/projects/intelecto/Screenshot 2026-08-31 222117.png',
        '/images/projects/intelecto/Screenshot 2026-08-31 222131.png',
        '/images/projects/intelecto/Screenshot 2026-08-31 222149.png',
        '/images/projects/intelecto/Screenshot 2026-08-31 222237.png',
        '/images/projects/intelecto/Screenshot 2026-08-31 222248.png',
        '/images/projects/intelecto/Screenshot 2026-08-31 222254.png',
        '/images/projects/intelecto/Screenshot 2026-08-31 222259.png',
        '/images/projects/intelecto/Screenshot 2026-08-31 222330.png',
        '/images/projects/intelecto/Screenshot 2026-08-31 222335.png',
        '/images/projects/intelecto/Screenshot 2026-08-31 222344.png',
        '/images/projects/intelecto/Screenshot 2026-08-31 222354.png',
        '/images/projects/Intelecto-parent/WhatsApp Image 2026-11-14 at 2.48.41 PM.jpeg',
        '/images/projects/Atinout/Screenshot 2026-03-29 061953.png',
        '/images/projects/Atinout/Screenshot 2026-03-28 095839.png',
        '/images/projects/Atinout/Screenshot 2026-03-28 101818.png',
        '/images/projects/Atinout/Screenshot 2026-03-29 062431.png',
        '/images/projects/Atinout/Screenshot 2026-03-29 072428.png',
      ],
      demoUrl: 'https://lms-intelecto.erlangga.co.id',
      demoText: 'Launch Live Platform',
    },
    {
      id: 'cbt',
      name: 'CBT — Computer Based Test Engine',
      subtitle: 'Fault-Tolerant High-Stakes Examination Engine',
      organization: {
        name: 'Penerbit Erlangga',
        category: 'erlangga',
        badge: 'ERLANGGA',
        logo: '/images/erlangga.jpg',
      },
      description: 'Zero-downtime exam platform with active device anti-cheat locking, sub-millisecond answer auto-save via Redis, and high-concurrency submission bursts when hundreds of examinees submit simultaneously.',
      highlight: '99.9% Uptime • Anti-Cheat Lock • Concurrency Batching • WebSockets',
      stack: ['Golang', 'Next.js', 'MySQL', 'WebSockets', 'Redis', 'Docker'],
      images: [
        '/images/projects/cbt-main.png',
        '/images/projects/cbt-1.png',
        '/images/projects/cbt-2.png',
        '/images/projects/cbt-3.png',
        '/images/projects/cbt-4.png',
        '/images/projects/cbt-5.png',
        '/images/projects/cbt-6.png',
        '/images/projects/cbt-7.png',
        '/images/projects/cbt-8.png',
      ],
      codeLink: 'https://github.com/sangbejoo/cbt-system',
      repoUrl: 'https://github.com/sangbejoo/cbt-system',
      demoUrl: 'https://cbt.sangbejoo.site/',
      demoText: 'Live Exam Demo',
      testCredentials: { email: 'test@gmail.com', password: 'test@gmail.com' },
    },
    {
      id: 'booklens',
      name: 'BookLens by Erlangga',
      subtitle: 'Visual Page Recognition & Interactive Learning Companion',
      organization: {
        name: 'Penerbit Erlangga',
        category: 'erlangga',
        badge: 'ERLANGGA',
        logo: '/images/erlangga.jpg',
      },
      description: 'Official smart learning companion mobile application developed for Penerbit Erlangga bridging physical printed textbooks with interactive digital learning. Powered by on-device visual page recognition camera scanning (instant textbook page detection without manual QR codes), interactive bilingual audio pronunciation guides (such as Mandarin-Indonesian illustrated dictionaries), chapter synopses, and downloadable offline content packages.',
      highlight: 'Visual Page Recognition • Multimedia Audio Streaming • Offline Content • Erlangga Ecosystem',
      stack: ['Golang', 'GCP', 'Android', 'Computer Vision', 'Audio Streaming', 'REST APIs', 'Cloud Storage'],
      images: [
        '/images/projects/Book-lens-Erlangga/WhatsApp Image 2026-11-14 at 3.00.37 PM.jpeg',
        '/images/projects/Book-lens-Erlangga/WhatsApp Image 2026-11-14 at 3.00.37 PM (1).jpeg',
        '/images/projects/Book-lens-Erlangga/WhatsApp Image 2026-11-14 at 3.00.37 PM (2).jpeg',
        '/images/projects/Book-lens-Erlangga/WhatsApp Image 2026-11-14 at 3.00.37 PM (3).jpeg',
        '/images/projects/Book-lens-Erlangga/WhatsApp Image 2026-11-14 at 2.48.42 PM.jpeg',
      ],
      demoUrl: 'https://play.google.com/store/apps/details?id=com.erlangga.scanny',
      demoText: 'Google Play Store',
    },
    {
      id: 'parking',
      name: 'Real-Time Geospatial Parking System',
      subtitle: 'Fleet & Depot Spatial Intelligence with Tile38 & gRPC',
      organization: {
        name: 'PT Blue Bird Group',
        category: 'bluebird',
        badge: 'BLUE BIRD',
        logo: '/images/bluebird.png',
      },
      description: 'Sub-50ms latency geospatial fleet tracking and parking lot occupancy monitoring system engineered during tenure at PT Blue Bird Group using Go, gRPC streaming, Tile38 geofencing, and PostgreSQL GIS.',
      highlight: 'Sub-50ms Latency • GIS Heatmaps • Tile38 Geofencing • gRPC Streaming',
      stack: ['Golang', 'gRPC', 'PostgreSQL GIS', 'Tile38', 'GCP', 'Docker'],
      images: [
        '/images/projects/parking-main.png',
        '/images/projects/parking-1.png',
        '/images/projects/parking-2.png',
      ],
      codeLink: 'https://github.com/sangbejoo/parking-system',
      repoUrl: 'https://github.com/sangbejoo/parking-system',
    },
    {
      id: 'atinout',
      name: 'Atinout — Smart Attendance & Geofencing',
      subtitle: 'Location-Based Geofencing Attendance & Multi-Branch Management',
      organization: {
        name: 'Independent Platform',
        category: 'independent',
        badge: 'GEOFENCING',
      },
      description: 'Location-based smart attendance and geofencing platform engineered for schools and distributed multi-branch organizations. Features interactive Leaflet maps with dynamic polygon/radius geofence boundaries, real-time GPS coordinate verification (sub-15m accuracy validation against designated premises), shift & late arrival scheduling, automated absence/leave reviews, and real-time attendance auditing without manual recaps.',
      highlight: 'Geofencing Verification • Real-Time GPS Validation • Leaflet Maps • Shift & Late Auditing',
      stack: ['React', 'TypeScript', 'Leaflet', 'RESTful APIs', 'Geofencing GIS', 'TailwindCSS'],
      images: [
        '/images/projects/Atinout/Screenshot 2026-11-14 150237.png',
        '/images/projects/Atinout/Screenshot 2026-11-14 150310.png',
        '/images/projects/Atinout/Screenshot 2026-11-14 150357.png',
        '/images/projects/Atinout/Screenshot 2026-11-14 150413.png',
        '/images/projects/Atinout/Screenshot 2026-11-14 150423.png',
        '/images/projects/Atinout/Screenshot 2026-11-14 150443.png',
        '/images/projects/Atinout/Screenshot 2026-11-14 150508.png',
      ],
      demoUrl: 'https://www.atinout.site/#/',
      demoText: 'Launch Live Web Platform',
    },
    {
      id: 'rusunawa',
      name: 'Rusunawa Dormitory Microservices',
      subtitle: 'Enterprise Dormitory Operations & Payment Reconciliation',
      organization: {
        name: 'Independent Platform',
        category: 'independent',
        badge: 'MICROSERVICES',
      },
      description: 'End-to-end dormitory housing platform with multi-tier RBAC (Superadmin, Staff, Tenant), automated Midtrans payment webhooks, asynchronous billing queues, and 100% black-box test coverage.',
      highlight: '100% Black-box Tests • Midtrans Payments • Async Queue • Strict RBAC',
      stack: ['Go', 'gRPC', 'React', 'Docker', 'PostgreSQL', 'Midtrans'],
      images: [
        '/images/projects/rusunawa-main.png',
        '/images/projects/rusunawa-1.png',
        '/images/projects/rusunawa-2.png',
        '/images/projects/rusunawa-3.png',
        '/images/projects/rusunawa-4.png',
        '/images/projects/rusunawa-5.png',
        '/images/projects/rusunawa-6.png',
        '/images/projects/rusunawa-7.png',
        '/images/projects/rusunawa-8.png',
        '/images/projects/rusunawa-9.png',
        '/images/projects/rusunawa-10.png',
        '/images/projects/rusunawa-11.png',
        '/images/projects/rusunawa-12.png',
        '/images/projects/rusunawa-13.png',
        '/images/projects/rusunawa-14.png',
      ],
      codeLink: 'https://github.com/sangbejoo/rusunawa-api',
      repoUrl: 'https://github.com/sangbejoo/rusunawa-api',
      demoUrl: 'https://rusunawa.sangbejoo.site/tenant',
      demoText: 'Tenant Portal',
    },
    {
      id: 'chat-waifu',
      name: 'Chat Waifu — Anime AI Companion',
      subtitle: 'Generative AI Character Bot with Mood Expressions & SSE',
      organization: {
        name: 'AI Experiment',
        category: 'independent',
        badge: 'GEN AI',
      },
      description: 'Interactive character companion powered by Google Gemini LLM API, Flask Server-Sent Events (SSE) streaming, context memory buffers, and dynamic state-based visual novel emotion sprites.',
      highlight: 'Streaming SSE • Dynamic Emotion States • Google Gemini • Anime UI',
      stack: ['Python', 'Flask', 'Gemini API', 'SSE Streaming', 'TailwindCSS'],
      images: [
        '/images/projects/chatwaifu-main.png',
        '/images/projects/chatwaifu-1.png',
        '/images/projects/chatwaifu-2.png',
        '/images/projects/chatwaifu-3.png',
        '/images/projects/chatwaifu-4.png',
      ],
      demoUrl: 'https://chatwaifu.sangbejoo.site/',
      demoText: 'Chat Online',
    },
    {
      id: 'capstone',
      name: 'Bangkit Cloud Computing Capstone',
      subtitle: 'End-to-End GCP Infrastructure as Code',
      organization: {
        name: 'Bangkit Academy',
        category: 'bangkit',
        badge: 'BANGKIT',
        logo: '/images/bangkit.png',
      },
      description: 'Graduation showcase architecture deployed on Google Cloud Platform featuring Terraform declarative infrastructure, Cloud Run autoscaling containers, and automated GitHub Actions CI/CD pipelines.',
      highlight: 'Terraform IaC • Cloud Run Autoscaling • CI/CD Pipelines • GCP VPC',
      stack: ['GCP', 'Terraform', 'Cloud Run', 'Docker', 'GitHub Actions'],
      images: [
        '/images/projects/capstone-main.png',
        '/images/projects/capstone-1.png',
      ],
    },
  ],
  experiences: [
    {
      role: 'Staff Web Programmer',
      company: 'Penerbit Erlangga',
      period: 'Feb 2026 — Present',
      description: 'Architecting and scaling core publishing and educational platforms including Intelecto (LMS, interactive digital reader ecosystem & parent portal) and BookLens (visual book AR & multimedia companion). Designing resilient Golang microservices, PostgreSQL indexing, and Redis caching on Google Cloud Platform.',
      skills: ['Golang', 'React', 'GCP', 'PostgreSQL', 'Redis', 'LMS', 'Mobile APIs'],
      logo: '/images/erlangga.jpg',
    },
    {
      role: 'Backend Developer',
      company: 'PT Blue Bird Group',
      period: 'Oct 2024 — Jan 2025',
      description: 'Developed real-time fleet depot tracking and spatial parking lot monitoring microservices. Engineered high-throughput handlers using Go, gRPC, Tile38 in-memory geofencing, and PostGIS.',
      skills: ['Golang', 'gRPC', 'PostgreSQL GIS', 'Tile38', 'Docker', 'REST APIs'],
      logo: '/images/bluebird.png',
    },
    {
      role: 'Cloud Computing Cohort',
      company: 'Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)',
      period: 'Jun 2023 — Dec 2023',
      description: 'Graduated from Google-sponsored cloud engineering program. Designed automated cloud infrastructure with Terraform IaC, containerized microservices on Cloud Run, and CI/CD pipelines.',
      skills: ['GCP', 'Terraform', 'Kubernetes', 'Cloud Run', 'CI/CD'],
      logo: '/images/bangkit.png',
    },
  ],
  techStack: [
    { name: 'Golang', category: 'Languages', icon: '⚡', level: 'Core Expertise' },
    { name: 'Python', category: 'Languages', icon: '🐍', level: 'Advanced' },
    { name: 'TypeScript', category: 'Languages', icon: '📘', level: 'Proficient' },
    { name: 'Google Cloud (GCP)', category: 'Cloud & DevOps', icon: '☁️', level: 'Certified' },
    { name: 'Docker', category: 'Cloud & DevOps', icon: '🐳', level: 'Production' },
    { name: 'Kubernetes', category: 'Cloud & DevOps', icon: '☸️', level: 'Orchestration' },
    { name: 'Terraform', category: 'Cloud & DevOps', icon: '📦', level: 'IaC' },
    { name: 'PostgreSQL & GIS', category: 'Databases & Cache', icon: '🐘', level: 'Advanced' },
    { name: 'Redis', category: 'Databases & Cache', icon: '🔴', level: 'Caching & Queues' },
    { name: 'MySQL', category: 'Databases & Cache', icon: '🐬', level: 'Relational' },
    { name: 'Tile38', category: 'Databases & Cache', icon: '📍', level: 'Geospatial' },
    { name: 'gRPC & Protocol Buffers', category: 'Frameworks', icon: '🔗', level: 'Microservices' },
    { name: 'Gin & Fiber', category: 'Frameworks', icon: '🍸', level: 'High Concurrency' },
    { name: 'Next.js & React', category: 'Frameworks', icon: '▲', level: 'Full Stack' },
  ],
}
