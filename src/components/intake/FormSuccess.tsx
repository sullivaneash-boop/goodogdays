type FormSuccessProps = {
  petName: string;
  ownerName: string;
  contactMethod: "text" | "call";
};

export function FormSuccess({ petName, ownerName, contactMethod }: FormSuccessProps) {
  return (
    <section
      className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-[#8fa768]/45 bg-[#8fa768]/10 p-7 sm:p-12"
      aria-labelledby="profile-success-title"
      role="status"
    >
      <div className="absolute -right-16 -top-16 size-52 rounded-full border border-[#8fa768]/20" />
      <div className="absolute -right-8 -top-8 size-32 rounded-full border border-[#f2c230]/20" />
      <div className="relative flex min-h-[28rem] flex-col justify-center">
        <span className="mb-8 grid size-16 place-items-center rounded-full bg-[#8fa768] text-2xl font-black text-[#0f2942] shadow-[0_16px_50px_rgba(143,167,104,0.25)]">
          ✓
        </span>
        <p className="text-xs font-black uppercase tracking-[0.15em] text-[#c9dda2]">
          Profile received
        </p>
        <h3
          id="profile-success-title"
          className="mt-3 max-w-xl font-[var(--display)] text-5xl font-extrabold uppercase leading-[0.88] tracking-[-0.06em] text-white sm:text-7xl"
        >
          {petName} is on our radar.
        </h3>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65">
          Thanks, {ownerName}. Your tailored profile made it through. We’ll review the details and {contactMethod === "text" ? "text" : "call"} you about fit and availability.
        </p>
        <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.1em] text-white/45">
          <span className="h-px w-10 bg-[#f2c230]" /> No booking commitment yet
        </div>
      </div>
    </section>
  );
}
