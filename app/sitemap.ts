import type { MetadataRoute } from 'next';
import { services, districts, business } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.website;
  const staticPages = [
    { url: `${base}/`, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${base}/leistungen`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/sicherheits-check`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/termin-buchen`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/bezirke`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/bewertungen`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/ueber-uns`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/kontakt`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/impressum`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${base}/datenschutz`, priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const servicePages = services.map((s) => ({
    url: `${base}/leistungen/${s.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  const districtPages = districts.map((d) => ({
    url: `${base}/bezirke/${d.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticPages, ...servicePages, ...districtPages];
}
