// Shown in link previews (WhatsApp, Discord, iMessage, etc.). Kept under 300px wide so WhatsApp shows it as a
// small thumbnail beside the text instead of a full-width banner. The portrait is square, so use the small card on X.
export const previewImage = { url: "/val-portrait-thumb.jpg", width: 256, height: 256, alt: "Portrait of Val Enfys" };

// Next.js merges metadata shallowly, so a page that sets openGraph or twitter must restate these shared fields.
export const openGraphBase = { siteName: "Val Enfys", locale: "en_GB", images: [previewImage] };
export const twitterBase = { card: "summary" as const, images: [previewImage] };
