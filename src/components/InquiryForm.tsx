"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { serviceInterestOptions } from "@/data/services";
import { siteConfig } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

type FormStatus = "idle" | "sending" | "error";

function attributionFields() {
  const params = new URLSearchParams(window.location.search);

  return {
    landingPage: window.location.href,
    referrer: document.referrer,
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    utmContent: params.get("utm_content") ?? "",
    gclid: params.get("gclid") ?? "",
    timestamp: new Date().toISOString(),
  };
}

export function InquiryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<FormStatus>("idle");
  const hasStarted = useRef(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const requestedService = searchParams.get("service");
  const defaultService = requestedService && serviceInterestOptions.some((service) => service.id === requestedService)
    ? requestedService
    : "not-sure";

  useEffect(() => {
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  function handleStart() {
    if (hasStarted.current) return;
    hasStarted.current = true;
    trackEvent("inquiry_start", { selected_service: defaultService });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const attribution = attributionFields();

    Object.entries(attribution).forEach(([key, value]) => formData.set(key, value));
    setStatus("sending");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed");

      trackEvent("inquiry_submit", {
        selected_service: String(formData.get("service") ?? "not-sure"),
        zip_code: String(formData.get("zipCode") ?? ""),
      });
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      className="inquiry-form"
      onSubmit={handleSubmit}
      onFocus={handleStart}
      action="/api/inquiry"
      method="POST"
    >
      <div className="field-grid">
        <label>
          <span>Your name</span>
          <input name="ownerName" autoComplete="name" required placeholder="Your name" />
        </label>
        <label>
          <span>Phone or email</span>
          <input name="contact" autoComplete="email" required placeholder="How should I reach you?" />
        </label>
        <label>
          <span>ZIP code</span>
          <input
            name="zipCode"
            autoComplete="postal-code"
            inputMode="numeric"
            pattern="[0-9]{5}"
            required
            placeholder="30040"
          />
        </label>
        <label>
          <span>Dog name</span>
          <input name="dogName" required placeholder="Your dog’s name" />
        </label>
        <label>
          <span>What are you looking for?</span>
          <select name="service" defaultValue={defaultService} required>
            {serviceInterestOptions.map((service) => (
              <option value={service.id} key={service.id}>{service.name}</option>
            ))}
          </select>
        </label>
        <label>
          <span>When do you need help?</span>
          <input name="startTiming" required placeholder="A date, week or general timeframe" />
        </label>
        <label>
          <span>Best way to reach you</span>
          <select name="contactPreference" defaultValue="text">
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="call">Call</option>
          </select>
        </label>
      </div>

      <label className="full-field">
        <span>Anything I should know? <em>Optional</em></span>
        <textarea name="notes" rows={4} placeholder="Energy, routine, temperament or anything useful for the first conversation." />
      </label>

      <label className="form-honeypot" aria-hidden="true">
        <span>Company</span>
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="form-submit-row">
        <button className="button button-accent" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send request"}
        </button>
        <p>No commitment. I’ll check your location and fit before anything is scheduled.</p>
      </div>

      <p className="form-privacy">
        By sending this form, you agree that I may contact you about your request. See the <a href="/privacy">privacy policy</a>.
      </p>

      {status === "error" ? (
        <p className="form-error" role="alert" tabIndex={-1} ref={errorRef}>
          Something went wrong. Please try again or email <a href={siteConfig.social.email}>{siteConfig.email}</a>.
        </p>
      ) : null}
    </form>
  );
}
