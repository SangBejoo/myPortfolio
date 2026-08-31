import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SangBejoo — Ayub Subagiya Portfolio',
    short_name: 'SangBejoo',
    description: 'Backend & Cloud Engineer portfolio featuring microservices, GCP, Golang, and visual novel interactive experiences.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#009ADA',
    icons: [
      {
        src: '/images/tittle/bleach-anime.gif',
        sizes: 'any',
        type: 'image/gif',
      },
    ],
  }
}
