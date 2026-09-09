"use client";

import { useEffect, useState } from "react";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

export function HeroMedia() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 980px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updateVideoPreference() {
      const saveData = (navigator as NavigatorWithConnection).connection?.saveData;
      setShowVideo(desktop.matches && !reducedMotion.matches && !saveData);
    }

    updateVideoPreference();
    desktop.addEventListener("change", updateVideoPreference);
    reducedMotion.addEventListener("change", updateVideoPreference);

    return () => {
      desktop.removeEventListener("change", updateVideoPreference);
      reducedMotion.removeEventListener("change", updateVideoPreference);
    };
  }, []);

  if (!showVideo) return null;

  return (
    <video
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster="/media/sully-with-lylah.jpg"
      aria-hidden="true"
    >
      <source src="/media/good-dog-days-bgvideo.mp4" type="video/mp4" />
    </video>
  );
}
