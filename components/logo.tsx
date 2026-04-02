export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="soft-ring flex h-12 w-12 items-center justify-center overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-white">
        <img
          src="/icon.svg"
          alt="FreeExamPrep logo"
          className="h-full w-full"
        />
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">
          FreeExamPrep
        </p>
        <p className="text-xs text-[color:var(--ink-soft)]">
          TELC, fide, Goethe and more
        </p>
      </div>
    </div>
  );
}
