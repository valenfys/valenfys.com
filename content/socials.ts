import type { IconType } from "react-icons";
import {
  // FaBandcamp,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaSoundcloud,
  FaYoutube
} from "react-icons/fa6";

export type SocialLink = { label: string; href: string; icon: IconType };

export const socials: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/valenfys", icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/@valenfys", icon: FaYoutube },
  { label: "SoundCloud", href: "https://soundcloud.com/valenfys", icon: FaSoundcloud },
  // { label: "Bandcamp", href: "https://bandcamp.com/valenfys", icon: FaBandcamp },
  { label: "GitHub", href: "https://github.com/valenfys", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/valenfys", icon: FaLinkedinIn },
];
