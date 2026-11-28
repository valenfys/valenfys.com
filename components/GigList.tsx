import type { GigLink, PastEvent } from "@/content/gigs";
import { external } from "@/lib/external";
import { shortMonths } from "@/lib/months";
import PlatformIcon from "@/components/PlatformIcon";

// name is the chip label; fullName is read out by screen readers.
const platforms: Record<GigLink["platform"], { name: string; fullName: string }> = {
  youtube: { name: "YouTube", fullName: "YouTube" },
  soundcloud: { name: "SoundCloud", fullName: "SoundCloud" },
  ra: { name: "RA", fullName: "Resident Advisor" },
  bloop: { name: "Bloop", fullName: "Bloop London Radio" },
};

// "2025-09" → "Sep 2025"
function formatMonth(month: string) {
  const [year, m] = month.split("-");
  return `${shortMonths[Number(m) - 1]} ${year}`;
}

// Past gigs as rows under a 1px ink rule. The homepage shows the latest few; /gigs shows them all, a list per year.
export default function GigList({ events }: { events: PastEvent[] }) {
  return (
    <ul className="border-t border-ink">
      {events.map((event) => (
        // The title link stretches over the whole row (its ::after), so the row stays one big target. The secondary
        // chips sit above it (relative z-10), since links can't nest.
        <li
          key={`${event.month}-${event.title}`}
          className="group relative grid grid-cols-[72px_minmax(0,1fr)] items-center gap-x-3.5 gap-y-2.5 border-b border-rule px-2 py-4 transition-colors hover:bg-row-hover md:grid-cols-[110px_minmax(0,1fr)_auto] md:gap-6"
        >
          <span className="row-span-2 text-sm text-muted tabular-nums md:row-span-1">{formatMonth(event.month)}</span>
          <span className="flex flex-col gap-[3px]">
            <a
              href={event.primary.href}
              {...external(event.primary.href)}
              className="font-semibold transition-colors gig-hover:text-accent after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent"
            >
              {event.title}
              <span className="sr-only">, {platforms[event.primary.platform].name}</span>
            </a>
            <span className="text-sm text-muted">{event.venue}</span>
          </span>
          {/* Below md the chips sit under the venue, wrapping if they run out of room. From md they're a right-aligned
              third column. */}
          <span className="col-start-2 flex flex-wrap items-center gap-2 justify-self-start md:col-start-3 md:row-start-1 md:justify-self-end">
            {event.secondary?.map((link) => (
              <SecondaryChip key={link.href} link={link} title={event.title} />
            ))}
            <span
              aria-hidden="true"
              className={`${chip} gig-hover:border-accent gig-hover:bg-accent gig-hover:text-paper`}
            >
              <PlatformIcon platform={event.primary.platform} className="size-3" />
              {platforms[event.primary.platform].name}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

// Outlined tag, like the mix cards and press tiles.
const chip =
  "flex items-center gap-1.5 border border-ink px-2 py-1 text-[13px] leading-none font-semibold text-accent transition-colors";

// A secondary link, like the RA event page or another upload of the set. The transparent link is 44px tall around the
// smaller chip; the negative margin keeps that extra height from adding to the row.
function SecondaryChip({ link, title }: { link: GigLink; title: string }) {
  const { name, fullName } = platforms[link.platform];
  return (
    <a
      href={link.href}
      {...external(link.href)}
      data-secondary
      className="group/secondary relative z-10 -my-2.5 flex min-h-11 items-center"
    >
      <span
        className={`${chip} group-hover/secondary:border-accent group-hover/secondary:bg-accent group-hover/secondary:text-paper`}
      >
        <PlatformIcon platform={link.platform} className="size-3" />
        {name}
        <span className="sr-only">
          : {title} on {fullName}
        </span>
      </span>
    </a>
  );
}
