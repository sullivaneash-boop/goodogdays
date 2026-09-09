import type { ServiceRecommendation } from "@/lib/intake/serviceMatcher";

type RecommendationCardProps = {
  petName: string;
  recommendation: ServiceRecommendation;
};

const accentClasses = {
  gold: "border-[#f2c230]/55 bg-[#f2c230]/10 text-[#f2c230]",
  sky: "border-[#8bb7d4]/55 bg-[#8bb7d4]/10 text-[#b8d8eb]",
  green: "border-[#8fa768]/55 bg-[#8fa768]/10 text-[#c9dda2]",
} as const;

export function RecommendationCard({
  petName,
  recommendation,
}: RecommendationCardProps) {
  return (
    <aside
      aria-label={`Recommended service for ${petName}`}
      className={`relative overflow-hidden rounded-2xl border p-5 ${accentClasses[recommendation.accent]}`}
    >
      <div className="absolute -right-5 -top-5 size-24 rounded-full border border-current opacity-10" />
      <p className="text-[0.65rem] font-black uppercase tracking-[0.14em] opacity-85">
        {recommendation.eyebrow}
      </p>
      <h4 className="mt-2 font-[var(--display)] text-2xl font-extrabold leading-tight tracking-[-0.035em] text-white sm:text-3xl">
        {recommendation.name}
      </h4>
      <p className="mt-3 text-sm leading-relaxed text-white/65">
        {recommendation.rationale}
      </p>
      <p className="mt-3 border-t border-current/20 pt-3 text-xs font-semibold leading-relaxed text-white/50">
        {recommendation.nextStep}
      </p>
    </aside>
  );
}
