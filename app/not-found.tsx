import Link from 'next/link';
import { Phone, Home } from 'lucide-react';
import { business } from '@/lib/data';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-secondary px-4 text-white">
      <div className="text-center">
        <p className="text-8xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold">Seite nicht gefunden</h1>
        <p className="mt-4 text-white/70">
          Die gewünschte Seite konnte leider nicht gefunden werden.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/" className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all hover:scale-105">
            <Home className="h-4 w-4" />
            Zur Startseite
          </Link>
          <a href={business.phoneHref} className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">
            <Phone className="h-4 w-4" />
            {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
