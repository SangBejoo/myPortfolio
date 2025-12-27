import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ayub Subagiya - Backend & Cloud Engineer',
  description: 'Building scalable microservices and robust cloud architectures. Backend Developer & Cloud Infrastructure Engineer from Bekasi, Indonesia.',
  keywords: 'Backend Developer, Cloud Engineer, Golang, GCP, Microservices, Next.js',
  authors: [{ name: 'Ayub Subagiya' }],
  openGraph: {
    title: 'Ayub Subagiya - Backend & Cloud Engineer',
    description: 'Building scalable microservices and robust cloud architectures.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
