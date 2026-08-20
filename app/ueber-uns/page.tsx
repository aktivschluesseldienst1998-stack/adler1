import Link from 'next/link';
import { Award, ShieldCheck, Clock, Euro, MapPin, Star } from 'lucide-react';
import { business, districts } from '@/lib/data';
import CTASection from '@/components/cta-section';
import ReviewSection from '@/components/review-section';

export const metadata = {
  title: 'Über uns | Adler-Schlüsseldienst Berlin',
  description:
    'Adler-Schlüsseldienst Berlin – Ihr etablierter Schlüsseldienst mit langjähriger Erfahrung. Zuverlässig, schnell und kompetent in allen 12 Berliner Bezirken.',
  alternates: { canonical: '/ueber-uns' },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-secondary py-20 text-white">
        <div className="container-page">
          <nav className="mb-4 text-sm text-white/50">
            <Link href="/" className="hover:text-primary">Start</Link> {' / '} Über uns
          </nav>
          <h1 className="text-4xl font-bold sm:text-5xl">Über Adler-Schlüsseldienst Berlin</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Ein etabliertes Unternehmen mit langjähriger Erfahrung im Bereich Schlüssel- und
            Schlossdienstleistungen in Berlin.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold">Vertrauen seit vielen Jahren</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Adler-Schlüsseldienst Berlin ist ein etabliertes Unternehmen mit langjähriger
              Erfahrung im Bereich Schlüssel- und Schlossdienstleistungen. Unser kompetentes Team
              zeichnet sich durch Zuverlässigkeit, Schnelligkeit und Fachkenntnisse aus.
            </p>
            <p className="mt-4 text-muted-foreground">
              Wir legen großen Wert auf die Zufriedenheit unserer Kunden und stehen Ihnen jederzeit
              unterstützend zur Seite. Unser Service erstreckt sich über alle 12 Bezirke Berlins –
              von Mitte bis Köpenick, von Spandau bis Hellersdorf.
            </p>
            <p className="mt-4 text-muted-foreground">
              Ob Notfall-Türöffnung in der Nacht, fachgerechter Schlosswechsel oder umfassende
              Beratung zum Einbruchschutz – bei Adler-Schlüsseldienst sind Sie in den besten Händen.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-muted/50 p-6 text-center">
              <Clock className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-2 text-2xl font-bold">24/7</p>
              <p className="text-sm text-muted-foreground">Notdienst</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/50 p-6 text-center">
              <MapPin className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-2 text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Bezirke</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/50 p-6 text-center">
              <Star className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-2 text-2xl font-bold">{business.rating}</p>
              <p className="text-sm text-muted-foreground">Bewertung</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/50 p-6 text-center">
              <Euro className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-2 text-xl font-bold">Festpreis</p>
              <p className="text-sm text-muted-foreground">am Telefon</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/50">
        <div className="container-page">
          <h2 className="mb-8 text-center text-3xl font-bold">Unsere Werte</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Award, title: 'Fachkompetenz', text: 'Langjährige Erfahrung und kontinuierliche Schulung unserer Techniker garantieren Ihnen professionelle Lösungen.' },
              { icon: ShieldCheck, title: 'Zuverlässigkeit', text: 'Wir kommen, wenn wir es versprechen. Festpreise, keine versteckten Kosten, beschädigungsfreie Arbeit.' },
              { icon: Clock, title: 'Schnelligkeit', text: 'In Notfällen zählt jede Minute. Unsere Techniker sind in maximal 30 Minuten bei Ihnen vor Ort.' },
              { icon: Euro, title: 'Transparenz', text: 'Festpreis-Garantie: Sie wissen bereits vor dem Einsatz, welche Kosten auf Sie zukommen.' },
              { icon: Star, title: 'Kundenzufriedenheit', text: `Über ${business.reviewCount} positive Bewertungen von zufriedenen Kunden auf ${business.reviewSources}.` },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewSection />
      <CTASection />
    </>
  );
}
