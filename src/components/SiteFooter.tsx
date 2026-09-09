import Image from "next/image";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell footer-top">
        <div>
          <Image
            className="footer-logo"
            src="/brand/logo-primary.svg"
            alt="Good Dog Days — Better days for good dogs"
            width={376}
            height={220}
            unoptimized
          />
          <p>{siteConfig.tagline}</p>
        </div>
        <p>{siteConfig.location}</p>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Good Dog Days</p>
        <nav aria-label="Social links">
          <a href={siteConfig.social.instagram}>Instagram</a>
          <a href={siteConfig.social.tiktok} target="_blank" rel="noreferrer">TikTok</a>
          <a href={siteConfig.social.email}>Contact</a>
        </nav>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
