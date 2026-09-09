"use client";

import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FormField } from "@/components/intake/FormField";
import { SizeSelector } from "@/components/intake/SizeSelector";
import type { DogPersonality, PetProfileFormValues } from "@/lib/intake/schema";

const personalityOptions: readonly {
  value: DogPersonality;
  label: string;
  detail: string;
  icon: string;
}[] = [
  { value: "ready-to-move", label: "Always ready to move", detail: "Long walks, running and active play", icon: "↗" },
  { value: "professional-sniffer", label: "Professional sniffer", detail: "Happy taking their time and exploring everything", icon: "∞" },
  { value: "loves-to-play", label: "Loves to play", detail: "Fetch, tug and other games", icon: "✦" },
  { value: "likes-getting-out", label: "Likes getting out", detail: "New places, trails and exploring", icon: "△" },
  { value: "homebody", label: "Homebody", detail: "Happiest sticking to familiar places", icon: "⌂" },
  { value: "water-dog", label: "Water dog", detail: "If there’s water, they’re probably getting in it", icon: "≈" },
  { value: "takes-things-slower", label: "Takes things slower", detail: "Senior dogs or dogs who prefer an easier pace", icon: "♡" },
  { value: "wants-company", label: "Just wants some company", detail: "Attention and a little activity go a long way", icon: "•" },
];

export function DogDetailsStep() {
  const { control } = useFormContext<PetProfileFormValues>();
  const petName = useWatch({ control, name: "petName" }).trim() || "your dog";

  return (
    <div className="space-y-6">
      <header>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#f2c230]">
          Meet your dog
        </p>
        <h3 className="font-[var(--display)] text-4xl font-extrabold leading-[0.95] tracking-[-0.045em] text-white sm:text-5xl">
          What sounds like {petName}?
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
          Tell us a little about what they enjoy. Pick anything that fits.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField name="petName" label="Dog’s name" placeholder="Lylah" autoComplete="off" />
        <FormField name="age" label="Age or best guess" placeholder="3 years" autoComplete="off" />
      </div>
      <SizeSelector />

      <Controller
        control={control}
        name="personality"
        render={({ field, fieldState }) => (
          <fieldset>
            <legend className="mb-3 text-[0.7rem] font-black uppercase tracking-[0.12em] text-white/70">
              What they enjoy
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {personalityOptions.map((option) => {
                const selected = field.value.includes(option.value);

                function toggleOption() {
                  if (selected) {
                    field.onChange(field.value.filter((value) => value !== option.value));
                    return;
                  }
                  field.onChange([...field.value, option.value]);
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
            {fieldState.error ? (
              <p role="alert" className="mt-3 text-sm text-[#ffc1b3]">{fieldState.error.message}</p>
            ) : null}
          </fieldset>
        )}
      />

      <Controller
        control={control}
        name="dogContext"
        render={({ field, fieldState }) => (
          <label className="block">
            <span className="mb-2.5 block text-[0.7rem] font-black uppercase tracking-[0.12em] text-white/70">
              Anything we should know? <span className="normal-case tracking-normal text-white/40">Optional</span>
            </span>
            <textarea
              {...field}
              rows={3}
              placeholder="Nervous around dogs, nervous around people, medical considerations, escape artist, or anything else that helps us understand them."
              className="w-full rounded-2xl border border-white/20 bg-white/[0.055] px-4 py-3.5 text-base text-[#fffaf1] outline-none transition placeholder:text-white/30 focus:border-[#f2c230] focus:bg-white/[0.08] focus:ring-4 focus:ring-[#f2c230]/10"
            />
            {fieldState.error ? (
              <span role="alert" className="mt-2 block text-sm text-[#ffc1b3]">{fieldState.error.message}</span>
            ) : null}
          </label>
        )}
      />
    </div>
  );
}
