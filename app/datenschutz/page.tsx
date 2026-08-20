import Link from 'next/link';
import { business } from '@/lib/data';

export const metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung von Adler-Schlüsseldienst Berlin.',
  alternates: { canonical: '/datenschutz' },
};

export default function DatenschutzPage() {
  return (
    <section className="bg-secondary py-20 text-white">
      <div className="container-page max-w-3xl">
        <nav className="mb-4 text-sm text-white/50">
          <Link href="/" className="hover:text-primary">Start</Link> {' / '} Datenschutz
        </nav>
        <h1 className="text-4xl font-bold">Datenschutzerklärung</h1>

        <div className="mt-8 space-y-8 text-white/80">
          <div>
            <h2 className="mb-3 text-xl font-bold text-white">1. Datenschutz auf einen Blick</h2>
            <p className="mb-3">
              Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir behandeln Ihre
              personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
              Datenschutzvorschriften (DSGVO) sowie dieser Datenschutzerklärung.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">2. Verantwortliche Stelle</h2>
            <div className="space-y-1">
              <p>{business.name}</p>
              <p>{business.street}</p>
              <p>{business.zip}</p>
              <p>Telefon: {business.phoneDisplay}</p>
              <p>E-Mail: <a href={`mailto:${business.email}`} className="text-primary hover:underline">{business.email}</a></p>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">3. Erhebung und Speicherung personenbezogener Daten</h2>
            <p className="mb-3">
              Wir erheben personenbezogene Daten, wenn Sie uns diese im Rahmen einer Bestellung,
              bei einem Notdienst-Einsatz oder bei einer Kontaktaufnahme freiwillig mitteilen.
              Daten, die bei der Nutzung unserer Website automatisch erhoben werden (z.B. durch
              Server-Logfiles), werden ebenfalls verarbeitet.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">4. Nutzung und Weitergabe personenbezogener Daten</h2>
            <p className="mb-3">
              Wir verwenden Ihre personenbezogenen Daten ausschließlich zur Abwicklung Ihrer
              Anfrage, zur Durchführung von Dienstleistungen sowie zur Erfüllung vertraglicher
              und gesetzlicher Pflichten. Eine Weitergabe an Dritte erfolgt nur, wenn dies zur
              Abwicklung erforderlich ist oder Sie zugestimmt haben.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">5. Cookies</h2>
            <p className="mb-3">
              Unsere Website verwendet keine Cookies, die persönliche Daten speichern oder
              Tracking-Zwecken dienen. Es werden lediglich technisch notwendige Daten zur
              Bereitstellung der Website verarbeitet.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">6. Ihre Rechte</h2>
            <p className="mb-3">
              Sie haben das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten,
              das Recht auf Berichtigung, Löschung, Einschränkung der Verarbeitung, das Recht
              auf Datenübertragbarkeit sowie das Recht, der Verarbeitung zu widersprechen.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">7. SSL-Verschlüsselung</h2>
            <p className="mb-3">
              Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung
              vertraulicher Inhalte eine SSL/TLS-Verschlüsselung.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">8. Beschwerderecht bei der Aufsichtsbehörde</h2>
            <p className="mb-3">
              Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren, wenn Sie der
              Meinung sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO
              verstößt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
