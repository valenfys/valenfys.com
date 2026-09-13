import { FaGithub, FaInstagram, FaSpotify } from "react-icons/fa6";
import { HiOutlineBriefcase } from "react-icons/hi2";

const links = [
  { label: "Portfolio", href: "#portfolio", icon: HiOutlineBriefcase },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "Spotify", href: "https://spotify.com", icon: FaSpotify },
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
];

export default function Home() {
  return (
    <main>
      <section>
        <div className="rainbow" aria-hidden="true" />
        <p className="eyebrow">VAL ENFYS</p>
        <h1>Val Enfys</h1>
        <p className="intro">A few things I make, collect, and share.</p>

        <nav aria-label="Links">
          {links.map(({ label, href, icon: Icon }) => (
            <a href={href} key={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <span className="link-label"><Icon aria-hidden="true" />{label}</span>
              <span aria-hidden="true">›</span>
            </a>
          ))}
        </nav>

        <a className="email" id="portfolio" href="mailto:hello@valenfys.com">Write to me ↗</a>
      </section>
    </main>
  );
}
