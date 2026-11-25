"use client";

import { useId, useState } from "react";
import type { PastEvent } from "@/content/gigs";
import { external } from "@/lib/external";
import { shortMonths } from "@/lib/months";

const collapsedCount = 7;

// Recordings live on YouTube (video) or SoundCloud (audio); events without one link to RA.
const platforms: Record<PastEvent["kind"], string> = { video: "YouTube", audio: "SoundCloud", event: "RA" };

// "2025-09" → "Sep 2025"
function formatMonth(month: string) {
  const [year, m] = month.split("-");
  return `${shortMonths[Number(m) - 1]} ${year}`;
}

// Collapsed, only the most recent few events show. Hidden rows aren't rendered.
export default function PreviousGigs({ events }: { events: PastEvent[] }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const visible = expanded ? events : events.slice(0, collapsedCount);

  return (
    <>
      <ul id={id} className="border-t border-ink">
        {visible.map((event) => (
          <li key={`${event.month}-${event.title}`}>
            <a
              href={event.href}
              {...external(event.href)}
              className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-3.5 border-b border-rule px-2 py-4 transition-colors hover:bg-row-hover hover:text-accent md:grid-cols-[110px_minmax(0,1fr)_140px] md:gap-6"
            >
              <span className="text-sm text-muted tabular-nums">{formatMonth(event.month)}</span>
              <span className="flex flex-col gap-[3px]">
                <span className="font-semibold">{event.title}</span>
                <span className="text-sm text-muted">{event.venue}</span>
              </span>
              <span className="hidden justify-self-end text-[13px] font-semibold text-accent md:block">
                {platforms[event.kind]} <span aria-hidden="true">→</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      {events.length > collapsedCount && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded(!expanded)}
          className="mt-2 min-h-11 cursor-pointer px-2 text-sm font-semibold text-muted transition-colors hover:text-accent"
        >
          {expanded ? "Show fewer" : `Show all ${events.length}`} <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
        </button>
      )}
    </>
  );
}
