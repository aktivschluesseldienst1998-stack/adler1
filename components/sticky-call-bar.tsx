import { Phone, Star } from 'lucide-react';
import { business } from '@/lib/data';

export default function StickyCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/90 lg:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
            ))}
          </div>
          <span className="text-xs font-semibold text-foreground/70">
            {business.rating} ({business.reviewCount} Bewertungen)
          </span>
        </div>
        <a
          href={business.phoneHref}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg"
        >
          <Phone className="h-4 w-4 animate-pulse" />
          Anrufen
        </a>
      </div>
    </div>
  );
}
