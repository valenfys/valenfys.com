import type { UpcomingEvent } from "@/content/gigs";
import { external } from "@/lib/external";
import ArrowIcon from "@/components/ArrowIcon";
import RaIcon from "@/components/RaIcon";

function formatDate(iso: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", ...options }).format(new Date(iso));
}

function formatTime(iso: string) {
  return formatDate(iso, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}

export default function UpcomingGig({ event }: { event: UpcomingEvent }) {
  return (
    <a
      href={event.href}
      {...external(event.href)}
      className="flex items-stretch gap-5 rounded-xl bg-card p-5 text-card-text transition-colors hover:bg-card-hover"
    >
      <span className="flex min-w-13 flex-col items-center justify-center border-r border-card-rule pr-5">
        <span className="text-3xl leading-none font-semibold tracking-tight tabular-nums">
          {formatDate(event.start, { day: "2-digit" })}
        </span>
        <span className="mt-1.5 text-[13px] font-medium text-card-muted">
          {formatDate(event.start, { month: "short" })}
        </span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
        <strong className="flex items-start gap-2 text-[17px] font-semibold tracking-tight">
          <RaIcon title="Resident Advisor" role="img" className="mt-1.25 size-4 shrink-0" />
          {event.title}
        </strong>
        <span className="text-[13px] leading-normal text-card-muted">
          {formatDate(event.start, { weekday: "short" })}{" "}
          {formatDate(event.start, { day: "numeric", month: "short", year: "numeric" })} · {formatTime(event.start)} – {formatTime(event.end)}
          <br />
          {event.venue}
        </span>
      </span>
      <ArrowIcon className="mt-1 size-4.5 shrink-0 text-card-muted" />
    </a>
  );
}
