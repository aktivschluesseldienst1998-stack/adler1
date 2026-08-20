import { Phone, Star } from 'lucide-react';
import { business } from '@/lib/data';

export default function CTASection({
  title = 'Sie brauchen sofort Hilfe?',
  subtitle = 'Zögern Sie nicht uns zu kontaktieren. Unsere Mitarbeiter stehen Ihnen rund um die Uhr zur Verfügung.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-secondary py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      <div className="container-page relative text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm font-semibold text-white/80">
              {business.rating} von 5 · {business.reviewCount}+ Bewertungen
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">{subtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={business.phoneHref}
              className="group flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105"
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
              </span>
              <Phone className="h-5 w-5" />
              {business.phoneDisplay}
            </a>
            <a
              href={`mailto:${business.email}`}
              className="rounded-full border border-white/30 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/10"
            >
              E-Mail schreiben
            </a>
          </div>
          <p className="mt-6 text-sm text-white/50">
            Festpreis am Telefon · In max. 30 Minuten vor Ort
          </p>
        </div>
      </div>
    </section>
  );
}
