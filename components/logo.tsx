type LogoProps = {
  tagline: string;
};

export function Logo({ tagline }: LogoProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="soft-ring relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(255,247,236,0.88))] shadow-[0_18px_42px_rgba(79,49,15,0.12)] sm:h-12 sm:w-12">
        <div className="pointer-events-none absolute inset-[1px] rounded-full border border-[color:color-mix(in_srgb,var(--brand)_10%,white)]" />
        <div className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[linear-gradient(145deg,#F7CF66,#F38A5D)] sm:h-10.5 sm:w-10.5">
        <img
          src="/exam-qualification.svg"
          alt="FreeExamPrep logo"
          className="relative h-[27px] w-[27px] object-contain object-center sm:h-[31px] sm:w-[31px]"
        />
        </div>
      </div>
      <div className="hidden min-w-0 sm:block">
        <p className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand)] sm:text-sm sm:tracking-[0.28em]">
          FreeExamPrep
        </p>
        <p className="line-clamp-2 text-xs leading-5 text-[color:var(--ink-soft)] sm:line-clamp-1">
          {tagline}
        </p>
      </div>
    </div>
  );
}
