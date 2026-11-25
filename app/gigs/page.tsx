import type { Metadata } from "next";
import GigList from "@/components/GigList";
import NextUp from "@/components/NextUp";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { type PastEvent, previous, upcoming } from "@/content/gigs";
import { container, section } from "@/lib/layout";
import { openGraphBase, twitterBase } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";

const title = "Gigs & mixes – Val Enfys";
const description =
  "Every gig, radio show and guest mix from London techno DJ Val Enfys, with recordings on SoundCloud and YouTube.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/gigs" },
  openGraph: { ...openGraphBase, type: "website", url: "/gigs", title, description },
  twitter: { ...twitterBase, title, description },
};

// Breadcrumbs let search results show "valenfys.com › Gigs". The page is about the Person defined on the homepage.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/gigs`,
      url: `${siteUrl}/gigs`,
      name: title,
      description,
      about: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Val Enfys", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Gigs & mixes", item: `${siteUrl}/gigs` },
      ],
    },
  ],
};

// previous is newest first, so the years come out newest first too.
function byYear(events: PastEvent[]) {
  const years = new Map<string, PastEvent[]>();
  for (const event of events) {
    const year = event.month.slice(0, 4);
    years.set(year, [...(years.get(year) ?? []), event]);
  }
  return [...years];
}

export default function Gigs() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so the JSON can't close the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <SiteHeader page="gigs" />

      <main>
        <section aria-labelledby="h-gigs" className={`${container} pt-6 pb-16`}>
          <div aria-hidden="true" className="mb-5 h-[3px] bg-ink" />
          <h1
            id="h-gigs"
            className="mb-6 font-display text-[min(12vw,96px)] leading-[0.92] font-bold tracking-[-0.04em]"
          >
            Gigs &amp; mixes
          </h1>
          <p className="max-w-[620px] text-lg leading-[1.6] text-pretty">
            Every set so far, newest first. Recordings link to SoundCloud or YouTube, and the rest link to the event on
            Resident Advisor.
          </p>
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

        {byYear(previous).map(([year, events]) => (
          <section key={year} aria-labelledby={`h-${year}`} className={section}>
            <h2 id={`h-${year}`} className="section-label">
              {year}
            </h2>
            <GigList events={events} />
          </section>
        ))}
      </main>

      <SiteFooter />
    </>
  );
}
