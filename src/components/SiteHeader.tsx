import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-lockup" href="/#top" aria-label="Good Dog Days home">
        <Image
          src="/brand/logo-primary.svg"
          alt="Good Dog Days — Better days for good dogs"
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
      <Link className="nav-cta" href="/#inquiry">Request a Good Dog Day</Link>
    </header>
  );
}
