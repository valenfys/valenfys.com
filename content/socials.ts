import type { Platform } from "@/components/PlatformIcon";

export type SocialLink = { label: string; href: string; platform: Platform };

// Shown in the Links section, and used for the JSON-LD sameAs list.
export const socials: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/valenfys", platform: "instagram" },
  { label: "SoundCloud", href: "https://soundcloud.com/valenfys", platform: "soundcloud" },
  { label: "YouTube", href: "https://www.youtube.com/@valenfys", platform: "youtube" },
  { label: "Resident Advisor", href: "https://ra.co/dj/valenfys", platform: "ra" },
  { label: "GitHub", href: "https://github.com/valenfys", platform: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/valenfys", platform: "linkedin" },
];
