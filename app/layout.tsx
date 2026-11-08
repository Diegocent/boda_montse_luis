import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vibes",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Montse y Luis",
  description:
    "Queremos que seas parte de este día. Accedé a la invitación completa y confirmá tu asistencia.",
  applicationName: "Montse y Luis",
  openGraph: {
    title: "Montse y Luis",
    description:
      "Queremos que seas parte de este día. Accedé a la invitación completa y confirmá tu asistencia.",
    type: "website",
    locale: "es_ES",
    siteName: "Montse y Luis",
    url: siteUrl,
    images: [
      {
        url: "/og.jpg",
        width: 1080,
        height: 1080,
        alt: "Montse y Luis — 15 de noviembre de 2026",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Montse y Luis",
    description:
      "Queremos que seas parte de este día. Accedé a la invitación completa y confirmá tu asistencia.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${vibes.variable} font-serif antialiased`}>
        {children}
      </body>
    </html>
  );
}
