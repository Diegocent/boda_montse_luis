"use client";

import { motion } from "framer-motion";

type SprigProps = {
  className?: string;
  flip?: boolean;
  delay?: number;
};

export function LilacSprig({ className = "", flip, delay = 0 }: SprigProps) {
  return (
    <motion.svg
      viewBox="0 0 180 260"
      fill="none"
      className={`pointer-events-none origin-bottom will-change-transform ${className}`}
      style={{ scaleX: flip ? -1 : 1 }}
      animate={{ rotate: [-3, 3, -3] }}
      transition={{
        duration: 4.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <path
        d="M92 252 C88 190 96 140 90 88 C86 52 78 28 70 8"
        stroke="#9B7BB5"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <ellipse cx="108" cy="70" rx="14" ry="9" fill="#C9B3D8" transform="rotate(28 108 70)" />
      <ellipse cx="98" cy="58" rx="11" ry="7" fill="#E6D6F0" transform="rotate(18 98 58)" />
      <ellipse cx="64" cy="96" rx="13" ry="8" fill="#D4C0E4" transform="rotate(-32 64 96)" />
      <ellipse cx="72" cy="84" rx="10" ry="6" fill="#B794D0" transform="rotate(-20 72 84)" />
      <ellipse cx="118" cy="118" rx="15" ry="9" fill="#8B6BA0" transform="rotate(22 118 118)" />
      <ellipse cx="108" cy="108" rx="11" ry="7" fill="#C9B3D8" transform="rotate(12 108 108)" />
      <ellipse cx="58" cy="146" rx="14" ry="8" fill="#D4C0E4" transform="rotate(-26 58 146)" />
      <ellipse cx="112" cy="168" rx="13" ry="8" fill="#C9B3D8" transform="rotate(18 112 168)" />
      <ellipse cx="68" cy="198" rx="12" ry="7" fill="#E6D6F0" transform="rotate(-20 68 198)" />
      <ellipse cx="104" cy="42" rx="10" ry="6" fill="#B794D0" transform="rotate(36 104 42)" />
      <circle cx="90" cy="64" r="4" fill="#FBF7FC" opacity="0.7" />
      <circle cx="80" cy="128" r="3.5" fill="#FBF7FC" opacity="0.55" />
    </motion.svg>
  );
}

export function FloatingBloom({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 80 120"
      className={`pointer-events-none ${className}`}
      animate={{ y: [0, -14, 0], rotate: [-8, 10, -8] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M40 112 C38 80 44 52 40 18" stroke="#9B7BB5" strokeWidth="1.6" fill="none" />
      <ellipse cx="52" cy="48" rx="14" ry="8" fill="#C9B3D8" transform="rotate(30 52 48)" />
      <ellipse cx="40" cy="40" rx="11" ry="7" fill="#E6D6F0" />
      <ellipse cx="28" cy="48" rx="13" ry="8" fill="#B794D0" transform="rotate(-28 28 48)" />
      <circle cx="40" cy="48" r="4.5" fill="#FBF7FC" />
      <ellipse cx="26" cy="78" rx="11" ry="7" fill="#D4C0E4" transform="rotate(-22 26 78)" />
    </motion.svg>
  );
}

export function VineDivider({ invert = false }: { invert?: boolean }) {
  const stroke = invert ? "#FBF7FC" : "#B794D0";
  const fill = invert ? "#6E4E85" : "#FBF7FC";

  return (
    <div className="pointer-events-none relative z-10 -my-[2px] w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 600 72"
        preserveAspectRatio="none"
        className="block h-[52px] w-full"
      >
        <path
          d="M0 36 C80 8 140 64 220 32 C300 4 340 68 420 30 C500 2 540 58 600 28 L600 72 L0 72 Z"
          fill={fill}
        />
        <path
          d="M20 40 C90 18 150 54 230 34 C310 14 360 58 440 36 C510 18 560 48 590 34"
          stroke={stroke}
          strokeWidth="1.4"
          fill="none"
          opacity="0.85"
        />
        <ellipse cx="150" cy="28" rx="8" ry="5" fill={stroke} opacity="0.75" transform="rotate(-18 150 28)" />
        <ellipse cx="300" cy="44" rx="9" ry="5.5" fill={stroke} opacity="0.7" transform="rotate(16 300 44)" />
        <ellipse cx="450" cy="30" rx="8" ry="5" fill={stroke} opacity="0.75" transform="rotate(-12 450 30)" />
      </svg>
    </div>
  );
}

export function WavyEdge({
  fill,
  flip,
  className = "",
}: {
  fill: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 600 48"
      preserveAspectRatio="none"
      className={`block w-full ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <path
        d="M0 24 C40 4 80 44 120 24 C160 4 200 44 240 24 C280 4 320 44 360 24 C400 4 440 44 480 24 C520 4 560 44 600 24 L600 48 L0 48 Z"
        fill={fill}
      />
    </svg>
  );
}

export function LilacRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={`pointer-events-none ${className}`} fill="none">
      <circle cx="120" cy="120" r="110" stroke="#E6D6F0" strokeWidth="1.2" />
      <circle cx="120" cy="120" r="98" stroke="#D4C0E4" strokeWidth="1" opacity="0.85" />
      <circle cx="120" cy="120" r="86" stroke="#C9B3D8" strokeWidth="1.4" opacity="0.7" />
      <circle cx="120" cy="120" r="74" stroke="#E6D6F0" strokeWidth="0.8" opacity="0.55" />
    </svg>
  );
}

export function FallingPetals() {
  const petals = [
    { left: "8%", delay: "0s", duration: "10s", size: 14 },
    { left: "22%", delay: "2.4s", duration: "12s", size: 10 },
    { left: "48%", delay: "1.1s", duration: "11s", size: 16 },
    { left: "71%", delay: "3.6s", duration: "13s", size: 12 },
    { left: "88%", delay: "0.8s", duration: "9.5s", size: 11 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((petal) => (
        <span
          key={petal.left}
          className="absolute -top-6 rounded-full bg-[#C9B3D8]/70 animate-petal-fall"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 0.7,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
          }}
        />
      ))}
    </div>
  );
}
