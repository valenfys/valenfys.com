# valenfys.com redesign: handoff spec

Design for [issue #1](https://github.com/valenfys/valenfys.com/issues/1). The source of truth for layout and styling is `home.dc.html`, exported from the Claude Design canvas. It's a reference file, not a runnable page: read its markup and inline styles, but don't serve it or import it.

## Goal

Rewrite `app/page.tsx` and `app/globals.css` so that the site matches this design, using **Tailwind only**. Codex wrote vanilla CSS last time, which is what the issue is about. `globals.css` should end up as little more than `@import "tailwindcss";`, theme tokens and base styles.

Issue checklist this design covers:
- [x] Small peace symbol, like valerie.photos
- [x] Section headers for upcoming events and socials (plus previous events)
- [x] Email displayed more prominently
- [x] Location (London) and short biography (bio is lorem ipsum placeholder for now)

## Page structure (top to bottom)

Single centred column, `max-width: 34rem`, page padding `72px 24px 56px`, `52px` gap between blocks.

1. **Rainbow bar**: 3.5rem × 4px, fully rounded, six-colour vintage Apple stripe (`#61bb46 #fdb827 #f5821f #e03a3e #963d97 #009ddc`, equal stops). It's decorative (`aria-hidden`). Always shown.
2. **Name + grille**: `<h1>` "Val Enfys" in Times New Roman, `clamp(3.75rem, 17vw, 5.25rem)`, weight 400, letter-spacing `-0.065em`, line-height `.88`, followed by a full stop in the accent colour. To the right, a decorative Braun-style speaker-grille dot grid (70 × 42px, `radial-gradient` dots on a 7px grid), hidden below 480px.
3. **Title + location**: "DJ, Artist & Software Engineer" (15px, semibold) and "London, UK" (14px, secondary text) with a 7px accent dot and a soft 3px ring, side by side and wrapping on small screens.
4. **Bio**: 15px / 1.6, secondary text colour. Lorem ipsum placeholder; Val will write the real copy.
5. **Email key**: full-width `mailto:val@valenfys.com` link styled as a Braun-like key. Surface background, 1px border, 14px radius, padding `18px 18px 18px 22px`. Left side: label "Bookings & enquiries" (12px, semibold, muted) above the email (1.5rem, weight 500, `-0.025em`). Right side: a 48px accent-coloured circle with a white ↗ arrow icon and a subtle inset bottom shadow.
6. **Socials** (section header, then a 6-column grid with 8px gap): icon-only tiles, 52px tall, 12px radius, 1px border. Each one needs an `aria-label` and a `title`. Order: Instagram, YouTube, SoundCloud, Bandcamp, GitHub, LinkedIn. Use `react-icons` (already a dependency) for the brand glyphs at 20px. They sit near the top on purpose, so they're on the first screen on mobile.
7. **Upcoming** (section header, then a card): a link to the RA event. Card: 14px radius, 20px padding. Left: date block (day `30px` semibold tabular-nums, month `13px` sentence case e.g. "Oct") with a 1px divider to its right. Middle: event name (17px semibold), then time and venue (13px, muted). Top right: ↗.
8. **Previous** (section header, then a list): each row is a link, a 3-column grid (`3.5rem | 1fr | auto`, 16px gap), padding `14px 10px` with `-10px` horizontal margin so the hover fill extends past the text, and 1px dividers between rows (none after the last). Columns: year (13px muted, tabular-nums) | event name (15px, 500) over venue or city (13px muted) | link indicator.
   - **Link rule:** link to the recording (SoundCloud or YouTube) if one exists, otherwise to the RA event page.
   - **Indicator:** recordings show a small accent-coloured play triangle + "Listen" (13px, 500). Event pages show a muted ↗. No "DJ set"/"Mix" tags.
9. **Peace symbol**: centred on its own between Previous and the footer, 22px, stroke 1.6, `currentColor`, `role="img" aria-label="Peace"`. It should not sit next to any other element.
10. **Footer**: 1px top rule, 20px top padding, 12px muted text. Left: "© {current year} Val Enfys" (keep the existing dynamic year). Right: 16 tiny 6px squares (1.5px radius, 4px gap) like a drum machine's step lights, lit in the accent on steps 1, 5, 9, 11 and 13, the rest in the "step off" colour. Decorative (`aria-hidden`).

**Section headers** (Socials, Upcoming, Previous): `<h2>` in sentence case, 13px, weight 500, muted colour, followed by a 1px rule that fills the rest of the row (flex, 12px gap). No uppercase, no numbering. Spacing from header to content is 12–14px.

## Typography

- One sans font throughout: the system stack `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, sans-serif`.
- Serif **only** for the `<h1>` name: `"Times New Roman", Times, serif`.
- **No monospace font anywhere, and no uppercase/letter-spaced labels.** Both were tried and rejected.

## Colour tokens

Accent: `#e03a3e` (red from the rainbow). Use it for the name's full stop, the location dot, the email key circle, the "Listen" play icon and the lit step lights.

| Token | Light | Dark |
|---|---|---|
| bg | `#fbfbfa` | `#111112` |
| text | `#1d1d1f` | `#f2f2f0` |
| text2 (bio, location) | `#515156` | `#b8b8bc` |
| muted (labels, meta) | `#6e6e73` | `#9a9aa0` |
| rule (section header lines, footer) | `#e2e2e0` | `#2a2a2c` |
| rule2 (row dividers) | `#ececea` | `#222224` |
| keyBg (email key) | `#f2f1ee` | `#1b1b1d` |
| keyBorder | `#e4e3df` | `#2e2e31` |
| tile (social tiles) | `#ffffff` | `#18181a` |
| tileBorder | `#e5e5e7` | `#2e2e31` |
| card (upcoming event) | `#1d1d1f` | `#f2f1ee` |
| cardText | `#ffffff` | `#1d1d1f` |
| cardMuted | `#b3b3b8` | `#5f5f64` |
| cardRule | `#3a3a3d` | `#d9d8d4` |
| stepOff | `#dcdcd9` | `#2e2e31` |
| grille dots | `#c9c9c6` | `#3f3f42` |

The upcoming-event card **inverts** in dark mode (dark card on a light page, light card on a dark page) so it stays the strongest element on the page.

Hover states: social tiles get a slightly darker border and fill, the email key darkens slightly, the event card lightens (light mode) or darkens (dark mode), and previous-event rows get a `keyBg` fill. Light: tile `#f6f6f4` / border `#cacacf`, key `#ecebe7`, card `#2a2a2d`, row `#f2f1ee`. Dark: tile `#232326` / border `#48484c`, key `#232326`, card `#e8e7e3`, row `#1b1b1d`.

## Dark mode

- Follow the visitor's system setting (`prefers-color-scheme`). There is **no on-page toggle**.
- Suggested approach: define the tokens above as CSS variables in `globals.css` under `@theme` (or `:root` plus a `@media (prefers-color-scheme: dark)` override), and use them as Tailwind colour utilities, e.g. `bg-bg`, `text-muted`.

## Data

Keep events and links as typed arrays at the top of `page.tsx` (or in a small `data.ts`), not hard-coded markup. Suggested shape:

```ts
type PastEvent = { year: number; title: string; venue: string; href: string; kind: "recording" | "event" };
```

Current content (the `href`s are TODO; Val will supply them):

| Year | Title | Venue | Kind |
|---|---|---|---|
| 2026 | SSL Series #002 | Square Studio Lab | event (switch to recording if one exists) |
| 2026 | Omidox Hypnotic Podcast | Hamburg | recording |
| 2026 | Sibling Radio | London | recording |
| 2025 | Lost Unicorns | Basing House, London | event |

Upcoming: Fragment: Open Decks, 8 Oct 2026, 19:00–02:00, The Glove That Fits, London, https://ra.co/events/2500782. If there are no upcoming events, hide the Upcoming section entirely.

Social links: keep the existing URLs in `page.tsx`.

## Accessibility

- Real `<a>` elements for every link. External links get `target="_blank" rel="noreferrer"`.
- Icon-only social links need `aria-label`. Decorative pieces (rainbow, grille, step lights, arrows) get `aria-hidden`.
- Text contrast meets 4.5:1 in both themes with the tokens above.
- Touch targets are at least 44px (social tiles are 52px tall).

## Metadata

Keep the existing `metadata` in `layout.tsx` and the Vercel Analytics component.
