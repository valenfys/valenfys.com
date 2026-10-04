export type Project = {
  title: string;
  date: string; // display string, e.g. "Jul 2026"
  description: string;
  image: string; // path under /public
} & ({ kind: "video"; youtubeId: string } | { kind: "link"; href: string });

export const projects: Project[] = [
  {
    title: "Techno Forest Party in East London",
    date: "Jul 2026",
    description:
      "An independent forest party co-hosted with Jonah Garrett-Bannister, featuring techno and trance DJ sets, and custom lighting and video recording setups.",
    image: "/projects/groovy-techno.jpg",
    kind: "video",
    youtubeId: "0NYqs2o88Jk",
  },
  {
    title: "Portfolio Website for Barbara Touati-Evans",
    date: "Mar 2022",
    description:
      "Design and development of a portfolio site for an independent artist in Next.js and Tailwind CSS, with a CMS enabling the artist to update it independently.",
    image: "/projects/barbara-touati-evans.jpg",
    kind: "link",
    href: "https://www.barbara-touati-evans.com/",
  },
];
