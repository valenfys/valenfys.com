import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Val Enfys — DJ and Creative Technologist",
  description: "DJ and Creative Technologist.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
