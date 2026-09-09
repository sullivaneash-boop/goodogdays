import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { bookingBasics, serviceCategories, servicesForCategory } from "@/data/services";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Explore Good Dog Days walks, personalized sessions, in-home care and premium dog adventures in Cumming and Forsyth County, Georgia.",
};

export default function ServicesPage() {
  return (
    <main className="pricing-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <div id="main-content">
        <section className="pricing-hero" id="top" aria-labelledby="pricing-title">
          <div className="shell pricing-hero-grid">
            <div>
              <p className="section-index">SERVICES + PRICING</p>
              <h1 id="pricing-title">Find their kind of good day.</h1>
              <p>From a reliable walk close to home to a full day outside, every option starts with the dog in front of us.</p>
              <Link className="button button-dark" href="/#inquiry">Tell Us About Your Dog</Link>
            </div>
            <Image
              className="pricing-hero-mark"
              src="/brand/mark-primary.svg"
              alt=""
              width={347}
              height={248}
              aria-hidden="true"
              loading="eager"
              unoptimized
            />
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
              <div className="shell pricing-category-header">
                <div>
                  <p className="section-index">{category.number} / SERVICE FAMILY</p>
                  <h2 id={`${category.id}-title`}>{category.name}</h2>
                </div>
                <div className="category-start">
                  <span>Starting at</span>
                  <strong>{category.startingPrice}</strong>
                  <p>{category.description}</p>
                </div>
              </div>

              <div className="shell pricing-service-list">
                {categoryServices.map((service) => {
                  const selectedService = service.category === "bigger-days" ? "good-dog-session" : service.id;

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

                      <div className="pricing-details">
                        <section>
                          <h4>What’s included</h4>
                          <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
                        </section>
                        {service.potentialActivities ? (
                          <section>
                            <h4>The day may include</h4>
                            <ul>{service.potentialActivities.map((item) => <li key={item}>{item}</li>)}</ul>
                          </section>
                        ) : null}
                        {service.addOns.length > 0 ? (
                          <section>
                            <h4>Add-ons + recurring</h4>
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

                      <Link className="button button-dark" href={`/?service=${selectedService}#inquiry`}>{service.ctaText}</Link>
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
            <h2>Tell us about your dog. We’ll start there.</h2>
            <Link className="button button-dark" href="/?service=not-sure#inquiry">Request a Good Dog Day</Link>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
