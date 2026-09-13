import { FaCalendarDays, FaGithub, FaInstagram, FaLinkedinIn, FaSoundcloud, FaYoutube } from "react-icons/fa6";

const links = [
  { label: "Instagram", href: "https://instagram.com/valenfys", icon: FaInstagram },
  { label: "YouTube", href: "https://youtube.com/@valenfys", icon: FaYoutube },
  { label: "SoundCloud", href: "https://soundcloud.com/valenfys", icon: FaSoundcloud },
  { label: "GitHub", href: "https://github.com/valenfys", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/valenfys", icon: FaLinkedinIn },
];

export default function Home() {
  return (
    <main>
      <section>
        <div className="rainbow" aria-hidden="true" />
        <h1>Val Enfys</h1>
        <p className="intro">DJ and Creative Technologist</p>

        <a className="featured-link" href="https://ra.co/events/2500782" target="_blank" rel="noreferrer">
          <span className="featured-kicker"><FaCalendarDays aria-hidden="true" /> Next up</span>
          <strong>Fragment: Open Decks</strong>
          <span className="featured-detail">15 October 2026, 19:00–02:00<br />The Glove That Fits</span>
          <span className="featured-arrow" aria-hidden="true">↗</span>
        </a>

        <nav aria-label="Links">
          {links.map(({ label, href, icon: Icon }) => (
            <a href={href} key={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <span className="link-label"><Icon aria-hidden="true" />{label}</span>
              <span aria-hidden="true">›</span>
            </a>
          ))}
        </nav>

        <a className="email" href="mailto:val@valenfys.com">val@valenfys.com</a>
      </section>
    </main>
  );
}
