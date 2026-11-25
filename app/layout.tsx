import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { openGraphBase, twitterBase } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next"

const title = "Val Enfys – DJ & Audiovisual Artist";
const description =
  "Val Enfys is a UK-based DJ and audiovisual artist, inspired by London’s warehouse and free party scene.";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-space-grotesk" });

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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
