"use client";

import { FormEvent, useState } from "react";
import { serviceInterests, siteConfig } from "@/data/site";

type FormStatus = "idle" | "sending" | "success" | "error";

export function InquiryForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    if (!siteConfig.formspreeEndpoint) {
      setStatus("error");
      return;
    }

    try {
      const response = await fetch(siteConfig.formspreeEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <p className="form-success-mark" aria-hidden="true">GOOD.</p>
        <h3>Got it.</h3>
        <p>I’ll take a look at your location, what you’re looking for and whether we’re a good fit, then I’ll reach out with next steps.</p>
      </div>
    );
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit} action={siteConfig.formspreeEndpoint || undefined} method="POST">
      <div className="field-grid">
        <label>
          <span>Owner name</span>
          <input name="ownerName" autoComplete="name" required placeholder="Your name" />
        </label>
        <label>
          <span>Phone or email</span>
          <input name="contact" autoComplete="email" required placeholder="Best way to reach you" />
        </label>
        <label>
          <span>Neighborhood or ZIP code</span>
          <input name="location" autoComplete="postal-code" required placeholder="30040" />
        </label>
        <label>
          <span>How often are you looking for help?</span>
          <input name="frequency" required placeholder="A few times a week, occasionally…" />
        </label>
      </div>

      <label className="full-field">
        <span>Dog’s name and short description</span>
        <textarea name="dog" required rows={4} placeholder="Tell me a little about your dog—their age, energy, personality and favorite things." />
      </label>

      <fieldset>
        <legend>What are you interested in?</legend>
        <div className="interest-grid">
          {serviceInterests.map((interest, index) => (
            <label className="radio-choice" key={interest}>
              <input type="radio" name="service" value={interest} defaultChecked={index === 0} />
              <span>{interest}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-submit-row">
        <button className="button button-accent" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Request a Good Dog Day"}
        </button>
        <p>Simple first step. No commitment, no long application.</p>
      </div>
      {status === "error" ? (
        <p className="form-error" role="alert">
          {siteConfig.formspreeEndpoint
            ? "Something didn’t go through. Please try again or use the contact link below."
            : "The inquiry form isn’t connected yet. Add the Formspree endpoint before launch."}
        </p>
      ) : null}
    </form>
  );
}
