import type { Gig } from "@/content/gigs";
import { external } from "@/lib/external";
import { formatDate } from "@/lib/gigs";
import ArrowIcon from "@/components/ArrowIcon";
import RaIcon from "@/components/RaIcon";

function formatTime(iso: string) {
  return formatDate(iso, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
}

export default function UpcomingGig({ event }: { event: Gig }) {
  const href = event.href ?? event.recording.href;
  return (
    <a
      href={href}
      {...external(href)}
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
        {/* The icon flows inline so a wrapped title returns to the left edge rather than hanging beside it. */}
        <strong className="text-[17px] font-semibold tracking-tight">
          <RaIcon title="Resident Advisor" role="img" className="mr-2 inline-block size-4 align-[-1px]" />
          {event.title}
        </strong>
        {/* The date column already shows the day and month, so only the time is needed here. */}
        <span className="text-[13px] leading-normal text-card-muted">
          <span className="whitespace-nowrap">
            {formatTime(event.start)}
            {event.end && ` – ${formatTime(event.end)}`}
          </span>
          <br />
          {event.venue}
        </span>
      </span>
      <ArrowIcon className="mt-1 size-4.5 shrink-0 text-card-muted" />
    </a>
  );
}
