"use client";

import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type RsvpModalProps = {
  open: boolean;
  onClose: () => void;
};

type Status = "idle" | "saving" | "ok" | "error";

export function RsvpModal({ open, onClose }: RsvpModalProps) {
  const [mounted, setMounted] = useState(false);
  const [nombre, setNombre] = useState("");
  const [acompanado, setAcompanado] = useState(false);
  const [acompanantes, setAcompanantes] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && status !== "saving") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, status]);

  useEffect(() => {
    if (open) return;
    const id = window.setTimeout(() => {
      setNombre("");
      setAcompanado(false);
      setAcompanantes(1);
      setStatus("idle");
      setError("");
    }, 200);
    return () => window.clearTimeout(id);
  }, [open]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = nombre.trim();
    if (name.length < 2) {
      setError("Ingresá el nombre del invitado.");
      return;
    }

    setStatus("saving");
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: name,
          acompanado,
          acompanantes: acompanado ? acompanantes : 0,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "No se pudo guardar");
      }
      setStatus("ok");
    } catch {
      setStatus("error");
      setError("No se pudo registrar ahora. Intentá de nuevo en un momento.");
    }
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#6E4E85]/55 px-4 py-6"
      style={{ zIndex: 200 }}
      onClick={() => {
        if (status !== "saving") onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rsvp-title"
        className="relative w-full max-w-sm rounded-2xl bg-[#F7F2F8] p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={status === "saving"}
          className="absolute right-4 top-4 p-1 text-[#6E4E85] disabled:opacity-40"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "ok" ? (
          <div className="py-4">
            <Check className="h-7 w-7 text-[#8B6BA0]" strokeWidth={1.6} />
            <h3 className="mt-5 font-script text-5xl text-[#8B6BA0]">Listo</h3>
            <p className="mt-3 font-serif text-base leading-relaxed text-[#6E4E85]/80">
              Confirmamos tu asistencia para el 15 de noviembre a las 17:00 en Verapan.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-[#6E4E85] px-6 py-2.5 font-serif text-sm uppercase tracking-[0.18em] text-[#F7F2F8]"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="font-serif text-sm uppercase tracking-[0.28em] text-[#B794D0]">RSVP</p>
            <h3 id="rsvp-title" className="mt-2 font-script text-5xl text-[#8B6BA0]">
              Confirmá
            </h3>
            <p className="mt-3 font-serif text-base leading-relaxed text-[#6E4E85]/80">
              Nombre del invitado y, si vas acompañado, con cuántas personas.
            </p>

            <label className="mt-6 block">
              <span className="font-serif text-sm uppercase tracking-[0.18em] text-[#8B6BA0]/70">
                Nombre
              </span>
              <input
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                name="nombre"
                autoComplete="name"
                required
                minLength={2}
                placeholder="Ej: Ana Pérez"
                className="mt-2 w-full rounded-lg border border-[#8B6BA0]/25 bg-white px-3 py-3 font-serif text-base text-[#6E4E85] outline-none ring-[#B794D0] placeholder:text-[#8B6BA0]/40 focus:ring-2"
              />
            </label>

            <fieldset className="mt-5">
              <legend className="font-serif text-sm uppercase tracking-[0.18em] text-[#8B6BA0]/70">
                ¿Vas acompañado?
              </legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  { label: "No", value: false },
                  { label: "Sí", value: true },
                ].map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setAcompanado(option.value)}
                    className={`rounded-full px-3 py-2.5 font-serif text-base ${
                      acompanado === option.value
                        ? "bg-[#6E4E85] text-[#F7F2F8]"
                        : "border border-[#8B6BA0]/25 text-[#6E4E85]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {acompanado ? (
              <label className="mt-5 block">
                <span className="font-serif text-sm uppercase tracking-[0.18em] text-[#8B6BA0]/70">
                  ¿Con cuántas personas?
                </span>
                <div className="mt-2 flex items-center justify-between rounded-lg border border-[#8B6BA0]/25 bg-white px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setAcompanantes((n) => Math.max(1, n - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F2F8] text-lg text-[#6E4E85]"
                    aria-label="Menos"
                  >
                    −
                  </button>
                  <span className="font-serif text-2xl">{acompanantes}</span>
                  <button
                    type="button"
                    onClick={() => setAcompanantes((n) => Math.min(10, n + 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F2F8] text-lg text-[#6E4E85]"
                    aria-label="Más"
                  >
                    +
                  </button>
                </div>
                <p className="mt-2 font-serif text-sm text-[#8B6BA0]/70">
                  Vas a ser {1 + acompanantes} en total, contándote a vos.
                </p>
              </label>
            ) : null}

            {error ? <p className="mt-4 font-sans text-xs text-red-700">{error}</p> : null}

            <button
              type="submit"
              disabled={status === "saving"}
              className="mt-6 w-full rounded-full bg-[#6E4E85] px-5 py-3 font-serif text-sm uppercase tracking-[0.18em] text-[#F7F2F8] disabled:opacity-60"
            >
              {status === "saving" ? "Guardando..." : "Confirmar asistencia"}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
