import { Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { reviews, business } from '@/lib/data';

export default function ReviewSection() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
            <Star className="h-4 w-4 fill-current" />
            Google-Bewertungen
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">Das sagen unsere Kunden</h2>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-lg font-bold">{business.rating} von 5</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-lg font-semibold">{business.reviewCount} Bewertungen</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 3).map((review, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xs font-medium text-muted-foreground">Google</span>
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

        <div className="mt-8 text-center">
          <a
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:bg-muted"
          >
            Alle Bewertungen bei Google ansehen
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
