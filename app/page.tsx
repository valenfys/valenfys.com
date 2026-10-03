import { marked } from "marked";
import Image from "next/image";
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
import { external } from "./external";
import PreviousGigs, { type PastEvent } from "./PreviousGigs";
import ProjectVideo from "./ProjectVideo";
import { tileCircleClass, tileClass, tileImageSizes } from "./projectTile";

type SocialLink = { label: string; href: string; icon: IconType };
// start and end are ISO timestamps with the UK offset (+01:00 in summer time, +00:00 in winter).
type UpcomingEvent = { start: string; end: string; title: string; venue: string; href: string };
type Project = {
  title: string;
  date: string; // display string, e.g. "Jul 2026"
  description: string;
  image: string; // path under /public
} & ({ kind: "video"; youtubeId: string } | { kind: "link"; href: string });

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

const projects: Project[] = [
  {
    title: "Techno Forest Party in East London",
    date: "Jul 2026",
    description:
      "An independent forest party co-hosted with Jonah Garrett-Bannister, featuring techno and trance DJ sets, and custom lighting and video recording setups.",
    image: "/projects/groovy-techno.jpg",
    kind: "video",
    youtubeId: "0NYqs2o88Jk",
  },
  {
    title: "Portfolio Website for Barbara Touati-Evans",
    date: "Mar 2022",
    description:
      "Design and development of a portfolio site for an independent artist in Next.js and Tailwind CSS, with a CMS enabling the artist to update it independently.",
    image: "/projects/barbara-touati-evans.jpg",
    kind: "link",
    href: "https://www.barbara-touati-evans.com/",
  },
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
      image: `${siteUrl}/val-portrait.jpg`,
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

function youtubeUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

function formatTime(iso: string) {
  return formatDate(iso, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}

function SectionHeader({ id, className = "", children }: { id: string; className?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className={`flex items-center gap-3 text-[13px] font-medium text-muted ${className}`}>
      {children}
      <span aria-hidden="true" className="h-px flex-1 bg-rule" />
    </h2>
  );
}

function ProjectDate({ children }: { children: React.ReactNode }) {
  return <span className="shrink-0 text-[13px] text-muted tabular-nums">{children}</span>;
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
      <main className="flex w-full max-w-136 flex-col gap-13">
        <script
          type="application/ld+json"
          // Escape "<" so the JSON can't close the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <header className="flex flex-col gap-7">
          <div
            aria-hidden="true"
            className="h-1 w-14 rounded-full pride-bar"
          />

          <div className="flex items-center justify-between gap-6">
            <h1 className="font-serif text-[clamp(3.75rem,17vw,5.25rem)] leading-[.88] font-normal tracking-[-0.065em]">
              Val Enfys<span className="text-accent">.</span>
            </h1>
            <Image
              src="/val-portrait.jpg"
              alt="Portrait of Val Enfys"
              width={168}
              height={168}
              priority
              className="size-21 shrink-0 rounded-full object-cover object-[50%_35%] shadow-[0_0_0_1px_var(--color-rule),0_0_0_4px_var(--color-bg),0_0_0_5px_var(--color-rule)] max-xs:size-16"
            />
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
              <p className="text-[15px] font-semibold">DJ, Artist &amp; Software Engineer</p>
              <p className="text-sm text-text2">London, UK</p>
            </div>
            <Bio html={bio} />
          </div>

          <a
            href="mailto:val@valenfys.com"
            className="flex items-center justify-between gap-4 rounded-xl border border-key-border bg-key py-4 pr-4 pl-6 transition-colors hover:bg-key-hover"
          >
            <span className="flex min-w-0 flex-col gap-1">
              <span className="text-[13px] font-medium text-muted">Bookings &amp; enquiries</span>
              <span className="text-2xl font-medium tracking-tight wrap-anywhere">val@valenfys.com</span>
            </span>
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-[inset_0_-2px_0_rgb(0_0_0/0.12)]"
            >
              <ArrowIcon className="size-5" />
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
                  className="flex h-13 items-center justify-center rounded-xl border border-tile-border bg-tile transition-colors hover:border-tile-border-hover hover:bg-tile-hover"
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
                className="flex items-stretch gap-5 rounded-xl bg-card p-5 text-card-text transition-colors hover:bg-card-hover"
              >
                <span className="flex min-w-13 flex-col items-center justify-center border-r border-card-rule pr-5">
                  <span className="text-3xl leading-none font-semibold tracking-tight tabular-nums">
                    {formatDate(event.start, { day: "2-digit" })}
                  </span>
                  <span className="mt-1.5 text-[13px] font-medium text-card-muted">
                    {formatDate(event.start, { month: "short" })}
                  </span>
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <strong className="text-[17px] font-semibold tracking-tight">{event.title}</strong>
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
          <SectionHeader id="h-previous" className="mb-2.5">
            Previous gigs &amp; mixes
          </SectionHeader>
          <PreviousGigs events={previous} />
        </section>

        <section aria-labelledby="h-projects" className="flex flex-col gap-3.5">
          <SectionHeader id="h-projects">Projects</SectionHeader>
          <div className="flex flex-col gap-8">
            {projects.map((project) =>
              project.kind === "video" ? (
                <article key={project.title} className="flex flex-col gap-3.5">
                  <ProjectVideo title={project.title} youtubeId={project.youtubeId} image={project.image} />
                  <a href={youtubeUrl(project.youtubeId)} {...external(youtubeUrl(project.youtubeId))} className="group flex flex-col gap-1">
                    <span className="flex items-baseline justify-between gap-4">
                      <strong className="text-[17px] font-semibold tracking-tight underline-offset-3 group-hover:underline">
                        {project.title}
                      </strong>
                      <ProjectDate>{project.date}</ProjectDate>
                    </span>
                    <span className="text-[15px] leading-[1.6] text-text2">{project.description}</span>
                  </a>
                </article>
              ) : (
                <a key={project.title} href={project.href} {...external(project.href)} className="group flex flex-col gap-3.5">
                  <span className={`${tileClass} group-hover:border-tile-border-hover`}>
                    <Image src={project.image} alt="" fill sizes={tileImageSizes} className="object-cover" />
                    <span aria-hidden="true" className={`${tileCircleClass} bg-card text-card-text`}>
                      <ArrowIcon className="size-5.5" />
                    </span>
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="flex items-baseline justify-between gap-4">
                      <strong className="text-[17px] font-semibold tracking-tight underline-offset-3 group-hover:underline">
                        {project.title}
                      </strong>
                      <ProjectDate>{project.date}</ProjectDate>
                    </span>
                    <span className="text-[15px] leading-[1.6] text-text2">{project.description}</span>
                  </span>
                </a>
              ),
            )}
          </div>
        </section>

        <footer className="flex items-center justify-between gap-4 border-t border-rule pt-5 text-xs text-muted">
          <span className="flex items-center gap-2">
            &copy; {new Date().getFullYear()} Val Enfys
            <FaPeace role="img" aria-label="Peace" className="size-3.5" title="The function of art is to do more than tell it like it is—it's to imagine what is possible." />
          </span>
          <span aria-hidden="true" className="flex gap-1">
            {steps.map((on, i) => (
              <span key={i} className={`size-1.5 rounded-xs ${on ? "bg-accent" : "bg-step-off"}`} />
            ))}
          </span>
        </footer>
      </main>
    </div>
  );
}
