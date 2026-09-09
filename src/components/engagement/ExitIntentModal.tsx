"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { submitToFormspree } from "@/lib/formspree";
import { trackEvent } from "@/lib/analytics";

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
      const dialog = phoneRef.current?.closest<HTMLElement>("[role='dialog']");
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
        subject: "Priority availability text request",
        leadType: "Exit-intent priority callback",
        phone,
        smsConsent: confirmed,
        preferredContactMethod: "text",
        landingPage: window.location.href,
        referrer: document.referrer,
        submittedAt: new Date().toISOString(),
        message: "Visitor requested a priority availability text before leaving the site.",
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
      className="fixed inset-0 z-[90] grid place-items-center bg-[#091d30]/72 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onDismiss();
      }}
    >
      <m.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-[2rem] border border-white/15 bg-[#fffaf1] p-6 text-[#0f2942] shadow-[0_30px_120px_rgba(0,0,0,0.42)] sm:p-9"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-[#f2c230]" />
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Close priority availability form"
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full text-xl text-[#0f2942]/45 transition hover:bg-[#0f2942]/5 hover:text-[#0f2942] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f2942]"
        >
          ×
        </button>

        {state === "success" ? (
          <div className="py-10" role="status">
            <span className="grid size-14 place-items-center rounded-full bg-[#8fa768] text-xl font-black">✓</span>
            <p className="mt-7 text-[0.65rem] font-black uppercase tracking-[0.15em] text-[#64753a]">
              You’re on the priority list
            </p>
            <h2 id="exit-intent-title" className="mt-2 max-w-[12ch] font-[var(--display)] text-4xl font-extrabold normal-case leading-[0.95] tracking-[-0.05em] sm:text-5xl">
              We’ll text you about availability.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#0f2942]/65">
              No full intake needed right now. We’ll start with the quickest useful next step.
            </p>
            <button
              type="button"
              onClick={onDismiss}
              className="mt-7 min-h-11 rounded-xl bg-[#0f2942] px-5 text-xs font-black uppercase tracking-[0.08em] text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="pr-12 text-[0.65rem] font-black uppercase tracking-[0.15em] text-[#64753a]">
              Save your place
            </p>
            <h2 id="exit-intent-title" className="mt-3 max-w-[13ch] font-[var(--display)] text-4xl font-extrabold normal-case leading-[0.95] tracking-[-0.05em] sm:text-5xl">
              Too busy to finish booking right now?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#0f2942]/65 sm:text-base">
              Leave your number and we’ll text you priority availability. Two fields, no full profile required.
            </p>

            <form onSubmit={submitPriorityRequest} noValidate className="mt-7">
              <label className="block">
                <span className="mb-2 block text-[0.68rem] font-black uppercase tracking-[0.11em] text-[#0f2942]/60">
                  Mobile number
                </span>
                <input
                  ref={phoneRef}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(770) 555-0123"
                  aria-invalid={Boolean(error) && !phoneIsValid}
                  className={`min-h-14 w-full rounded-2xl border bg-white px-4 text-base outline-none transition focus:border-[#0f2942] focus:ring-4 focus:ring-[#0f2942]/10 ${
                    phoneIsValid ? "border-[#8fa768] ring-1 ring-[#8fa768]/15" : "border-[#0f2942]/18"
                  }`}
                />
              </label>

              <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#0f2942]/10 bg-white/65 p-3.5">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(event) => setConfirmed(event.target.checked)}
                  className="mt-0.5 size-4 accent-[#64753a]"
                />
                <span className="text-xs leading-relaxed text-[#0f2942]/65">
                  Yes, Good Dog Days may text me about service availability. Message and data rates may apply.
                </span>
              </label>

              <button
                type="submit"
                disabled={state === "submitting"}
                className="mt-5 flex min-h-13 w-full items-center justify-center rounded-xl bg-[#0f2942] px-5 text-xs font-black uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:bg-[#173b5d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f2c230]/50 disabled:cursor-wait disabled:translate-y-0 disabled:opacity-65"
              >
                {state === "submitting" ? "Saving your place…" : "Text me priority availability"}
              </button>
              <div className="mt-3 min-h-5" aria-live="polite">
                {error ? <p role="alert" className="text-sm text-[#a13f27]">{error}</p> : null}
              </div>
            </form>
          </>
        )}
      </m.section>
    </m.div>
  );
}
