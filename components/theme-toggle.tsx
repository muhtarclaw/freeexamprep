"use client";

import { useEffect, useRef, useState } from "react";
import { LaptopMinimal, Moon, Sun } from "lucide-react";

type ThemePreference = "system" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme-preference";

function getResolvedTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return preference;
}

function applyTheme(preference: ThemePreference) {
  const resolvedTheme = getResolvedTheme(preference);
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.style.colorScheme = resolvedTheme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemePreference>("system");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedTheme =
      (window.localStorage.getItem(STORAGE_KEY) as ThemePreference | null) ||
      "system";

    setTheme(savedTheme);
    applyTheme(savedTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const nextTheme =
        (window.localStorage.getItem(STORAGE_KEY) as ThemePreference | null) ||
        "system";

      if (nextTheme === "system") {
        applyTheme(nextTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!containerRef.current) {
        return;
      }

      const target = event.target;
      if (target instanceof Node && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  function handleThemeChange(nextTheme: ThemePreference) {
    setTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
    setIsOpen(false);
  }

  const themeOptions = [
    {
      value: "system" as const,
      label: "Use system theme",
      icon: LaptopMinimal
    },
    {
      value: "light" as const,
      label: "Use light theme",
      icon: Sun
    },
    {
      value: "dark" as const,
      label: "Use dark theme",
      icon: Moon
    }
  ];

  const activeOption =
    themeOptions.find((option) => option.value === theme) || themeOptions[0];

  return (
    <div
      ref={containerRef}
      className="group inline-flex items-center overflow-hidden rounded-full border border-[var(--line)] bg-[color:var(--panel-strong)]"
      aria-label="Theme selector"
      role="group"
    >
      {themeOptions.map((option) => {
        const isActive = option.value === activeOption.value;
        const shouldReveal = !isActive && isOpen;

        return (
          <button
            key={option.value}
            type="button"
            aria-label={option.label}
            aria-pressed={isActive}
            title={option.label}
            onClick={() =>
              isActive ? setIsOpen((current) => !current) : handleThemeChange(option.value)
            }
            className={`overflow-hidden rounded-full transition-all duration-200 focus-visible:outline-none ${
              isActive
                ? "w-8 bg-[color:var(--foreground)] p-2 text-[color:var(--panel-strong)]"
                : `${shouldReveal ? "ml-1 w-8 p-2 opacity-100" : "pointer-events-none w-0 p-0 opacity-0"} text-[color:var(--ink-soft)] group-hover:pointer-events-auto group-hover:ml-1 group-hover:w-8 group-hover:p-2 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:ml-1 group-focus-within:w-8 group-focus-within:p-2 group-focus-within:opacity-100 hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)] focus-visible:bg-[color:var(--accent-soft)] focus-visible:text-[color:var(--foreground)]`
            }`}
          >
            <option.icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
