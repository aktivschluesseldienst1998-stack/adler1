import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Star, ShieldCheck } from 'lucide-react';
import { business } from '@/lib/data';

export const metadata = {
  title: 'Kontakt | Adler-Schlüsseldienst Berlin',
  description:
    'Kontaktieren Sie Adler-Schlüsseldienst Berlin: 24/7 Notdienst unter 030 814 5076 93 oder per E-Mail. In max. 30 Minuten vor Ort in ganz Berlin.',
  alternates: { canonical: '/kontakt' },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-secondary py-20 text-white">
        <div className="container-page">
          <nav className="mb-4 text-sm text-white/50">
            <Link href="/" className="hover:text-primary">Start</Link> {' / '} Kontakt
          </nav>
          <h1 className="text-4xl font-bold sm:text-5xl">Kontakt</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Sie brauchen sofortige Hilfe oder haben Fragen? Kontaktieren Sie uns – rund um die Uhr.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">So erreichen Sie uns</h2>
            <p className="mt-4 text-muted-foreground">
              Unser Team steht Ihnen rund um die Uhr zur Verfügung. In dringenden Fällen rufen Sie
              uns bitte direkt an – so können wir schnellsten Hilfe leisten.
            </p>

            <div className="mt-8 space-y-4">
              <a href={business.phoneHref} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">24/7 Notdienst-Hotline</p>
                  <p className="text-xl font-bold">{business.phoneDisplay}</p>
                </div>
              </a>

              <a href={`mailto:${business.email}`} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-Mail</p>
                  <p className="text-lg font-semibold">{business.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Adresse</p>
                  <p className="text-lg font-semibold">{business.street}</p>
                  <p className="text-lg font-semibold">{business.zip}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Öffnungszeiten</p>
                  <p className="text-lg font-semibold">{business.hours}</p>
                  <p className="text-sm font-semibold text-primary">{business.emergencyHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick info */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-primary p-8 text-center text-white shadow-lg">
              <ShieldCheck className="mx-auto h-12 w-12" />
              <h3 className="mt-4 text-2xl font-bold">Festpreis am Telefon</h3>
              <p className="mt-2 text-white/80">Beschädigungsfrei · Festpreis am Telefon</p>
              <a href={business.phoneHref} className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-primary transition-all hover:scale-105">
                <Phone className="h-5 w-5" />
                {business.phoneDisplay}
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-muted/50 p-8">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="font-bold">{business.rating} / 5</span>
              </div>
              <p className="text-muted-foreground">
                Über {business.reviewCount} zufriedene Kunden haben uns auf {business.reviewSources}
                bewertet. Werden Sie unser nächster zufriedener Kunde!
              </p>
              <Link href="/bewertungen" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                Alle Bewertungen lesen →
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="mb-4 font-bold">In Notfällen</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>• Rufen Sie uns direkt an – wir sind 24/7 erreichbar</li>
                <li>• Nennen Sie Ihre Adresse und das Problem</li>
                <li>• Wir nennen Ihnen sofort den Festpreis</li>
                <li>• Unser Techniker ist in max. 30 Minuten vor Ort</li>
                <li>• Beschädigungsfreie Türöffnung garantiert</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
