import Link from 'next/link';
import { Star, Quote, ArrowRight, ExternalLink } from 'lucide-react';
import { reviews, business } from '@/lib/data';
import CTASection from '@/components/cta-section';

export const metadata = {
  title: 'Bewertungen & Kundenstimmen | Adler-Schlüsseldienst Berlin',
  description:
    'Lesen Sie echte Kundenbewertungen über Adler-Schlüsseldienst Berlin. 4.9 von 5 Sternen bei 61 Bewertungen auf Google, golocal und Meinungsmeister.',
  alternates: { canonical: '/bewertungen' },
};

export default function ReviewsPage() {
  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }));
  const total = reviews.length;

  return (
    <>
      <section className="bg-secondary py-20 text-white">
        <div className="container-page">
          <nav className="mb-4 text-sm text-white/50">
            <Link href="/" className="hover:text-primary">Start</Link> {' / '} Bewertungen
          </nav>
          <h1 className="text-4xl font-bold sm:text-5xl">Kundenbewertungen</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Wir sind stolz auf das Vertrauen unserer Kunden. Hier finden Sie eine Auswahl
            von Bewertungen, die uns auf Google, golocal und Meinungsmeister gegeben wurden.
          </p>
        </div>
      </section>

      {/* Rating summary */}
      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container-page">
          <div className="grid gap-8 rounded-2xl border border-border bg-card p-8 shadow-sm lg:grid-cols-3 lg:items-center">
            <div className="text-center">
              <p className="text-6xl font-bold text-primary">{business.rating}</p>
              <div className="mt-2 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{business.reviewCount} Bewertungen auf Google, golocal & Meinungsmeister</p>
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Bei Google ansehen <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="space-y-2 lg:col-span-2">
              {ratingCounts.map((rc) => (
                <div key={rc.stars} className="flex items-center gap-3">
                  <span className="flex w-12 items-center gap-1 text-sm font-medium">
                    {rc.stars} <Star className="h-3 w-3 fill-primary text-primary" />
                  </span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(rc.count / total) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-sm text-muted-foreground">{rc.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All reviews */}
      <section className="section-padding">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <div key={i} className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <Quote className="absolute right-4 top-4 h-8 w-8 text-muted/20" />
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{review.source}</span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-foreground/80">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="section-padding bg-muted/50">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/leistungen" className="group flex items-center justify-between rounded-xl border border-border p-5 transition-colors hover:border-primary hover:bg-muted/50">
              <span className="font-semibold">Unsere Leistungen</span>
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
