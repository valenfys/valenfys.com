// start and end are ISO timestamps with the UK offset (+01:00 in summer time, +00:00 in winter).
// href is optional: leave it out when there's no public event page.
export type UpcomingEvent = { start: string; end: string; title: string; venue: string; href?: string };
// month is "YYYY-MM". ra is the RA event page, for gigs whose main link is a recording.
export type PastEvent = {
  month: string;
  title: string;
  venue: string;
  href: string;
  kind: "audio" | "video" | "event";
  ra?: string;
};

export const upcoming: UpcomingEvent[] = [
  {
    start: "2026-11-29T11:00+00:00",
    end: "2026-11-29T12:00+00:00",
    title: "NOT BAD FOR A GIRL takeover",
    venue: "Voices Radio, London",
  },
];

// Link the recording if one exists, otherwise the RA event page. Add ra when there's both.
export const previous: PastEvent[] = [
  { month: "2026-11", title: "Rebel Rebel x E1", venue: "E1, London", href: "https://www.youtube.com/watch?v=0mlQV31Q_mc", kind: "video", ra: "https://ra.co/events/2533099" },
  { month: "2026-10", title: "Fragment: Open Decks", venue: "The Glove That Fits, London", href: "https://soundcloud.com/valenfys/fragment-open-decks", kind: "audio", ra: "https://ra.co/events/2500782" },
  { month: "2026-08", title: "B2B with D LAI", venue: "BAD Studios, London", href: "https://www.youtube.com/watch?v=2ysRMIp8R5k", kind: "video" },
  { month: "2026-08", title: "SSL Series #002", venue: "Square Studio Lab, London", href: "https://www.youtube.com/watch?v=ZQdh_35LQ_s", kind: "video", ra: "https://ra.co/events/2504530" },
  { month: "2026-07", title: "Techno Forest Party", venue: "East London", href: "https://www.youtube.com/watch?v=0NYqs2o88Jk", kind: "video" },
  { month: "2025-11", title: "Sibling Radio", venue: "London (Online)", href: "https://soundcloud.com/sibling-radio/07112025-alien-tech-w-val-enfys-10", kind: "audio" },
  { month: "2025-09", title: "Omidox Hypnotic Podcast", venue: "Hamburg (Online)", href: "https://soundcloud.com/omidox-1/val-enfys-omidox-hypnotic", kind: "audio" },
  { month: "2025-09", title: "Lost Unicorns", venue: "Basing House, London", href: "https://ra.co/events/2228141", kind: "event" },
  { month: "2025-08", title: "Canal Film Club", venue: "Hackney Wick, London", href: "https://soundcloud.com/valenfys/studio-mix-canal-film-club", kind: "audio" },
  { month: "2025-07", title: "London Open Decks", venue: "Carbobar, Hackney Wick", href: "https://soundcloud.com/valenfys/live-london-open-decks", kind: "audio" },
  { month: "2025-07", title: "Over.The.Techno #23", venue: "Rostov-on-Don (Online)", href: "https://soundcloud.com/overthetechno/overthetechno-23-val-enfys", kind: "audio" },
];
