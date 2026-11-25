import { container } from "@/lib/layout";
import { email } from "@/lib/site";

// Drum machine step lights: 1 = lit.
const steps = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0];

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className={`${container} flex flex-wrap items-center justify-between gap-5 py-9`}>
        <div className="flex flex-col gap-1.5">
          <span className="font-display text-xs font-bold tracking-[0.14em] text-card-muted uppercase">
            Bookings &amp; enquiries
          </span>
          <a
            href={`mailto:${email}`}
            className="flex min-h-11 items-center font-display text-[28px] font-bold wrap-anywhere underline-offset-4 hover:underline"
          >
            {email}
          </a>
        </div>
        <div className="flex flex-col items-end gap-2.5">
          <span aria-hidden="true" className="flex gap-1">
            {steps.map((on, i) => (
              <span key={i} className={`size-2 ${on ? "bg-accent" : "bg-card-rule"}`} />
            ))}
          </span>
          <span className="text-[13px] text-card-muted">&copy; {new Date().getFullYear()} Val Enfys Studio</span>
        </div>
      </div>
    </footer>
  );
}
