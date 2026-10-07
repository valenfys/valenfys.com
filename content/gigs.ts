// start and end are ISO timestamps with the UK offset (+01:00 in summer time, +00:00 in winter).
export type UpcomingEvent = { start: string; end: string; title: string; venue: string; href: string };
// month is "YYYY-MM".
export type PastEvent = { month: string; title: string; venue: string; href: string; kind: "recording" | "event" };

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
  { month: "2026-08", title: "SSL Series #002", venue: "Square Studio Lab", href: "https://soundcloud.com/valenfys/enfy-ssl-open-deck", kind: "recording" },
  { month: "2026-07", title: "Groovy Techno in the Woods", venue: "East London", href: "https://soundcloud.com/valenfys/groovy-techno-in-the-woods-london-july-2026", kind: "recording" },
  { month: "2025-11", title: "Sibling Radio", venue: "London", href: "https://soundcloud.com/sibling-radio/07112025-alien-tech-w-val-enfys-10", kind: "recording" },
  { month: "2025-09", title: "Omidox Hypnotic Podcast", venue: "Hamburg", href: "https://soundcloud.com/omidox-1/val-enfys-omidox-hypnotic", kind: "recording" },
  { month: "2025-09", title: "Lost Unicorns", venue: "Basing House, London", href: "https://ra.co/events/2228141", kind: "event" },
  { month: "2025-08", title: "Canal Film Club", venue: "Hackney Wick, London", href: "https://soundcloud.com/valenfys/studio-mix-canal-film-club", kind: "recording" },
  { month: "2025-07", title: "London Open Decks", venue: "Carbobar, Hackney Wick", href: "https://soundcloud.com/valenfys/live-london-open-decks", kind: "recording" },
  { month: "2025-07", title: "Over.The.Techno #23", venue: "Rostov-on-Don", href: "https://soundcloud.com/overthetechno/overthetechno-23-val-enfys", kind: "recording" },
];
