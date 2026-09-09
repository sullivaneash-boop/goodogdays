type StepProgressProps = {
  currentStep: number;
};

const steps = ["Pet basics", "Care priorities", "Your details"] as const;

export function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <nav aria-label="Pet profile progress" className="mb-8 sm:mb-10">
      <ol className="grid grid-cols-3 gap-2">
        {steps.map((label, index) => {
          const isCurrent = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <li key={label} aria-current={isCurrent ? "step" : undefined}>
              <div
                className={`h-1 rounded-full transition-colors duration-300 ${
                  isCurrent || isComplete ? "bg-[#f2c230]" : "bg-white/15"
                }`}
              />
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`grid size-6 shrink-0 place-items-center rounded-full border text-[0.62rem] font-black ${
                    isComplete
                      ? "border-[#8fa768] bg-[#8fa768] text-[#0f2942]"
                      : isCurrent
                        ? "border-[#f2c230] text-[#f2c230]"
                        : "border-white/20 text-white/35"
                  }`}
                >
                  {isComplete ? "✓" : index + 1}
                </span>
                <span
                  className={`hidden text-[0.65rem] font-bold uppercase tracking-[0.08em] sm:block ${
                    isCurrent ? "text-white" : "text-white/40"
                  }`}
                >
                  {label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="sr-only" aria-live="polite">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
      </p>
    </nav>
  );
}
