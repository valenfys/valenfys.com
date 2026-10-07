import { marked } from "marked";
import Image from "next/image";
import ArrowIcon from "@/components/ArrowIcon";
import Bio from "@/components/Bio";
import PreviousGigs from "@/components/PreviousGigs";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import UpcomingGig from "@/components/UpcomingGig";
import bioSource from "@/content/bio.md";
import { previous, upcoming } from "@/content/gigs";
import { projects } from "@/content/projects";
import { socials } from "@/content/socials";
import { external } from "@/lib/external";
import { email, siteUrl } from "@/lib/site";

// Edit content/bio.md to change the bio. It's rendered at build time, so no Markdown parser ships to the browser.
const bio = marked.parse(new TextDecoder().decode(bioSource), { async: false });

// Drum machine step lights in the footer: 1 = lit.
const steps = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0];

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
            href={`mailto:${email}`}
            className="flex items-center justify-between gap-4 rounded-xl border border-key-border bg-key py-4 pr-4 pl-6 transition-colors hover:bg-key-hover"
          >
            <span className="flex min-w-0 flex-col gap-1">
              <span className="text-[13px] font-medium text-muted">Bookings &amp; enquiries</span>
              <span className="text-2xl font-medium tracking-tight wrap-anywhere">{email}</span>
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
            <div className="grid grid-cols-2 gap-2">
              {socials.map(({ label, shortLabel, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  // Keep the full name for screen readers when the short one is showing.
                  aria-label={shortLabel && label}
                  {...external(href)}
                  // pl-4 matches the (h-13 - size-5) / 2 space above and below the icon.
                  className="flex h-13 items-center gap-3 rounded-xl border border-tile-border bg-tile pr-3 pl-4 transition-colors hover:border-tile-border-hover hover:bg-tile-hover"
                >
                  <Icon aria-hidden="true" className="size-5 shrink-0" />
                  <span className="min-w-0 text-[15px] leading-tight font-medium wrap-break-word">
                    {shortLabel ? (
                      <>
                        <span className="max-xs:hidden">{label}</span>
                        <span className="xs:hidden">{shortLabel}</span>
                      </>
                    ) : (
                      label
                    )}
                  </span>
                </a>
              ))}
            </div>
          </nav>
        </header>

        {upcoming.length > 0 && (
          <section aria-labelledby="h-upcoming" className="flex flex-col gap-3.5">
            <SectionHeader id="h-upcoming">Upcoming gigs</SectionHeader>
            {upcoming.map((event) => (
              <UpcomingGig key={event.href} event={event} />
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
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <footer className="flex items-center justify-between gap-4 border-t border-rule pt-5 text-xs text-muted">
          <span>&copy; {new Date().getFullYear()} Val Enfys Studio</span>
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
