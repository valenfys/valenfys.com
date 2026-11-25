"use client";

import { useId, useState } from "react";
import type { PastEvent } from "@/content/gigs";
import { external } from "@/lib/external";
import { shortMonths } from "@/lib/months";
import PlatformIcon, { type Platform } from "@/components/PlatformIcon";

const collapsedCount = 7;

// Recordings live on YouTube (video) or SoundCloud (audio); events without one link to RA.
const platforms: Record<PastEvent["kind"], { name: string; icon: Platform }> = {
  video: { name: "YouTube", icon: "youtube" },
  audio: { name: "SoundCloud", icon: "soundcloud" },
  event: { name: "RA", icon: "ra" },
};

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
          // The title link stretches over the whole row (its ::after), so the row stays one big target. The RA chip
          // sits above it (relative z-10), since links can't nest.
          <li
            key={`${event.month}-${event.title}`}
            className="group relative grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-3.5 border-b border-rule px-2 py-4 transition-colors hover:bg-row-hover md:grid-cols-[110px_minmax(0,1fr)_auto] md:gap-6"
          >
            <span className="text-sm text-muted tabular-nums">{formatMonth(event.month)}</span>
            <span className="flex flex-col gap-[3px]">
              <a
                href={event.href}
                {...external(event.href)}
                className="font-semibold transition-colors group-hover:text-accent after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent"
              >
                {event.title}
                <span className="sr-only">, {platforms[event.kind].name}</span>
              </a>
              <span className="text-sm text-muted">{event.venue}</span>
            </span>
            <span className="flex items-center gap-2 justify-self-end">
              {event.ra && <RaChip href={event.ra} title={event.title} />}
              {/* Below md the row itself is the recording link, so only the RA chip shows. */}
              <span aria-hidden="true" className={`${chip} hidden md:flex`}>
                <PlatformIcon platform={platforms[event.kind].icon} className="size-3" />
                {platforms[event.kind].name}
              </span>
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

// Outlined tag, like the mix cards and press tiles.
const chip = "flex items-center gap-1.5 border border-ink px-2 py-1 text-[13px] leading-none font-semibold text-accent transition-colors";

// A secondary link to the RA event page. The transparent link is 44px tall around the smaller chip.
function RaChip({ href, title }: { href: string; title: string }) {
  return (
    <a href={href} {...external(href)} className="group/ra relative z-10 flex min-h-11 items-center">
      <span className={`${chip} group-hover/ra:border-accent group-hover/ra:bg-accent group-hover/ra:text-paper`}>
        <PlatformIcon platform="ra" className="size-3" />
        RA<span className="sr-only">: {title} on Resident Advisor</span>
      </span>
    </a>
  );
}
