'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight, Clock3, Home, Info, LockKeyhole, Mail, MapPin, Phone, ShieldCheck, Upload, Wrench } from 'lucide-react';
import { getSupabase } from '@/lib/supabase-client';
import { business } from '@/lib/data';

type Step = 1 | 2 | 3 | 4;

type BookingForm = {
  service: string;
  doorType: string;
  reasons: string[];
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  consent: boolean;
};

const services = [
  { name: 'Schloss wechseln', detail: 'Schloss oder Zylinder austauschen', price: 'ab 149 €', icon: LockKeyhole },
  { name: 'Sicherheitsschloss einbauen', detail: 'Mehr Sicherheit für Ihr Zuhause', price: 'ab 249 €', icon: ShieldCheck },
  { name: 'Stangenschloss / Querriegel', detail: 'Zusätzlicher Einbruchschutz', price: 'ab 699 €', icon: ShieldCheck },
  { name: 'Einsteckschloss wechseln', detail: 'Defektes oder veraltetes Schloss austauschen', price: 'ab 149 €', icon: LockKeyhole },
];

const doorTypes = ['Wohnungstür', 'Haustür', 'Gewerbetür', 'Sonstige'];
const reasons = ['Schloss funktioniert nicht mehr', 'Schlüssel verloren', 'Sicherheit verbessern', 'Einzug / Mieterwechsel', 'Weiß ich nicht'];
const times = ['09:00 – 11:00 Uhr', '11:00 – 13:00 Uhr', '13:00 – 15:00 Uhr', '15:00 – 17:00 Uhr', '17:00 – 19:00 Uhr'];

const emptyForm: BookingForm = {
  service: services[0].name,
  doorType: doorTypes[0],
  reasons: [],
  date: '',
  time: times[2],
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  consent: false,
};

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function displayDate(value: string): string {
  return new Intl.DateTimeFormat('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
}

function Stepper({ step }: { step: Step }) {
  return (
    <div className="flex items-start justify-center">
      {[1, 2, 3, 4].map((number, index) => (
        <div key={number} className="flex items-start">
          <div className="flex w-14 flex-col items-center gap-2 sm:w-20">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all sm:h-9 sm:w-9 ${step === number ? 'border-primary bg-primary text-white shadow-md shadow-primary/25' : step > number ? 'border-secondary bg-secondary text-white' : 'border-border bg-background text-muted-foreground'}`}>
              {step > number ? <Check className="h-4 w-4" /> : number}
            </div>
            <span className={`text-[10px] font-bold sm:text-xs ${step >= number ? 'text-foreground' : 'text-muted-foreground'}`}>SCHRITT {number}</span>
          </div>
          {index < 3 && <div className={`mt-4 h-0.5 w-5 sm:w-12 ${step > number ? 'bg-secondary' : 'bg-border'}`} />}
        </div>
      ))}
    </div>
  );
}

function SubmittedScreen({ firstName, date, time, address, service }: { firstName: string; date: string; time: string; address: string; service: string }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <section className="bg-muted/30 px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success text-white shadow-lg"><Check className="h-10 w-10" /></div>
        <h1 className="mt-7 text-3xl font-bold text-secondary">Terminanfrage erfolgreich!</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">Vielen Dank, {firstName}! Wir prüfen Ihren Wunschtermin und melden uns in Kürze bei Ihnen.</p>
        <div className="mt-7 rounded-xl border border-border bg-background p-5 text-left text-sm">
          <p className="flex gap-3"><Clock3 className="h-5 w-5 shrink-0 text-primary" />{displayDate(date)} · {time}</p>
          <p className="mt-3 flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" />{address}</p>
          <p className="mt-3 flex gap-3"><Wrench className="h-5 w-5 shrink-0 text-primary" />{service}</p>
        </div>
        <Link href="/" className="mt-7 inline-flex rounded-lg bg-secondary px-6 py-3 font-bold text-white transition-colors hover:bg-secondary/90">Zur Startseite</Link>
      </div>
    </section>
  );
}

export default function TerminBuchenPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<BookingForm>(emptyForm);
  const [photoName, setPhotoName] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const dates = useMemo(() => {
    const result: { value: string; label: string; day: string }[] = [];
    const current = new Date();
    current.setHours(12, 0, 0, 0);
    while (result.length < 5) {
      current.setDate(current.getDate() + 1);
      if (current.getDay() === 0) continue;
      result.push({
        value: formatDate(current),
        label: current.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }),
        day: current.toLocaleDateString('de-DE', { weekday: 'short' }),
      });
    }
    return result;
  }, []);

  const update = (field: keyof BookingForm, value: string | boolean | string[]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError('');
  };

  const toggleReason = (reason: string) => {
    update('reasons', form.reasons.includes(reason) ? form.reasons.filter((item) => item !== reason) : [...form.reasons, reason]);
  };

  const next = () => {
    if (step === 1 || step === 2) setStep((step + 1) as Step);
    else if (step === 3 && form.date && form.time) setStep(4);
    else setError('Bitte wählen Sie einen Termin aus.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const back = () => {
    if (step > 1) setStep((step - 1) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async () => {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.phone.trim() || !form.email.trim() || !form.address.trim()) {
      setError('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    if (!form.consent) {
      setError('Bitte bestätigen Sie die Datenschutzerklärung.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const { error: insertError } = await getSupabase().from('appointment_requests').insert({
        service: form.service,
        door_type: form.doorType,
        reason: form.reasons.join(', ') || 'Nicht angegeben',
        appointment_date: form.date,
        time_slot: form.time,
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        consent: form.consent,
      });
      if (insertError) throw insertError;

      try {
        await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-appointment-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service: form.service,
            door_type: form.doorType,
            reason: form.reasons.join(', ') || 'Nicht angegeben',
            appointment_date: form.date,
            time_slot: form.time,
            first_name: form.firstName.trim(),
            last_name: form.lastName.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            address: form.address.trim(),
          }),
        });
      } catch {
        // Email notification is best-effort; don't block success
      }

      setSubmitted(true);
    } catch {
      setError('Die Anfrage konnte gerade nicht gespeichert werden. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <SubmittedScreen firstName={form.firstName} date={form.date} time={form.time} address={form.address} service={form.service} />
    );
  }

  return (
    <section className="bg-muted/30 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center sm:mb-10">
          <div className="flex items-center justify-center gap-2"><ShieldCheck className="h-8 w-8 text-primary" /><h1 className="text-3xl font-bold text-secondary sm:text-4xl">Termin online buchen</h1></div>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground"><Check className="h-4 w-4 rounded-full bg-success text-white" />In 4 Schritten zum Termin – schnell & unverbindlich</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-5 py-6 sm:px-10"><Stepper step={step} /></div>
          <div className="grid gap-8 p-5 sm:p-10 lg:grid-cols-[1fr_260px]">
            <div>
              {step === 1 && <div className="animate-fade-up"><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Schritt 1 von 4</p><h2 className="mt-3 text-3xl font-bold text-secondary">Was können wir für Sie tun?</h2><p className="mt-2 text-muted-foreground">Wählen Sie die passende Leistung für Ihren Termin.</p><div className="mt-7 grid gap-3">{services.map(({ name, detail, price, icon: Icon }) => <button key={name} type="button" onClick={() => update('service', name)} className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${form.service === name ? 'border-primary bg-accent/40 shadow-sm' : 'border-border hover:border-primary/50'}`}><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-white"><Icon className="h-5 w-5" /></span><span className="min-w-0 flex-1"><strong className="block">{name}</strong><span className="mt-1 block text-xs text-muted-foreground">{detail}</span><span className="mt-1 block text-sm font-bold text-primary">{price}</span></span>{form.service === name && <Check className="h-6 w-6 shrink-0 rounded-full bg-primary p-1 text-white" />}</button>)}</div></div>}

              {step === 2 && <div className="animate-fade-up"><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Schritt 2 von 4</p><h2 className="mt-3 text-3xl font-bold text-secondary">Für welche Tür?</h2><p className="mt-2 text-muted-foreground">Damit wir den Termin besser vorbereiten können.</p><div className="mt-7 grid gap-3">{doorTypes.map((type) => <button key={type} type="button" onClick={() => update('doorType', type)} className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left font-semibold transition-all ${form.doorType === type ? 'border-primary bg-accent/30' : 'border-border hover:border-primary/50'}`}><Home className="h-5 w-5 text-secondary" />{type}{form.doorType === type && <Check className="ml-auto h-5 w-5 text-primary" />}</button>)}</div><h3 className="mt-8 text-xl font-bold text-secondary">Was ist der Grund?</h3><p className="mt-1 text-sm text-muted-foreground">Mehrfachauswahl möglich</p><div className="mt-4 grid gap-3">{reasons.map((reason) => <label key={reason} className="flex items-center gap-3 text-sm"><input type="checkbox" checked={form.reasons.includes(reason)} onChange={() => toggleReason(reason)} className="h-4 w-4 accent-primary" />{reason}</label>)}</div><label className="mt-7 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-muted/40 p-4 text-sm font-semibold hover:bg-accent"><Upload className="h-5 w-5 text-primary" />Foto hochladen <span className="font-normal text-muted-foreground">(optional)</span><input type="file" accept="image/*" className="hidden" onChange={(event: ChangeEvent<HTMLInputElement>) => setPhotoName(event.target.files?.[0]?.name || '')} /></label>{photoName && <p className="mt-2 text-center text-xs text-muted-foreground">{photoName}</p>}</div>}

              {step === 3 && <div className="animate-fade-up"><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Schritt 3 von 4</p><h2 className="mt-3 text-3xl font-bold text-secondary">Wann passt es Ihnen?</h2><p className="mt-2 text-muted-foreground">Wählen Sie einen passenden Termin aus unseren verfügbaren Zeitfenstern.</p><div className="mt-7 grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">{dates.map((date) => <button key={date.value} type="button" onClick={() => update('date', date.value)} className={`rounded-lg border-2 p-3 text-center transition-all ${form.date === date.value ? 'border-primary bg-primary text-white' : 'border-border hover:border-primary/50'}`}><span className="block text-xs font-semibold">{date.day}</span><strong className="mt-1 block">{date.label}</strong></button>)}</div><div className="mt-6 grid gap-3">{times.map((time) => <button key={time} type="button" onClick={() => update('time', time)} className={`flex items-center justify-between rounded-lg border-2 p-4 text-left font-semibold transition-all ${form.time === time ? 'border-primary bg-accent/30' : 'border-border hover:border-primary/50'}`}><span>{time}</span>{form.time === time ? <Check className="h-5 w-5 text-primary" /> : <span className="text-xs font-semibold text-success">verfügbar</span>}</button>)}</div><div className="mt-6 flex gap-3 rounded-lg bg-accent/50 p-4 text-sm text-accent-foreground"><Info className="h-5 w-5 shrink-0" />Die Zeitfenster sind ca. 2 Stunden. Wir melden uns vor Ankunft bei Ihnen.</div></div>}

              {step === 4 && <div className="animate-fade-up"><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Schritt 4 von 4</p><h2 className="mt-3 text-3xl font-bold text-secondary">Ihre Daten</h2><p className="mt-2 text-muted-foreground">Fast geschafft! Bitte geben Sie noch Ihre Kontaktdaten an.</p><div className="mt-7 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Vorname<input value={form.firstName} onChange={(event) => update('firstName', event.target.value)} placeholder="Max" className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none focus:border-primary" /></label><label className="text-sm font-semibold">Nachname<input value={form.lastName} onChange={(event) => update('lastName', event.target.value)} placeholder="Mustermann" className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none focus:border-primary" /></label><label className="text-sm font-semibold">Telefonnummer<input type="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="0176 12345678" className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none focus:border-primary" /></label><label className="text-sm font-semibold">E-Mail-Adresse<input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="max@muster.de" className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none focus:border-primary" /></label><label className="text-sm font-semibold sm:col-span-2">Adresse<textarea rows={3} value={form.address} onChange={(event) => update('address', event.target.value)} placeholder="Musterstraße 12&#10;12345 Berlin" className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-3 font-normal outline-none focus:border-primary" /></label></div><div className="mt-6 space-y-2 text-sm text-muted-foreground"><p className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-success" />Ihre Daten sind bei uns sicher</p><p className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-success" />Nur zur Terminabwicklung</p><p className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-success" />Keine Werbung</p></div><label className="mt-6 flex items-start gap-3 text-sm"><input type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} className="mt-1 h-4 w-4 accent-primary" /><span>Ich akzeptiere die <Link href="/datenschutz" className="font-semibold text-primary hover:underline">Datenschutzbestimmungen</Link>.</span></label></div>}

              {error && <p className="mt-5 rounded-lg bg-destructive/10 p-3 text-sm font-semibold text-destructive">{error}</p>}
              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">{step > 1 ? <button type="button" onClick={back} className="flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 font-semibold hover:bg-muted"><ChevronLeft className="h-4 w-4" />Zurück</button> : <span />}{step < 4 ? <button type="button" onClick={next} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3 font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90">Weiter<ChevronRight className="h-4 w-4" /></button> : <button type="button" onClick={submit} disabled={submitting} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3 font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-60">{submitting ? 'Wird gespeichert …' : 'Termin anfragen'}<ChevronRight className="h-4 w-4" /></button>}</div>
              <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"><LockKeyhole className="h-4 w-4" />Ihre Daten werden sicher und vertraulich behandelt.</p>
            </div>
            <aside className="hidden rounded-xl bg-secondary p-5 text-white lg:block"><h3 className="font-bold">Gut zu wissen</h3><ul className="mt-5 space-y-5 text-sm text-white/80"><li className="flex gap-3"><Clock3 className="h-5 w-5 shrink-0 text-primary" />Zeitfenster statt Uhrzeiten</li><li className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-primary" />Transparente Preisrahmen</li><li className="flex gap-3"><Wrench className="h-5 w-5 shrink-0 text-primary" />Erfahrene Monteure</li><li className="flex gap-3"><LockKeyhole className="h-5 w-5 shrink-0 text-primary" />Sichere Datenübertragung</li></ul><div className="mt-8 rounded-lg bg-white/10 p-4 text-sm"><p className="font-bold">Ausgesperrt?</p><p className="mt-1 text-white/70">Für akute Türöffnungen ist unser Notdienst 24/7 für Sie da.</p><a href={business.phoneHref} className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 font-bold text-white"><Phone className="h-4 w-4" />Jetzt anrufen</a></div></aside>
          </div>
        </div>
      </div>
    </section>
  );
}
