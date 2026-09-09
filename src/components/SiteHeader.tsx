import Image from "next/image";
import Link from "next/link";
import assets from "@/data/assets.json";
import { navigation } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-lockup" href="/#top" aria-label="Good Dog Days home">
        <Image
          src={assets.headerFooterLogo.src}
          alt={assets.headerFooterLogo.alt}
          width={376}
          height={220}
          priority
          loading="eager"
          unoptimized
        />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
      </nav>
      <details className="mobile-nav">
        <summary aria-label="Open navigation"><span>Menu</span><i aria-hidden="true" /></summary>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          <Link href="/?service=not-sure#inquiry">Request availability</Link>
        </nav>
      </details>
      <Link
        className="nav-cta"
        href="/?service=not-sure#inquiry"
        data-track-event="service_cta_click"
        data-track-label="header_request"
      >
        Request availability
      </Link>
    </header>
  );
}
