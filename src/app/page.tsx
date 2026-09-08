import Image from "next/image";
import { InquiryForm } from "@/components/InquiryForm";
import { TikTokEmbed } from "@/components/TikTokEmbed";
import {
  faqItems,
  navigation,
  principles,
  processSteps,
  proofStories,
  services,
  siteConfig,
} from "@/data/site";

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Good Dog Days home">
          GOOD DOG DAYS
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <a className="nav-cta" href="#inquiry">Request a Good Dog Day</a>
      </header>

      <div id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src="/media/sully-with-lylah.jpg"
            alt="Sully walking Lylah across a wooden boardwalk"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-shade" />
          <div className="hero-content shell">
            <p className="eyebrow">Cumming + Forsyth County, Georgia</p>
            <h1 id="hero-title">Better days<br />for good dogs.</h1>
            <p className="hero-copy">
              Personalized exercise, enrichment, sitting and adventures for dogs
              in Cumming and Forsyth County.
            </p>
            <div className="hero-actions">
              <a className="button button-accent" href="#inquiry">Request a Good Dog Day</a>
              <a className="text-link light-link" href="#adventures">
                See what a Good Dog Day looks like <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <p className="photo-label">Sully + Lylah / On the move</p>
        </section>

        <div className="field-note" aria-hidden="true">
          <div className="field-note-track">
            <span>MOVE</span><i>•</i><span>SNIFF</span><i>•</i><span>PLAY</span><i>•</i><span>EXPLORE</span><i>•</i><span>RESET</span><i>•</i>
            <span>MOVE</span><i>•</i><span>SNIFF</span><i>•</i><span>PLAY</span><i>•</i><span>EXPLORE</span><i>•</i><span>RESET</span><i>•</i>
          </div>
        </div>

        <section className="positioning section-pad" aria-labelledby="positioning-title">
          <div className="shell position-grid">
            <div>
              <p className="section-index">THE IDEA / 01</p>
              <h2 id="positioning-title">More than a walk around the block.</h2>
            </div>
            <div className="position-copy">
              <p className="lead">Different dogs light up in different ways.</p>
              <p>Some need to run. Some want a slow, sniff-heavy walk. Some live for fetch or tug. Others need enrichment, a new environment or simply someone’s undivided attention.</p>
              <p>Good Dog Days builds the activity around the dog instead of forcing every dog into the same service.</p>
            </div>
          </div>
          <div className="shell principle-list">
            {principles.map((principle, index) => (
              <div className="principle" key={principle}>
                <span>0{index + 1}</span>
                <p>{principle}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="services section-pad" id="services" aria-labelledby="services-title">
          <div className="shell section-heading row-heading">
            <div>
              <p className="section-index inverted">SERVICES / 02</p>
              <h2 id="services-title">Built for the dog<br />in front of me.</h2>
            </div>
            <p>Three ways to give your dog a better day, from reliable everyday help to a full change of scenery.</p>
          </div>

          <div className="shell service-list">
            {services.map((service) => (
              <article className="service-row" key={service.name}>
                <div className="service-number">{service.number}</div>
                <div className="service-title">
                  <p>{service.kicker}</p>
                  <h3>{service.name}</h3>
                </div>
                <div className="service-copy">
                  <p>{service.description}</p>
                  <p className="service-detail">{service.details}</p>
                  <span className="service-price">{service.price}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="adventures section-pad" id="adventures" aria-labelledby="adventures-title">
          <div className="shell adventure-intro">
            <p className="section-index">PROOF / 03</p>
            <h2 id="adventures-title">What does a Good Dog Day actually look like?</h2>
            <p>Real dogs. Real places. A little room to be curious.</p>
          </div>

          <div className="proof-grid shell-wide">
            {proofStories.map((story, index) => (
              <article className="proof-card" key={story.name}>
                <div className="proof-media">
                  <TikTokEmbed
                    name={story.name}
                    videoId={story.videoId}
                    href={story.href}
                    cover={story.cover}
                    alt={story.alt}
                  />
                  <span className="proof-count">0{index + 1}</span>
                </div>
                <div className="proof-content">
                  <p className="proof-label">{story.label}</p>
                  <h3>{story.name}</h3>
                  <p>{story.description}</p>
                  <a className="arrow-link" href={story.href} target="_blank" rel="noreferrer">
                    {story.cta} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="shelter-note shell">Red and Savannah were adoptable shelter dogs taken on outings through the Humane Society of Forsyth County. No organizational endorsement is implied.</p>
        </section>

        <section className="story section-pad" id="story" aria-labelledby="story-title">
          <div className="story-collage shell-wide">
            <div className="story-image story-image-main">
              <Image src="/media/lylah-lake.jpg" alt="Lylah standing ready beside the lake in her pink adventure harness" fill sizes="(min-width: 900px) 52vw, 100vw" />
            </div>
            <div className="story-content">
              <p className="section-index inverted">THE START / 04</p>
              <h2 id="story-title">It started with one very good dog.</h2>
              <p>Sully adopted Lylah from the Hall County Animal Shelter in September 2025. Since then, walks, trails, swimming, outdoor adventures and exploring new places together have become a major part of their lives.</p>
              <p>Seeing what the right mix of exercise, stimulation and new experiences means to Lylah is part of the inspiration behind Good Dog Days.</p>
              <blockquote>“Dogs spend a lot of their lives waiting on us. Good Dog Days gives them something to look forward to.”</blockquote>
              <a className="arrow-link light-link" href="https://www.tiktok.com/@sullyeash/photo/7592808399943765303" target="_blank" rel="noreferrer">
                See Lylah’s story <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="story-image story-image-small">
              <video controls preload="none" playsInline poster="/media/sully-with-lylah.jpg" aria-label="Sully walking Lylah on a boardwalk">
                <source src="/media/lylah-walking-above.mp4" type="video/mp4" />
                Your browser does not support this video.
              </video>
            </div>
          </div>
        </section>

        <section className="founder section-pad" aria-labelledby="founder-title">
          <div className="shell founder-grid">
            <div className="founder-copy">
              <p className="section-index">MEET SULLY / 05</p>
              <h2 id="founder-title">Hey, I’m Sully.</h2>
              <p className="lead">I’ve spent my life around dogs—and I know “active” means something different for every one of them.</p>
              <p>My experience spans high-energy dogs, senior dogs, different breeds and temperaments, my own active dog, and time with adoptable shelter dogs through Adventure Day outings with the Humane Society of Forsyth County.</p>
              <p>I’m local to Forsyth County, comfortable changing the plan to suit the dog in front of me, and serious about earning trust before taking over the leash.</p>
              <a className="button button-dark" href="#inquiry">Tell me about your dog</a>
            </div>
            <div className="founder-gallery" aria-label="Dogs on outings with Sully">
              <div className="founder-photo founder-photo-a"><Image src="/media/sully-with-savannah.jpg" alt="Sully walking Savannah during her shelter Adventure Day" fill sizes="(min-width: 900px) 32vw, 60vw" /></div>
              <div className="founder-photo founder-photo-b"><Image src="/media/sully-with-lylah.jpg" alt="Sully walking Lylah across a wooden boardwalk" fill sizes="(min-width: 900px) 22vw, 42vw" /></div>
              <p>Individual attention.<br />No autopilot.</p>
            </div>
          </div>
        </section>

        <section className="how section-pad" id="how-it-works" aria-labelledby="how-title">
          <div className="shell">
            <div className="section-heading row-heading">
              <div>
                <p className="section-index inverted">THE PLAN / 06</p>
                <h2 id="how-title">Here’s how<br />it works.</h2>
              </div>
              <p>Simple on purpose. We start with fit, then build from there.</p>
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

        <section className="area section-pad" aria-labelledby="area-title">
          <div className="shell area-grid">
            <div>
              <p className="section-index">SERVICE AREA / 07</p>
              <h2 id="area-title">Starting close to home.</h2>
            </div>
            <div className="area-copy">
              <p className="lead">Good Dog Days currently serves Cumming and select areas of Central, West and North Forsyth County.</p>
              <p>Keeping the initial service area intentionally focused means less time sitting in traffic and more time spent with your dog.</p>
              <a className="arrow-link" href="#inquiry">Check your neighborhood <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="map-type" aria-hidden="true"><span>CUMMING</span><span>FORSYTH</span></div>
        </section>

        <section className="inquiry section-pad" id="inquiry" aria-labelledby="inquiry-title">
          <div className="shell inquiry-grid">
            <div className="inquiry-intro">
              <p className="section-index inverted">SAY HELLO / 08</p>
              <h2 id="inquiry-title">Give your dog something to look forward to.</h2>
              <p>Tell me the basics. I’ll check your location, learn what you need and see whether Good Dog Days is the right fit.</p>
            </div>
            <InquiryForm />
          </div>
        </section>

        <section className="faq section-pad" id="faq" aria-labelledby="faq-title">
          <div className="shell faq-grid">
            <div className="faq-heading">
              <p className="section-index">FAQ / 09</p>
              <h2 id="faq-title">Good questions.</h2>
              <p>Still wondering about something? Send an inquiry and ask away.</p>
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
      </div>

      <footer className="footer">
        <div className="shell footer-top">
          <div>
            <p className="footer-wordmark">GOOD DOG DAYS</p>
            <p>{siteConfig.tagline}</p>
          </div>
          <p>{siteConfig.location}</p>
        </div>
        <div className="shell footer-bottom">
          <p>© {new Date().getFullYear()} Good Dog Days</p>
          <nav aria-label="Social links">
            <a href={siteConfig.social.instagram}>Instagram</a>
            <a href={siteConfig.social.tiktok} target="_blank" rel="noreferrer">TikTok</a>
            <a href={siteConfig.social.email}>Contact</a>
          </nav>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
