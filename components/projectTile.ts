// Shared by the server-rendered ProjectCard and the client ProjectVideo, so it lives outside both.
export const tileClass =
  "relative block aspect-video w-full overflow-hidden rounded-xl border border-key-border bg-key transition-colors";

export const tileCircleClass =
  "absolute top-1/2 left-1/2 flex size-16 -translate-1/2 items-center justify-center rounded-full shadow-[inset_0_-2px_0_rgb(0_0_0/0.12),0_6px_20px_rgb(0_0_0/0.18)]";

export const tileImageSizes = "(min-width: 34rem) 34rem, 100vw";
