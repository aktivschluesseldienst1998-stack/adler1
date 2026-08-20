'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Clock } from 'lucide-react';
import { business, navLinks } from '@/lib/data';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="hidden bg-secondary text-white lg:block">
        <div className="container-page flex h-10 items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              24/7 Notdienst – In max. 30 Minuten vor Ort
            </span>
            <span className="flex items-center gap-2 text-muted-foreground/80">
              {business.street}, {business.zip}
            </span>
          </div>
          <a
            href={business.phoneHref}
            className="flex items-center gap-2 font-semibold transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" />
            {business.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container-page flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label={business.name}>
            <img src="/logo-light.svg" alt={`${business.name} Berlin`} className="h-12 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={business.phoneHref}
              className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 sm:flex"
            >
              <Phone className="h-4 w-4" />
              Jetzt anrufen
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="rounded-lg p-2 text-foreground lg:hidden"
              aria-label="Menü"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-border bg-background lg:hidden">
            <nav className="container-page flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={business.phoneHref}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-base font-semibold text-white"
              >
                <Phone className="h-5 w-5" />
                {business.phoneDisplay}
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
