"use client";

import { FormField } from "@/components/intake/FormField";
import { SizeSelector } from "@/components/intake/SizeSelector";

export function PetBasicsStep() {
  return (
    <div className="space-y-6">
      <header>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#f2c230]">
          First, the important one
        </p>
        <h3 className="font-[var(--display)] text-4xl font-extrabold leading-[0.95] tracking-[-0.045em] text-white sm:text-5xl">
          Who are we planning for?
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
          A few basics help us shape the rest of the questions around your dog.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          name="petName"
          label="Dog’s name"
          placeholder="Lylah"
          autoComplete="off"
        />
        <FormField
          name="breed"
          label="Breed or mix"
          placeholder="Lab mix / unsure"
          autoComplete="off"
        />
      </div>
      <SizeSelector />
    </div>
  );
}
