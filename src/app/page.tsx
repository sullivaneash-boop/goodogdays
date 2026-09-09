import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { HeroMedia } from "@/components/HeroMedia";
import { InquiryForm } from "@/components/InquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import assets from "@/data/assets.json";
import { serviceCategories } from "@/data/services";
import {
  faqItems,
  processSteps,
  proofStories,
  safetyFacts,
  trustFacts,
} from "@/data/site";
import { organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Dog Walking & In-Home Dog Care in Cumming, GA | Good Dog Days" },
  alternates: { canonical: "/" },
};

const processProof = [
  {
    label: "One consistent handler",
    title: "I get to know your dog first.",
    body: "I learn their routine, energy and favorite things before taking over the leash.",
    image: assets.processAttentionPhoto.src,
    alt: assets.processAttentionPhoto.alt,
  },
  {
    label: "A plan that can adapt",
    title: "The dog in front of me sets the pace.",
    body: "A session may mean walking, running, sniffing, play or simply some company. Different dog, different day.",
    image: assets.processAdaptPhoto.src,
    alt: assets.processAdaptPhoto.alt,
  },
] as const;

export default function Home() {
  const featuredStory = proofStories[0];

  return (
    <main>
      <JsonLd data={organizationSchema} />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <div id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src={assets.homeHeroPhoto.src}
            alt={assets.homeHeroPhoto.alt}
            fill
            priority
            loading="eager"
            sizes="100vw"
          />
          <HeroMedia />
          <div className="hero-shade" />
          <Image
            className="hero-brand-mark"
            src={assets.homeHeroMark.src}
            alt=""
            width={347}
            height={248}
            aria-hidden="true"
            unoptimized
          />
          <div className="hero-content shell">
            <p className="eyebrow">Walks, care at home + adventures / Cumming, GA</p>
            <h1 id="hero-title">Better days<br />for good dogs.</h1>
            <p className="hero-copy">
              Walks, activity, care at home and bigger days out—built around the dog in front of us.
            </p>
            <div className="hero-actions">
              <a
                className="button button-accent"
                href="#inquiry"
                data-track-event="service_cta_click"
                data-track-label="hero_request"
              >
                Tell Us About Your Dog
              </a>
              <Link className="text-link light-link" href="/services">
                See services + pricing <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <p className="hero-note">A few quick questions. No commitment.</p>
          </div>
          <p className="photo-label">Sully + Lylah / On the move</p>
        </section>

        <div className="field-note" aria-hidden="true">
          <div className="field-note-track">
            <span>RUN</span><i>•</i><span>SNIFF</span><i>•</i><span>SWIM</span><i>•</i><span>PLAY</span><i>•</i><span>EXPLORE</span><i>•</i><span>NAP</span><i>•</i>
            <span>RUN</span><i>•</i><span>SNIFF</span><i>•</i><span>SWIM</span><i>•</i><span>PLAY</span><i>•</i><span>EXPLORE</span><i>•</i><span>NAP</span><i>•</i>
          </div>
        </div>

        <section className="trust-strip" aria-label="Why choose Good Dog Days">
          <div className="shell trust-grid">
            {trustFacts.map((fact, index) => (
              <article key={fact.title}>
                <span>0{index + 1}</span>
                <h2>{fact.title}</h2>
                <p>{fact.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="services section-pad" id="services" aria-labelledby="services-title">
          <div className="shell section-heading row-heading">
            <div>
              <p className="section-index inverted">Services + pricing / 01</p>
              <h2 id="services-title">The right kind<br />of good day.</h2>
            </div>
            <p>A walk. More activity. Care at home. A bigger day out. Pick what sounds right and we’ll take it from there.</p>
          </div>

          <div className="shell service-family-list">
            {serviceCategories.map((category) => (
              <article className="service-family" key={category.id}>
                <p className="service-number">{category.number}</p>
                <div className="service-family-name">
                  <p className="service-brand-label">{category.brandLabel}</p>
                  <h3>{category.name}</h3>
                  <p>Starting at <strong>{category.startingPrice}</strong></p>
                </div>
                <p className="service-family-copy">{category.description}</p>
                <Link
                  className="arrow-link light-link"
                  href={`/services#${category.id}`}
                  data-track-event="service_cta_click"
                  data-track-label={category.id}
                >
                  Services + pricing <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="process-proof section-pad" aria-labelledby="proof-title">
          <div className="shell proof-heading">
            <p className="section-index">Built around the dog / 02</p>
            <h2 id="proof-title">Real attention.<br />No giant group.</h2>
            <p>Good Dog Days stays small on purpose. Your dog gets a familiar person, an appropriate plan and an update after care.</p>
          </div>
          <div className="shell proof-process-grid">
            {processProof.map((item) => (
              <article className="process-proof-card" key={item.title}>
                <div className="process-proof-image">
                  <Image src={item.image} alt={item.alt} fill sizes="(min-width: 760px) 48vw, 100vw" />
                </div>
                <p className="proof-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="how section-pad" id="how-it-works" aria-labelledby="how-title">
          <div className="shell">
            <div className="section-heading row-heading">
              <div>
                <p className="section-index inverted">How it works / 03</p>
                <h2 id="how-title">Simple<br />on purpose.</h2>
              </div>
              <p>You tell me about your dog. I handle the plan.</p>
            </div>
            <ol className="steps">
              {processSteps.map((step, index) => (
                <li key={step.title}>
                  <span>0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="care-safety section-pad" id="care-safety" aria-labelledby="safety-title">
          <div className="shell care-grid">
            <div className="care-intro">
              <p className="section-index">Care + safety / 04</p>
              <h2 id="safety-title">Trust starts before the leash changes hands.</h2>
              <p>We meet first, talk through their routine and make sure the service fits before solo care begins.</p>
            </div>
            <div className="safety-list">
              {safetyFacts.map((fact, index) => (
                <article key={fact.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{fact.title}</h3>
                    <p>{fact.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="area section-pad" id="service-area" aria-labelledby="area-title">
          <div className="shell area-grid">
            <div>
              <p className="section-index">Service area / 05</p>
              <h2 id="area-title">Starting close to home.</h2>
            </div>
            <div className="area-copy">
              <p className="lead">Serving Cumming and select areas of Central, West and North Forsyth County.</p>
              <p>Share your ZIP code in the inquiry form. If you’re near the edge of the current area, send it anyway and I’ll confirm.</p>
              <a className="arrow-link" href="#inquiry">Check your location <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="map-type" aria-hidden="true"><span>CUMMING</span><span>FORSYTH</span></div>
        </section>

        <section className="about section-pad" id="about" aria-labelledby="about-title">
          <div className="shell about-grid">
            <div className="about-image">
              <Image src={assets.aboutPhoto.src} alt={assets.aboutPhoto.alt} fill sizes="(min-width: 900px) 48vw, 100vw" />
            </div>
            <div className="about-copy">
              <p className="section-index inverted">Meet Sully + Lylah / 06</p>
              <h2 id="about-title">One good dog started all of this.</h2>
              <p className="lead">I’ve spent my life around dogs—and I know “active” means something different for every one of them.</p>
              <p>After adopting Lylah in 2025, walks, trails, swimming and new places became a major part of our life together. Good Dog Days grew from one simple idea: pay attention to the dog in front of you.</p>
              <p>I’m local to Forsyth County. I keep care small, adapt the day when needed and earn trust before taking over the leash.</p>
              <a className="button button-accent" href="#inquiry">Tell me about your dog</a>
            </div>
          </div>
        </section>

        <section className="real-days section-pad" aria-labelledby="real-days-title">
          <div className="shell real-days-grid">
            <div className="real-days-image">
              <Image src={assets.realDaysFeaturedCover.src} alt={assets.realDaysFeaturedCover.alt} fill sizes="(min-width: 900px) 40vw, 100vw" />
            </div>
            <div>
              <p className="section-index">Real days / real dogs</p>
              <h2 id="real-days-title">See Good Dog Days in action.</h2>
              <p>Neighborhood walks, outdoor sessions and shelter Adventure Days show what can happen when a dog gets somewhere to go and something good to do.</p>
              <a
                className="arrow-link"
                href={featuredStory.href}
                target="_blank"
                rel="noreferrer"
                data-track-event="adventure_story_click"
                data-track-label={featuredStory.name}
              >
                Watch Red’s Adventure Day <span aria-hidden="true">↗</span>
              </a>
              <p className="shelter-note">Red was an adoptable shelter dog taken on an outing through the Humane Society of Forsyth County. No organizational endorsement is implied.</p>
            </div>
          </div>
        </section>

        <section className="faq section-pad" id="faq" aria-labelledby="faq-title">
          <div className="shell faq-grid">
            <div className="faq-heading">
              <p className="section-index">FAQ / 07</p>
              <h2 id="faq-title">Good questions.</h2>
              <p>Clear answers before you hand over the leash—or the house key.</p>
            </div>
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary><span>{item.question}</span><i aria-hidden="true">+</i></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="inquiry section-pad" id="inquiry-section" aria-labelledby="inquiry-title">
          <div className="shell inquiry-grid">
            <div className="inquiry-intro">
              <p className="section-index inverted">Tell us about your dog / 08</p>
              <h2 id="inquiry-title">Tell us about your dog.</h2>
              <p>Start with one simple choice. Then share a few basics about your dog and where you are.</p>
              <ol className="next-steps">
                <li><span>1</span>Tell me what you need.</li>
                <li><span>2</span>I check location + fit.</li>
                <li><span>3</span>We meet your dog.</li>
                <li><span>4</span>We plan the first day.</li>
              </ol>
            </div>
            <div className="inquiry-form-anchor" id="inquiry">
              <Suspense fallback={<div className="form-loading" aria-hidden="true" />}>
                <InquiryForm />
              </Suspense>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
