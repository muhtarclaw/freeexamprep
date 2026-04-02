"use client";

import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";

import type { Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  label: string;
  options: Array<{ value: Locale; label: string }>;
  compact?: boolean;
};

export function LanguageSwitcher({
  currentLocale,
  label,
  options,
  compact = false
}: LanguageSwitcherProps) {
  const router = useRouter();

  function changeLocale(nextLocale: Locale) {
    document.cookie = `preferred-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <label
      className={`inline-flex items-center rounded-full border border-[var(--line)] bg-[color:var(--panel-strong)] text-sm text-[color:var(--foreground)] ${
        compact ? "gap-1 px-2.5 py-2" : "gap-2 px-3 py-2"
      }`}
    >
      <Globe className="h-4 w-4 text-[color:var(--brand)]" />
      <span className="sr-only">{label}</span>
      <select
        value={currentLocale}
        onChange={(event) => changeLocale(event.target.value as Locale)}
        aria-label={label}
        className={`bg-transparent text-sm font-medium text-[color:var(--foreground)] outline-none ${
          compact ? "max-w-12" : "max-w-24"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {compact ? option.value.toUpperCase() : option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
