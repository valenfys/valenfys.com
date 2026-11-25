# valenfys.com

Personal site for Val Enfys, a London-based DJ, artist and software engineer. It's a single page with a bio, highlights, featured mixes, upcoming and previous gigs, press downloads and links.

Live at [valenfys.com](https://valenfys.com).

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router) with React 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4 via PostCSS
- [marked](https://marked.js.org/) to render the bio from Markdown
- [react-icons](https://react-icons.github.io/react-icons/) for the monochrome platform icons
- [next/font](https://nextjs.org/docs/app/api-reference/components/font) for Space Grotesk (headings) and Inter (body)
- [Vercel Analytics](https://vercel.com/docs/analytics)

## How it works

The page is statically rendered at build time. There's no database, CMS or API; all content lives in the repo.

| Path | What it is |
|---|---|
| `app/page.tsx` | The home page layout. It also builds the JSON-LD structured data (`Person` and `MusicEvent`). |
| `content/socials.ts`, `content/gigs.ts`, `content/highlights.ts`, `content/mixes.ts` | Links, upcoming and previous gigs, the highlights strip and the featured mixes, as typed arrays. Edit these to update the page. An upcoming event's `href` is optional. A past gig links its recording, or the RA page if there isn't one; add `ra` when there's both. |
| `content/bio.md`, `content/bio-short.md` | The full bio (About) and the short bio (hero). They're imported as bytes and converted to HTML with `marked` at build time by `components/Markdown.tsx`, so no Markdown parser ships to the browser. |
| `components/` | `PreviousGigs` is a client component (the "Show all" gigs toggle). `NextUp` (the upcoming gig card), `Markdown` and `PlatformIcon` (brand icons, with `RaIcon` for Resident Advisor) are server components. |
| `lib/site.ts` | The site URL and contact email, used by the page, metadata, `robots.ts` and `sitemap.ts`. |
| `lib/external.ts` | Adds `target="_blank"` and `rel="noreferrer"` to off-site links. |
| `lib/months.ts` | Short month names (Intl's en-GB gives "Sept"). |
| `app/layout.tsx` | Root layout, fonts, page metadata and the `<Analytics />` component. |
| `app/globals.css` | Tailwind import, theme tokens (colours and fonts) with `prefers-color-scheme: dark` overrides, base styles, and the `section-label` utility. |
| `app/robots.ts`, `app/sitemap.ts` | Generate `robots.txt` and `sitemap.xml`. |
| `next.config.ts` | A Turbopack rule that loads `*.md` files as bytes, so bio edits hot-reload in `next dev`. `types/markdown.d.ts` types those imports. |
| `design/` | The design handoff spec and the exported Claude Design canvases (`home*.dc.html`). It's for reference only and isn't served. |

Dates are formatted in the `Europe/London` time zone. Event `start` and `end` timestamps should include the UK offset (`+01:00` in summer time, `+00:00` in winter). The page hides the "Next up" section when the `upcoming` array is empty.

Because the page is static, events don't move from Upcoming to Previous automatically. When a gig has happened, update the arrays in `content/gigs.ts`.

Imports use the `@/` alias for the project root (set in `tsconfig.json`), e.g. `@/components/NextUp`.

## Development

```sh
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # production build
```

## Deployment

The site is hosted on [Vercel](https://vercel.com/) with the Git integration:

- Pushes to `main` deploy to production at valenfys.com.
- Pull requests get their own preview deployments.

Vercel detects the Next.js framework, so there's no `vercel.json`. Vercel Analytics is enabled through the `@vercel/analytics` package.
