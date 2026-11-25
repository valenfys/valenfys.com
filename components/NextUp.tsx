import type { UpcomingEvent } from "@/content/gigs";
import { external } from "@/lib/external";
import { shortMonths } from "@/lib/months";

function format(iso: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", ...options }).format(new Date(iso));
}

const time = (iso: string) => format(iso, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

const cardClass = "flex flex-wrap items-center gap-x-8 gap-y-5 bg-ink px-8 py-7 text-paper";

// The ink "Next up" card. It's a link only when the event has a public page.
export default function NextUp({ event }: { event: UpcomingEvent }) {
  const content = (
    <>
      <span className="flex min-w-16 flex-col items-center border-r border-card-rule pr-7">
        <span className="font-display text-[44px] leading-none font-bold tabular-nums">
          {format(event.start, { day: "numeric" })}
        </span>
        <span className="mt-1.5 text-[13px] font-semibold tracking-[0.12em] text-card-muted uppercase">
          {shortMonths[Number(format(event.start, { month: "numeric" })) - 1]}
        </span>
      </span>
      <span className="flex flex-[1_1_260px] flex-col gap-1.5">
        <span className="font-display text-2xl font-bold underline-offset-4 group-hover:underline">
          {event.title}
          {event.href && <span aria-hidden="true"> ↗</span>}
        </span>
        <span className="text-[15px] text-card-muted">
          {event.venue} · {format(event.start, { weekday: "short" })} {time(event.start)}–{time(event.end)}
        </span>
      </span>
    </>
  );

  return event.href ? (
    <a href={event.href} {...external(event.href)} className={`group ${cardClass}`}>
      {content}
    </a>
  ) : (
    <div className={cardClass}>{content}</div>
  );
}
