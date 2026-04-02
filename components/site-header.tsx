import Link from "next/link";

import { getSession } from "@/lib/auth";
import { HeaderAnnouncement } from "@/components/header-announcement";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { getTranslations, languageOptions } from "@/lib/i18n";

export async function SiteHeader() {
  const session = await getSession();
  const { locale, messages } = await getTranslations();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[color:var(--panel)] backdrop-blur-xl">
      <HeaderAnnouncement text={messages.announcement} />

      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="hidden items-start justify-between gap-3 md:items-center md:flex">
          <Link href="/" className="min-w-0 flex-1">
            <Logo tagline={messages.logoTagline} />
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-[color:var(--ink-soft)] md:flex">
            <Link href="/exams" className="transition hover:text-[color:var(--foreground)]">
              {messages.nav.exams}
            </Link>
            <Link href="/practice" className="transition hover:text-[color:var(--foreground)]">
              {messages.nav.practice}
            </Link>
            <Link href="/upload" className="transition hover:text-[color:var(--foreground)]">
              {messages.nav.upload}
            </Link>
            <Link href="/support" className="transition hover:text-[color:var(--foreground)]">
              {messages.nav.support}
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher
              currentLocale={locale}
              label={messages.nav.language}
              options={languageOptions}
            />
            <ThemeToggle />
            {session ? (
              <>
                <span className="hidden text-sm text-[color:var(--ink-soft)] lg:inline">
                  {session.name}
                </span>
                <form action="/api/auth/logout" method="post">
                  <button className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]">
                    {messages.nav.logout}
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
                >
                  {messages.nav.login}
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
                >
                  {messages.nav.join}
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 md:hidden">
          <Link href="/" className="shrink-0">
            <Logo tagline={messages.logoTagline} />
          </Link>

          <div className="flex items-center gap-2">
            <LanguageSwitcher
              compact
              currentLocale={locale}
              label={messages.nav.language}
              options={languageOptions}
            />
            <ThemeToggle />

            {session ? (
              <form action="/api/auth/logout" method="post">
                <button className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]">
                  {messages.nav.logout}
                </button>
              </form>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-[var(--line)] px-3 py-2 text-sm font-medium text-[color:var(--foreground)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
                >
                  {messages.nav.login}
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-3 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
                >
                  {messages.nav.join}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
