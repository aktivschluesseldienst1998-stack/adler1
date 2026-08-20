import Link from 'next/link';
import { MapPin, ArrowRight, Phone } from 'lucide-react';
import { districts, business } from '@/lib/data';
import CTASection from '@/components/cta-section';

export const metadata = {
  title: 'Schlüsseldienst Berlin Bezirke | Adler-Schlüsseldienst in allen 12 Bezirken',
  description:
    'Schlüsseldienst in allen 12 Berliner Bezirken: Mitte, Kreuzberg, Pankow, Charlottenburg, Spandau und mehr. 24/7 Notdienst, Festpreis am Telefon, in 30 Min. vor Ort.',
  alternates: { canonical: '/bezirke' },
};

export default function DistrictsPage() {
  return (
    <>
      <section className="bg-secondary py-20 text-white">
        <div className="container-page">
          <nav className="mb-4 text-sm text-white/50">
            <Link href="/" className="hover:text-primary">Start</Link> {' / '} Bezirke
          </nav>
          <h1 className="text-4xl font-bold sm:text-5xl">Schlüsseldienst in allen Berliner Bezirken</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Adler-Schlüsseldienst ist in ganz Berlin für Sie im Einsatz. Egal in welchem Bezirk
            Sie sich befinden – unsere Techniker sind in maximal 30 Minuten bei Ihnen vor Ort.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {districts.map((d) => (
              <Link
                key={d.slug}
                href={`/bezirke/${d.slug}`}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h2 className="mb-2 text-xl font-bold">Schlüsseldienst {d.name}</h2>
                <p className="text-sm text-muted-foreground">{d.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Mehr Details
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="section-padding bg-muted/50">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/leistungen" className="group flex items-center justify-between rounded-xl border border-border p-5 transition-colors hover:border-primary hover:bg-muted/50">
              <span className="font-semibold">Alle Leistungen</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
            <Link href="/preise" className="group flex items-center justify-between rounded-xl border border-border p-5 transition-colors hover:border-primary hover:bg-muted/50">
              <span className="font-semibold">Preis anfragen</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
            <Link href="/kontakt" className="group flex items-center justify-between rounded-xl border border-border p-5 transition-colors hover:border-primary hover:bg-muted/50">
              <span className="font-semibold">Kontakt aufnehmen</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
