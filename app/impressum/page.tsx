import Link from 'next/link';
import { business } from '@/lib/data';

export const metadata = {
  title: 'Impressum',
  description: 'Impressum von Adler-Schlüsseldienst Berlin gemäß § 5 TMG.',
  alternates: { canonical: '/impressum' },
};

export default function ImpressumPage() {
  return (
    <section className="bg-secondary py-20 text-white">
      <div className="container-page max-w-3xl">
        <nav className="mb-4 text-sm text-white/50">
          <Link href="/" className="hover:text-primary">Start</Link> {' / '} Impressum
        </nav>
        <h1 className="text-4xl font-bold">Impressum</h1>

        <div className="mt-8 space-y-8 text-white/80">
          <div>
            <h2 className="mb-3 text-xl font-bold text-white">Angaben gemäß § 5 TMG</h2>
            <div className="space-y-1">
              <p>{business.name}</p>
              <p>{business.street}</p>
              <p>{business.zip}</p>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">Kontakt</h2>
            <div className="space-y-1">
              <p>Telefon: {business.phoneDisplay}</p>
              <p>E-Mail: <a href={`mailto:${business.email}`} className="text-primary hover:underline">{business.email}</a></p>
              <p>Website: <a href={business.website} className="text-primary hover:underline">{business.website}</a></p>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">Öffnungszeiten</h2>
            <p>{business.hours}</p>
            <p>Vorsprache nur mit Terminvereinbarung</p>
            <p className="mt-2 font-semibold text-primary">{business.emergencyHours}</p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">Eingetragener Firmensitz</h2>
            <p>{business.chamber}</p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">Umsatzsteuer-Nr.</h2>
            <p>{business.taxNote}</p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">Aufsichtsbehörde</h2>
            <p>{business.authority}</p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">Redaktionell verantwortlich</h2>
            <div className="space-y-1">
              <p>{business.name}</p>
              <p>{business.street}</p>
              <p>{business.zip}</p>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                https://ec.europa.eu/consumers/odr/
              </a>.
            </p>
            <p className="mt-2">Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
