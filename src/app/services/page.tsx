import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import assets from "@/data/assets.json";
import { bookingBasics, serviceCategories, servicesForCategory } from "@/data/services";
import { sharedPreviewImage } from "@/lib/seo";
import { servicesSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Dog Walking & Pet Sitting Prices in Cumming, GA",
  description: "Compare dog walks from $30, in-home pet sitting from $95/day, and Adventures from $175 in Cumming and Forsyth County. We’ll help you choose.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Dog Care Prices in Cumming, GA | Good Dog Days",
    description: "Clear pricing for dog dog walking, enrichment visits, in-home pet sitting and dog adventures in Cumming and Forsyth County.",
    url: "/services",
    images: [sharedPreviewImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Care Prices in Cumming, GA | Good Dog Days",
    description: "Clear pricing for walks, care at home and dog adventures in Cumming and Forsyth County.",
    images: [sharedPreviewImage],
  },
};

export default function ServicesPage() {
  return (
    <main className="pricing-page">
      <JsonLd data={servicesSchema} />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <div id="main-content">
        <section className="pricing-hero" id="top" aria-labelledby="pricing-title">
          <div className="shell pricing-hero-grid">
            <div>
              <p className="section-index">SERVICES + PRICING</p>
              <h1 id="pricing-title">Find their kind of good day.</h1>
              <p>Whether they need a walk while you’re at work, care while you’re away, or a bigger day outside, we’ll build the day around your dog.</p>
              <p className="pricing-reassurance">Not sure what to choose? That’s okay. Tell us about your dog and we’ll help you find the right fit.</p>
              <Link className="button button-dark" href="/?service=not-sure#inquiry">Get Started</Link>
            </div>
            <Image
              className="pricing-hero-mark"
              src={assets.servicesHeroMark.src}
              alt=""
              width={347}
              height={248}
              aria-hidden="true"
              loading="eager"
              unoptimized
            />
          </div>
          <div className="shell pricing-doors">
            {serviceCategories.map((category) => (
              <a href={`#${category.id}`} key={category.id}>
                <strong>{category.name}</strong>
                <span>{category.description}</span>
                <b>From {category.startingPrice} <span aria-hidden="true">↓</span></b>
              </a>
            ))}
          </div>
        </section>

        <nav className="pricing-jump" aria-label="Service categories">
          <div className="shell">
            {serviceCategories.map((category) => (
              <a href={`#${category.id}`} key={category.id}>{category.name}</a>
            ))}
          </div>
        </nav>

        {serviceCategories.map((category) => {
          const categoryServices = servicesForCategory(category.id);

          return (
            <section className={`pricing-category pricing-category-${category.id}`} id={category.id} key={category.id} aria-labelledby={`${category.id}-title`}>
              <div className="shell pricing-category-header" data-service-family={category.id}>
                <div>
                  <p className="section-index">{category.number} / SERVICE FAMILY</p>
                  <h2 id={`${category.id}-title`}>{category.name}</h2>
                  <p className="category-brand-label">{category.id === "bigger-days" ? "2–8 hours · One Adventure, three lengths" : category.brandLabel}</p>
                </div>
                <div className="category-start">
                  <span>Starting at</span>
                  <strong>{category.startingPrice}</strong>
                  <p>{category.description}</p>
                </div>
              </div>

              {category.id === "bigger-days" ? (
                <div className="shell adventure-intro">
                  <h3>Bigger days for dogs who are happiest doing something.</h3>
                  <p>Trails. Hiking. Swimming. Running. Exploring. Sniffing. Playing. Maybe a little of everything. Every Adventure is planned around your dog’s energy, personality, comfort, interests, and physical ability.</p>
                  <aside className="adventure-setup" aria-label="Adventure introduction">
                    <h3>New to Good Dog Days?</h3>
                    <p>Before their first Adventure, your dog must successfully complete a 45-minute enrichment visit (Good Dog Session, $50) so we can get to know them and make sure they’re comfortable before heading off-site.</p>
                    <p><strong>You don’t need to book it separately. We’ll take care of that during setup.</strong></p>
                    <Link className="button button-accent" href="/?service=two-hour-adventure#inquiry" data-track-event="service_cta_click" data-track-label="adventure_setup">Request an Adventure</Link>
                  </aside>
                </div>
              ) : null}
              <div className="shell pricing-service-list">
                {categoryServices.map((service) => {
                  const selectedService = service.id;

                  return (
                    <article className={`pricing-service${service.featured ? " pricing-service-featured" : ""}`} id={service.id} key={service.id}>
                      <div className="pricing-service-top">
                        <div>
                          <div className="service-flags">
                            <span>{service.duration}</span>
                            {service.badge ? <span>{service.badge}</span> : null}
                          </div>
                          <h3>{service.name}</h3>
                          <p className="service-best-for">{service.bestFor}</p>
                        </div>
                        <p className="price-display">
                          {service.pricePrefix ? <span>{service.pricePrefix}</span> : null}
                          <strong>{service.price}</strong>
                        </p>
                      </div>

                      <p className="pricing-description">{service.description}</p>

                      <p className="service-highlights">{service.includes.slice(0, 2).join(" · ")}</p>
                      <details className="service-disclosure">
                        <summary>What’s included + pricing details<span className="sr-only"> for {service.name}</span></summary>
                        <div className="pricing-details">
                        <section>
                          <h4>What’s included</h4>
                          <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
                        </section>
                        {service.potentialActivities ? (
                          <section>
                            <h4>Depending on the dog</h4>
                            <ul>{service.potentialActivities.map((item) => <li key={item}>{item}</li>)}</ul>
                          </section>
                        ) : null}
                        {service.addOns.length > 0 ? (
                          <section>
                            <h4>Other pricing</h4>
                            <ul>{service.addOns.map((item) => <li key={item}>{item}</li>)}</ul>
                          </section>
                        ) : null}
                        {service.requirements.length > 0 ? (
                          <section className="requirements-list">
                            <h4>Good to know</h4>
                            <ul>{service.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
                          </section>
                        ) : null}
                      </div>
                      </details>

                      <Link
                        className="button button-dark"
                        href={`/?service=${selectedService}#inquiry`}
                        data-track-event="service_cta_click"
                        data-track-label={service.id}
                      >
                        {service.ctaText}
                      </Link>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className="booking-basics section-pad" aria-labelledby="booking-basics-title">
          <div className="shell booking-basics-grid">
            <div>
              <p className="section-index inverted">BEFORE WE START</p>
              <h2 id="booking-basics-title">Good to know.</h2>
            </div>
            <ul>
              {bookingBasics.map((item, index) => (
                <li key={item}><span>0{index + 1}</span>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pricing-final-cta">
          <div className="shell">
            <p>Not sure which one fits?</p>
            <h2>Tell me about your dog. We’ll figure it out together.</h2>
            <Link className="button button-dark" href="/?service=not-sure#inquiry">Get Started</Link>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
