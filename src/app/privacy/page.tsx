import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Good Dog Days handles information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="simple-page legal-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <article className="shell legal-content" id="main-content">
        <p className="section-index">Privacy / Last updated September 9, 2026</p>
        <h1>Privacy policy.</h1>
        <p className="lead">Good Dog Days collects only the information needed to respond to service inquiries and operate this website.</p>

        <h2>Information you provide</h2>
        <p>When you send an availability request, Good Dog Days receives the contact details, dog information, location and timing details you choose to submit.</p>

        <h2>Information collected automatically</h2>
        <p>The website may record basic attribution details such as the page you visited, referring page and campaign parameters. If analytics is enabled, aggregated usage information may also be collected to understand which pages and services are useful.</p>

        <h2>How information is used</h2>
        <p>Your information is used to evaluate service-area fit, respond to your request, discuss care and improve the website. Good Dog Days does not sell personal information.</p>

        <h2>Service providers</h2>
        <p>Form submissions may be processed by Formspree, and site traffic may be measured with Google Analytics when configured. Those providers process information according to their own policies.</p>

        <h2>Your choices</h2>
        <p>You may ask what information is held about you or request its deletion through the <Link href="/#inquiry">availability request form</Link>.</p>

        <h2>Policy changes</h2>
        <p>This policy may be updated as the website or business systems change. The revision date above identifies the current version.</p>
      </article>
      <SiteFooter />
    </main>
  );
}
