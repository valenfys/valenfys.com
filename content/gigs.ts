export type Recording = { href: string; kind: "audio" | "video" };

// start and end are ISO timestamps with the UK offset (+01:00 in summer time, +00:00 in winter).
// Older gigs where only the month is known may use "YYYY-MM" for start and leave out end; those always count as past.
// href is the event page (usually RA); online shows without one just need a recording.
// Gigs move from upcoming to previous automatically once they end, and previous gigs link the recording if there is one.
export type Gig = { start: string; end?: string; title: string; venue: string } & (
  | { href: string; recording?: Recording }
  | { href?: undefined; recording: Recording }
);

export const gigs: Gig[] = [
  { start: "2026-10", title: "Fragment: Open Decks", venue: "The Glove That Fits, London", href: "https://ra.co/events/2500782" },
  { start: "2026-08", title: "B2B with D LAI", venue: "BAD Studios, London", recording: { href: "https://www.youtube.com/watch?v=2ysRMIp8R5k", kind: "video" } },
  { start: "2026-08", title: "SSL Series #002", venue: "Square Studio Lab, London", recording: { href: "https://www.youtube.com/watch?v=ZQdh_35LQ_s", kind: "video" } },
  { start: "2026-07", title: "Techno Forest Party", venue: "East London", recording: { href: "https://www.youtube.com/watch?v=0NYqs2o88Jk", kind: "video" } },
  { start: "2025-11", title: "Sibling Radio", venue: "London (Online)", recording: { href: "https://soundcloud.com/sibling-radio/07112025-alien-tech-w-val-enfys-10", kind: "audio" } },
  { start: "2025-09", title: "Omidox Hypnotic Podcast", venue: "Hamburg (Online)", recording: { href: "https://soundcloud.com/omidox-1/val-enfys-omidox-hypnotic", kind: "audio" } },
  { start: "2025-09", title: "Lost Unicorns", venue: "Basing House, London", href: "https://ra.co/events/2228141" },
  { start: "2025-08", title: "Canal Film Club", venue: "Hackney Wick, London", recording: { href: "https://soundcloud.com/valenfys/studio-mix-canal-film-club", kind: "audio" } },
  { start: "2025-07", title: "London Open Decks", venue: "Carbobar, Hackney Wick", recording: { href: "https://soundcloud.com/valenfys/live-london-open-decks", kind: "audio" } },
  { start: "2025-07", title: "Over.The.Techno #23", venue: "Rostov-on-Don (Online)", recording: { href: "https://soundcloud.com/overthetechno/overthetechno-23-val-enfys", kind: "audio" } },
];
