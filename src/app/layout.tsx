import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeSelector } from "@/components/ThemeSelector";

const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sst-simple.vercel.app"),
  title: "Saanva SST — Orden que se ve, seguridad que se vive",
  description:
    "Herramientas prácticas y acompañamiento para organizar la Seguridad y Salud en el Trabajo en pequeños comercios.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://sst-simple.vercel.app/",
    siteName: "Saanva SST",
    title: "Saanva SST — Orden que se ve, seguridad que se vive",
    description: "Herramientas prácticas para organizar tu Seguridad y Salud en el Trabajo.",
    images: [{ url: "/social-card.png", width: 1200, height: 630, alt: "Saanva SST: orden que se ve, seguridad que se vive" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saanva SST — Orden que se ve, seguridad que se vive",
    description: "Herramientas prácticas para organizar tu Seguridad y Salud en el Trabajo.",
    images: ["/social-card.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body><ThemeSelector />{children}</body>
    </html>
  );
}
