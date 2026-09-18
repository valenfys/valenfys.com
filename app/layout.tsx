import type { Metadata } from "next";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Val Enfys – DJ, Artist & Creative Technologist",
  description: "DJ, Artist & Creative Technologist.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
