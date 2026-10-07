import type { IconBaseProps } from "react-icons";

// Resident Advisor has no icon in react-icons, so draw its "RA" wordmark to match the other socials.
export default function RaIcon({ className }: IconBaseProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 19V5h4.5a3.5 3.5 0 0 1 0 7H3M7 12l4 7M13 19l4.5-14L22 19M14.6 14h5.8" />
    </svg>
  );
}
