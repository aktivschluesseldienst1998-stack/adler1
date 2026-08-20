import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, CheckCircle2, Clock, Euro, ShieldCheck, MapPin, Star, ArrowRight, ChevronDown } from 'lucide-react';
import { districts, services, business } from '@/lib/data';
import CTASection from '@/components/cta-section';

export function generateStaticParams() {
  return districts.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const district = districts.find((d) => d.slug === params.slug);
  if (!district) return {};
  return {
    title: `Schlüsseldienst ${district.name} Berlin | 24/7 Notdienst`,
    description: `Schlüsseldienst in Berlin ${district.name}: 24/7 Notdienst, Türöffnung, Schlosswechsel & Einbruchschutz. In max. 30 Minuten vor Ort.`,
    alternates: { canonical: `/bezirke/${district.slug}` },
  };
}

export default function DistrictPage({ params }: { params: { slug: string } }) {
  const district = districts.find((d) => d.slug === params.slug);
  if (!district) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: business.website },
      { '@type': 'ListItem', position: 2, name: 'Bezirke', item: `${business.website}/bezirke` },
      { '@type': 'ListItem', position: 3, name: district.name, item: `${business.website}/bezirke/${district.slug}` },
    ],
  };

  const districtFaqs = [
    {
      q: `Wie schnell ist der Schlüsseldienst in Berlin ${district.name} vor Ort?`,
      a: `Unsere Techniker sind in der Regel innerhalb von maximal 30 Minuten in Berlin ${district.name} bei Ihnen vor Ort. Da wir im gesamten Stadtgebiet Berlin unterwegs sind, kann die Anfahrtszeit je nach Verkehrslage leicht variieren.`,
    },
    {
      q: `Was kostet eine Türöffnung in ${district.name}?`,
      a: `Den genauen Festpreis nennen wir Ihnen vorab am Telefon – transparent, ohne versteckte Kosten und ohne Überraschungen vor Ort. Der Preis hängt von der Türsituation ab (zugefallen oder abgeschlossen, Schlosstyp, Uhrzeit).`,
    },
    {
      q: `Ist der Notdienst in ${district.name} auch nachts erreichbar?`,
      a: `Ja. Unser Notdienst ist 24 Stunden täglich, 7 Tage die Woche und auch an Feiertagen in ${district.name} erreichbar. Für Nachteinsätze zwischen 22 und 6 Uhr kann ein Nachtzuschlag anfallen – wir informieren Sie darüber vorab.`,
    },
    {
      q: `Öffnen Sie beschädigungsfrei in ${district.name}?`,
      a: `In den weitaus meisten Fällen ja. Unsere Techniker verwenden professionelle Öffnungswerkzeuge, mit denen sich Ihre Tür ohne Beschädigung öffnen lässt. Nur bei abgebrochenen Schlüsseln oder stark beschädigten Schlössern kann ein Bohren notwendig sein – das besprechen wir vorher mit Ihnen.`,
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: districtFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `Schlüsseldienst ${district.name}`,
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
    areaServed: { '@type': 'AdministrativeArea', name: `Berlin ${district.name}` },
    description: district.description,
    offers: { '@type': 'Offer', priceCurrency: 'EUR' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <section className="bg-secondary py-20 text-white">
        <div className="container-page">
          <nav className="mb-4 text-sm text-white/50">
            <Link href="/" className="hover:text-primary">Start</Link>
            {' / '}
            <Link href="/bezirke" className="hover:text-primary">Bezirke</Link>
            {' / '} {district.name}
          </nav>
          <h1 className="text-4xl font-bold sm:text-5xl">Schlüsseldienst {district.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">{district.description}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
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

      <section className="section-padding">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold sm:text-3xl">Ihr Schlüsseldienst in Berlin-{district.name}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Adler-Schlüsseldienst ist Ihr zuverlässiger Partner für alle Schlüssel- und
              Schließdienstleistungen in Berlin-{district.name}. Ob Sie sich ausgesperrt haben,
              einen Schlosswechsel benötigen oder Ihren Einbruchschutz verbessern möchten –
              unser Team steht Ihnen 24 Stunden am Tag, 7 Tage die Woche zur Verfügung.
            </p>
            <p className="mt-4 text-muted-foreground">
              Unsere Techniker kennen {district.name} bestens und sind in der Regel innerhalb
              von maximal 30 Minuten bei Ihnen vor Ort. Wir arbeiten beschädigungsfrei und zu
              transparenten Festpreisen – ohne versteckte Kosten.
            </p>

            <h3 className="mt-8 text-xl font-bold">Unsere Leistungen in {district.name}</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/leistungen/${s.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary hover:bg-accent/30"
                >
                  <span className="font-medium">{s.title}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold">24/7 Notdienst</p>
                  <p className="text-sm text-muted-foreground">Auch nachts und am Wochenende</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
                <Euro className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold">Festpreis am Telefon</p>
                  <p className="text-sm text-muted-foreground">Keine versteckten Kosten</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold">Beschädigungsfrei</p>
                  <p className="text-sm text-muted-foreground">Türöffnung ohne Schaden</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-bold">
                <MapPin className="h-5 w-5 text-primary" />
                Weitere Bezirke
              </h3>
              <ul className="space-y-2">
                {districts.filter((d) => d.slug !== district.slug).map((d) => (
                  <li key={d.slug}>
                    <Link href={`/bezirke/${d.slug}`} className="flex items-center justify-between rounded-lg p-3 text-sm transition-colors hover:bg-muted">
                      Schlüsseldienst {d.name}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-primary p-6 text-center text-white shadow-lg">
              <p className="text-sm text-white/80">Sofort Hilfe in</p>
              <p className="text-2xl font-bold">{district.name}</p>
              <a href={business.phoneHref} className="mt-4 flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-primary transition-all hover:scale-105">
                <Phone className="h-4 w-4" />
                {business.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Häufige Fragen zum Schlüsseldienst in {district.name}</h2>
          <div className="space-y-4">
            {districtFaqs.map((faq) => (
              <details key={faq.q} className="group rounded-lg border border-border bg-card p-5">
                <summary className="flex cursor-pointer items-center justify-between font-semibold">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection title={`Schlüsseldienst ${district.name} – Sofortige Hilfe benötigt?`} subtitle="Rufen Sie uns an – wir sind 24/7 für Sie da und in maximal 30 Minuten bei Ihnen vor Ort." />
    </>
  );
}
