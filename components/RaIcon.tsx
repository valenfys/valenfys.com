import type { IconBaseProps } from "react-icons";

// Resident Advisor's logo isn't in react-icons or Simple Icons, so this is the path from ra.co's own header,
// in a square viewBox so it sits like the other socials. Takes a title like react-icons do.
export default function RaIcon({ title, size, ...props }: IconBaseProps) {
  return (
    <svg {...props} width={size} height={size} viewBox="0 -21.5 83 83" fill="currentColor">
      {title && <title>{title}</title>}
      <path d="M82.092 32.018c.556-.533.908-1.28.908-2.113 0-.802-.38-1.523-.9-2.051L58.665 4.3l-7.073 7.11 18.45 18.543h-26.14c-1.278-.038-2.29-.469-3.147-1.304l-11.73-11.788a6.828 6.828 0 00-4.689-1.888l-.017.001H10.004v-4.92h14.825c2.938.002 5.559 1.21 7.48 3.15l8.749 8.793 7.073-7.11-8.92-8.963C35.485 2.234 30.45 0 24.805 0H0v25.027h20.978v.002a4.919 4.919 0 013.486 1.48L35.95 38.053A6.74 6.74 0 0040.449 40h31.733a4.911 4.911 0 003.423-1.45l6.491-6.524-.004-.008" />
    </svg>
  );
}
