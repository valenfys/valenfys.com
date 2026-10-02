import {
  FaBandcamp,
  FaCalendarDays,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaSoundcloud,
  FaYoutube
} from "react-icons/fa6";

const links = [
  { label: "Instagram", href: "https://www.instagram.com/valenfys", icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/@valenfys", icon: FaYoutube },
  { label: "SoundCloud", href: "https://soundcloud.com/valenfys", icon: FaSoundcloud },
  { label: "Bandcamp", href: "https://bandcamp.com/valenfys", icon: FaBandcamp },
  { label: "GitHub", href: "https://github.com/valenfys", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/valenfys", icon: FaLinkedinIn },
];

export default function Home() {
  return (
    <main>
      <div className="rainbow" aria-hidden="true" />
      <h1>Val Enfys<span style={{color:'#ee8637'}}>.</span></h1>
      <p className="intro" title="I'm going to write a full bio soon, I promise!">DJ, Artist & Software Engineer</p>

      <a className="email" href="mailto:val@valenfys.com">val@valenfys.com</a>

      <a className="featured-link" href="https://ra.co/events/2500782" target="_blank" rel="noreferrer">
        {/*<span className="featured-kicker"><FaCalendarDays aria-hidden="true" /> Next up</span>*/}
        <strong>Fragment: Open Decks</strong>
        <span className="featured-detail">
          <span><FaCalendarDays aria-hidden="true" /> 8 Oct 2026, 19:00 – 02:00</span>
          <span><FaLocationDot aria-hidden="true" /> The Glove That Fits, London</span>
        </span>
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

      <div className="copyright">&copy; {new Date().getFullYear()} Val Enfys. All rights reserved.</div>
    </main>
  );
}
