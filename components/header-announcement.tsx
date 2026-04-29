"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, HeartHandshake } from "lucide-react";

type HeaderAnnouncementProps = {
  text: string;
  ctaLabel: string;
};

export function HeaderAnnouncement({ text, ctaLabel }: HeaderAnnouncementProps) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsHidden(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`border-b border-[var(--line)] bg-[linear-gradient(90deg,color-mix(in_srgb,var(--brand)_10%,transparent),color-mix(in_srgb,var(--accent)_10%,transparent),color-mix(in_srgb,var(--brand-2)_10%,transparent))] transition-all duration-300 ${
        isHidden ? "max-h-0 overflow-hidden border-b-0 opacity-0" : "max-h-20 opacity-100 md:max-h-24"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[color:var(--surface-muted)] text-[color:var(--brand)] shadow-sm backdrop-blur">
            <HeartHandshake className="h-4 w-4" />
          </div>

          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-2.5">
          <span className="hidden shrink-0 items-center rounded-full border border-[color:var(--brand)]/30 bg-[color:var(--brand)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--brand)] backdrop-blur md:inline-flex">
            Support Free Learning
          </span>
          <p className="hidden min-w-0 text-sm font-medium leading-6 text-[color:var(--foreground)] md:block">
            {text}
          </p>
          </div>
        </div>

        <Link
          href="/support"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[var(--brand)]/40 bg-[color:var(--brand)]/15 px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] backdrop-blur transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
