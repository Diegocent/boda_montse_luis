"use client";

import { useEffect, useState } from "react";
import { EnvelopeOverlay } from "@/components/EnvelopeOverlay";
import { Invitation } from "@/components/Invitation";

export default function HomePage() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (opened) {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
      html.style.touchAction = "manipulation";
      body.style.touchAction = "manipulation";
    } else {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      html.style.touchAction = "none";
      body.style.touchAction = "none";
      window.scrollTo(0, 0);
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      html.style.touchAction = "";
      body.style.touchAction = "";
    };
  }, [opened]);

  return (
    <main className="min-h-screen bg-[#C4B3D4]">
      <div className="relative z-0 mx-auto min-h-screen max-w-md overflow-hidden bg-[#F7F2F8] shadow-2xl sm:min-h-[100dvh]">
        <Invitation />
        <EnvelopeOverlay onOpened={() => setOpened(true)} />
      </div>
    </main>
  );
}
