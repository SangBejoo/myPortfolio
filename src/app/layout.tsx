import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ayub Subagiya — Backend Engineer │ BMW Individual × Visual Novel',
  description: 'Backend & Cloud Engineer crafting microservices with BMW Individual precision and Visual Novel soul. Go, GCP, gRPC — Alpine White, Carbon Black, Estoril Blue.',
  keywords: 'Backend Developer, Cloud Engineer, Golang, GCP, Microservices, Visual Novel, BMW, Next.js',
  authors: [{ name: 'Ayub Subagiya' }],
  openGraph: {
    title: 'Ayub Subagiya — Backend Engineer │ Visual Novel Portfolio',
    description: 'Interactive Visual Novel portfolio — BMW Individual palette, anime VN dialogue, CG gallery. Click NEXT →',
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
      <body className={`${inter.className} bg-[#04070D] text-[#F2F0EB] min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  )
}
