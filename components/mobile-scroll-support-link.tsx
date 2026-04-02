"use client";

import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { useEffect, useState } from "react";

type MobileScrollSupportLinkProps = {
  label: string;
};

export function MobileScrollSupportLink({ label }: MobileScrollSupportLinkProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Link
      href="/support"
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--brand)_30%,transparent)] bg-white/75 p-2.5 text-[color:var(--foreground)] backdrop-blur transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
    >
      <HeartHandshake className="h-4 w-4 text-[color:var(--brand)]" />
    </Link>
  );
}
