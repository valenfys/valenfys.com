# valenfys.com: profile photo and collapsible gigs list

The source of truth for layout and styling is `home.dc.html`, exported from the Claude Design canvas. It's a reference file, not a runnable page: read its markup and inline styles, but don't serve it or import it. Its `{{t.*}}` holes map to the colour tokens already in `app/globals.css`, and `{{accent}}` is `--color-accent`.

The page is already built in Tailwind (`app/page.tsx`, `app/Bio.tsx`, `app/globals.css`). This iteration is a small delta on top of it. Don't change anything that isn't listed below.

## Changes

### 1. Replace the speaker grille with a circular profile photo

- Delete the grille `<div>` next to the `<h1>`, the `grille` utility and the `--color-grille` token (light and dark) in `globals.css`.
- Move `design/val-portrait.jpg` (643 × 643) to `public/val-portrait.jpg` and render it with `next/image`, e.g. `<Image src="/val-portrait.jpg" width={168} height={168} priority … />`. Use 2× the display size for retina.
- Display size is **84px**, a perfect circle (`rounded-full`), `object-cover` with `object-position: 50% 35%` so the face sits in the middle of the crop.
- Ring: `box-shadow: 0 0 0 1px var(--color-rule), 0 0 0 4px var(--color-bg), 0 0 0 5px var(--color-rule)` (a hairline, a 3px gap in the page background, then a second hairline). Put it in an arbitrary shadow class or a small `@utility`.
- Name row: change `items-end` to `items-center`, keep `justify-between gap-6`, and add `shrink-0` on the photo.
- Unlike the grille, the photo **stays visible on small screens**: it drops to **64px** below the `xs` breakpoint (30rem), e.g. `size-21 max-xs:size-16`.
- Alt text: `"Portrait of Val Enfys"`.

### 2. Collapse "Previous gigs & mixes" to the three most recent

- By default, show the first **3** entries of `previous` (the array is already newest first). Below the list, add a toggle button that reveals the rest.
- Button label: `Show all {previous.length}` collapsed, `Show fewer` expanded. After the label there's a 12px chevron-down stroke icon (stroke 2.4, `currentColor`), rotated 180° when expanded.
- Style it like the existing Bio "Read more" button: 13px, weight 500, `text-muted`, `hover:text-text`, no background or border, left-aligned (`self-start`). Give it `min-h-11` (44px touch target) and `mt-1`, with a 6px gap between label and chevron.
- Accessibility: a real `<button type="button">` with `aria-expanded` and `aria-controls` pointing at the list wrapper's `id` (use `useId`, as `Bio.tsx` does).
- The last *visible* row has no bottom divider, in both states. The current `last:border-b-0` keeps working if hidden rows aren't rendered.
- If there are 3 or fewer entries, don't render the button.
- Implementation suggestion: a small client component (`app/PreviousGigs.tsx`) next to `Bio.tsx` that takes the `previous` array as a prop and owns the `expanded` state, so `page.tsx` stays a server component. Keep the row markup exactly as it is now; just move it.

### 3. No dot next to "London, UK"

This already matches the live site, so no code change is needed. The design no longer has the accent dot. The full stop after the name and the "Listen" play icons are the only accent dots on the page. (The previous spec's 7px dot with a ring is retired.)

## Unchanged

Everything else is as it is in `app/page.tsx` today: rainbow bar, name, title, bio with "Read more", email key, socials, upcoming card, row styling, peace symbol, footer step lights, the colour tokens and dark mode via `prefers-color-scheme`, the JSON-LD and `metadata`.

Rules from earlier iterations that still hold:
- Tailwind only. No new vanilla CSS beyond tokens, base styles and small `@utility` blocks.
- One system sans font. Times New Roman only for the `<h1>`. No monospace, no uppercase or letter-spaced labels.
- Real `<a>` / `<button>` elements. Decorative pieces get `aria-hidden`. Text contrast is 4.5:1 in both themes. Touch targets are at least 44px.

## Checklist

- [ ] `public/val-portrait.jpg` added, grille markup, utility and token removed
- [ ] Photo is 84px desktop / 64px below 30rem, with the double-hairline ring in both themes
- [ ] Previous list shows 3, toggles to all 8 and back, with `aria-expanded` updating
- [ ] `npm run lint` and `npm run build` pass
