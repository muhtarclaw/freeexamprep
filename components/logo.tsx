export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] text-sm font-black text-slate-950 shadow-lg shadow-amber-500/30">
        EF
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300/80">
          ExamFlow
        </p>
        <p className="text-xs text-slate-400">Free TELC-ready practice for everyone</p>
      </div>
    </div>
  );
}
