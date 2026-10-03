import type { Metadata } from "next";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next"

const title = "Val Enfys – DJ, Artist & Software Engineer";
const description =
  "Val Enfys is a London-based DJ, artist and software engineer, currently studying Music Production and Software Engineering at pointblank Music School.";

// Shown in link previews (WhatsApp, Discord, iMessage, etc.). Kept under 300px wide so WhatsApp shows it as a
// small thumbnail beside the text instead of a full-width banner. The portrait is square, so use the small card on X.
const image = { url: "/val-portrait-thumb.jpg", width: 256, height: 256, alt: "Portrait of Val Enfys" };

export const metadata: Metadata = {
  metadataBase: new URL("https://valenfys.com"),
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
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
