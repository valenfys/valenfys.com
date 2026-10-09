// start and end are ISO timestamps with the UK offset (+01:00 in summer time, +00:00 in winter).
export type UpcomingEvent = { start: string; end: string; title: string; venue: string; href: string };
// month is "YYYY-MM".
export type PastEvent = { month: string; title: string; venue: string; href: string; kind: "audio" | "video" | "event" };

export const upcoming: UpcomingEvent[] = [];

// Link the recording if one exists, otherwise the RA event page.
export const previous: PastEvent[] = [
  { month: "2026-10", title: "Fragment: Open Decks", venue: "The Glove That Fits, London", href: "https://ra.co/events/2500782", kind: "event" },
  { month: "2026-08", title: "B2B with D LAI", venue: "BAD Studios, London", href: "https://www.youtube.com/watch?v=2ysRMIp8R5k", kind: "video" },
  { month: "2026-08", title: "SSL Series #002", venue: "Square Studio Lab, London", href: "https://www.youtube.com/watch?v=ZQdh_35LQ_s", kind: "video" },
  { month: "2026-07", title: "Techno Forest Party", venue: "East London", href: "https://www.youtube.com/watch?v=0NYqs2o88Jk", kind: "video" },
  { month: "2025-11", title: "Sibling Radio", venue: "London", href: "https://soundcloud.com/sibling-radio/07112025-alien-tech-w-val-enfys-10", kind: "audio" },
  { month: "2025-09", title: "Omidox Hypnotic Podcast", venue: "Hamburg", href: "https://soundcloud.com/omidox-1/val-enfys-omidox-hypnotic", kind: "audio" },
  { month: "2025-09", title: "Lost Unicorns", venue: "Basing House, London", href: "https://ra.co/events/2228141", kind: "event" },
  { month: "2025-08", title: "Canal Film Club", venue: "Hackney Wick, London", href: "https://soundcloud.com/valenfys/studio-mix-canal-film-club", kind: "audio" },
  { month: "2025-07", title: "London Open Decks", venue: "Carbobar, Hackney Wick", href: "https://soundcloud.com/valenfys/live-london-open-decks", kind: "audio" },
  { month: "2025-07", title: "Over.The.Techno #23", venue: "Rostov-on-Don", href: "https://soundcloud.com/overthetechno/overthetechno-23-val-enfys", kind: "audio" },
];
