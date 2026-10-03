# valenfys.com: Projects section

The source of truth for layout and styling is `home.dc.html`, exported from the Claude Design canvas. It's a reference file, not a runnable page: read its markup and inline styles, but don't serve it or import it. Its `{{t.*}}` holes map to the colour tokens already in `app/globals.css`, and `{{accent}}` is `--color-accent`.

The rest of the page in the export matches what's live. This iteration only **adds a Projects section**. Don't change anything else.

## Placement

Add a new `<section aria-labelledby="h-projects">` in `app/page.tsx` **after "Previous gigs & mixes" and before the peace symbol**. The export uses CSS `order` and a "projectsPosition" tweak to compare positions on the canvas. Ignore both: just place the section in source order.

## Assets

Move the two images in this folder into `public/projects/` and render them with `next/image` (`fill` + `sizes="(min-width: 34rem) 34rem, 100vw"`, `object-cover`). Both are already 16:9.

| File | Source size | Use |
|---|---|---|
| `project-groovy-techno.jpg` → `public/projects/groovy-techno.jpg` | 1920 × 1080 | Video poster |
| `project-barbara-touati-evans.jpg` → `public/projects/barbara-touati-evans.jpg` | 2560 × 1440 | Link card image |

The images are decorative next to the visible title, so use `alt=""`. The interactive element carries the accessible name (see below).

## Data

Keep the projects as a typed array at the top of `page.tsx`, like `previous`:

```ts
type Project = {
  title: string;
  date: string;        // display string, e.g. "Jul 2026"
  description: string;
  image: string;       // path under /public
} & ({ kind: "video"; youtubeId: string } | { kind: "link"; href: string });
```

| Title | Date | Kind | Link / ID | Description |
|---|---|---|---|---|
| Techno Forest Party in East London | Jul 2026 | video | `0NYqs2o88Jk` | An independent outdoor party co-hosted with a fellow promoter: a night of techno, hardgroove and trance, from lineup, lighting and logistics through to the recap film. |
| Portfolio Website for Barbara Touati-Evans | Mar 2022 | link | https://www.barbara-touati-evans.com/ | Design and build of a portfolio site for an independent artist in Next.js, Sanity and Tailwind CSS, with a CMS that lets the artist update it without a developer. |

## Layout

- Section header: the existing `SectionHeader` with "Projects", then the list with `gap-3.5` (14px) under the header, as the other sections have.
- Projects stack vertically with a **32px** gap (`gap-8`).
- Each project is a column with a 14px gap: the media tile, then the text block.
- **Media tile:** full width, `aspect-video`, `rounded-xl` (12px), 1px `border-key-border`, `bg-key` behind the image while it loads, `overflow-hidden`, `relative`. On hover the border goes to `tile-border-hover` (`#cacacf` light, `#48484c` dark).
- **Centre button:** a 64px circle, absolutely centred, with `box-shadow: inset 0 -2px 0 rgb(0 0 0/.12), 0 6px 20px rgb(0 0 0/.18)`.
  - Video: `bg-accent` with a white play triangle (the same path as the "Listen" icon), 20 × 22px, nudged 4px right so it looks optically centred.
  - Link: `bg-card` / `text-card-text` (so it inverts in dark mode like the upcoming card), with the existing `ArrowIcon` at 22px.
- **Text block** (4px gap):
  - Row: the title (17px, semibold, `tracking-tight`) on the left, the date (13px, muted, tabular-nums, `shrink-0`) on the right, `items-baseline justify-between gap-4`.
  - Description: 15px / 1.6, `text-text2`.

## Behaviour

### Video project: click to load
Don't load the YouTube iframe on page load. Build a small client component (`app/ProjectVideo.tsx`):

- Initially the tile is a `<button type="button" aria-label="Play video: {title}">` with the poster image and accent play circle.
- On click, swap the tile's contents for
  `<iframe src="https://www.youtube-nocookie.com/embed/{youtubeId}?autoplay=1" title="{title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 size-full" />`
  inside the same rounded tile, so the layout doesn't shift.
- The title and description below are plain text, not a link.

### Link project
The whole project (tile and text) is one `<a>` with `{...external(href)}`. On hover the tile border darkens and the title is underlined (`underline-offset-3`). There's no other hover change.

## Unchanged rules

- Tailwind only. No new vanilla CSS beyond tokens, base styles and small `@utility` blocks.
- One system sans font. Times New Roman only for the `<h1>`. No monospace, no uppercase or letter-spaced labels.
- Real `<a>` / `<button>` elements. Decorative pieces get `aria-hidden`. Text contrast is 4.5:1 in both themes. Touch targets are at least 44px.

## Checklist

- [ ] Images in `public/projects/`, rendered with `next/image`
- [ ] Projects section sits between "Previous gigs & mixes" and the peace symbol
- [ ] Video only loads the YouTube iframe after a click, with no layout shift
- [ ] Barbara card opens her site in a new tab, with hover border and underline
- [ ] Both themes checked (the link button inverts in dark mode)
- [ ] `npm run lint` and `npm run build` pass
