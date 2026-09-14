"use client";

import { useEffect, useRef, useState } from "react";
import assets from "@/data/assets.json";

export function HeroMedia() {
  const [desktop, setDesktop] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 980px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [loaded, desktop]);

  if (!desktop) return null;

  function toggleVideo() {
    if (!loaded) {
      setLoaded(true);
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setPlaying(false));
    else video.pause();
  }

  return (
    <>
      {loaded ? (
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={assets.homeHeroPhoto.src}
          aria-hidden="true"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setPlaying(false)}
        >
          <source src={assets.homeHeroVideo.src} type="video/mp4" />
        </video>
      ) : null}
      <button type="button" className="hero-video-toggle" onClick={toggleVideo} aria-label={playing ? "Pause background video" : "Play background video"}>
        {playing ? "Pause video" : "Play video"}
      </button>
    </>
  );
}
