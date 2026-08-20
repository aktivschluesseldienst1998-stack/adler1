'use client';

import Link from 'next/link';
import {
  Phone, Star, ShieldCheck, Clock, Euro, Car, DoorOpen, KeyRound,
  ShieldAlert, Lock, Timer, Award, ArrowRight, MapPin, CheckCircle2,
  ChevronDown, PhoneCall, Wrench, FileText,
} from 'lucide-react';
import { useState } from 'react';
import {
  business, services, districts, advantages, homepageFaqs,
  problemCards, securityCards, neighborhoods, reviews,
} from '@/lib/data';
import CTASection from '@/components/cta-section';
import ReviewSection from '@/components/review-section';
import TechnicianRadar from '@/components/technician-radar';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  DoorOpen, KeyRound, ShieldAlert, ShieldCheck, Lock, ShieldPlus: ShieldCheck,
  Award, Clock, Timer, Euro, Car, MapPin,
};

const processSteps = [
  {
    icon: PhoneCall,
    title: 'Anrufen',
    text: 'Sie schildern uns kurz am Telefon, was passiert ist.'
  },
  {
    icon: Euro,
    title: 'Preis erfahren',
    text: 'Wir klären die wichtigsten Details und nennen Ihnen den Preis für die vereinbarte Leistung, bevor sich unser Techniker auf den Weg macht.'
  },
  {
    icon: Car,
    title: 'Techniker kommt',
    text: 'Ein Mitarbeiter macht sich anschließend auf den Weg zu Ihnen.'
  },
  {
    icon: Wrench,
    title: 'Problem lösen',
    text: 'Vor Ort wird die vereinbarte Türöffnung, Reparatur oder der Schlosswechsel fachgerecht durchgeführt.'
  },
  {
    icon: FileText,
    title: 'Rechnung erhalten',
    text: 'Nach Abschluss der Arbeiten erhalten Sie eine nachvollziehbare Rechnung über die ausgeführte Leistung.'
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold hover:text-primary transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="pb-5 text-muted-foreground leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-secondary text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-secondary/90" />
        <div className="container-page relative py-12 lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-semibold text-primary">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              24/7 Notdienst – In max. 30 Minuten vor Ort
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Schlüsseldienst Berlin
              <span className="block text-primary mt-2">schnelle Hilfe rund um die Uhr</span>
            </h1>
            <p className="mt-6 text-lg text-white/75 sm:text-xl leading-relaxed">
              Ausgesperrt oder Schloss defekt? Der Adler Schlüsseldienst ist 24 Stunden am Tag
              in ganz Berlin für Sie erreichbar.
            </p>

            {/* Advantages list */}
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                'Festpreis vor der Anfahrt',
                'Schnelle Hilfe in ganz Berlin',
                '24/7 erreichbar',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Phone CTA */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={business.phoneHref}
                className="group flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50"
              >
                <Phone className="h-5 w-5" />
                {business.phoneDisplay}
              </a>
              <Link
                href="/leistungen"
                className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Unsere Leistungen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. TRUST BAR ──────────────────────────────────────── */}
      <section className="border-b border-border bg-background">
        <div className="container-page grid grid-cols-2 gap-4 py-8 sm:grid-cols-3 lg:grid-cols-5">
          {advantages.map((adv) => {
            const Icon = iconMap[adv.icon] ?? Award;
            return (
              <div key={adv.title} className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-bold">{adv.title}</p>
                <p className="text-xs text-muted-foreground">{adv.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. GOOGLE REVIEWS ────────────────────────────────── */}
      <ReviewSection />

      {/* ── 4. SERVICES ───────────────────────────────────────── */}
      <section className="section-padding bg-muted/50">
        <div className="container-page">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
              Unsere Leistungen
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">Unsere Schlüsseldienst-Leistungen in Berlin</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Von der Notfall-Türöffnung über Schlosswechsel bis hin zu professionellem
              Einbruchschutz – wir bieten das komplette Spektrum.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? KeyRound;
              return (
                <Link
                  key={service.slug}
                  href={`/leistungen/${service.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="absolute right-4 top-4 text-5xl font-bold text-muted/30 transition-colors group-hover:text-primary/20">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                    <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    {service.slug === 'einbruchschaden' ? 'Mehr erfahren' : `Mehr zur ${service.title}`}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/leistungen"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:bg-muted"
            >
              Alle Leistungen ansehen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. PROBLEM-ORIENTED SEO SECTION ───────────────────── */}
      <section className="section-padding">
        <div className="container-page">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
              Problemlösungen
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">Häufige Schlüssel- und Türprobleme</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Egal welche Situation – wir helfen schnell und professionell.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {problemCards.map((card) => (
              <Link
                key={card.title}
                href={card.link}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="mb-2 text-lg font-bold">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Mehr erfahren
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PRICING ────────────────────────────────────────── */}
      <section className="section-padding bg-muted/40">
        <div className="container-page">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
              Preis anfragen
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">Jetzt anrufen, um den Preis zu erfahren</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Jeder Einsatz ist individuell. Rufen Sie uns an und wir nennen Ihnen den verbindlichen Festpreis – bevor wir losfahren.
            </p>
          </div>
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-sm text-center">
            <p className="text-lg font-semibold text-secondary">
              Den genauen Preis für Ihre Situation besprechen wir am Telefon.
            </p>
            <a
              href={business.phoneHref}
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              {business.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* ── 7. GALLERY ───────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-page">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
              Echte Einsätze
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">Adler Schlüsseldienst im Einsatz</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { src: '/images/real-work-situations/WhatsApp_Image_2026-08-08_at_10.24.12_(2) copy.jpeg', alt: 'Adler Schlüsseldienst Techniker bei Türöffnung in Berlin' },
              { src: '/images/real-work-situations/WhatsApp_Image_2026-08-08_at_10.30.53 copy.jpeg', alt: 'Austausch eines Schließzylinders durch Adler Schlüsseldienst' },
              { src: '/images/real-work-situations/WhatsApp_Image_2026-08-08_at_10.36.53 copy.jpeg', alt: 'Montage eines Panzerriegels an einer Wohnungstür' },
              { src: '/images/real-work-situations/WhatsApp_Image_2026-08-08_at_10.36.56 copy.jpeg', alt: 'Adler Schlüsseldienst Techniker vor Ort in Berlin' },
            ].map((img) => (
              <div key={img.src} className="overflow-hidden rounded-2xl border border-border shadow-sm">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. SECURITY / EINBRUCHSCHUTZ ─────────────────────── */}
      <section className="section-padding bg-muted/50">
        <div className="container-page">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
              Sicherheitstechnik
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">Einbruchschutz für Wohnung und Haus in Berlin</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Wir beraten zu mechanischen Sicherheitslösungen und übernehmen die fachgerechte Montage.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {securityCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-bold text-lg">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
                <Link
                  href={card.link}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  {card.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-secondary p-8 text-center">
            <p className="text-lg font-semibold text-white">Beratung zum Einbruchschutz</p>
            <a
              href={business.phoneHref}
              className="mt-4 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              {business.phoneDisplay}
            </a>
            <Link
              href="/leistungen/einbruchschutz"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 ml-4"
            >
              Jetzt beraten lassen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. HOW IT WORKS ──────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-page">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
              So funktioniert es
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">So funktioniert unser Schlüsseldienst</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <div key={step.title} className="relative rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <step.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="mb-2 font-bold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. LOCAL SEO BERLIN ─────────────────────────────── */}
      <section className="section-padding bg-secondary text-white">
        <div className="container-page">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary">
              Einsatzgebiete
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">Schlüsseldienst in ganz Berlin</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Wir sind in allen 12 Berliner Bezirken schnell vor Ort.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {districts.map((d) => (
              <Link
                key={d.slug}
                href={`/bezirke/${d.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-primary hover:bg-white/10"
              >
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-white/90 group-hover:text-white">
                  Schlüsseldienst {d.name}
                </span>
                <ArrowRight className="ml-auto h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>

          {/* Neighborhoods */}
          <div className="mt-12">
            <h3 className="mb-6 text-center text-xl font-bold text-white/90">Beliebte Einsatzgebiete</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {neighborhoods.map((n) => (
                <span
                  key={n}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/bezirke"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Alle Bezirke ansehen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 11. FAQ ──────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-page">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
              Häufige Fragen
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">Häufige Fragen zum Schlüsseldienst in Berlin</h2>
          </div>
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card px-6 py-2 shadow-sm">
            {homepageFaqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. FINAL CTA ────────────────────────────────────── */}
      <CTASection
        title="Ausgesperrt? Wir helfen Ihnen."
        subtitle="24/7 Schlüsselnotdienst in Berlin. Festpreis am Telefon · schnelle Hilfe · berlinweit."
      />
    </>
  );
}
