"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CALENDAR_URL,
  COUPLE,
  FOOD_NOTE,
  VENUE,
  WEDDING_DATE,
} from "@/lib/constants";
import { Reveal } from "./Reveal";
import { RsvpModal } from "./RsvpModal";

function OutLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(event) => {
        event.stopPropagation();
        const popup = window.open(href, "_blank", "noopener,noreferrer");
        if (popup) event.preventDefault();
      }}
    >
      {children}
    </a>
  );
}

export function Invitation() {
  return (
    <div className="relative bg-[#F7F2F8] text-[#6E4E85]">
      <div className="paper-speckle pointer-events-none absolute inset-0 opacity-70" />
      <img
        src="/floral/calla-top.jpg"
        alt=""
        className="calla-lilac pointer-events-none absolute -right-10 -top-8 w-[110%] max-w-none mix-blend-multiply"
        style={{
          WebkitMaskImage:
            "linear-gradient(to left, black 42%, transparent 88%), linear-gradient(to bottom, black 55%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskImage:
            "linear-gradient(to left, black 42%, transparent 88%)",
        }}
      />
      <Hero />
      <Names />
      <Reception />
      <Countdown />
      <Times />
      <MonthCalendar />
      <Rsvp />
      <Venue />
      <FoodNote />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[52vh] flex-col justify-end px-8 pb-6 pt-16">
      <Reveal>
        <p className="font-serif text-sm uppercase tracking-[0.38em] text-[#B794D0]">
          Nuestra boda civil
        </p>
      </Reveal>
    </section>
  );
}

function Names() {
  return (
    <section className="relative px-8 pb-4 pt-2">
      <Reveal>
        <h1 className="font-script text-[4.2rem] leading-[0.85] text-[#8B6BA0]">{COUPLE.first}</h1>
        <p className="my-4 text-center font-script text-5xl text-[#8B6BA0]">&</p>
        <h1 className="text-right font-script text-[4.2rem] leading-[0.85] text-[#8B6BA0]">
          {COUPLE.second}
        </h1>
      </Reveal>
    </section>
  );
}

function Reception() {
  return (
    <section className="relative px-8 py-12 text-center">
      <img
        src="/floral/calla-stem.jpg"
        alt=""
        className="calla-lilac pointer-events-none absolute -left-20 top-4 w-64 mix-blend-multiply opacity-90"
        style={{
          WebkitMaskImage: "linear-gradient(to right, black 35%, transparent 82%)",
          maskImage: "linear-gradient(to right, black 35%, transparent 82%)",
        }}
      />
      <Reveal>
        <h2 className="font-serif text-xl uppercase tracking-[0.22em] text-[#8B6BA0]">
          Con cariño
        </h2>
        <p className="mx-auto mt-5 max-w-xs font-serif text-lg leading-relaxed text-[#B794D0]">
          Nos haría muy felices que nos acompañen en este día tan especial. Para nosotros, su
          presencia es lo más importante.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <p className="font-serif text-[5.5rem] font-medium leading-none text-[#8B6BA0]">
            {COUPLE.day}
          </p>
          <div className="h-16 w-px bg-[#8B6BA0]/40" />
          <div className="text-left">
            <p className="font-serif text-xl uppercase tracking-[0.18em] text-[#8B6BA0]">
              {COUPLE.month}
            </p>
            <p className="font-serif text-xl text-[#8B6BA0]">{COUPLE.year}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const text = useMemo(() => {
    const diff = now === null ? 0 : Math.max(0, WEDDING_DATE.getTime() - now);
    const days = now === null ? 0 : Math.floor(diff / 86400000);
    const hours = now === null ? 0 : Math.floor((diff % 86400000) / 3600000);
    const mins = now === null ? 0 : Math.floor((diff % 3600000) / 60000);
    const secs = now === null ? 0 : Math.floor((diff % 60000) / 1000);
    return `${days} días ${hours} h ${mins} min ${secs} seg`;
  }, [now]);

  return (
    <section className="relative px-8 pb-6 text-center">
      <Reveal>
        <h2 className="font-serif text-xl uppercase tracking-[0.22em] text-[#8B6BA0]">
          Cuenta regresiva
        </h2>
        <p className="mt-3 font-serif text-xl text-[#B794D0]" suppressHydrationWarning>
          {text}
        </p>
      </Reveal>
    </section>
  );
}

function Times() {
  return (
    <section className="relative px-12 pb-8 pt-4 text-center">
      <Reveal>
        <p className="font-serif text-[11px] uppercase tracking-[0.28em] text-[#B794D0]">
          Nos encontramos
        </p>
        <p className="mt-1 font-serif text-2xl text-[#8B6BA0]">a las {VENUE.time}</p>
      </Reveal>
    </section>
  );
}

function MonthCalendar() {
  const blanks = 6;
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const cells = [...Array.from({ length: blanks }, () => 0), ...days];
  const weekdays = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

  return (
    <section className="relative px-8 pb-4">
      <Reveal>
        <div className="rounded-2xl border border-[#8B6BA0]/25 bg-[#F7F2F8]/80 px-4 pb-5 pt-4">
          <h2 className="text-center font-serif text-2xl text-[#8B6BA0]">Noviembre 2026</h2>
          <div className="mt-4 grid grid-cols-7 gap-y-2 text-center font-serif text-sm text-[#8B6BA0]/70">
            {weekdays.map((d) => (
              <span key={d}>{d}</span>
            ))}
            {cells.map((day, i) =>
              day === 0 ? (
                <span key={`e-${i}`} />
              ) : day === 15 ? (
                <span
                  key={day}
                  className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#6E4E85] text-sm text-[#F7F2F8]"
                >
                  {day}
                </span>
              ) : (
                <span key={day} className="flex h-8 items-center justify-center">
                  {day}
                </span>
              ),
            )}
          </div>
        </div>
        <OutLink
          href={CALENDAR_URL}
          className="mt-5 block text-center font-serif text-base text-[#8B6BA0] underline underline-offset-4"
        >
          Añadir al Calendario
        </OutLink>
      </Reveal>
    </section>
  );
}

function Rsvp() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative px-8 py-8 text-center">
      <Reveal>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full bg-[#6E4E85] px-8 py-3 font-serif text-sm uppercase tracking-[0.18em] text-[#F7F2F8]"
        >
          Confirmar asistencia
        </button>
      </Reveal>
      <RsvpModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

function Venue() {
  return (
    <section className="relative px-8 pb-10 text-center">
      <img
        src="/floral/calla-stem.jpg"
        alt=""
        className="calla-lilac pointer-events-none absolute -left-14 bottom-0 w-52 rotate-12 mix-blend-multiply opacity-80"
        style={{
          WebkitMaskImage: "linear-gradient(to right, black 40%, transparent 85%)",
          maskImage: "linear-gradient(to right, black 40%, transparent 85%)",
        }}
      />
      <Reveal>
        <h2 className="font-serif text-xl uppercase tracking-[0.22em] text-[#8B6BA0]">
          Lugar de la recepción
        </h2>
        <p className="mt-4 font-serif text-lg text-[#B794D0]">{VENUE.place}</p>
        <p className="font-serif text-base text-[#B794D0]">{VENUE.address}</p>
        <p className="font-serif text-base text-[#B794D0]">{VENUE.city}</p>
        <OutLink
          href={VENUE.maps}
          className="mt-5 inline-flex rounded-full border border-[#6E4E85] px-6 py-2 font-serif text-sm text-[#6E4E85]"
        >
          Cómo llegar
        </OutLink>
      </Reveal>
    </section>
  );
}

function FoodNote() {
  return (
    <section className="relative px-8 pb-12 text-center">
      <Reveal>
        <h2 className="font-serif text-xl uppercase tracking-[0.22em] text-[#8B6BA0]">La mesa</h2>
        <p className="mx-auto mt-4 max-w-xs font-serif text-lg leading-relaxed text-[#B794D0]">
          {FOOD_NOTE}
        </p>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative px-8 pb-12 pt-4 text-center">
      <p className="font-script text-3xl text-[#8B6BA0]">
        {COUPLE.first} & {COUPLE.second}
      </p>
      <p className="mt-2 font-serif text-sm text-[#B794D0]">{COUPLE.dateLabel}</p>
    </footer>
  );
}
