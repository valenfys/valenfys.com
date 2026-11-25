# valenfys.com: homepage redesign (Nov 2026)

This replaces the previous design notes. The new homepage takes its look from Val's EPK (`public/press/ValEnfys-EPK.pdf`): off-white paper, black ink, one red accent, Space Grotesk headings over Inter body, and small uppercase red section labels above 1px black rules.

## Source files

- `home.dc.html`: the source of truth for layout, copy and styling, exported from the Claude Design canvas. It's responsive. The layout changes at a 760px container width.
- `home-mobile.dc.html`: the same page rendered at 390px, for reference.
- `val-hero.jpg` and `val-about.jpg`: press photos by Lyssa Harakis-Parish, 2000 × 2998 (2:3).

These are reference files, not runnable pages. Read the markup and inline styles, but don't serve or import them. `{{accent}}` is the accent colour. The `<sc-for>` loops are data; their arrays sit in the `renderVals()` script at the bottom of `home.dc.html`. The "Show all 11" button is static in the export but should work (see Behaviour).

## Stack rules

- **Tailwind only.** Put the tokens below in `@theme` in `app/globals.css`. Don't write new vanilla CSS beyond tokens, base styles and small `@utility` blocks.
- Load fonts with `next/font/google` (`Space_Grotesk` 400/500/700 and `Inter` 400/500/600), exposed as `--font-display` and `--font-sans`.
- **Light theme only.** The design is the EPK's paper look, so remove the `prefers-color-scheme: dark` overrides and set `color-scheme: light`.

## Tokens

| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#F4F1EC` | Page background |
| `--color-ink` | `#111111` | Text, rules, buttons, footer and "Next up" card |
| `--color-accent` | `#B3201A` | Section labels, platform links, hover states, step lights |
| `--color-muted` | `#444444` | Secondary text (passes 4.5:1 on paper) |
| `--color-rule` | `#C9C4BC` | Row dividers |
| `--color-row-hover` | `#ECE8E1` | Gig row hover |
| `--color-card-muted` | `#BDB8B0` | Secondary text on ink |
| `--color-card-rule` | `#3A3A3A` | Dividers and unlit step lights on ink |

The breakpoint is `md` (768px). The export's 760px container query maps to it.

## Page structure (`app/page.tsx`, top to bottom)

Content sits in a centred container: `max-w-[1200px] mx-auto px-14`, and `px-5` below `md`. Each section has 72px bottom padding (`pb-18`).

1. **Header:** "VAL ENFYS" (display font, 15px, bold, `tracking-[0.14em]`) on the left. On the right: anchor links to Mixes, Gigs, About and Press (14px medium, hidden below `md`), then a black "Bookings" `mailto:` button.
2. **Hero:**
   - A 3px ink rule.
   - The `<h1>` "VAL ENFYS": bold, `leading-[0.88]`, `tracking-[-0.045em]`, `text-[min(14.5vw,184px)]`.
   - Then a 2-column grid (`1fr 380px`, `gap-14`, items aligned to the bottom). On the left: the tagline (display font, 22px medium, with red middle dots), the **short bio** (18px / 1.6, `max-w-[620px]`), and two buttons: a black `val@valenfys.com →` mailto and an outlined "Listen to mixes" linking to `#mixes`. On the right: `val-hero.jpg` at 540px tall, `object-cover`, focus near the top third.
   - Below `md` it stacks, with the photo at 460px.
3. **Highlights:** a 4-column grid under a 1px ink top rule. Each item is a bold title over a plain line, with a `rule` bottom border. One column below `md`.
4. **Next up** (only when `upcoming` has events): an ink card with a date block on the left (day 44px bold, then month 13px with letter-spacing, and a `card-rule` divider), then the title (24px bold) and the venue and time (15px, `card-muted`). It wraps on mobile.
5. **Featured mixes:** a 3-column grid of outlined cards (1px ink border, 22px padding, at least 160px tall). Each has a title (22px bold), a meta line, and "SoundCloud →" in accent at the bottom. One column below `md`.
6. **Gigs & mixes:** rows under an ink top rule. Each row is a grid of `110px 1fr 140px`: the date, the title over the venue, and the platform label in accent, right-aligned. Below `md` it's `72px 1fr` and the platform label is hidden. Each row is one `<a>` with the `row-hover` background on hover.
7. **About:** the full bio from `content/bio.md` (16px / 1.65, `max-w-[680px]`) beside `val-about.jpg` (340px column, 2:3). It stacks below `md`.
8. **Press:** two outlined download tiles, the EPK PDF and the photos zip. Each has a title, a description line and "Download ↓". Under them: "Photos by Lyssa Harakis-Parish, please credit when used."
9. **Links:** a 3-column grid of text links under an ink rule (Instagram, SoundCloud, YouTube, Resident Advisor, GitHub, LinkedIn), each with ↗. One column below `md`.
10. **Footer:** an ink band. "Bookings & enquiries" label, then the email (display font, 28px bold, paper colour). On the right: the 16 drum-machine step lights (8px squares, lit = accent, off = `card-rule`) and "© {year} Val Enfys Studio".

## Content changes

- **Remove the Projects section** and everything that only it uses: `components/ProjectCard.tsx`, `components/ProjectVideo.tsx`, `components/projectTile.ts`, `content/projects.ts` and `public/projects/`.
- **Socials** become text links, so the icon components and `react-icons` can go, as long as nothing else uses them. Keep `content/socials.ts` as the list (label and href). The JSON-LD `sameAs` still uses it.
- **`content/bio.md`:** replace it with the four "About" paragraphs from the export. The E1 line is now past tense ("played E1 in November 2026 alongside Alarico and Inox Traxx"), and OMIDOX and Over.The.Techno are both credited. Keep the ADE and pointblank links that the current file has.
- **Add `content/bio-short.md`** with the hero paragraph and render it the same way as `bio.md`.
- **Highlights and featured mixes:** add them as small typed arrays (with the copy and links from the export) in `content/`.
- **`content/gigs.ts`:**
  - Move E1 into `previous` at the top: `{ month: "2026-11", title: "Rebel Rebel x E1", venue: "E1, London", href: "https://ra.co/events/2533099", kind: "event" }`.
  - Set `upcoming` to the Voices Radio show: start `2026-11-29T11:00+00:00`, end `2026-11-29T12:00+00:00`, title "NOT BAD FOR A GIRL takeover", venue "Voices Radio, Coal Drops Yard, King's Cross". It has no public event page, so make `href` optional. The card and the JSON-LD `url` should handle a missing link.
- **Photos:** move them to `public/val-hero.jpg` and `public/val-about.jpg`. Render with `next/image` and give `alt` text as in the export. The hero image gets `priority`.

## Keep as is

The JSON-LD structured data, `layout.tsx` metadata and OG image, Vercel Analytics, `robots.ts` and `sitemap.ts`, and the `public/press/` files.

## Behaviour

- **Gigs list:** show the 7 most recent, then a "Show all {n}" / "Show fewer" toggle (a real `<button>` with `aria-expanded` and `aria-controls`). Reuse the logic in `components/PreviousGigs.tsx` and restyle it.
- **Upcoming:** hide the "Next up" section when `upcoming` is empty.
- External links use the existing `external()` helper. Anchor links scroll smoothly (`scroll-behavior: smooth` on `html`, unless the user prefers reduced motion).

## Accessibility

Use real `<a>` and `<button>` elements, and `aria-hidden` on decoration (the step lights). Touch targets must be at least 44px, and every text colour above passes 4.5:1 on its background.

## Checklist

- [x] Projects code, data and images removed
- [x] Tokens and fonts set up in Tailwind (dark theme kept via `prefers-color-scheme` with the values from `home-dark.dc.html`, as requested, rather than removed)
- [x] Matches `home.dc.html` at 1440px and `home-mobile.dc.html` at 390px
- [x] Gigs toggle works, and "Next up" hides when there's nothing upcoming
- [x] Bios updated and E1 moved to previous gigs
- [x] `npm run lint` and `npm run build` pass
