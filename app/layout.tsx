import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { openGraphBase, twitterBase } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next"

const title = "Val Enfys – DJ & Audiovisual Artist";
const description =
  "Val Enfys is a UK-based DJ and audiovisual artist, inspired by London’s warehouse and free party scene.";

// Titles use Archivo at its widest (see --font-display in globals.css). Body text is Helvetica Neue from the system.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { ...openGraphBase, type: "profile", url: "/", title, description },
  twitter: { ...twitterBase, title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
