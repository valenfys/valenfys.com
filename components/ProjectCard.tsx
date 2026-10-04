import Image from "next/image";
import type { Project } from "@/content/projects";
import { external } from "@/lib/external";
import ArrowIcon from "./ArrowIcon";
import ProjectVideo from "./ProjectVideo";
import { tileCircleClass, tileClass, tileImageSizes } from "./projectTile";

// Title, date and description under the tile. The parent link carries the "group" class for the hover underline.
function ProjectDetails({ project }: { project: Project }) {
  return (
    <span className="flex flex-col gap-1">
      <span className="flex items-baseline justify-between gap-4">
        <strong className="text-[17px] font-semibold tracking-tight underline-offset-3 group-hover:underline">
          {project.title}
        </strong>
        <span className="shrink-0 text-[13px] text-muted tabular-nums">{project.date}</span>
      </span>
      <span className="text-[15px] leading-[1.6] text-text2">{project.description}</span>
    </span>
  );
}

// A video plays inline, so only the details link to YouTube. A link project makes the whole card one link.
export default function ProjectCard({ project }: { project: Project }) {
  if (project.kind === "video") {
    const href = `https://www.youtube.com/watch?v=${project.youtubeId}`;
    return (
      <article className="flex flex-col gap-3.5">
        <ProjectVideo title={project.title} youtubeId={project.youtubeId} image={project.image} />
        <a href={href} {...external(href)} className="group flex flex-col">
          <ProjectDetails project={project} />
        </a>
      </article>
    );
  }

  return (
    <a href={project.href} {...external(project.href)} className="group flex flex-col gap-3.5">
      <span className={`${tileClass} group-hover:border-tile-border-hover`}>
        <Image src={project.image} alt="" fill sizes={tileImageSizes} className="object-cover" />
        <span aria-hidden="true" className={`${tileCircleClass} bg-card text-card-text`}>
          <ArrowIcon className="size-5.5" />
        </span>
      </span>
      <ProjectDetails project={project} />
    </a>
  );
}
