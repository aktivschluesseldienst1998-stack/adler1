import Link from 'next/link';
import { Phone, CheckCircle2, ArrowRight, Clock, ShieldCheck, FileText, AlertCircle, Euro } from 'lucide-react';
import { business } from '@/lib/data';
import CTASection from '@/components/cta-section';

export const metadata = {
  title: 'Preis anfragen | Adler-Schlüsseldienst Berlin',
  description:
    'Jetzt anrufen und den Preis erfahren: Wir nennen Ihnen den verbindlichen Festpreis am Telefon – bevor wir losfahren. Transparent, ohne versteckte Kosten.',
  alternates: { canonical: '/preise' },
};

const priceCategories = [
  {
    title: 'Türöffnung – zugefallen',
    icon: CheckCircle2,
    badge: 'Einfach',
    badgeColor: 'bg-green-100 text-green-700',
    points: [
      'Falle eingeschnappt, Schlüssel steckt nicht innen',
      'Schnelle Öffnung in der Regel unter 15 Minuten',
      'Beschädigungsfrei in fast allen Fällen',
      'Geringster Aufwand – günstigste Kategorie',
    ],
  },
  {
    title: 'Türöffnung – abgeschlossen',
    icon: ShieldCheck,
    badge: 'Mittel',
    badgeColor: 'bg-amber-100 text-amber-700',
    points: [
      'Riegel vorgeschlossen oder Schlüssel von innen steckend',
      'Höherer technischer Aufwand als bei zugefallener Tür',
      'Erfordert spezielle Öffnungswerkzeuge',
      'Dauer ca. 15–30 Minuten',
    ],
  },
  {
    title: 'Hochsicherheitsschloss',
    icon: AlertCircle,
    badge: 'Aufwändig',
    badgeColor: 'bg-blue-100 text-blue-700',
    points: [
      'Sicherheitszylinder, Mehrfachverriegelung oder Panzerriegel',
      'Deutlich höherer Zeit- und Werkzeitaufwand',
      'In manchen Fällen Bohren erforderlich – wird vorab besprochen',
      'Anschließend oft Zylinderwechsel empfohlen',
    ],
  },
];

const priceFactors = [
  {
    icon: Clock,
    title: 'Uhrzeit',
    text: 'Tagsüber (6–22 Uhr) ohne Zuschlag. Nachts (22–6 Uhr) und an Feiertagen kann ein Nachtzuschlag anfallen – wird vorab am Telefon kommuniziert.',
  },
  {
    icon: Euro,
    title: 'Schlosstyp',
    text: 'Standardzylinder sind einfacher und schneller zu öffnen als Hochsicherheitszylinder oder Mehrfachverriegelungen.',
  },
  {
    icon: ShieldCheck,
    title: 'Türsituation',
    text: 'Zugefallen ist einfacher als abgeschlossen. Ein innen steckender Schlüssel erfordert andere Technik und mehr Zeit.',
  },
  {
    icon: FileText,
    title: 'Material',
    text: 'Wenn ein Schlosswechsel notwendig ist (z. B. nach Schlüsselverlust), kommen Materialkosten hinzu – ebenfalls vorab kommuniziert.',
  },
];

const paymentMethods = [
  { icon: Euro, title: 'Barzahlung', text: 'Bequem in bar vor Ort.' },
  { icon: FileText, title: 'Rechnung', text: 'Ordnungsgemäße Rechnung für Ihre Unterlagen.' },
];

const faqs = [
  {
    q: 'Warum nennen Sie keinen festen Preis auf der Website?',
    a: 'Jeder Einsatz ist anders. Eine zugefallene Tür am Tag ist einfacher zu öffnen als ein Hochsicherheitsschloss nachts. Deshalb besprechen wir die Situation am Telefon und nennen Ihnen den genauen Festpreis – bevor wir losfahren.',
  },
  {
    q: 'Gibt es versteckte Kosten?',
    a: 'Nein. Der am Telefon genannte Preis ist verbindlich. Materialkosten (z. B. für einen neuen Zylinder) werden gesondert kommuniziert, bevor sie entstehen.',
  },
  {
    q: 'Fallen Nachtzuschläge an?',
    a: 'Für Einsätze zwischen 22 und 6 Uhr sowie an Feiertagen kann ein Nachtzuschlag anfallen. Wir informieren Sie darüber vorab am Telefon, bevor wir losfahren.',
  },
  {
    q: 'Was passiert, wenn der Techniker die Tür nicht öffnen kann?',
    a: 'Das ist äußerst selten. Sollte es dennoch vorkommen, besprechen wir das weitere Vorgehen transparent mit Ihnen. Es entstehen keine Kosten für nicht erbrachte Leistungen.',
  },
];

export default function PreisePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Preis anfragen', item: `${business.website}/preise` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-secondary text-white">
        <div className="container-page py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary">
              Preis anfragen
            </span>
            <h1 className="text-4xl font-bold sm:text-5xl">Jetzt anrufen, um den Preis zu erfahren</h1>
            <p className="mt-6 text-lg text-white/75 leading-relaxed">
              Jeder Einsatz ist individuell. Rufen Sie uns an und wir besprechen Ihre Situation
              und nennen Ihnen den <strong className="text-white">verbindlichen Festpreis</strong> –
              bevor wir losfahren.
            </p>
            <a
              href={business.phoneHref}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105"
            >
              <Phone className="h-5 w-5" /> {business.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Price categories */}
      <section className="section-padding">
        <div className="container-page">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Preiskategorien für Türöffnungen</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Die Kosten hängen von der Türsituation ab. Hier eine Übersicht der drei häufigsten Kategorien.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {priceCategories.map((cat) => (
              <div key={cat.title} className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <cat.icon className="h-8 w-8 text-primary" />
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${cat.badgeColor}`}>
                    {cat.badge}
                  </span>
                </div>
                <h3 className="mb-4 text-xl font-bold">{cat.title}</h3>
                <ul className="space-y-2">
                  {cat.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-accent p-6 text-center">
            <p className="text-lg font-semibold">
              Den genauen Festpreis für Ihre Situation nennen wir Ihnen am Telefon –
              <span className="text-primary"> transparent und verbindlich</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Price factors */}
      <section className="section-padding bg-muted/50">
        <div className="container-page">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Was den Preis beeinflusst</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Vier Faktoren bestimmen, wie aufwändig ein Einsatz ist.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {priceFactors.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-bold text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className="section-padding">
        <div className="container-page">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Zahlungsmethoden</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Flexibel und unkompliziert – so können Sie bei uns bezahlen.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {paymentMethods.map((m) => (
              <div key={m.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <m.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">{m.title}</h3>
                  <p className="text-sm text-muted-foreground">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/50">
        <div className="container-page">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Häufige Fragen zu Preisen</h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-2 font-bold text-lg">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="section-padding">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/leistungen/tueroeffnung" className="group flex items-center justify-between rounded-xl border border-border p-5 transition-colors hover:border-primary hover:bg-muted/50">
              <span className="font-semibold">Türöffnung Leistungen</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
            <Link href="/leistungen/schlosswechsel" className="group flex items-center justify-between rounded-xl border border-border p-5 transition-colors hover:border-primary hover:bg-muted/50">
              <span className="font-semibold">Schlosswechsel</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
            <Link href="/leistungen/einbruchschutz" className="group flex items-center justify-between rounded-xl border border-border p-5 transition-colors hover:border-primary hover:bg-muted/50">
              <span className="font-semibold">Einbruchschutz</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
