"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { submitToFormspree } from "@/lib/formspree";
import { trackEvent } from "@/lib/analytics";
import styles from "./Popup.module.css";

type ExitIntentModalProps = {
  onDismiss: () => void;
};

type CaptureState = "idle" | "submitting" | "success";

export function ExitIntentModal({ onDismiss }: ExitIntentModalProps) {
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [state, setState] = useState<CaptureState>("idle");
  const [error, setError] = useState("");
  const phoneRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const doneRef = useRef<HTMLButtonElement>(null);
  const phoneIsValid = phone.replace(/\D/g, "").length >= 10;
  const canSubmit = phoneIsValid && confirmed && state !== "submitting";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    phoneRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onDismiss();
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])",
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onDismiss]);

  useEffect(() => {
    if (state === "success") doneRef.current?.focus();
  }, [state]);

  async function submitPriorityRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      setError(
        !phoneIsValid
          ? "Add a valid 10-digit mobile number."
          : "Confirm that we may text you about availability.",
      );
      return;
    }

    setError("");
    setState("submitting");

    try {
      await submitToFormspree({
        subject: "Availability text request",
        leadType: "Exit-intent callback",
        phone,
        smsConsent: confirmed,
        preferredContactMethod: "text",
        landingPage: window.location.href,
        referrer: document.referrer,
        submittedAt: new Date().toISOString(),
        message: "Visitor asked for a text about service availability before leaving the site.",
      });
      setState("success");
      trackEvent("priority_callback_submit", { source: "exit_intent" });
    } catch {
      setState("idle");
      setError("That didn’t send. Please check your connection and try again.");
    }
  }

  return (
    <m.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onDismiss();
      }}
    >
      <m.section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        aria-describedby="exit-intent-description"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.24 }}
        className={`${styles.surface} ${styles.dialog}`}
      >
        <button type="button" onClick={onDismiss} aria-label="Close availability form" className={styles.close}>×</button>
        {state === "success" ? (
          <div className={styles.success} role="status">
            <span className={styles.successIcon} aria-hidden="true">✓</span>
            <p className={styles.eyebrow}>We’ve got your number</p>
            <h2 id="exit-intent-title" className={styles.title}>We’ll text you about availability.</h2>
            <p id="exit-intent-description" className={styles.body}>We’ll start with a quick conversation and take it from there.</p>
            <button ref={doneRef} type="button" onClick={onDismiss} className={styles.action}>Done</button>
          </div>
        ) : (
          <>
            <p className={styles.eyebrow}>Pick this up later</p>
            <h2 id="exit-intent-title" className={styles.title}>Want us to text you?</h2>
            <p id="exit-intent-description" className={styles.body}>Leave your number and we’ll text you about availability. No full inquiry needed right now.</p>
            <form onSubmit={submitPriorityRequest} noValidate className={styles.form}>
              <label>
                <span className={styles.label}>Mobile number</span>
                <input
                  ref={phoneRef}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(770) 555-0123"
                  aria-invalid={Boolean(error) && !phoneIsValid}
                  aria-describedby={error ? "callback-error" : undefined}
                  className={styles.phone}
                />
              </label>
              <label className={styles.consent}>
                <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />
                <span>Yes, Good Dog Days may text me about service availability. Message and data rates may apply.</span>
              </label>
              <button type="submit" disabled={state === "submitting"} className={styles.action}>
                {state === "submitting" ? "Sending…" : "Text me about availability"}
              </button>
              <div className={styles.feedback} aria-live="polite">
                {error ? <p id="callback-error" role="alert" className={styles.error}>{error}</p> : null}
              </div>
            </form>
          </>
        )}
      </m.section>
    </m.div>
  );
}
