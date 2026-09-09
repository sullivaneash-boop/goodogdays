"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, ValidationError } from "@formspree/react";
import { serviceInterestOptions } from "@/data/services";
import { trackEvent } from "@/lib/analytics";

const formId = "xbgjqyyz";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function queryValue(name: string) {
  return new URLSearchParams(window.location.search).get(name) ?? "";
}

const attributionData = {
  landingPage: () => window.location.href,
  referrer: () => document.referrer,
  utmSource: () => queryValue("utm_source"),
  utmMedium: () => queryValue("utm_medium"),
  utmCampaign: () => queryValue("utm_campaign"),
  utmContent: () => queryValue("utm_content"),
  gclid: () => queryValue("gclid"),
  timestamp: () => new Date().toISOString(),
};

export function InquiryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formState, submitToFormspree] = useForm(formId, { data: attributionData });
  const [ownerName, setOwnerName] = useState("");
  const [contact, setContact] = useState("");
  const hasStarted = useRef(false);
  const hasCompleted = useRef(false);
  const submittedDetails = useRef({ selectedService: "not-sure", zipCode: "" });
  const errorRef = useRef<HTMLDivElement>(null);
  const requestedService = searchParams.get("service");
  const defaultService = requestedService && serviceInterestOptions.some((service) => service.id === requestedService)
    ? requestedService
    : "not-sure";
  const contactIsEmail = emailPattern.test(contact);
  const contactIsPhone = contact.replace(/\D/g, "").length >= 10;

  useEffect(() => {
    if (!formState.succeeded || hasCompleted.current) return;

    hasCompleted.current = true;
    trackEvent("inquiry_submit", {
      selected_service: submittedDetails.current.selectedService,
      zip_code: submittedDetails.current.zipCode,
    });
    router.push("/thank-you");
  }, [formState.succeeded, router]);

  useEffect(() => {
    if (formState.errors) errorRef.current?.focus();
  }, [formState.errors]);

  function handleStart() {
    if (hasStarted.current) return;
    hasStarted.current = true;
    trackEvent("inquiry_start", { selected_service: defaultService });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);

    if (formData.get("company")) {
      event.preventDefault();
      router.push("/thank-you");
      return;
    }

    submittedDetails.current = {
      selectedService: String(formData.get("service") ?? "not-sure"),
      zipCode: String(formData.get("zipCode") ?? ""),
    };
    void submitToFormspree(event);
  }

  return (
    <form
      className="inquiry-form"
      onSubmit={handleSubmit}
      onFocus={handleStart}
      action={`https://formspree.io/f/${formId}`}
      method="POST"
    >
      <input type="hidden" name="email" value={contactIsEmail ? contact : ""} />
      <input type="hidden" name="phone" value={contactIsPhone ? contact : ""} />
      <input type="hidden" name="subject" value={`New Good Dog Days request from ${ownerName || "a website visitor"}`} />

      <div className="field-grid">
        <label>
          <span>Your name</span>
          <input
            name="name"
            autoComplete="name"
            required
            placeholder="Your name"
            value={ownerName}
            onChange={(event) => setOwnerName(event.target.value)}
          />
        </label>
        <label>
          <span>Phone or email</span>
          <input
            name="contact"
            autoComplete="email"
            required
            placeholder="How should I reach you?"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
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
        <textarea name="message" rows={4} placeholder="Energy, routine, temperament or anything useful for the first conversation." />
      </label>

      <label className="form-honeypot" aria-hidden="true">
        <span>Company</span>
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="form-submit-row">
        <button className="button button-accent" type="submit" disabled={formState.submitting}>
          {formState.submitting ? "Sending…" : "Send request"}
        </button>
        <p>No commitment. I’ll check your location and fit before anything is scheduled.</p>
      </div>

      <p className="form-privacy">
        By sending this form, you agree that I may contact you about your request. See the <a href="/privacy">privacy policy</a>.
      </p>

      {formState.errors ? (
        <div className="form-error" role="alert" tabIndex={-1} ref={errorRef}>
          <ValidationError errors={formState.errors} prefix="I couldn’t send that request." />
        </div>
      ) : null}
    </form>
  );
}
