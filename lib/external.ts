// Open off-site links in a new tab.
export function external(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};
}
