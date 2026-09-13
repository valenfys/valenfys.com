import { FaGithub, FaInstagram, FaLinkedinIn, FaSoundcloud, FaYoutube } from "react-icons/fa6";

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
        <p className="eyebrow">VAL ENFYS</p>
        <h1>Val Enfys</h1>
        <p className="intro">DJ and Creative Technologist</p>

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
