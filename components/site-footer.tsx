import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { business, footerLinks } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <img src="/logo.svg" alt={`${business.name} Berlin`} className="h-12 w-auto" />
            <p className="text-sm leading-relaxed text-white/70">
              Ihr vertrauenswürdiger Schlüsseldienst in Berlin. 24/7 Notdienst, beschädigungsfreie
              Türöffnungen und faire Festpreise – seit vielen Jahren.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Festpreis am Telefon
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/90">Leistungen</h3>
            <ul className="space-y-2.5">
              {footerLinks.leistungen.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Districts */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/90">Bezirke</h3>
            <ul className="space-y-2.5">
              {footerLinks.bezirke.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    Schlüsseldienst {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/bezirke"
                  className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Alle Bezirke anzeigen →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/90">Kontakt</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href={business.phoneHref} className="flex items-start gap-3 transition-colors hover:text-primary">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <span className="block font-semibold text-white">{business.phoneDisplay}</span>
                    24/7 Notdienst
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="flex items-start gap-3 transition-colors hover:text-primary">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  {business.street}
                  <br />
                  {business.zip}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  {business.hours}
                  <br />
                  {business.emergencyHours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {business.name} Berlin. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            {footerLinks.rechtliches.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
