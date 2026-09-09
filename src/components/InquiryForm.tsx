"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { serviceInterestOptions } from "@/data/services";
import { siteConfig } from "@/data/site";

type FormStatus = "idle" | "sending" | "success" | "error";

export function InquiryForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const requestedService = searchParams.get("service");
  const defaultService = requestedService && serviceInterestOptions.some((service) => service.id === requestedService)
    ? requestedService
    : "not-sure";
  const activeService = selectedService ?? defaultService;

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
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" required placeholder="(470) 555-0123" />
        </label>
        <label>
          <span>Neighborhood or ZIP code</span>
          <input name="location" autoComplete="postal-code" required placeholder="30040" />
        </label>
        <label>
          <span>Dog name</span>
          <input name="dogName" required placeholder="Your dog’s name" />
        </label>
        <label>
          <span>Dog age</span>
          <input name="dogAge" required placeholder="3 years" />
        </label>
        <label>
          <span>Dog size / approximate weight</span>
          <input name="dogSize" required placeholder="About 45 pounds" />
        </label>
      </div>

      <label className="full-field">
        <span>Short description of your dog</span>
        <textarea name="dogDescription" required rows={4} placeholder="Tell me about their energy, personality, routine and favorite things." />
      </label>

      <fieldset>
        <legend>What are you interested in?</legend>
        <div className="interest-grid">
          {serviceInterestOptions.map((service) => (
            <label className="radio-choice" key={service.id}>
              <input
                type="radio"
                name="service"
                value={service.name}
                checked={activeService === service.id}
                onChange={() => setSelectedService(service.id)}
              />
              <span>{service.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field-grid form-followup-grid">
        <label>
          <span>Desired frequency</span>
          <input name="frequency" required placeholder="A few times a week, occasionally…" />
        </label>
        <label>
          <span>Preferred days / times</span>
          <input name="preferredTimes" required placeholder="Weekday mornings, flexible…" />
        </label>
      </div>

      <label className="full-field">
        <span>Anything important we should know?</span>
        <textarea name="importantNotes" rows={3} placeholder="Share anything useful for this first conversation." />
      </label>

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
