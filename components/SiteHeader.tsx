import Link from "next/link";
import { container, solidButton } from "@/lib/layout";
import { email } from "@/lib/site";

const sections = ["Mixes", "Gigs", "About", "Press"];

// On the homepage the links jump to its sections. Elsewhere they lead back to them, except Gigs, which has its own page.
export default function SiteHeader({ page }: { page: "home" | "gigs" }) {
  const onHome = page === "home";
  return (
    <header className={`${container} flex items-center justify-between gap-6 py-6`}>
      <Link
        href={onHome ? "#top" : "/"}
        className="flex min-h-11 items-center font-display text-[15px] font-bold tracking-[0.14em] hover:text-accent"
      >
        VAL ENFYS
      </Link>
      <nav aria-label="Sections" className="flex items-center gap-7 text-sm font-medium">
        <span className="hidden gap-7 md:flex">
          {sections.map((label) => {
            const id = label.toLowerCase();
            const current = id === page;
            const href = current ? "/gigs" : `${onHome ? "" : "/"}#${id}`;
            return (
              <Link
                key={label}
                href={href}
                aria-current={current ? "page" : undefined}
                className={`flex min-h-11 items-center hover:text-accent ${current ? "text-accent" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </span>
        <a href={`mailto:${email}`} className={`flex min-h-11 items-center px-4.5 py-3 font-semibold ${solidButton}`}>
          Bookings
        </a>
      </nav>
    </header>
  );
}
