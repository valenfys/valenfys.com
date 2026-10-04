"use client";

import { useId, useState } from "react";

const textClass =
  "text-[15px] leading-relaxed text-text2 [&_a]:text-text [&_a]:underline [&_a]:underline-offset-2";

// Collapsed, only the first paragraph shows, clamped to three lines with "Read more" at the end of the last one.
// Tapping the text (or the button) expands it.
export default function Bio({ html }: { html: string }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();

  if (expanded) {
    return (
      <div className="flex flex-col items-start gap-2">
        <div id={id} className={`flex flex-col gap-3 ${textClass}`} dangerouslySetInnerHTML={{ __html: html }} />
        <button
          type="button"
          aria-expanded
          aria-controls={id}
          onClick={() => setExpanded(false)}
          className="cursor-pointer text-[13px] font-medium text-muted transition-colors hover:text-text"
        >
          Show less
        </button>
      </div>
    );
  }

  // The zero-width ::before float fills the first two lines and pushes the floated button down onto the third. The
  // text wraps around the button, ellipsis included. The floats sit in an inner block because Safari lays out the
  // direct children of line-clamp's -webkit-box as old-style flex items, which can't float.
  return (
    <div
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("a")) setExpanded(true);
      }}
      className={`line-clamp-3 cursor-pointer ${textClass}`}
    >
      <div className="before:float-right before:h-[2lh] before:content-['']">
        <button
          type="button"
          aria-expanded={false}
          aria-controls={id}
          className="float-right clear-right ml-1.5 cursor-pointer font-medium text-muted transition-colors hover:text-text"
        >
          Read more
        </button>
        <span id={id} className="*:first:inline *:not-first:hidden" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
