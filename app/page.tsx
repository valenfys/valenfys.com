import Image from "next/image";
import Markdown from "@/components/Markdown";
import NextUp from "@/components/NextUp";
import PlatformIcon from "@/components/PlatformIcon";
import PreviousGigs from "@/components/PreviousGigs";
import bioSource from "@/content/bio.md";
import bioShortSource from "@/content/bio-short.md";
import { previous, upcoming } from "@/content/gigs";
import { highlights } from "@/content/highlights";
import { mixes } from "@/content/mixes";
import { socials } from "@/content/socials";
import { external } from "@/lib/external";
import { email, siteUrl } from "@/lib/site";

// Drum machine step lights in the footer: 1 = lit.
const steps = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0];

const press = [
  { title: "Press kit", detail: "Bios, highlights and links · PDF", href: "/press/ValEnfys-EPK.pdf" },
  { title: "Press photos", detail: "4 high-res images · ZIP", href: "/press/ValEnfys-PressPics.zip" },
];

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
      email: `mailto:${email}`,
      jobTitle: ["DJ", "Audiovisual Artist"],
      address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
      sameAs: socials.map(({ href }) => href),
    },
    ...upcoming.map((event) => ({
      "@type": "MusicEvent",
      name: event.title,
      startDate: event.start,
      endDate: event.end,
      // Some events (like radio shows) have no public page.
      ...(event.href && { url: event.href }),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: event.venue, address: event.venue },
      performer: { "@id": personId },
    })),
  ],
};

// Shared layout and type classes.
const container = "mx-auto w-full max-w-[1200px] px-5 md:px-14";
const section = `${container} pb-18`;
const solidButton = "bg-ink text-paper transition-colors hover:bg-accent hover:text-paper";
const outlined = "border border-ink transition-colors hover:text-accent";
const twoCol = "grid gap-7 md:gap-14";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so the JSON can't close the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className={`${container} flex items-center justify-between gap-6 py-6`}>
        <a
          href="#top"
          className="flex min-h-11 items-center font-display text-[15px] font-bold tracking-[0.14em] hover:text-accent"
        >
          VAL ENFYS
        </a>
        <nav aria-label="Sections" className="flex items-center gap-7 text-sm font-medium">
          <span className="hidden gap-7 md:flex">
            {["Mixes", "Gigs", "About", "Press"].map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`} className="flex min-h-11 items-center hover:text-accent">
                {label}
              </a>
            ))}
          </span>
          <a href={`mailto:${email}`} className={`flex min-h-11 items-center px-4.5 py-3 font-semibold ${solidButton}`}>
            Bookings
          </a>
        </nav>
      </header>

      <main>
        <section id="top" aria-labelledby="h-name" className={`${container} pt-6 pb-16`}>
          <div aria-hidden="true" className="mb-5 h-[3px] bg-ink" />
          <h1
            id="h-name"
            className="mb-10 font-display text-[min(14.5vw,184px)] leading-[0.88] font-bold tracking-[-0.045em]"
          >
            VAL ENFYS
          </h1>
          <div className={`${twoCol} md:grid-cols-[minmax(0,1fr)_380px] md:items-end`}>
            <div className="flex flex-col gap-7 pb-1">
              <p className="font-display text-[22px] font-medium">
                DJ and audiovisual artist <span className="text-accent">·</span> Techno{" "}
                <span className="text-accent">·</span> London, UK <span className="text-muted">(she/her)</span>
              </p>
              <Markdown source={bioShortSource} className="max-w-[620px] text-lg leading-[1.6] text-pretty" />
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${email}`} className={`px-6 py-4 text-[15px] font-semibold ${solidButton}`}>
                  {email}
                </a>
                <a href="#mixes" className={`px-[23px] py-[15px] text-[15px] font-semibold ${outlined}`}>
                  Listen to mixes
                </a>
              </div>
            </div>
            <Image
              src="/val-hero.jpg"
              alt="Val Enfys crouching on gravel in a red hoodie"
              width={2000}
              height={2998}
              sizes="(min-width: 768px) 380px, 100vw"
              preload
              className="h-[460px] w-full object-cover object-[center_30%] md:h-[540px]"
            />
          </div>
        </section>

        <section aria-label="Highlights" className={section}>
          <ul className="grid gap-x-8 border-t border-ink md:grid-cols-4">
            {highlights.map(({ title, detail }) => (
              <li key={title} className="border-b border-rule py-4 text-sm leading-[1.45]">
                <strong className="block font-semibold">{title}</strong>
                {detail}
              </li>
            ))}
          </ul>
        </section>

        {upcoming.length > 0 && (
          <section aria-labelledby="h-up" className={section}>
            <h2 id="h-up" className="section-label">
              Next up
            </h2>
            <div className="flex flex-col gap-4">
              {upcoming.map((event) => (
                <NextUp key={`${event.start}-${event.title}`} event={event} />
              ))}
            </div>
          </section>
        )}

        <section id="mixes" aria-labelledby="h-mixes" className={section}>
          <h2 id="h-mixes" className="section-label">
            Featured mixes
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {mixes.map(({ title, meta, href }) => (
              <li key={href} className="flex">
                <a href={href} {...external(href)} className={`flex min-h-40 w-full flex-col gap-2 p-[22px] ${outlined}`}>
                  <span className="font-display text-[22px] leading-[1.15] font-bold">{title}</span>
                  <span className="text-sm text-muted">{meta}</span>
                  <span className="mt-auto flex items-center gap-2 text-[13px] font-semibold text-accent">
                    <PlatformIcon platform="soundcloud" className="size-4" />
                    SoundCloud
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="gigs" aria-labelledby="h-gigs" className={section}>
          <h2 id="h-gigs" className="section-label">
            Gigs &amp; mixes
          </h2>
          <PreviousGigs events={previous} />
        </section>

        <section id="about" aria-labelledby="h-about" className={section}>
          <h2 id="h-about" className="section-label">
            About
          </h2>
          <div className={`${twoCol} items-start border-t border-ink pt-7 md:grid-cols-[minmax(0,1fr)_340px]`}>
            <Markdown
              source={bioSource}
              className="flex max-w-[680px] flex-col gap-4 leading-[1.65] text-pretty [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-accent"
            />
            <Image
              src="/val-about.jpg"
              alt="Val Enfys in a red hoodie looking upwards beside an iron gate"
              width={2000}
              height={2998}
              sizes="(min-width: 768px) 340px, 100vw"
              className="aspect-[2/3] h-auto w-full object-cover"
            />
          </div>
        </section>

        <section id="press" aria-labelledby="h-press" className={section}>
          <h2 id="h-press" className="section-label">
            Press
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {press.map(({ title, detail, href }) => (
              <li key={href} className="flex">
                <a
                  href={href}
                  download
                  className={`flex w-full items-center justify-between gap-4 p-[22px] ${outlined}`}
                >
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-xl font-bold">{title}</span>
                    <span className="text-sm text-muted">{detail}</span>
                  </span>
                  <span className="shrink-0 text-[13px] font-semibold text-accent">
                    Download <span aria-hidden="true">↓</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] text-muted">Photos by Lyssa Harakis-Parish, please credit when used.</p>
        </section>

        <section aria-labelledby="h-links" className={`${container} pb-20`}>
          <h2 id="h-links" className="section-label">
            Links
          </h2>
          <ul className="grid gap-x-8 border-t border-ink md:grid-cols-3">
            {socials.map(({ label, href, platform }) => (
              <li key={href}>
                <a
                  href={href}
                  {...external(href)}
                  className="flex items-center gap-3 border-b border-rule py-4 text-[15px] font-medium hover:text-accent"
                >
                  <PlatformIcon platform={platform} className="size-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="bg-ink text-paper">
        <div className={`${container} flex flex-wrap items-center justify-between gap-5 py-9`}>
          <div className="flex flex-col gap-1.5">
            <span className="font-display text-xs font-bold tracking-[0.14em] text-card-muted uppercase">
              Bookings &amp; enquiries
            </span>
            <a
              href={`mailto:${email}`}
              className="flex min-h-11 items-center font-display text-[28px] font-bold wrap-anywhere underline-offset-4 hover:underline"
            >
              {email}
            </a>
          </div>
          <div className="flex flex-col items-end gap-2.5">
            <span aria-hidden="true" className="flex gap-1">
              {steps.map((on, i) => (
                <span key={i} className={`size-2 ${on ? "bg-accent" : "bg-card-rule"}`} />
              ))}
            </span>
            <span className="text-[13px] text-card-muted">&copy; {new Date().getFullYear()} Val Enfys Studio</span>
          </div>
        </div>
      </footer>
    </>
  );
}
