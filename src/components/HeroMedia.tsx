"use client";

import { useEffect, useRef, useState } from "react";
import assets from "@/data/assets.json";

export function HeroMedia() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let visible = false;
    const syncPlayback = () => {
      if (visible && !document.hidden && !manuallyPaused.current) {
        void video.play().catch(() => setPlaying(false));
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [enabled]);

  if (!enabled) return null;

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    manuallyPaused.current = !video.paused;
    if (video.paused) void video.play().catch(() => setPlaying(false));
    else video.pause();
  }

  return (
    <>
      <video
        ref={videoRef}
        className="hero-video"
        style={{ opacity: ready ? 1 : 0 }}
        src={assets.homeHeroVideo.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onPlaying={() => { setReady(true); setPlaying(true); }}
        onPause={() => setPlaying(false)}
        onError={() => { setReady(false); setPlaying(false); }}
      />
      <button type="button" className="hero-video-toggle" onClick={toggleVideo} aria-label={playing ? "Pause background video" : "Play background video"}>
        {playing ? "Pause video" : "Play video"}
      </button>
    </>
  );
}
