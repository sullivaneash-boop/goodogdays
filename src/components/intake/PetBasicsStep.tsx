"use client";

import { Controller, useFormContext } from "react-hook-form";
import { inquiryServiceOptions } from "@/data/services";
import type { PetProfileFormValues } from "@/lib/intake/schema";

export function ServiceNeedStep() {
  const { control } = useFormContext<PetProfileFormValues>();

  return (
    <div className="space-y-6">
      <header>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#f2c230]">
          Start here
        </p>
        <h3 className="font-[var(--display)] text-4xl font-extrabold leading-[0.95] tracking-[-0.045em] text-white sm:text-5xl">
          What can we help with?
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
          Pick one. If you’re not sure, tell us about your dog and we’ll help figure it out.
        </p>
      </header>

      <Controller
        control={control}
        name="serviceNeed"
        render={({ field, fieldState }) => (
          <fieldset>
            <legend className="sr-only">Choose what Good Dog Days can help with</legend>
            <div className="grid gap-2">
              {inquiryServiceOptions.map((option) => {
                const selected = field.value === option.id;
                return (
                  <label key={option.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name={field.name}
                      value={option.id}
                      checked={selected}
                      onChange={() => field.onChange(option.id)}
                      onBlur={field.onBlur}
                      className="peer sr-only"
                    />
                    <span
                      className={`flex min-h-16 items-center gap-3 rounded-2xl border px-4 py-3 transition duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-[#f2c230]/25 ${
                        selected
                          ? "border-[#8fa768] bg-[#8fa768]/13 text-white"
                          : "border-white/15 bg-white/[0.04] text-white/65 hover:border-white/35 hover:bg-white/[0.07]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`grid size-7 shrink-0 place-items-center rounded-full border text-xs font-black ${
                          selected
                            ? "border-[#8fa768] bg-[#8fa768] text-[#0f2942]"
                            : "border-white/25 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span>
                        <strong className="block text-sm text-white">{option.name}</strong>
                        <small className="mt-0.5 block text-xs leading-snug text-white/45">
                          {option.description}
                        </small>
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
            {fieldState.error ? (
              <p role="alert" className="mt-3 text-sm text-[#ffc1b3]">
                {fieldState.error.message}
              </p>
            ) : null}
          </fieldset>
        )}
      />
    </div>
  );
}
