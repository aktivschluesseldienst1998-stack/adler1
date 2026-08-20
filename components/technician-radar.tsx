'use client';

import { useEffect, useState } from 'react';
import { Phone, MapPin, Navigation, Clock } from 'lucide-react';
import { business } from '@/lib/data';

type Technician = {
  id: number;
  name: string;
  district: string;
  distanceKm: number;
  etaMin: number;
  angle: number;
  radius: number;
};

const technicians: Technician[] = [
  { id: 1, name: 'Noah', district: 'Charlottenburg', distanceKm: 2.1, etaMin: 6, angle: 35, radius: 38 },
  { id: 2, name: 'Luca', district: 'Wilmersdorf', distanceKm: 3.4, etaMin: 9, angle: 110, radius: 52 },
  { id: 3, name: 'Elias', district: 'Schöneberg', distanceKm: 4.8, etaMin: 13, angle: 200, radius: 66 },
  { id: 4, name: 'Max', district: 'Mitte', distanceKm: 1.7, etaMin: 5, angle: 290, radius: 30 },
];

const nearest = technicians.reduce((a, b) => (a.etaMin < b.etaMin ? a : b));

export default function TechnicianRadar() {
  const [sweep, setSweep] = useState(0);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSweep((s) => (s + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((prev) => {
        const ids = technicians.map((t) => t.id);
        const idx = prev === null ? -1 : ids.indexOf(prev);
        return ids[(idx + 1) % ids.length];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const active = technicians.find((t) => t.id === activeId) ?? nearest;

  return (
    <section className="section-padding bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-black to-black" />
      <div className="container-page relative">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            Live-Radar
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl">Techniker in Ihrer Nähe</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Unser Radar zeigt Ihnen in Echtzeit, welche Adler-Techniker gerade in Berlin
            im Einsatz sind. Der nächste ist meist nur wenige Minuten von Ihnen entfernt.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
          {/* Radar visual */}
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full border border-primary/20" />
            <div className="absolute inset-[12%] rounded-full border border-primary/15" />
            <div className="absolute inset-[24%] rounded-full border border-primary/15" />
            <div className="absolute inset-[36%] rounded-full border border-primary/15" />
            {/* Cross lines */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/10" />
            <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-primary/10" />

            {/* Sweep */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from ${sweep}deg, transparent 0deg, transparent 320deg, rgba(220, 38, 38, 0.05) 340deg, rgba(220, 38, 38, 0.35) 360deg)`,
              }}
            />

            {/* Center dot (customer) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-full bg-primary/20"
                  style={{
                    transform: `scale(${1 + (pulse % 30) / 30})`,
                    opacity: 1 - (pulse % 30) / 30,
                  }}
                />
                <div className="relative flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-primary/30" />
              </div>
            </div>

            {/* Technician dots */}
            {technicians.map((tech) => {
              const rad = (tech.angle * Math.PI) / 180;
              const x = 50 + Math.cos(rad) * tech.radius;
              const y = 50 + Math.sin(rad) * tech.radius;
              const isActive = tech.id === active?.id;
              return (
                <div
                  key={tech.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onMouseEnter={() => setActiveId(tech.id)}
                >
                  {isActive && (
                    <div
                      className="absolute -inset-3 rounded-full bg-green-400/20"
                      style={{
                        transform: `scale(${1 + (pulse % 40) / 40})`,
                        opacity: 1 - (pulse % 40) / 40,
                      }}
                    />
                  )}
                  <div
                    className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full transition-colors ${
                      isActive ? 'bg-green-400 ring-2 ring-green-400/40' : 'bg-white/70'
                    }`}
                  />
                </div>
              );
            })}

            {/* Compass labels */}
            <span className="absolute left-1/2 top-1 -translate-x-1/2 text-xs font-semibold text-white/40">N</span>
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs font-semibold text-white/40">O</span>
            <span className="absolute left-1/2 bottom-1 -translate-x-1/2 text-xs font-semibold text-white/40">S</span>
            <span className="absolute left-1 top-1/2 -translate-y-1/2 text-xs font-semibold text-white/40">W</span>
          </div>

          {/* Info panel */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-400/20">
                  <Navigation className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Nächster Techniker</p>
                  <p className="text-lg font-bold">{active.name}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-white/50">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs font-medium">Entfernung</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-primary">{active.distanceKm} km</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-white/50">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-medium">Geschätzt</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-green-400">~{active.etaMin} Min.</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-white/70">
                  Aktuell im Bezirk <span className="font-semibold text-white">{active.district}</span>
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-white/80 mb-3">
                {technicians.length} Techniker in Berlin verfügbar
              </p>
              <div className="space-y-2">
                {technicians.map((tech) => (
                  <button
                    key={tech.id}
                    onClick={() => setActiveId(tech.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
                      tech.id === active?.id ? 'bg-primary/20' : 'hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          tech.id === active?.id ? 'bg-green-400' : 'bg-white/50'
                        }`}
                      />
                      {tech.name}
                    </span>
                    <span className="text-xs text-white/50">{tech.distanceKm} km · {tech.etaMin} Min.</span>
                  </button>
                ))}
              </div>
            </div>

            <a
              href={business.phoneHref}
              className="group flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50"
            >
              <Phone className="h-5 w-5" />
              {business.phoneDisplay}
            </a>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-white/40">
          Beispielhafte Darstellung. Die angezeigten Standorte dienen der Veranschaulichung
          unserer Berlin-weiten Verfügbarkeit und spiegeln keine Live-Positionen wider.
        </p>
      </div>
    </section>
  );
}
