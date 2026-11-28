// start and end are ISO timestamps with the UK offset (+01:00 in summer time, +00:00 in winter).
// href is optional: leave it out when there's no public event page.
export type UpcomingEvent = { start: string; end: string; title: string; venue: string; href?: string };
// month is "YYYY-MM". primary is the recording if one exists, otherwise the event or show page (RA, or the radio
// station's own page). secondary holds any other links (the RA page, or another upload of the same set), shown as
// smaller chips before the primary one.
export type GigLink = { platform: "youtube" | "soundcloud" | "ra" | "bloop"; href: string };
export type PastEvent = {
  month: string;
  title: string;
  venue: string;
  primary: GigLink;
  secondary?: GigLink[];
};

export const upcoming: UpcomingEvent[] = [
  {
    start: "2026-11-29T11:00+00:00",
    end: "2026-11-29T12:00+00:00",
    title: "NOT BAD FOR A GIRL takeover",
    venue: "Voices Radio, London",
  },
];

export const previous: PastEvent[] = [
  { month: "2026-11", title: "Johnny Fiore powered by E1", venue: "Bloop London Radio, London", primary: { platform: "youtube", href: "https://www.youtube.com/watch?v=p2NcihGbwII" }, secondary: [{ platform: "bloop", href: "https://blooplondon.com/show/johnny-fiore-powered-by-e1-w-e1-london-club-team-guest-val-enfys-26-11-26/" }, { platform: "soundcloud", href: "https://soundcloud.com/blooplondon/johnny-fiore-powered-by-e1-w-e1-london-club-team-and-guest-val-enfys-261126" }] },
  { month: "2026-11", title: "Rebel Rebel x E1", venue: "E1, London", primary: { platform: "youtube", href: "https://www.youtube.com/watch?v=0mlQV31Q_mc" }, secondary: [{ platform: "ra", href: "https://ra.co/events/2533099" }, { platform: "soundcloud", href: "https://soundcloud.com/valenfys/val-enfys-techno-dj-set-e1" }] },
  { month: "2026-10", title: "Fragment: Open Decks", venue: "The Glove That Fits, London", primary: { platform: "soundcloud", href: "https://soundcloud.com/valenfys/fragment-open-decks" }, secondary: [{ platform: "ra", href: "https://ra.co/events/2500782" }] },
  { month: "2026-08", title: "B2B with D LAI", venue: "BAD Studios, London", primary: { platform: "youtube", href: "https://www.youtube.com/watch?v=2ysRMIp8R5k" }, secondary: [{ platform: "soundcloud", href: "https://soundcloud.com/valenfys/val-enfys-b2b-d-lai-at-bad-studios" }] },
  { month: "2026-08", title: "SSL Series #002", venue: "Square Studio Lab, London", primary: { platform: "youtube", href: "https://www.youtube.com/watch?v=ZQdh_35LQ_s" }, secondary: [{ platform: "ra", href: "https://ra.co/events/2504530" }, { platform: "soundcloud", href: "https://soundcloud.com/valenfys/enfy-ssl-open-deck" }] },
  { month: "2026-07", title: "Techno Forest Party", venue: "East London", primary: { platform: "youtube", href: "https://www.youtube.com/watch?v=0NYqs2o88Jk" }, secondary: [{ platform: "soundcloud", href: "https://soundcloud.com/valenfys/groovy-techno-in-the-woods-london-july-2026" }] },
  { month: "2025-11", title: "Sibling Radio", venue: "London (Online)", primary: { platform: "soundcloud", href: "https://soundcloud.com/sibling-radio/07112025-alien-tech-w-val-enfys-10" } },
  { month: "2025-09", title: "Omidox Hypnotic Podcast", venue: "Hamburg (Online)", primary: { platform: "soundcloud", href: "https://soundcloud.com/omidox-1/val-enfys-omidox-hypnotic" } },
  { month: "2025-09", title: "Lost Unicorns", venue: "Basing House, London", primary: { platform: "ra", href: "https://ra.co/events/2228141" } },
  { month: "2025-08", title: "Canal Film Club", venue: "Hackney Wick, London", primary: { platform: "soundcloud", href: "https://soundcloud.com/valenfys/studio-mix-canal-film-club" } },
  { month: "2025-07", title: "London Open Decks", venue: "Carbobar, Hackney Wick", primary: { platform: "soundcloud", href: "https://soundcloud.com/valenfys/live-london-open-decks" } },
  { month: "2025-07", title: "Over.The.Techno #23", venue: "Rostov-on-Don (Online)", primary: { platform: "soundcloud", href: "https://soundcloud.com/overthetechno/overthetechno-23-val-enfys" } },
];
