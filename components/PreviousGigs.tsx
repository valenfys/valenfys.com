"use client";

import { useId, useState } from "react";
import type { PastEvent } from "@/content/gigs";
import { external } from "@/lib/external";
import { FaSoundcloud, FaYoutube } from "react-icons/fa";
import ArrowIcon from "@/components/ArrowIcon";
import RaIcon from "@/components/RaIcon";


const collapsedCount = 3;

// Recordings live on YouTube (video) or SoundCloud (audio); events without one link to RA.
// Icons use each platform's brand colour; RA's logo is monochrome, so it follows the text.
const platforms = {
  video: { name: "YouTube", icon: FaYoutube, colour: "text-[#ff0000]" },
  audio: { name: "SoundCloud", icon: FaSoundcloud, colour: "text-[#ff5500]" },
  event: { name: "Resident Advisor", icon: RaIcon, colour: "text-text" },
};

function formatMonth(month: string) {
  return new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" }).format(new Date(`${month}-01T00:00Z`));
}

// Collapsed, only the most recent few events show. Hidden rows aren't rendered, so the last visible row loses its divider.
export default function PreviousGigs({ events }: { events: PastEvent[] }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const visible = expanded ? events : events.slice(0, collapsedCount);

  return (
    <>
      <div id={id} className="flex flex-col">
        {visible.map((event) => (
          <a
            key={event.title}
            href={event.href}
            {...external(event.href)}
            className="-mx-2.5 grid grid-cols-[3.25rem_minmax(0,1fr)_auto] items-center gap-x-4 border-b border-rule2 px-2.5 py-3.5 transition-colors last:border-b-0 hover:bg-row-hover"
          >
            <span className="flex flex-col items-center border-r border-rule2 pr-4">
              <span className="text-[17px] leading-none font-semibold tracking-tight">{formatMonth(event.month)}</span>
              <span className="mt-1 text-[12px] text-muted tabular-nums">{event.month.slice(0, 4)}</span>
            </span>
            <span className="flex flex-col gap-0.5">
              <PlatformTitle kind={event.kind} title={event.title} />
              <span className="text-[13px] text-muted">{event.venue}</span>
            </span>
            <ArrowIcon className="size-4 text-muted" />
          </a>
        ))}
      </div>
      {events.length > collapsedCount && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded(!expanded)}
          className="mt-1 flex min-h-11 cursor-pointer items-center gap-1.5 self-start text-[13px] font-medium text-muted transition-colors hover:text-text"
        >
          {expanded ? "Show fewer" : `Show all ${events.length}`}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`size-3 transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      )}
    </>
  );
}

function PlatformTitle({ kind, title }: { kind: PastEvent["kind"]; title: string }) {
  const { name, icon: Icon, colour } = platforms[kind];
  return (
    <span className="flex items-start gap-1.5 text-[15px] font-medium">
      <Icon title={name} role="img" className={`mt-1 size-3.5 shrink-0 ${colour}`} />
      {title}
    </span>
  );
}
