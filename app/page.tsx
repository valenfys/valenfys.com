import Image from "next/image";
import Link from "next/link";
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";
import Markdown from "@/components/Markdown";
import NextUp from "@/components/NextUp";
import PlatformIcon from "@/components/PlatformIcon";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import GigList from "@/components/GigList";
import bioSource from "@/content/bio.md";
import bioShortSource from "@/content/bio-short.md";
import { previous, upcoming } from "@/content/gigs";
import { highlights } from "@/content/highlights";
import { mixes } from "@/content/mixes";
import { socials } from "@/content/socials";
import { external } from "@/lib/external";
import { container, moreLink, outlined, section, solidButton } from "@/lib/layout";
import { email, siteUrl } from "@/lib/site";

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

// The homepage shows the latest few gigs; the rest are on /gigs.
const homeGigCount = 7;

const twoCol = "grid gap-7 md:gap-14";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so the JSON can't close the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <SiteHeader page="home" />

      <main>
        <section id="top" aria-labelledby="h-name" className={`${container} pt-6 pb-16`}>
          <div aria-hidden="true" className="mb-5 h-[3px] bg-ink" />
          {/* On md+, the name runs across the top of the photo. White with mix-blend-difference inverts whatever is
              behind it: the photo where they overlap, and the page background (dark text on paper, light on dark). */}
          <div className={`${twoCol} md:grid-cols-[minmax(0,1fr)_380px] md:grid-rows-[auto_1fr]`}>
            <h1
              id="h-name"
              className="relative z-10 font-display text-[min(11vw,140px)] leading-[0.88] font-black tracking-[-0.02em] text-white uppercase mix-blend-difference md:col-[1/-1] md:row-start-1"
            >
              VAL ENFYS
            </h1>
            <div className="flex flex-col gap-7 pb-1 md:col-start-1 md:row-start-2 md:self-end">
              <p className="font-display text-[15px] font-extrabold tracking-[0.08em] uppercase">
                Techno <span className="text-accent">·</span> London
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
              className="h-[460px] w-full object-cover object-[center_30%] md:col-start-2 md:row-span-2 md:row-start-1 md:mt-14 md:h-[540px]"
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
                <a
                  href={href}
                  {...external(href)}
                  className={`flex min-h-40 w-full flex-col gap-2 p-[22px] ${outlined}`}
                >
                  <span className="font-display text-lg leading-[1.15] font-extrabold uppercase">{title}</span>
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
          <GigList events={previous.slice(0, homeGigCount)} />
          <Link href="/gigs" className={moreLink}>
            See all {previous.length} gigs
            <FaArrowRight aria-hidden="true" className="ml-2 size-3 shrink-0" />
          </Link>
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
                    <span className="font-display text-lg font-extrabold uppercase">{title}</span>
                    <span className="text-sm text-muted">{detail}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-accent">
                    Download <FaArrowDown aria-hidden="true" className="size-3 shrink-0" />
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

      <SiteFooter />
    </>
  );
}
