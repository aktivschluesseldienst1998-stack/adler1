'use client';

import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase-client';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  DoorOpen,
  House,
  ImagePlus,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
type Step = 1 | 2 | 3;
type DoorType = 'Wohnungstür' | 'Haustür';

type PhotoSlot = {
  label: string;
  hint: string;
  preview: string | null;
  name: string;
};

type ContactForm = {
  firstName: string;
  phone: string;
  zip: string;
  message: string;
  consent: boolean;
};

const initialPhotos: PhotoSlot[] = [
  { label: 'Tür außen (gesamt)', hint: 'Gesamtansicht von außen', preview: '/images/real-work-situations/WhatsApp_Image_2026-08-16_at_11.12.42_(3).jpeg', name: '' },
  { label: 'Tür innen (gesamt)', hint: 'Gesamtansicht von innen', preview: '/images/real-work-situations/WhatsApp_Image_2026-08-16_at_11.12.42_(2).jpeg', name: '' },
  { label: 'Schloss / Zylinder (nah)', hint: 'Nahaufnahme', preview: '/images/real-work-situations/WhatsApp_Image_2026-08-16_at_11.12.42_(1).jpeg', name: '' },
  { label: 'Türkante', hint: 'Kante und Rahmen', preview: '/images/real-work-situations/WhatsApp_Image_2026-08-16_at_11.12.42.jpeg', name: '' },
];

const emptyForm: ContactForm = {
  firstName: '',
  phone: '',
  zip: '',
  message: '',
  consent: false,
};

function Stepper({ step }: { step: Step }) {
  const items = [
    { number: 1, label: 'Türart' },
    { number: 2, label: 'Fotos' },
    { number: 3, label: 'Kontakt' },
  ];

  return (
    <div className="flex items-start justify-center">
      {items.map((item, index) => {
        const active = step === item.number;
        const completed = step > item.number;
        return (
          <div key={item.number} className="flex items-start">
            <div className="flex w-20 flex-col items-center gap-2 sm:w-28">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-all sm:h-10 sm:w-10 ${
                  active
                    ? 'border-primary bg-primary text-white shadow-md shadow-primary/25'
                    : completed
                      ? 'border-primary bg-primary text-white'
                      : 'border-border bg-background text-muted-foreground'
                }`}
              >
                {completed ? <Check className="h-4 w-4" /> : item.number}
              </div>
              <span className={`text-xs font-semibold sm:text-sm ${active || completed ? 'text-primary' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </div>
            {index < items.length - 1 && (
              <div className={`mt-5 h-0.5 w-8 sm:w-16 ${step > item.number ? 'bg-primary' : 'bg-border'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function PrivacyNote() {
  return (
    <p className="flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-muted-foreground">
      <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0" />
      Ihre Daten sind bei uns sicher und werden vertraulich behandelt.
    </p>
  );
}

function BenefitsBar() {
  const benefits = [
    { icon: ShieldCheck, title: 'SICHER', text: 'Ihre Daten und Fotos werden vertraulich behandelt.' },
    { icon: Clock3, title: 'SCHNELL', text: 'In weniger als 2 Minuten abgeschlossen.' },
    { icon: CheckCircle2, title: 'KOSTENLOS', text: 'Die Einschätzung ist für Sie komplett kostenlos.' },
    { icon: UserRound, title: 'PERSÖNLICH', text: 'Individuelle Einschätzung und konkrete Empfehlungen.' },
  ];

  return (
    <div className="mt-16 grid gap-8 rounded-2xl bg-accent/40 p-7 sm:grid-cols-2 lg:grid-cols-4">
      {benefits.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex gap-3">
          <Icon className="h-8 w-8 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-bold tracking-wide text-accent-foreground">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/70">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SicherheitsCheckPage() {
  const [step, setStep] = useState<Step>(1);
  const topRef = useRef<HTMLDivElement>(null);

  const goToStep = (next: Step) => {
    setStep(next);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const [doorType, setDoorType] = useState<DoorType>('Wohnungstür');
  const [photos, setPhotos] = useState<PhotoSlot[]>(initialPhotos);
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [messageOpen, setMessageOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePhotoSelect = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const maxDim = 1024;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      setPhotos((current) => current.map((photo, photoIndex) => (
        photoIndex === index
          ? { ...photo, preview: dataUrl, name: file.name }
          : photo
      )));
    };
    img.src = objectUrl;
  };

  const removePhoto = (index: number) => {
    setPhotos((current) => current.map((photo, photoIndex) => (
      photoIndex === index ? { ...photo, preview: null, name: '' } : photo
    )));
    const input = inputRefs.current[index];
    if (input) input.value = '';
  };

  const updateForm = (field: keyof ContactForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFormError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.phone.trim() || !form.zip.trim()) {
      setFormError('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    if (!form.consent) {
      setFormError('Bitte bestätigen Sie die Einwilligung zur Verwendung Ihrer Angaben.');
      return;
    }
    setIsSubmitting(true);
    setFormError('');

    try {
      const photoData = photos.map((p) => ({
        label: p.label,
        data_url: p.preview,
      }));

      const { error: insertError } = await getSupabase().from('security_check_requests').insert({
        door_type: doorType,
        photos: photoData,
        first_name: form.firstName.trim(),
        phone: form.phone.trim(),
        zip: form.zip.trim(),
        message: form.message.trim() || null,
        consent: form.consent,
      });

      if (insertError) {
        setFormError('Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.');
        return;
      }

      const uploadedPhotos = photos
        .filter((p) => p.preview && p.name && p.preview.startsWith('data:image/'))
        .map((p, i) => ({ label: p.label, data_url: p.preview, index: i + 1 }));
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-security-check-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            door_type: doorType,
            first_name: form.firstName.trim() || 'Interessent',
            phone: form.phone.trim(),
            zip: form.zip.trim(),
            message: form.message.trim() || null,
            photo_count: uploadedPhotos.length,
            photos: uploadedPhotos,
          }),
        });
      } catch {
        // Email notification is best-effort; don't block success
      }

      setSubmitted(true);
    } catch {
      setFormError('Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStep(1);
    setDoorType('Wohnungstür');
    setPhotos(initialPhotos);
    setForm(emptyForm);
    setMessageOpen(false);
    setSubmitted(false);
    setFormError('');
    setIsSubmitting(false);
  };

  return (
    <>
      <main className="min-h-screen bg-background">
        <section className="container-page py-10 sm:py-16">
          <div className="mx-auto max-w-2xl">
            <div ref={topRef} />
            {step === 1 && (
              <>
                <div className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <span className="rounded bg-accent px-2 py-1">Kostenlos & unverbindlich</span>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                      Sicherheits-Check
                      <span className="block">für Ihre Tür</span>
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                      In weniger als 2 Minuten zu Ihrer persönlichen Sicherheitseinschätzung.
                      Wir melden uns innerhalb von 24 Stunden.
                    </p>
                  </div>
                  <ShieldCheck className="hidden h-16 w-16 shrink-0 text-primary sm:block" strokeWidth={1.5} />
                </div>
              </>
            )}

            <div className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
              <Stepper step={step} />

              {step === 1 && (
                <div className="mt-10 animate-fade-up">
                  <h2 className="text-2xl font-bold">1. Welche Tür möchten Sie prüfen?</h2>
                  <div className="mt-6 grid gap-4">
                    {([
                      { value: 'Wohnungstür' as const, icon: DoorOpen, text: 'Wohnungstür' },
                      { value: 'Haustür' as const, icon: House, text: 'Haustür' },
                    ]).map(({ value, icon: Icon, text }) => {
                      const selected = doorType === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setDoorType(value)}
                          className={`flex items-center gap-4 rounded-xl border-2 p-5 text-left transition-all ${
                            selected ? 'border-primary bg-accent/30 shadow-sm' : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <span className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${selected ? 'border-primary' : 'border-muted-foreground'}`}>
                            {selected && <span className="h-3 w-3 rounded-full bg-primary" />}
                          </span>
                          <Icon className="h-8 w-8 text-secondary" strokeWidth={1.5} />
                          <span className="font-bold">{text}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-7 rounded-xl bg-accent/50 p-5">
                    <p className="flex items-start gap-3 text-sm leading-relaxed">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span><strong>100% kostenlos & unverbindlich</strong><br />Sie erhalten eine persönliche Einschätzung und konkrete Empfehlungen.</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] hover:bg-primary/90"
                  >
                    Weiter zu Schritt 2
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <div className="mt-6"><PrivacyNote /></div>
                </div>
              )}

              {step === 2 && (
                <div className="mt-10 animate-fade-up">
                  <h2 className="text-2xl font-bold">2. Laden Sie 4 Fotos hoch</h2>
                  <p className="mt-2 text-muted-foreground">Bitte machen Sie 4 klare, gut beleuchtete Fotos von Ihrer Tür.</p>

                  <div className="mt-7 space-y-4">
                    {photos.map((photo, index) => (
                      <div key={photo.label} className="flex items-center gap-4">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border bg-muted sm:h-28 sm:w-28">
                          {photo.preview ? (
                            <>
                              <img src={photo.preview} alt={photo.label} className="h-full w-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                aria-label={`${photo.label} entfernen`}
                                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background/90"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </>
                          ) : (
                            <div className="flex h-full flex-col items-center justify-center gap-1 text-muted-foreground">
                              <ImagePlus className="h-7 w-7" />
                              <span className="text-[10px]">Foto</span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold leading-snug">{index + 1}. {photo.label}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{photo.name || photo.hint}</p>
                        </div>
                        <input
                          ref={(element) => { inputRefs.current[index] = element; }}
                          type="file"
                          accept="image/*"
                          onChange={(event) => handlePhotoSelect(index, event)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => inputRefs.current[index]?.click()}
                          aria-label={`${photo.label} fotografieren`}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-primary/30 text-primary transition-colors hover:bg-accent"
                        >
                          <Camera className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-xl bg-accent/50 p-5">
                    <p className="flex items-start gap-3 text-sm leading-relaxed">
                      <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span><strong>Tipp</strong><br />Achten Sie auf gute Beleuchtung und darauf, dass alle Details erkennbar sind.</span>
                    </p>
                  </div>

                  <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                    <button type="button" onClick={() => goToStep(1)} className="flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 font-semibold transition-colors hover:bg-muted">
                      <ArrowLeft className="h-4 w-4" /> Zurück
                    </button>
                    <button type="button" onClick={() => goToStep(3)} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90">
                      Weiter zu Schritt 3 <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-6"><PrivacyNote /></div>
                </div>
              )}

              {step === 3 && !submitted && (
                <div className="mt-10 animate-fade-up">
                  <h2 className="text-2xl font-bold">3. Ihre Kontaktdaten</h2>
                  <p className="mt-2 text-muted-foreground">Wir melden uns innerhalb von 24 Stunden mit Ihrer persönlichen Einschätzung.</p>
                  <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">Telefonnummer<span className="text-primary">*</span></label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <input id="phone" type="tel" value={form.phone} onChange={(event) => updateForm('phone', event.target.value)} placeholder="z. B. 0176 12345678" className="w-full rounded-lg border border-border bg-background py-3 pl-11 pr-4 outline-none transition-colors focus:border-primary" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="zip" className="mb-1.5 block text-sm font-semibold">PLZ<span className="text-primary">*</span></label>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <input id="zip" inputMode="numeric" value={form.zip} onChange={(event) => updateForm('zip', event.target.value)} placeholder="z. B. 10115" className="w-full rounded-lg border border-border bg-background py-3 pl-11 pr-4 outline-none transition-colors focus:border-primary" />
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => setMessageOpen((v) => !v)}
                        className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold transition-colors hover:bg-muted"
                      >
                        <span className="flex items-center gap-2">
                          <MessageCircle className="h-5 w-5 text-muted-foreground" />
                          Nachricht hinzufügen (optional)
                        </span>
                        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${messageOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {messageOpen && (
                        <div className="mt-3 animate-fade-up">
                          <textarea id="message" maxLength={150} rows={4} value={form.message} onChange={(event) => updateForm('message', event.target.value)} placeholder="z. B. Einbruchschutz, neues Schloss, allgemeine Sicherheit …" className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary" />
                          <p className="mt-1 text-right text-xs text-muted-foreground">{form.message.length}/150</p>
                        </div>
                      )}
                    </div>

                    <label className="flex items-start gap-3 text-sm leading-relaxed">
                      <input type="checkbox" checked={form.consent} onChange={(event) => updateForm('consent', event.target.checked)} className="mt-1 h-4 w-4 accent-primary" />
                      <span>Ich stimme zu, dass meine Angaben und Fotos zur Bearbeitung meines Sicherheits-Checks verwendet werden. <Link href="/datenschutz" className="font-semibold text-primary hover:underline">Datenschutzerklärung</Link></span>
                    </label>
                    {formError && <p className="text-sm font-semibold text-destructive">{formError}</p>}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                    >
                      {isSubmitting ? 'Wird gesendet …' : 'Kostenlose Einschätzung anfordern'}
                      {!isSubmitting && <ArrowRight className="h-5 w-5" />}
                    </button>
                  </form>
                  <div className="mt-6"><PrivacyNote /></div>
                </div>
              )}

              {step === 3 && submitted && (
                <div className="mt-10 animate-fade-up rounded-2xl bg-success/10 p-8 text-center sm:p-12">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success text-white shadow-lg">
                    <Check className="h-10 w-10" />
                  </div>
                  <h2 className="mt-6 text-3xl font-bold">Fertig! <span className="text-success">✓</span></h2>
                  <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
                    Vielen Dank! Wir prüfen Ihre Tür und melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>
                  <Mail className="mx-auto mt-8 h-12 w-12 text-primary" strokeWidth={1.5} />
                  <button type="button" onClick={reset} className="mt-8 text-sm font-semibold text-primary hover:underline">Neue Einschätzung starten</button>
                </div>
              )}
            </div>
          </div>

          <BenefitsBar />
        </section>
      </main>
    </>
  );
}
