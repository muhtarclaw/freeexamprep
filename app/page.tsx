import Link from "next/link";
import { BookOpenText, Mic, PenTool, Headphones, FileText, ChevronRight } from "lucide-react";

import { quizzes } from "@/data/quizzes";

const sections = [
  {
    level: 'B1',
    title: 'Lesen Teil 1',
    subtitle: 'Texten Informationen zuordnen',
    icon: FileText,
    href: '/b1/lesen-teil-1',
    quizType: 'lesen-t1',
    color: 'var(--brand)',
    count: quizzes.filter(q => q.type === 'lesen-t1' && q.level === 'B1').length,
  },
  {
    level: 'B1',
    title: 'Lesen Teil 2',
    subtitle: 'Langer Text mit Fragen',
    icon: BookOpenText,
    href: '/b1/lesen-teil-2',
    quizType: 'lesen-t2',
    color: 'var(--brand)',
    count: quizzes.filter(q => q.type === 'lesen-t2' && q.level === 'B1').length,
  },
  {
    level: 'B1',
    title: 'Lesen Teil 3',
    subtitle: 'Anzeigen zu Situationen zuordnen',
    icon: BookOpenText,
    href: '/b1/lesen-teil-3',
    quizType: 'lesen-t3',
    color: 'var(--brand)',
    count: quizzes.filter(q => q.type === 'lesen-t3' && q.level === 'B1').length,
  },
  {
    level: 'B1',
    title: 'Sprachbausteine Teil 1',
    subtitle: 'Lückentexte',
    icon: PenTool,
    href: '/b1/sprachbausteine-teil-1',
    quizType: 'sprachbausteine-t1',
    color: 'var(--accent)',
    count: quizzes.filter(q => q.type === 'sprachbausteine-t1' && q.level === 'B1').length,
  },
  {
    level: 'B1',
    title: 'Sprachbausteine Teil 2',
    subtitle: 'Wortbank',
    icon: PenTool,
    href: '/b1/sprachbausteine-teil-2',
    quizType: 'sprachbausteine-t2',
    color: 'var(--accent)',
    count: quizzes.filter(q => q.type === 'sprachbausteine-t2' && q.level === 'B1').length,
  },
  {
    level: 'B1',
    title: 'Sprachbausteine Teil 3',
    subtitle: 'Wortbank',
    icon: PenTool,
    href: '/b1/sprachbausteine-teil-3',
    quizType: 'sprachbausteine-t3',
    color: 'var(--accent)',
    count: quizzes.filter(q => q.type === 'sprachbausteine-t3' && q.level === 'B1').length,
  },
  {
    level: 'B1',
    title: 'Hören',
    subtitle: 'Richtig oder Falsch',
    icon: Headphones,
    href: '/b1/hoeren',
    quizType: 'hoeren',
    color: '#6B7280',
    count: quizzes.filter(q => q.type === 'hoeren' && q.level === 'B1').length,
  },
  {
    level: 'B2',
    title: 'B2 Prüfungen',
    subtitle: 'Lesen, Sprachbausteine, Hören',
    icon: BookOpenText,
    href: '/b2',
    quizType: 'b2',
    color: '#8B5CF6',
    count: quizzes.filter(q => q.level === 'B2').length,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">

      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[color:var(--foreground)] font-serif">
            FreeExamPrep
          </h1>
          <p className="mt-4 text-xl text-[color:var(--ink-soft)]">
            TELC B1 & B2 Deutschprüfungen – Übungsmaterial
          </p>
          <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
            Alle Quizfragen basierend auf FreeExamPrep · 2026-04-28
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="editorial-card group rounded-[2rem] p-8 transition hover:-translate-y-1 hover:shadow-xl"
              style={{ borderTopColor: section.color, borderTopWidth: '3px' }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: section.color }}
                >
                  {section.level}
                </span>
                <section.icon
                  className="h-8 w-8 transition group-hover:scale-110"
                  style={{ color: section.color }}
                />
              </div>
              <h2 className="text-xl font-semibold text-[color:var(--foreground)]">
                {section.title}
              </h2>
              <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
                {section.subtitle}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-medium text-[color:var(--ink-soft)]">
                  {section.count} Quiz
                </span>
                <ChevronRight className="h-5 w-5 text-[color:var(--ink-soft)] group-hover:translate-x-1 transition" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 editorial-card rounded-[2rem] p-8 text-center">
          <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">
            Alle Quizze zeigen die richtige Antwort
          </h2>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            Wähle deine Antwort und sieh direkt nach, ob sie richtig ist. Kein Druck – das ist zum Lernen gedacht.
          </p>
        </div>
      </main>
    </div>
  );
}