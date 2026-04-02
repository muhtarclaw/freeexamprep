type LogoProps = {
  tagline: string;
};

export function Logo({ tagline }: LogoProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="soft-ring flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-white sm:h-12 sm:w-12">
        <img
          src="/icon.svg"
          alt="FreeExamPrep logo"
          className="h-9 w-9 object-contain object-center sm:h-10 sm:w-10"
        />
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
