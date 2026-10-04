# valenfys.com

Personal site for Val Enfys, a London-based DJ, artist and software engineer. It's a single page with a short bio, a bookings email, social links, and upcoming and previous gigs and mixes.

Live at [valenfys.com](https://valenfys.com).

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router) with React 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4 via PostCSS
- [marked](https://marked.js.org/) to render the bio from Markdown
- [react-icons](https://react-icons.github.io/react-icons/) for the social brand icons
- [Vercel Analytics](https://vercel.com/docs/analytics)

## How it works

The page is statically rendered at build time. There's no database, CMS or API; all content lives in the repo.

| Path | What it is |
|---|---|
| `app/page.tsx` | The home page. Social links, upcoming events and previous gigs are typed arrays at the top of the file. This file also builds the JSON-LD structured data (`Person` and `MusicEvent`). |
| `content/bio.md` | The bio. It's imported as bytes and converted to HTML with `marked` at build time, so no Markdown parser ships to the browser. |
| `components/` | Reusable components. `Bio`, `PreviousGigs` and `ProjectVideo` are client components (the bio's "Read more" toggle, the "Show all" gigs toggle, and the click-to-load YouTube embed). `SectionHeader` and `ArrowIcon` are server components, and `projectTile.ts` holds the tile classes shared by `ProjectVideo` and the link cards in `page.tsx`. |
| `lib/external.ts` | Adds `target="_blank"` and `rel="noreferrer"` to off-site links. |
| `app/layout.tsx` | Root layout, page metadata and the `<Analytics />` component. |
| `app/globals.css` | Tailwind import, theme tokens (colours, fonts, the `xs` breakpoint) with dark-mode overrides, and two custom utilities: `pride-bar` and `grille`. |
| `app/robots.ts`, `app/sitemap.ts` | Generate `robots.txt` and `sitemap.xml`. |
| `next.config.ts` | A Turbopack rule that loads `*.md` files as bytes, so bio edits hot-reload in `next dev`. `types/markdown.d.ts` types those imports. |
| `design/` | The design handoff spec and the exported Claude Design canvas (`home.dc.html`). It's for reference only and isn't served. |

Dates are formatted in the `Europe/London` time zone. Event `start` and `end` timestamps should include the UK offset (`+01:00` in summer time, `+00:00` in winter). The page hides the Upcoming section when the `upcoming` array is empty.

Because the page is static, events don't move from Upcoming to Previous automatically. When a gig has happened, update the arrays in `page.tsx`.

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
