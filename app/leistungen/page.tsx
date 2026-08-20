import Link from 'next/link';
import { ArrowRight, Phone, CheckCircle2 } from 'lucide-react';
import { services, business } from '@/lib/data';
import CTASection from '@/components/cta-section';

export const metadata = {
  title: 'Schlüsseldienst Leistungen Berlin | Türöffnung, Schlosswechsel & Einbruchschutz',
  description:
    'Alle Schlüsseldienst-Leistungen in Berlin: Türöffnung, Schlosswechsel, Einbruchschutz, Hochsicherheitszylinder und mehr. 24/7 Notdienst, Festpreis am Telefon.',
  alternates: { canonical: '/leistungen' },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-secondary py-20 text-white">
        <div className="container-page">
          <nav className="mb-4 text-sm text-white/50">
            <Link href="/" className="hover:text-primary">Start</Link> {' / '} Leistungen
          </nav>
          <h1 className="text-4xl font-bold sm:text-5xl">Schlüsseldienst-Leistungen in Berlin</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Vom Notfall-Türöffnungs-Service über Schlosswechsel bis hin zu professionellem
            Einbruchschutz – Adler-Schlüsseldienst bietet Ihnen das komplette Spektrum rund um
            Schlüssel und Sicherheit. 24/7 erreichbar, beschädigungsfrei und zu fairen Festpreisen.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page space-y-8">
          {services.map((service, i) => (
            <div
              key={service.slug}
              className={`grid gap-8 rounded-2xl border border-border bg-card p-8 shadow-sm lg:grid-cols-2 lg:items-center ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div>
                <span className="text-6xl font-bold text-primary/10">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{service.title}</h2>
                <p className="mt-4 text-muted-foreground">{service.description}</p>
                <ul className="mt-6 space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-4">
                  <Link
                    href={`/leistungen/${service.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
                  >
                    Mehr Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={business.phoneHref}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    Anrufen
                  </a>
                </div>
              </div>
              <div className="rounded-xl bg-muted/50 p-8">
                <h3 className="mb-4 font-semibold">Leistungen im Überblick</h3>
                <div className="space-y-3">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Internal links */}
      <section className="section-padding bg-muted/50">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/preise" className="group flex items-center justify-between rounded-xl border border-border p-5 transition-colors hover:border-primary hover:bg-muted/50">
              <span className="font-semibold">Preis anfragen</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
            <Link href="/bezirke" className="group flex items-center justify-between rounded-xl border border-border p-5 transition-colors hover:border-primary hover:bg-muted/50">
              <span className="font-semibold">Bezirke in Berlin</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
            <Link href="/bewertungen" className="group flex items-center justify-between rounded-xl border border-border p-5 transition-colors hover:border-primary hover:bg-muted/50">
              <span className="font-semibold">Kundenbewertungen</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
