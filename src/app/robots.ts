import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://sangbejoo.site/sitemap.xml',
    host: 'https://sangbejoo.site',
  }
}
