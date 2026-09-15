import { TextLink } from "@/components/TextLink";
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
          <p><Link href="/#inquiry">Get Started</Link></p>
          <p>Prefer to text? Reach me directly.<br /><TextLink placement="footer_phone" phoneNumber>{siteConfig.phoneDisplay}</TextLink></p>
          <a href={siteConfig.googleProfileUrl} target="_blank" rel="noopener noreferrer" data-track-event="google_profile_click" data-track-label="footer">View Google Profile <span aria-hidden="true">↗</span></a>
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
