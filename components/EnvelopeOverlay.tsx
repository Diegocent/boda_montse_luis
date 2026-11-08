"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { COUPLE } from "@/lib/constants";

type EnvelopeOverlayProps = {
  onOpened: () => void;
};

export function EnvelopeOverlay({ onOpened }: EnvelopeOverlayProps) {
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);
  const busy = useRef(false);

  const open = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    setOpening(true);
    onOpened();
    window.setTimeout(() => setVisible(false), 720);
  }, [onOpened]);

  if (!visible) return null;

  return (
    <motion.div
      className={`fixed inset-x-0 top-0 z-50 mx-auto flex h-[100dvh] w-full max-w-md items-center justify-center bg-[#C4B3D4] px-4 ${
        opening ? "pointer-events-none" : ""
      }`}
      animate={opening ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
    >
      <button
        type="button"
        onClick={open}
        aria-label="Abrir invitación"
        className="relative flex w-full max-w-[360px] flex-col items-center overflow-hidden rounded-[28px] bg-[#F7F2F8] px-8 pb-8 pt-7 text-center shadow-[0_20px_50px_rgba(90,50,110,0.22)]"
      >
        <div className="paper-speckle pointer-events-none absolute inset-0 opacity-80" />
        <img
          src="/floral/calla-cover.jpg"
          alt=""
          className="calla-lilac pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        />

        <div className="relative z-10 mt-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6E4E85] text-[#F7F2F8] shadow-md">
          <Heart className="h-5 w-5 fill-current" />
        </div>

        <div className="relative z-10 mt-6 flex flex-col items-center">
          <h1 className="font-script text-[3.1rem] leading-none text-[#8B6BA0]">{COUPLE.first}</h1>
          <p className="my-1 font-script text-4xl leading-none text-[#8B6BA0]">&</p>
          <h1 className="font-script text-[3.1rem] leading-none text-[#8B6BA0]">{COUPLE.second}</h1>
          <p className="mt-5 text-lg leading-none text-[#B794D0]">~ ❦ ~</p>
          <p className="mt-4 font-serif text-lg text-[#B794D0]">{COUPLE.dateLabel}</p>
          <p className="mt-2 font-serif text-xl text-[#B794D0]">Les invitamos cordialmente</p>
        </div>

        <span className="relative z-10 mt-8 inline-flex rounded-full bg-[#6E4E85] px-10 py-3 font-serif text-lg tracking-wide text-[#F7F2F8]">
          Abrir
        </span>
      </button>
    </motion.div>
  );
}
