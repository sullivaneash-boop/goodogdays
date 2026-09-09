"use client";

import { useFormContext, useWatch } from "react-hook-form";
import type { PetProfileFormValues } from "@/lib/intake/schema";

type TextFieldName =
  | "petName"
  | "age"
  | "timing"
  | "ownerName"
  | "email"
  | "phone"
  | "zipCode";

type FormFieldProps = {
  name: TextFieldName;
  label: string;
  placeholder: string;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
  type?: "email" | "tel" | "text";
  hint?: string;
};

const neutralField =
  "border-white/20 bg-white/[0.055] hover:border-white/35";
const validField =
  "border-[#8fa768] bg-[#8fa768]/10 shadow-[0_0_0_1px_rgba(143,167,104,0.12)]";
const invalidField = "border-[#e88d72] bg-[#e88d72]/8";

export function FormField({
  name,
  label,
  placeholder,
  autoComplete,
  inputMode = "text",
  type = "text",
  hint,
}: FormFieldProps) {
  const {
    register,
    getFieldState,
    formState,
    control,
  } = useFormContext<PetProfileFormValues>();
  const value = useWatch({ control, name });
  const { error, isDirty, invalid } = getFieldState(name, formState);
  const isComplete = isDirty && !invalid && value.trim().length > 0;
  const stateClass = error ? invalidField : isComplete ? validField : neutralField;
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;

  return (
    <label className="group block">
      <span className="mb-2.5 flex items-center justify-between gap-3 text-[0.7rem] font-black uppercase tracking-[0.12em] text-white/70">
        {label}
        {isComplete ? (
          <span className="flex items-center gap-1.5 normal-case tracking-normal text-[#b8cc91]">
            <span aria-hidden="true">✓</span> Ready
          </span>
        ) : null}
      </span>
      <input
        {...register(name)}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={`min-h-14 w-full rounded-2xl border px-4 py-3.5 text-base text-[#fffaf1] outline-none transition duration-200 placeholder:text-white/30 focus:border-[#f2c230] focus:bg-white/[0.08] focus:ring-4 focus:ring-[#f2c230]/10 ${stateClass}`}
      />
      {error ? (
        <span id={errorId} role="alert" className="mt-2 block text-sm text-[#ffc1b3]">
          {error.message}
        </span>
      ) : hint ? (
        <span id={hintId} className="mt-2 block text-xs leading-relaxed text-white/45">
          {hint}
        </span>
      ) : null}
    </label>
  );
}
