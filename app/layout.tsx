import type { Metadata } from "next";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Val Enfys – DJ, Artist & Software Engineer",
  description: "Val Enfys is a DJ, Artist & Software Engineer based in London, UK.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
