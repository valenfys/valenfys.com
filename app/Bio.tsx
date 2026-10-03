"use client";

import { useId, useState } from "react";

// Collapsed, only the first paragraph shows, clamped to a few lines. Tapping the text (or the button) expands it.
export default function Bio({ html }: { html: string }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();

  return (
    <div className="flex flex-col items-start gap-2">
      <div
        id={id}
        onClick={(e) => {
          if (!expanded && !(e.target as HTMLElement).closest("a")) setExpanded(true);
        }}
        className={`flex flex-col gap-3 text-base leading-relaxed text-text2 [&_a]:text-text [&_a]:underline [&_a]:underline-offset-2 ${
          expanded ? "" : "cursor-pointer *:first:line-clamp-3 *:not-first:hidden"
        }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer text-sm font-medium text-muted transition-colors hover:text-text"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}
