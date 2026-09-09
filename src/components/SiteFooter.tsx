import Image from "next/image";
import Link from "next/link";
import assets from "@/data/assets.json";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell footer-top">
        <div>
          <Image
            className="footer-logo"
            src={assets.headerFooterLogo.src}
            alt={assets.headerFooterLogo.alt}
            width={376}
            height={220}
            unoptimized
          />
          <p>{siteConfig.tagline}</p>
        </div>
        <div className="footer-contact">
          <p>{siteConfig.serviceArea}</p>
          <Link href="/#inquiry">Tell Us About Your Dog</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Good Dog Days</p>
        <nav aria-label="Footer navigation">
          <Link href="/services">Services</Link>
          <Link href="/#care-safety">Care + Safety</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
        <Link href="#top">Back to top ↑</Link>
      </div>
    </footer>
  );
}
