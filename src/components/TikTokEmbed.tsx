"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type TikTokEmbedProps = {
  name: string;
  videoId: string;
  href: string;
  cover: string;
  alt: string;
};

const TIKTOK_SCRIPT = "https://www.tiktok.com/embed.js";

export function TikTokEmbed({ name, videoId, href, cover, alt }: TikTokEmbedProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;

    document.querySelectorAll(`script[src="${TIKTOK_SCRIPT}"]`).forEach((script) => script.remove());
    const script = document.createElement("script");
    script.src = TIKTOK_SCRIPT;
    script.async = true;
    script.dataset.goodDogDaysEmbed = videoId;
    document.body.appendChild(script);

    return () => script.remove();
  }, [active, videoId]);

  if (active) {
    return (
      <div className="tiktok-live">
        <blockquote
          className="tiktok-embed"
          cite={href}
          data-video-id={videoId}
          style={{ maxWidth: "605px", minWidth: 0, margin: "0 auto" }}
        >
          <section>
            <a target="_blank" title="@sullyeash" href="https://www.tiktok.com/@sullyeash?refer=embed" rel="noreferrer">
              @sullyeash
            </a>{" "}
            <a target="_blank" title={`${name}’s Adventure Day`} href={href} rel="noreferrer">
              {name}’s Adventure Day
            </a>
          </section>
        </blockquote>
        <a className="embed-fallback" href={href} target="_blank" rel="noreferrer">
          Open directly on TikTok <span aria-hidden="true">↗</span>
        </a>
      </div>
    );
  }

  return (
    <button className="tiktok-poster" type="button" onClick={() => setActive(true)} aria-label={`Play ${name}’s Adventure Day`}>
      <Image src={cover} alt={alt} fill sizes="(min-width: 900px) 50vw, 100vw" />
      <span className="poster-play"><i aria-hidden="true">▶</i> Play day out</span>
    </button>
  );
}
