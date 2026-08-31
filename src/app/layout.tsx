import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://sangbejoo.site'),
  title: 'SangBejoo — Ayub Subagiya │ Backend & Cloud Engineer',
  description: 'Backend & Cloud Engineer crafting scalable microservices and robust cloud architecture. Go, GCP, gRPC, PostgreSQL, Redis.',
  keywords: 'Backend Developer, Cloud Engineer, Golang, GCP, Microservices, Visual Novel, SangBejoo, Next.js',
  authors: [{ name: 'Ayub Subagiya' }],
  icons: {
    icon: [{ url: '/images/tittle/bleach-anime.gif', type: 'image/gif' }],
    shortcut: '/images/tittle/bleach-anime.gif',
    apple: '/images/tittle/bleach-anime.gif',
  },
  openGraph: {
    title: 'SangBejoo — Ayub Subagiya │ Backend & Cloud Engineer',
    description: 'Interactive Visual Novel portfolio — scalable systems, anime VN dialogue, CG gallery. Click NEXT →',
    type: 'website',
    images: ['/images/author/ayub.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var th=t||(d?'dark':'light');if(th==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.className} bg-white dark:bg-[#04070D] text-black dark:text-[#F2F0EB] min-h-screen antialiased transition-colors duration-300`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
