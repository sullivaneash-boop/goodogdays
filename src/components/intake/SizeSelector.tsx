"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { PetProfileFormValues, PetSize } from "@/lib/intake/schema";

const sizeOptions: readonly {
  value: PetSize;
  label: string;
  guide: string;
  scale: number;
}[] = [
  { value: "small", label: "Small", guide: "Under 25 lb", scale: 0.68 },
  { value: "medium", label: "Medium", guide: "25–49 lb", scale: 0.82 },
  { value: "large", label: "Large", guide: "50–79 lb", scale: 0.94 },
  { value: "extra-large", label: "XL", guide: "80+ lb", scale: 1.06 },
];

function DogSizeIcon({ scale }: { scale: number }) {
  return (
    <svg viewBox="0 0 96 64" className="h-12 w-16" aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.5"
        style={{ transform: `scale(${scale})`, transformOrigin: "48px 52px" }}
      >
        <path d="M27 42c-1-14 6-24 20-24h17c9 0 16 6 17 15v9" />
        <path d="M31 40v16M72 40v16M55 40v16" />
        <path d="M27 27 16 19l2 16 9 5M78 24l8-7 4 10-8 7" />
        <path d="M17 20c-5 4-7 10-4 15" />
        <circle cx="83" cy="27" r="1.5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function SizeSelector() {
  const { control } = useFormContext<PetProfileFormValues>();

  return (
    <Controller
      control={control}
      name="size"
      render={({ field, fieldState }) => (
        <fieldset>
          <legend className="mb-3 text-[0.7rem] font-black uppercase tracking-[0.12em] text-white/70">
            Closest size
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {sizeOptions.map((option) => {
              const selected = field.value === option.value;

              return (
                <label key={option.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={selected}
                    onChange={() => field.onChange(option.value)}
                    onBlur={field.onBlur}
                    className="peer sr-only"
                  />
                  <span
                    className={`flex min-h-32 flex-col items-center justify-center rounded-2xl border px-2 py-4 text-center transition duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-[#f2c230]/30 ${
                      selected
                        ? "border-[#8fa768] bg-[#8fa768]/15 text-[#d7e7b6] shadow-[0_0_0_1px_rgba(143,167,104,0.1)]"
                        : "border-white/15 bg-white/[0.04] text-white/55 hover:border-white/35 hover:bg-white/[0.07]"
                    }`}
                  >
                    <DogSizeIcon scale={option.scale} />
                    <strong className="mt-1 text-sm text-white">{option.label}</strong>
                    <small className="mt-0.5 text-[0.68rem] text-white/45">{option.guide}</small>
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
  );
}
