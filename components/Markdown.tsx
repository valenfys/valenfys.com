import { marked } from "marked";

// Renders a content/*.md file (imported as bytes) at build time, so no Markdown parser ships to the browser.
export default function Markdown({ source, className }: { source: Uint8Array; className?: string }) {
  const html = marked.parse(new TextDecoder().decode(source), { async: false });
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
