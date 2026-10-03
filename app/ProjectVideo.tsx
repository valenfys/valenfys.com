"use client";

import Image from "next/image";
import { useState } from "react";
import { tileCircleClass, tileClass, tileImageSizes } from "./projectTile";

// Shows the poster until clicked, so YouTube only loads for people who want to watch.
export default function ProjectVideo({ title, youtubeId, image }: { title: string; youtubeId: string; image: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={tileClass}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label={`Play video: ${title}`}
      onClick={() => setPlaying(true)}
      className={`${tileClass} cursor-pointer hover:border-tile-border-hover`}
    >
      <Image src={image} alt="" fill sizes={tileImageSizes} className="object-cover" />
      <span aria-hidden="true" className={`${tileCircleClass} bg-accent`}>
        <svg width="20" height="22" viewBox="0 0 9 10" className="ml-1 fill-white">
          <path d="M0 0.8v8.4a.6.6 0 0 0 .9.5l7.4-4.2a.6.6 0 0 0 0-1L.9.3A.6.6 0 0 0 0 .8z" />
        </svg>
      </span>
    </button>
  );
}
