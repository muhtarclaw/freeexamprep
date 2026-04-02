export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl shadow-lg shadow-amber-500/30">
        <img
          src="/icon.svg"
          alt="FreeExamPrep logo"
          className="h-full w-full"
        />
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300/80">
          FreeExamPrep
        </p>
        <p className="text-xs text-slate-400">Free exam prep for everyone</p>
      </div>
    </div>
  );
}
