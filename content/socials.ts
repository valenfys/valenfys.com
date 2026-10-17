import type { IconType } from "react-icons";
import {
  // FaBandcamp,
  // FaBluesky,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaSoundcloud,
  FaYoutube
} from "react-icons/fa6";
import RaIcon from "@/components/RaIcon";

export type SocialLink = { label: string; href: string; icon: IconType };

export const socials: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/valenfys", icon: FaInstagram },
  // { label: "Bluesky", href: "https://bsky.app/profile/valenfys.com", icon: FaBluesky },
  { label: "YouTube", href: "https://www.youtube.com/@valenfys", icon: FaYoutube },
  { label: "SoundCloud", href: "https://soundcloud.com/valenfys", icon: FaSoundcloud },
  { label: "Resident Advisor", href: "https://ra.co/dj/valenfys", icon: RaIcon },
  // { label: "Bandcamp", href: "https://bandcamp.com/valenfys", icon: FaBandcamp },
  { label: "GitHub", href: "https://github.com/valenfys", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/valenfys", icon: FaLinkedinIn },
];
