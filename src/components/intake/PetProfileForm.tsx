"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  MotionConfig,
  type Variants,
} from "framer-motion";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { CareNeedsStep } from "@/components/intake/CareNeedsStep";
import { FormSuccess } from "@/components/intake/FormSuccess";
import { OwnerContactStep } from "@/components/intake/OwnerContactStep";
import { PetBasicsStep } from "@/components/intake/PetBasicsStep";
import { StepProgress } from "@/components/intake/StepProgress";
import { serviceInterestOptions } from "@/data/services";
import { submitToFormspree } from "@/lib/formspree";
import {
  petProfileDefaults,
  petProfileSchema,
  stepFields,
  type PetProfileFormValues,
} from "@/lib/intake/schema";
import { matchService } from "@/lib/intake/serviceMatcher";
import { trackEvent } from "@/lib/analytics";

const stepVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 36 : -36,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -28 : 28,
  }),
};

type SubmissionSuccess = Pick<
  PetProfileFormValues,
  "petName" | "ownerName" | "contactMethod"
>;

function getAttribution() {
  const query = new URLSearchParams(window.location.search);
  return {
    landingPage: window.location.href,
    referrer: document.referrer,
    utmSource: query.get("utm_source") ?? "",
    utmMedium: query.get("utm_medium") ?? "",
    utmCampaign: query.get("utm_campaign") ?? "",
    utmContent: query.get("utm_content") ?? "",
    gclid: query.get("gclid") ?? "",
    submittedAt: new Date().toISOString(),
  };
}

export function PetProfileForm() {
  const searchParams = useSearchParams();
  const requestedServiceParam = searchParams.get("service");
  const requestedService = serviceInterestOptions.some(
    (service) => service.id === requestedServiceParam,
  )
    ? requestedServiceParam
    : null;
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState<SubmissionSuccess | null>(null);
  const hasStarted = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const requestController = useRef<AbortController | null>(null);
  const form = useForm<PetProfileFormValues>({
    resolver: zodResolver(petProfileSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: petProfileDefaults,
  });
  const petName = useWatch({ control: form.control, name: "petName" });
  const size = useWatch({ control: form.control, name: "size" });
  const careNeeds = useWatch({ control: form.control, name: "careNeeds" });
  const recommendation = useMemo(
    () => matchService({ size, careNeeds, requestedService }),
    [careNeeds, requestedService, size],
  );

  useEffect(() => {
    return () => requestController.current?.abort();
  }, []);

  useEffect(() => {
    if (currentStep === 0) return;
    panelRef.current?.focus({ preventScroll: true });
  }, [currentStep]);

  function trackStart() {
    if (hasStarted.current) return;
    hasStarted.current = true;
    trackEvent("inquiry_start", {
      selected_service: requestedService ?? "profile-matcher",
    });
  }

  async function moveForward() {
    const fields = [...stepFields[currentStep]];
    const isStepValid = await form.trigger(fields, { shouldFocus: true });
    if (!isStepValid) return;

    setDirection(1);
    setCurrentStep((step) => Math.min(step + 1, stepFields.length - 1));
  }

  function moveBack() {
    setDirection(-1);
    setServerError("");
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  async function submitProfile(values: PetProfileFormValues) {
    if (values.company) return;

    setServerError("");
    requestController.current?.abort();
    requestController.current = new AbortController();
    const finalRecommendation = matchService({
      size: values.size,
      careNeeds: values.careNeeds,
      requestedService,
    });

    try {
      await submitToFormspree(
        {
          subject: `New pet profile for ${values.petName}`,
          leadType: "Full pet profile",
          petName: values.petName,
          breed: values.breed,
          size: values.size,
          careNeeds: values.careNeeds,
          recommendedService: finalRecommendation.name,
          recommendationReason: finalRecommendation.rationale,
          requestedService: requestedService ?? "profile-matcher",
          ownerName: values.ownerName,
          name: values.ownerName,
          email: values.email,
          phone: values.phone,
          preferredContactMethod: values.contactMethod,
          message: `${values.ownerName} completed the pet profile for ${values.petName}. Recommended starting point: ${finalRecommendation.name}.`,
          ...getAttribution(),
        },
        requestController.current.signal,
      );

      trackEvent("inquiry_submit", {
        selected_service: finalRecommendation.name,
        pet_size: values.size,
      });
      setSuccess({
        petName: values.petName,
        ownerName: values.ownerName,
        contactMethod: values.contactMethod,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setServerError("That didn’t make it through. Please check your connection and try once more.");
    }
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    if (currentStep < stepFields.length - 1) {
      event.preventDefault();
      void moveForward();
      return;
    }

    void form.handleSubmit(submitProfile)(event);
  }

  return (
    <FormProvider {...form}>
      <LazyMotion features={domAnimation}>
        <MotionConfig reducedMotion="user">
          <AnimatePresence mode="wait">
          {success ? (
            <m.div
              key="success"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <FormSuccess {...success} />
            </m.div>
          ) : (
            <m.form
              key="profile-form"
              noValidate
              onSubmit={handleFormSubmit}
              onFocus={trackStart}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -14 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#102b45] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.28)] sm:p-8 lg:p-10"
            >
              <input
                {...form.register("company")}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px opacity-0"
              />

              <StepProgress currentStep={currentStep} />

              <div className="min-h-[37rem] sm:min-h-[35rem]">
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <m.div
                    key={currentStep}
                    ref={panelRef}
                    tabIndex={-1}
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="outline-none"
                  >
                    {currentStep === 0 ? <PetBasicsStep /> : null}
                    {currentStep === 1 ? <CareNeedsStep /> : null}
                    {currentStep === 2 ? (
                      <OwnerContactStep recommendation={recommendation} />
                    ) : null}
                  </m.div>
                </AnimatePresence>
              </div>

              <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={moveBack}
                    disabled={form.formState.isSubmitting}
                    className="min-h-12 rounded-xl px-5 text-sm font-bold text-white/55 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-wait disabled:opacity-40"
                  >
                    ← Back
                  </button>
                ) : (
                  <p className="px-1 text-xs leading-relaxed text-white/40">
                    About 90 seconds · no commitment
                  </p>
                )}

                {currentStep < stepFields.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => void moveForward()}
                    className="min-h-13 rounded-xl bg-[#f2c230] px-6 text-sm font-black uppercase tracking-[0.06em] text-[#0f2942] shadow-[0_12px_35px_rgba(242,194,48,0.18)] transition hover:-translate-y-0.5 hover:bg-[#ffe171] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f2c230]/30"
                  >
                    Continue <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="min-h-13 rounded-xl bg-[#f2c230] px-6 text-sm font-black uppercase tracking-[0.06em] text-[#0f2942] shadow-[0_12px_35px_rgba(242,194,48,0.18)] transition hover:-translate-y-0.5 hover:bg-[#ffe171] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f2c230]/30 disabled:cursor-wait disabled:translate-y-0 disabled:opacity-70"
                  >
                    {form.formState.isSubmitting
                      ? `Sending ${petName || "your dog"}’s profile…`
                      : "Send pet profile"}
                  </button>
                )}
              </div>

              <div aria-live="polite" className="mt-4 min-h-6">
                {form.formState.isSubmitting ? (
                  <p className="flex items-center gap-2 text-xs font-semibold text-[#c9dda2]">
                    <span className="size-2 animate-pulse rounded-full bg-[#8fa768]" />
                    Matching the final details and sending securely…
                  </p>
                ) : serverError ? (
                  <p role="alert" className="text-sm text-[#ffc1b3]">
                    {serverError}
                  </p>
                ) : currentStep === 2 ? (
                  <p className="text-xs leading-relaxed text-white/40">
                    By sending, you agree that Good Dog Days may contact you about this request. See the <a href="/privacy" className="underline underline-offset-4 hover:text-white">privacy policy</a>.
                  </p>
                ) : null}
              </div>
            </m.form>
          )}
          </AnimatePresence>
        </MotionConfig>
      </LazyMotion>
    </FormProvider>
  );
}
