import type { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaLinkedinIn, FaRadio, FaSoundcloud, FaYoutube } from "react-icons/fa6";
import RaIcon from "@/components/RaIcon";

export type Platform = "instagram" | "soundcloud" | "youtube" | "ra" | "bloop" | "github" | "linkedin";

const icons: Record<Platform, IconType> = {
  instagram: FaInstagram,
  soundcloud: FaSoundcloud,
  youtube: FaYoutube,
  ra: RaIcon,
  bloop: FaRadio,
  github: FaGithub,
  linkedin: FaLinkedinIn,
};

// Monochrome brand icon in the current text colour (a generic radio for Bloop, which has no brand icon). Decorative:
// the label next to it names the platform.
export default function PlatformIcon({ platform, className = "size-4" }: { platform: Platform; className?: string }) {
  const Icon = icons[platform];
  return <Icon aria-hidden="true" className={`shrink-0 ${className}`} />;
}
