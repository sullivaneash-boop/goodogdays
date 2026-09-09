"use client";

import Link from "next/link";
import { m } from "framer-motion";

type ScrollOfferCardProps = {
  title: string;
  body: string;
  href: string;
  onDismiss: () => void;
  onAccept: () => void;
};

export function ScrollOfferCard({
  title,
  body,
  href,
  onDismiss,
  onAccept,
}: ScrollOfferCardProps) {
  return (
    <m.aside
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 18, scale: 0.98 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Personalized service offer"
      className="fixed bottom-24 right-3 z-[65] w-[min(23rem,calc(100vw-1.5rem))] overflow-hidden rounded-3xl border border-[#0f2942]/15 bg-[#fffaf1] p-5 text-[#0f2942] shadow-[0_24px_80px_rgba(9,29,48,0.24)] sm:bottom-6 sm:right-6 sm:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[#f2c230]" />
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss offer"
        className="absolute right-3 top-3 grid size-9 place-items-center rounded-full text-lg text-[#0f2942]/45 transition hover:bg-[#0f2942]/5 hover:text-[#0f2942] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f2942]"
      >
        ×
      </button>
      <p className="mb-3 text-[0.65rem] font-black uppercase tracking-[0.15em] text-[#64753a]">
        A thoughtful next step
      </p>
      <h2 className="max-w-[15ch] font-[var(--display)] text-2xl font-extrabold normal-case leading-[1.02] tracking-[-0.04em]">
        {title}
      </h2>
      <p className="mt-3 pr-4 text-sm leading-relaxed text-[#0f2942]/65">{body}</p>
      <Link
        href={href}
        onClick={onAccept}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f2942] px-4 text-xs font-black uppercase tracking-[0.07em] text-white transition hover:-translate-y-0.5 hover:bg-[#173b5d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f2c230]/40"
      >
        Build a pet profile <span className="ml-2" aria-hidden="true">→</span>
      </Link>
    </m.aside>
  );
}
