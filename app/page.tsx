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
        <h1>Val Enfys</h1>
        <p>Digital designer and maker.</p>

        <nav aria-label="Links">
          {links.map(({ label, href }) => (
            <a href={href} key={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>

        <a id="portfolio" href="mailto:hello@valenfys.com">hello@valenfys.com</a>
      </section>
    </main>
  );
}
