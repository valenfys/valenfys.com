import type { Gig } from "@/content/gigs";

// Works for "YYYY-MM" starts too: UTC midnight on the 1st is still the same month in London.
export function formatDate(iso: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", ...options }).format(new Date(iso));
}

const time = (iso: string) => new Date(iso).getTime();

// A gig counts as previous once it has ended (or, without an end, once it has started).
// Sorting is stable, so gigs in the same month keep their order from content/gigs.ts.
export function splitGigs(gigs: Gig[], now = new Date()) {
  const isPast = (gig: Gig) => time(gig.end ?? gig.start) <= now.getTime();
  return {
    upcoming: gigs.filter((gig) => !isPast(gig)).sort((a, b) => time(a.start) - time(b.start)),
    previous: gigs.filter(isPast).sort((a, b) => time(b.start) - time(a.start)),
  };
}

// Previous gigs link the recording if one exists, otherwise the event page.
export function gigLink(gig: Gig) {
  if (gig.href === undefined) return gig.recording;
  return gig.recording ?? { href: gig.href, kind: "event" as const };
}
