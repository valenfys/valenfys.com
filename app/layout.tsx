import type { Metadata } from "next";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Val Enfys – DJ, Artist & Software Engineer",
  description:
    "Val Enfys is a London-based techno DJ, artist and software engineer, studying music production at pointblank and selected for ADE Lab On Track 2026.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
