import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <main className="simple-page" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <section className="simple-hero" id="main-content" aria-labelledby="not-found-title">
        <div className="shell simple-hero-inner">
          <p className="section-index inverted">404 / A little off trail</p>
          <h1 id="not-found-title">Let’s get you back.</h1>
          <p>This page isn’t here. Find dog walks, pet sitting and Adventures, or tell us what your dog needs.</p>
          <div className="simple-actions">
            <Link className="button button-accent" href="/#inquiry">Get Started</Link>
            <Link className="text-link light-link" href="/services">Services + pricing</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
