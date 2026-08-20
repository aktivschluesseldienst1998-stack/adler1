import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/site-header';
import Footer from '@/components/site-footer';
import StickyCallBar from '@/components/sticky-call-bar';
import { business } from '@/lib/data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(business.website),
  title: {
    default: 'Schlüsseldienst Berlin 24h | Türöffnung | Adler Schlüsseldienst',
    template: '%s | Adler Schlüsseldienst Berlin',
  },
  description:
    'Adler Schlüsseldienst Berlin: 24/7 erreichbar für Türöffnung, Schlosswechsel und Einbruchschutz. Festpreis am Telefon. Jetzt anrufen: 030 814 5076 93.',
  keywords: [
    'Schlüsseldienst Berlin',
    'Türöffnung Berlin',
    'Schlüsseldienst Notdienst Berlin',
    'Schlosswechsel Berlin',
    'Einbruchschutz Berlin',
    'Tür aufschließen Berlin',
    'Schlüsseldienst 24h Berlin',
    'Schlüsseldienst Festpreis Berlin',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: business.website,
    siteName: `${business.name} Berlin`,
    title: 'Schlüsseldienst Berlin | Adler-Schlüsseldienst – 24/7 Notdienst',
    description:
      '24/7 Schlüsseldienst Berlin: Türöffnung, Schlosswechsel, Einbruchschutz & Notdienst. In max. 30 Minuten vor Ort. Festpreis am Telefon.',
    images: [{ url: '/ChatGPT_Image_4._Aug._2026,_23_47_30_cropped.png', width: 2048, height: 952, alt: `${business.name} Berlin` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schlüsseldienst Berlin | Adler-Schlüsseldienst – 24/7 Notdienst',
    description: '24/7 Schlüsseldienst Berlin: Türöffnung, Schlosswechsel & Notdienst. Festpreis am Telefon.',
    images: ['/ChatGPT_Image_4._Aug._2026,_23_47_30_cropped.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Locksmith',
    name: business.name,
    image: `${business.website}/logo.svg`,
    '@id': business.website,
    url: business.website,
    telephone: business.phone,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.street,
      addressLocality: 'Berlin',
      postalCode: '10625',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.5074,
      longitude: 13.3264,
    },
    areaServed: [
      'Berlin-Mitte',
      'Friedrichshain-Kreuzberg',
      'Pankow',
      'Charlottenburg-Wilmersdorf',
      'Spandau',
      'Steglitz-Zehlendorf',
      'Tempelhof-Schöneberg',
      'Neukölln',
      'Treptow-Köpenick',
      'Marzahn-Hellersdorf',
      'Lichtenberg',
      'Reinickendorf',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        description: 'Schlüsselnotdienst – telefonische Erreichbarkeit',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Schlüsseldienstleistungen',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Türöffnung' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Schlosswechsel' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Einbruchschutz' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hochsicherheitszylinder' } },
      ],
    },
  };

  return (
    <html lang="de">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <StickyCallBar />
      </body>
    </html>
  );
}
