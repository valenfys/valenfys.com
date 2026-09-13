const links = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Spotify", href: "https://spotify.com" },
  { label: "GitHub", href: "https://github.com" },
];

export default function Home() {
  return (
    <main>
      <section>
        <div className="rainbow" aria-hidden="true" />
        <p className="eyebrow">VAL ENFYS / 2026</p>
        <h1>Val Enfys</h1>
        <p className="intro">A few things I make, collect, and share.</p>

        <nav aria-label="Links">
          {links.map(({ label, href }) => (
            <a href={href} key={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {label}
              <span aria-hidden="true">›</span>
            </a>
          ))}
        </nav>

        <a className="email" id="portfolio" href="mailto:hello@valenfys.com">Write to me ↗</a>
      </section>
    </main>
  );
}
