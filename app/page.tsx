import { marked } from "marked";
import type { IconType } from "react-icons";
import {
  FaBandcamp,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaPeace,
  FaSoundcloud,
  FaYoutube
} from "react-icons/fa6";
import bioSource from "../content/bio.md";
import Bio from "./Bio";

type SocialLink = { label: string; href: string; icon: IconType };
// start and end are ISO timestamps with the UK offset (+01:00 in summer time, +00:00 in winter).
type UpcomingEvent = { start: string; end: string; title: string; venue: string; href: string };
type PastEvent = { year: number; title: string; venue: string; href: string; kind: "recording" | "event" };

const socials: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/valenfys", icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/@valenfys", icon: FaYoutube },
  { label: "SoundCloud", href: "https://soundcloud.com/valenfys", icon: FaSoundcloud },
  { label: "Bandcamp", href: "https://bandcamp.com/valenfys", icon: FaBandcamp },
  { label: "GitHub", href: "https://github.com/valenfys", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/valenfys", icon: FaLinkedinIn },
];

const upcoming: UpcomingEvent[] = [
  {
    start: "2026-10-08T19:00+01:00",
    end: "2026-10-09T02:00+01:00",
    title: "Fragment: Open Decks",
    venue: "The Glove That Fits, London",
    href: "https://ra.co/events/2500782",
  },
];

// Link the recording if one exists, otherwise the RA event page.
const previous: PastEvent[] = [
  { year: 2026, title: "SSL Series #002", venue: "Square Studio Lab", href: "https://soundcloud.com/valenfys/enfy-ssl-open-deck", kind: "recording" },
  { year: 2026, title: "Groovy Techno in the Woods", venue: "East London", href: "https://soundcloud.com/valenfys/groovy-techno-in-the-woods-london-july-2026", kind: "recording" },
  { year: 2025, title: "Sibling Radio", venue: "London", href: "https://soundcloud.com/sibling-radio/07112025-alien-tech-w-val-enfys-10", kind: "recording" },
  { year: 2025, title: "Over.The.Techno #23", venue: "Rostov-on-Don", href: "https://soundcloud.com/overthetechno/overthetechno-23-val-enfys", kind: "recording" },
  { year: 2025, title: "Omidox Hypnotic Podcast", venue: "Hamburg", href: "https://soundcloud.com/omidox-1/val-enfys-omidox-hypnotic", kind: "recording" },
  { year: 2025, title: "Lost Unicorns", venue: "Basing House, London", href: "https://ra.co/events/2228141", kind: "event" },
  { year: 2025, title: "Canal Film Club", venue: "Hackney Wick, London", href: "https://soundcloud.com/valenfys/studio-mix-canal-film-club", kind: "recording" },
  { year: 2025, title: "London Open Decks", venue: "Carbobar, Hackney Wick", href: "https://soundcloud.com/valenfys/live-london-open-decks", kind: "recording" },
];

// Edit content/bio.md to change the bio. It's rendered at build time, so no Markdown parser ships to the browser.
const bio = marked.parse(new TextDecoder().decode(bioSource), { async: false });

// Drum machine step lights in the footer: 1 = lit.
const steps = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0];

const siteUrl = "https://valenfys.com";
const personId = `${siteUrl}/#person`;

// Structured data so search engines can connect the site, social profiles and gigs to one person.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: "Val Enfys",
      url: siteUrl,
      email: "mailto:val@valenfys.com",
      jobTitle: ["DJ", "Artist", "Software Engineer"],
      address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
      sameAs: socials.map(({ href }) => href),
    },
    ...upcoming.map((event) => ({
      "@type": "MusicEvent",
      name: event.title,
      startDate: event.start,
      endDate: event.end,
      url: event.href,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: event.venue, address: event.venue },
      performer: { "@id": personId },
    })),
  ],
};

function formatDate(iso: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", ...options }).format(new Date(iso));
}

function formatTime(iso: string) {
  return formatDate(iso, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}

function external(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};
}

function SectionHeader({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="flex items-center gap-3 text-[13px] font-medium tracking-[-0.005em] text-muted">
      {children}
      <span aria-hidden="true" className="h-px flex-1 bg-rule" />
    </h2>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center px-6 pt-18 pb-14">
      <main className="flex w-full max-w-[34rem] flex-col gap-13">
        <script
          type="application/ld+json"
          // Escape "<" so the JSON can't close the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <header className="flex flex-col gap-7">
          <div
            aria-hidden="true"
            className="h-1 w-14 rounded-full bg-[linear-gradient(90deg,#61bb46_0_16.66%,#fdb827_16.66%_33.33%,#f5821f_33.33%_50%,#e03a3e_50%_66.66%,#963d97_66.66%_83.33%,#009ddc_83.33%)]"
          />

          <div className="flex items-end justify-between gap-6">
            <h1 className="font-serif text-[clamp(3.75rem,17vw,5.25rem)] leading-[.88] font-normal tracking-[-0.065em]">
              Val Enfys<span className="text-accent">.</span>
            </h1>
            <div
              aria-hidden="true"
              className="mb-2 h-[42px] w-[70px] shrink-0 rounded-md bg-[radial-gradient(circle,var(--color-grille)_1.1px,transparent_1.4px)] bg-size-[7px_7px] max-[480px]:hidden"
            />
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
              <p className="text-[15px] font-semibold tracking-[-0.01em]">DJ, Artist &amp; Software Engineer</p>
              <p className="flex items-center gap-[7px] text-sm text-text2">
                <span aria-hidden="true" className="size-[7px] rounded-full bg-accent ring-3 ring-accent/16" />
                London, UK
              </p>
            </div>
            <Bio html={bio} />
          </div>

          <a
            href="mailto:val@valenfys.com"
            className="flex items-center justify-between gap-4 rounded-[14px] border border-key-border bg-key py-[18px] pr-[18px] pl-[22px] transition-colors hover:bg-key-hover"
          >
            <span className="flex min-w-0 flex-col gap-[5px]">
              <span className="text-[13px] font-medium tracking-[-0.005em] text-muted">Bookings &amp; enquiries</span>
              <span className="text-2xl font-medium tracking-[-0.025em] wrap-anywhere">val@valenfys.com</span>
            </span>
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-[inset_0_-2px_0_rgb(0_0_0/0.12)]"
            >
              <ArrowIcon className="size-[18px]" />
            </span>
          </a>

          <nav aria-labelledby="h-socials" className="flex flex-col gap-3">
            <SectionHeader id="h-socials">Socials</SectionHeader>
            <div className="grid grid-cols-6 gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  {...external(href)}
                  className="flex h-[52px] items-center justify-center rounded-xl border border-tile-border bg-tile transition-colors hover:border-tile-border-hover hover:bg-tile-hover"
                >
                  <Icon aria-hidden="true" className="size-5" />
                </a>
              ))}
            </div>
          </nav>
        </header>

        {upcoming.length > 0 && (
          <section aria-labelledby="h-upcoming" className="flex flex-col gap-3.5">
            <SectionHeader id="h-upcoming">Upcoming gigs</SectionHeader>
            {upcoming.map((event) => (
              <a
                key={event.href}
                href={event.href}
                {...external(event.href)}
                className="flex items-stretch gap-5 rounded-[14px] bg-card p-5 text-card-text transition-colors hover:bg-card-hover"
              >
                <span className="flex min-w-[52px] flex-col items-center justify-center border-r border-card-rule pr-5">
                  <span className="text-[30px] leading-none font-semibold tracking-[-0.03em] tabular-nums">
                    {formatDate(event.start, { day: "2-digit" })}
                  </span>
                  <span className="mt-1.5 text-[13px] font-medium text-card-muted">
                    {formatDate(event.start, { month: "short" })}
                  </span>
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <strong className="text-[17px] font-semibold tracking-[-0.015em]">{event.title}</strong>
                  <span className="text-[13px] leading-normal text-card-muted">
                    {formatDate(event.start, { weekday: "short" })}{" "}
                    {formatDate(event.start, { day: "numeric", month: "short", year: "numeric" })} · {formatTime(event.start)} – {formatTime(event.end)}
                    <br />
                    {event.venue}
                  </span>
                </span>
                <span aria-hidden="true" className="self-start text-lg text-card-muted">↗</span>
              </a>
            ))}
          </section>
        )}

        <section aria-labelledby="h-previous" className="flex flex-col">
          <div className="mb-2.5">
            <SectionHeader id="h-previous">Previous gigs &amp; mixes</SectionHeader>
          </div>
          {previous.map((event) => (
            <a
              key={event.title}
              href={event.href}
              {...external(event.href)}
              className="-mx-2.5 grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-x-4 border-b border-rule2 px-2.5 py-3.5 transition-colors last:border-b-0 hover:bg-row-hover"
            >
              <span className="text-[13px] text-muted tabular-nums">{event.year}</span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[15px] font-medium tracking-[-0.01em]">{event.title}</span>
                <span className="text-[13px] text-muted">{event.venue}</span>
              </span>
              {event.kind === "recording" ? (
                <span className="flex items-center gap-[7px] text-[13px] font-medium">
                  <svg aria-hidden="true" width="9" height="10" viewBox="0 0 9 10" className="fill-accent">
                    <path d="M0 0.8v8.4a.6.6 0 0 0 .9.5l7.4-4.2a.6.6 0 0 0 0-1L.9.3A.6.6 0 0 0 0 .8z" />
                  </svg>
                  Listen
                </span>
              ) : (
                <span aria-hidden="true" className="text-base text-muted">↗</span>
              )}
            </a>
          ))}
        </section>

        <div className="flex justify-center py-2">
          <FaPeace role="img" aria-label="Peace" className="size-[22px]" />
        </div>

        <footer className="flex items-center justify-between gap-4 border-t border-rule pt-5 text-xs text-muted">
          <span>&copy; {new Date().getFullYear()} Val Enfys</span>
          <span aria-hidden="true" className="flex gap-1">
            {steps.map((on, i) => (
              <span key={i} className={`size-1.5 rounded-[1.5px] ${on ? "bg-accent" : "bg-step-off"}`} />
            ))}
          </span>
        </footer>
      </main>
    </div>
  );
}
