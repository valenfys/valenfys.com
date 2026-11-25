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
          // The title link stretches over the whole row (its ::after), so the row stays one big target. The RA link
          // sits above it (relative z-10), since links can't nest.
          <li
            key={`${event.month}-${event.title}`}
            className="group relative grid grid-cols-[72px_minmax(0,1fr)] items-center gap-3.5 border-b border-rule px-2 py-4 transition-colors hover:bg-row-hover md:grid-cols-[110px_minmax(0,1fr)_minmax(140px,auto)] md:gap-6"
          >
            <span className="text-sm text-muted tabular-nums">{formatMonth(event.month)}</span>
            <span className="flex flex-col gap-[3px]">
              <a
                href={event.href}
                {...external(event.href)}
                className="font-semibold transition-colors group-hover:text-accent after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent"
              >
                {event.title}
                <span className="sr-only">, {platforms[event.kind]}</span>
              </a>
              <span className="text-sm text-muted">
                {event.venue}
                {event.ra && (
                  <span className="md:hidden">
                    {" · "}
                    <RaLink href={event.ra} title={event.title} />
                  </span>
                )}
              </span>
            </span>
            <span className="hidden justify-self-end text-[13px] font-semibold text-accent md:block">
              <span aria-hidden="true">{platforms[event.kind]} →</span>
              {event.ra && (
                <>
                  <span aria-hidden="true" className="text-muted">
                    {" · "}
                  </span>
                  <RaLink href={event.ra} title={event.title} />
                </>
              )}
            </span>
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

// A secondary link to the RA event page. Its padding is on an inline element, so it widens the tap area to 44px
// without changing the row's layout.
function RaLink({ href, title }: { href: string; title: string }) {
  return (
    <a
      href={href}
      {...external(href)}
      className="relative z-10 -mx-1.5 px-1.5 py-3.5 font-semibold text-accent underline-offset-2 hover:underline"
    >
      RA<span className="sr-only">: {title} on Resident Advisor</span> <span aria-hidden="true">↗</span>
    </a>
  );
}
