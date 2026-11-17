import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next"

const title = "Val Enfys – DJ & Audiovisual Artist";
const description =
  "Val Enfys is a UK-based DJ and audiovisual artist, inspired by London’s warehouse and free party scene.";

// Shown in link previews (WhatsApp, Discord, iMessage, etc.). Kept under 300px wide so WhatsApp shows it as a
// small thumbnail beside the text instead of a full-width banner. The portrait is square, so use the small card on X.
const image = { url: "/val-portrait-thumb.jpg", width: 256, height: 256, alt: "Portrait of Val Enfys" };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Val Enfys",
    title,
    description,
    locale: "en_GB",
    images: [image],
  },
  twitter: { card: "summary", title, description, images: [image] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
