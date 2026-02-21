import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.maankiumeed.com',
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: 'https://www.maankiumeed.com/pages/home',
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: 'https://www.maankiumeed.com/pages/about',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://www.maankiumeed.com/pages/contact',
      lastModified: new Date(),
      priority: 0.8,
    },
  ]
}