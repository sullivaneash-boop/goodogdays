import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Request Received",
  description: "Your Good Dog Days availability request has been received.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="simple-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <section className="simple-hero" id="main-content" aria-labelledby="thank-you-title">
        <div className="shell simple-hero-inner">
          <p className="section-index inverted">Request received</p>
          <h1 id="thank-you-title">Good. It’s on its way.</h1>
          <p>I’ll check your location and what you’re looking for, then follow up with the next step.</p>
          <div className="simple-actions">
            <Link className="button button-accent" href="/services">Review services + pricing</Link>
            <Link className="text-link light-link" href="/#care-safety">Read about care + safety</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
