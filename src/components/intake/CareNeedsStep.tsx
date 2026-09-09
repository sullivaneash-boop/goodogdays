"use client";

import { Controller, useFormContext, useWatch } from "react-hook-form";
import type { CareNeed, PetProfileFormValues } from "@/lib/intake/schema";

const careOptions: readonly {
  value: CareNeed;
  label: string;
  detail: string;
  icon: string;
}[] = [
  { value: "daily-movement", label: "More daily movement", detail: "Walks, play and a steady routine", icon: "↗" },
  { value: "leash-manners", label: "Better leash habits", detail: "Focused, calm repetitions", icon: "∞" },
  { value: "confidence-building", label: "Confidence building", detail: "Support in new environments", icon: "✦" },
  { value: "care-while-away", label: "Care while I’m away", detail: "Familiar routines at home", icon: "⌂" },
  { value: "big-adventures", label: "Bigger adventure days", detail: "Trails, water and exploration", icon: "△" },
  { value: "coat-care", label: "Coat maintenance", detail: "Brushing and grooming support", icon: "◇" },
  { value: "double-coated", label: "Double-coated / sheds", detail: "Extra coat and de-shed attention", icon: "≈" },
  { value: "senior-support", label: "Senior-friendly care", detail: "Comfort-led pace and enrichment", icon: "♡" },
];

export function CareNeedsStep() {
  const { control } = useFormContext<PetProfileFormValues>();
  const petName = useWatch({ control, name: "petName" }).trim() || "your dog";

  return (
    <div className="space-y-6">
      <header>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#f2c230]">
          Build the right day
        </p>
        <h3 className="font-[var(--display)] text-4xl font-extrabold leading-[0.95] tracking-[-0.045em] text-white sm:text-5xl">
          What are {petName}’s primary goals?
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
          Choose up to four. We’ll use them to recommend the strongest starting point.
        </p>
      </header>

      <Controller
        control={control}
        name="careNeeds"
        render={({ field, fieldState }) => (
          <fieldset>
            <legend className="sr-only">{petName}’s care priorities</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {careOptions.map((option) => {
                const selected = field.value.includes(option.value);

                function toggleOption() {
                  if (selected) {
                    field.onChange(field.value.filter((value) => value !== option.value));
                    return;
                  }
                  if (field.value.length < 4) field.onChange([...field.value, option.value]);
                }

                return (
                  <label key={option.value} className="cursor-pointer">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={selected}
                      onChange={toggleOption}
                      onBlur={field.onBlur}
                      className="peer sr-only"
                    />
                    <span
                      className={`flex min-h-20 items-center gap-3 rounded-2xl border p-3.5 transition duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-[#f2c230]/25 ${
                        selected
                          ? "border-[#8fa768] bg-[#8fa768]/13 text-white"
                          : "border-white/15 bg-white/[0.04] text-white/65 hover:border-white/35 hover:bg-white/[0.07]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`grid size-10 shrink-0 place-items-center rounded-xl border text-lg ${
                          selected
                            ? "border-[#8fa768] bg-[#8fa768] text-[#0f2942]"
                            : "border-white/15 bg-white/[0.03] text-[#f2c230]"
                        }`}
                      >
                        {selected ? "✓" : option.icon}
                      </span>
                      <span>
                        <strong className="block text-sm text-white">{option.label}</strong>
                        <small className="mt-0.5 block text-xs leading-snug text-white/45">
                          {option.detail}
                        </small>
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between gap-4">
              <p className={fieldState.error ? "text-sm text-[#ffc1b3]" : "text-xs text-white/40"}>
                {fieldState.error?.message ?? `${field.value.length} of 4 selected`}
              </p>
              {field.value.length === 4 ? (
                <span className="text-xs font-bold text-[#b8cc91]">Profile focused</span>
              ) : null}
            </div>
          </fieldset>
        )}
      />
    </div>
  );
}
