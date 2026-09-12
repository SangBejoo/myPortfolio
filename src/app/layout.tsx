import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#04070D' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://sangbejoo.site'),
  title: {
    default: 'Ayub Subagiya (SangBejoo) — Staff Web Programmer & Backend Engineer',
    template: '%s | Ayub Subagiya (SangBejoo)',
  },
  description: 'Ayub Subagiya (SangBejoo) — Staff Web Programmer at Penerbit Erlangga, Bangkit Academy & Blue Bird Alum. Architecting high-concurrency microservices, GCP cloud infrastructure, and distributed backend systems with Go, PostgreSQL, and Redis.',
  keywords: [
    'Ayub Subagiya',
    'SangBejoo',
    'Backend Engineer',
    'Staff Web Programmer',
    'Penerbit Erlangga',
    'Intelecto LMS',
    'Golang Developer',
    'Cloud Engineer',
    'GCP Architect',
    'PT Blue Bird Group',
    'Bangkit Academy',
    'Microservices Architecture',
    'PostgreSQL',
    'Redis',
    'Docker',
    'Next.js Portfolio',
    'Software Engineer Indonesia',
  ],
  authors: [{ name: 'Ayub Subagiya (SangBejoo)', url: 'https://sangbejoo.site' }],
  creator: 'Ayub Subagiya',
  publisher: 'SangBejoo',
  alternates: {
    canonical: 'https://sangbejoo.site',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/images/tittle/bleach-anime.gif', type: 'image/gif' }],
    shortcut: '/images/tittle/bleach-anime.gif',
    apple: '/images/tittle/bleach-anime.gif',
  },
  openGraph: {
    title: 'SangBejoo — Ayub Subagiya | Backend & Cloud Engineer',
    description: 'Explore production-grade microservices, cloud infrastructure, and interactive VN projects built with Golang, GCP, PostgreSQL, and Redis.',
    url: 'https://sangbejoo.site',
    siteName: 'SangBejoo — Ayub Subagiya Portfolio',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/images/author/ayub.jpg',
        width: 1200,
        height: 630,
        alt: 'Ayub Subagiya (SangBejoo) — Backend & Cloud Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SangBejoo — Ayub Subagiya | Backend & Cloud Engineer',
    description: 'Backend & Cloud Engineer. Golang, GCP, gRPC, PostgreSQL, Redis.',
    creator: '@sangbejoo',
    images: ['/images/author/ayub.jpg'],
  },
  category: 'technology',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://sangbejoo.site/#person',
      name: 'Ayub Subagiya',
      alternateName: 'SangBejoo',
      url: 'https://sangbejoo.site',
      image: 'https://sangbejoo.site/images/author/ayub.jpg',
      jobTitle: 'Staff Web Programmer & Backend Engineer',
      worksFor: {
        '@type': 'Organization',
        name: 'Penerbit Erlangga',
        url: 'https://erlangga.co.id',
      },
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Bangkit Academy',
        },
      ],
      sameAs: [
        'https://github.com/sangbejoo',
        'https://linkedin.com/in/ayub-subagiya',
        'https://instagram.com/sangbejoo',
      ],
      knowsAbout: [
        'Golang',
        'Google Cloud Platform (GCP)',
        'Microservices Architecture',
        'PostgreSQL',
        'Redis',
        'gRPC',
        'Docker',
        'React',
        'Next.js',
        'EdTech LMS Systems',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://sangbejoo.site/#website',
      url: 'https://sangbejoo.site',
      name: 'SangBejoo — Ayub Subagiya Portfolio',
      description: 'Interactive Visual Novel portfolio of Ayub Subagiya (SangBejoo), Backend & Cloud Engineer.',
      publisher: {
        '@id': 'https://sangbejoo.site/#person',
      },
      inLanguage: 'en-US',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var th=t||(d?'dark':'light');if(th==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-white dark:bg-[#04070D] text-black dark:text-[#F2F0EB] min-h-screen antialiased transition-colors duration-300 font-sans`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

