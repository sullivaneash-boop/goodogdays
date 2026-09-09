"use client";

import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FormField } from "@/components/intake/FormField";
import { RecommendationCard } from "@/components/intake/RecommendationCard";
import type { PetProfileFormValues } from "@/lib/intake/schema";
import type { ServiceRecommendation } from "@/lib/intake/serviceMatcher";

type OwnerContactStepProps = {
  recommendation: ServiceRecommendation;
};

export function OwnerContactStep({ recommendation }: OwnerContactStepProps) {
  const { control } = useFormContext<PetProfileFormValues>();
  const petName = useWatch({ control, name: "petName" }).trim() || "your dog";

  return (
    <div className="space-y-6">
      <header>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#f2c230]">
          Your tailored starting point
        </p>
        <h3 className="font-[var(--display)] text-4xl font-extrabold leading-[0.95] tracking-[-0.045em] text-white sm:text-5xl">
          Meet {petName}’s match.
        </h3>
      </header>

      <RecommendationCard petName={petName} recommendation={recommendation} />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          name="ownerName"
          label="Your name"
          placeholder="Your name"
          autoComplete="name"
        />
        <FormField
          name="email"
          label="Email"
          placeholder="you@example.com"
          type="email"
          inputMode="email"
          autoComplete="email"
        />
        <FormField
          name="phone"
          label="Mobile number"
          placeholder="(770) 555-0123"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          hint="Used only to respond about this request."
        />

        <Controller
          control={control}
          name="contactMethod"
          render={({ field, fieldState }) => (
            <fieldset>
              <legend className="mb-2.5 text-[0.7rem] font-black uppercase tracking-[0.12em] text-white/70">
                Best way to connect
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {(["text", "call"] as const).map((method) => {
                  const selected = field.value === method;
                  return (
                    <label key={method} className="cursor-pointer">
                      <input
                        type="radio"
                        name={field.name}
                        value={method}
                        checked={selected}
                        onChange={() => field.onChange(method)}
                        onBlur={field.onBlur}
                        className="peer sr-only"
                      />
                      <span
                        className={`flex min-h-14 items-center justify-center rounded-2xl border px-3 text-sm font-bold capitalize transition peer-focus-visible:ring-4 peer-focus-visible:ring-[#f2c230]/25 ${
                          selected
                            ? "border-[#8fa768] bg-[#8fa768]/15 text-[#d7e7b6]"
                            : "border-white/20 bg-white/[0.055] text-white/55 hover:border-white/35"
                        }`}
                      >
                        {method === "text" ? "Text me" : "Call me"}
                      </span>
                    </label>
                  );
                })}
              </div>
              {fieldState.error ? (
                <p role="alert" className="mt-2 text-sm text-[#ffc1b3]">
                  {fieldState.error.message}
                </p>
              ) : null}
            </fieldset>
          )}
        />
      </div>
    </div>
  );
}
