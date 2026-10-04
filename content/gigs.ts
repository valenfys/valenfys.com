// start and end are ISO timestamps with the UK offset (+01:00 in summer time, +00:00 in winter).
export type UpcomingEvent = { start: string; end: string; title: string; venue: string; href: string };
export type PastEvent = { year: number; title: string; venue: string; href: string; kind: "recording" | "event" };

export const upcoming: UpcomingEvent[] = [
  {
    start: "2026-10-08T19:00+01:00",
    end: "2026-10-09T02:00+01:00",
    title: "Fragment: Open Decks",
    venue: "The Glove That Fits, London",
    href: "https://ra.co/events/2500782",
  },
];

// Link the recording if one exists, otherwise the RA event page.
export const previous: PastEvent[] = [
  { year: 2026, title: "SSL Series #002", venue: "Square Studio Lab", href: "https://soundcloud.com/valenfys/enfy-ssl-open-deck", kind: "recording" },
  { year: 2026, title: "Groovy Techno in the Woods", venue: "East London", href: "https://soundcloud.com/valenfys/groovy-techno-in-the-woods-london-july-2026", kind: "recording" },
  { year: 2025, title: "Sibling Radio", venue: "London", href: "https://soundcloud.com/sibling-radio/07112025-alien-tech-w-val-enfys-10", kind: "recording" },
  { year: 2025, title: "Over.The.Techno #23", venue: "Rostov-on-Don", href: "https://soundcloud.com/overthetechno/overthetechno-23-val-enfys", kind: "recording" },
  { year: 2025, title: "Omidox Hypnotic Podcast", venue: "Hamburg", href: "https://soundcloud.com/omidox-1/val-enfys-omidox-hypnotic", kind: "recording" },
  { year: 2025, title: "Lost Unicorns", venue: "Basing House, London", href: "https://ra.co/events/2228141", kind: "event" },
  { year: 2025, title: "Canal Film Club", venue: "Hackney Wick, London", href: "https://soundcloud.com/valenfys/studio-mix-canal-film-club", kind: "recording" },
  { year: 2025, title: "London Open Decks", venue: "Carbobar, Hackney Wick", href: "https://soundcloud.com/valenfys/live-london-open-decks", kind: "recording" },
];
