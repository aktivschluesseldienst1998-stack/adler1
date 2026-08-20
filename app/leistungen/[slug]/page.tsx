import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, CheckCircle2, ArrowRight, Star, Clock, Euro, ShieldCheck } from 'lucide-react';
import { services, business } from '@/lib/data';
import CTASection from '@/components/cta-section';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: `${service.title} Berlin | Adler-Schlüsseldienst`,
    description: service.short + ' 24/7 Notdienst in Berlin. Festpreis, in max. 30 Minuten vor Ort.',
    alternates: { canonical: `/leistungen/${service.slug}` },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: business.website },
      { '@type': 'ListItem', position: 2, name: 'Leistungen', item: `${business.website}/leistungen` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${business.website}/leistungen/${service.slug}` },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    provider: {
      '@type': 'Locksmith',
      name: business.name,
      telephone: business.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.street,
        addressLocality: 'Berlin',
        postalCode: '10625',
        addressCountry: 'DE',
      },
    },
    areaServed: { '@type': 'City', name: 'Berlin' },
    description: service.description,
    offers: { '@type': 'Offer', priceCurrency: 'EUR' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Hero */}
      <section className="bg-secondary py-20 text-white">
        <div className="container-page">
          <nav className="mb-4 text-sm text-white/50">
            <Link href="/" className="hover:text-primary">Start</Link>
            {' / '}
            <Link href="/leistungen" className="hover:text-primary">Leistungen</Link>
            {' / '} {service.title}
          </nav>
          <h1 className="text-4xl font-bold sm:text-5xl">{service.title} in Berlin</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">{service.description}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href={business.phoneHref} className="flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105">
              <Phone className="h-5 w-5" />
              {business.phoneDisplay}
            </a>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Star className="h-5 w-5 fill-primary text-primary" />
              {business.rating} / 5 · {business.reviewCount}+ Bewertungen
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold sm:text-3xl">{service.title} – schnell und zuverlässig</h2>
            <p className="mt-4 text-lg text-muted-foreground">{service.description}</p>

            <h3 className="mt-8 text-xl font-bold">Unsere Leistungen im Detail</h3>
            <ul className="mt-4 space-y-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-accent p-6">
              <h3 className="text-lg font-bold text-accent-foreground">Warum Adler-Schlüsseldienst?</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm">24/7 Notdienst</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="text-sm">Beschädigungsfrei</span>
                </div>
                <div className="flex items-center gap-3">
                  <Euro className="h-5 w-5 text-primary" />
                  <span className="text-sm">Festpreis-Garantie</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-bold">Weitere Leistungen</h3>
              <ul className="space-y-2">
                {services.filter((s) => s.slug !== service.slug).map((s) => (
                  <li key={s.slug}>
                    <Link href={`/leistungen/${s.slug}`} className="flex items-center justify-between rounded-lg p-3 text-sm transition-colors hover:bg-muted">
                      {s.title}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-primary p-6 text-center text-white shadow-lg">
              <p className="text-sm text-white/80">Festpreis</p>
              <p className="text-3xl font-bold">am Telefon</p>
              <a href={business.phoneHref} className="mt-4 flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-primary transition-all hover:scale-105">
                <Phone className="h-4 w-4" />
                Jetzt anrufen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/50">
        <div className="container-page max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Häufige Fragen zu {service.title}</h2>
          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 font-bold">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title={`${service.title} in Berlin benötigt?`} subtitle="Rufen Sie uns an – wir sind 24/7 für Sie da und in maximal 30 Minuten bei Ihnen vor Ort." />
    </>
  );
}
