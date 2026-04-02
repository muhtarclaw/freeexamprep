import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  BookOpenText,
  Mic
} from "lucide-react";

import { ExamCard } from "@/components/exam-card";
import { SectionTitle } from "@/components/section-title";
import { sampleExams } from "@/lib/sample-data";

export default function HomePage() {
  return (
    <div className="paper-grid pb-24">
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-24">
          <div>
            <p className="inline-flex rounded-full border border-[rgba(47,108,99,0.14)] bg-[rgba(47,108,99,0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
              German exam practice for real life and real tests
            </p>
            <h1 className="mt-8 max-w-3xl text-5xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-6xl">
              Prepare for TELC, fide, Goethe, and more in one calm study space.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--ink-soft)]">
              FreeExamPrep gives learners a cleaner way to practice reading,
              listening, writing, and speaking across the exam formats they are
              actually studying for. Start with sample sets right away, then save
              progress when you want a personal routine.
            </p>

            <div className="editorial-card mt-8 max-w-2xl rounded-[1.9rem] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--brand)]">
                What you can practice
              </p>
              <p className="mt-3 text-base font-medium leading-7 text-[color:var(--foreground)]">
                Structured packs for reading, listening, speaking, and writing with
                levels from A2 to C1 and a style inspired by official exam families.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/exams"
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                Start free practice
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-[var(--line)] bg-white/60 px-6 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
              >
                Create account
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ["Exam families", "Practice TELC, fide, Goethe, and related German exam styles in one library."],
                ["Skill-based training", "Switch between reading, listening, writing, and speaking instead of only full mocks."],
                ["Optional account", "Create an account to save attempts and keep a visible study rhythm."]
              ].map(([title, copy]) => (
                <div key={title} className="editorial-card rounded-[1.5rem] p-5">
                  <p className="text-sm font-semibold text-[color:var(--foreground)]">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--ink-soft)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="editorial-card rounded-[2.8rem] p-6">
              <div className="rounded-[2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.66)] p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[color:var(--foreground)]">
                    This week&apos;s study mix
                  </p>
                  <span className="rounded-full bg-[rgba(47,108,99,0.08)] px-3 py-1 text-xs text-[color:var(--accent)]">
                    4 exam paths
                  </span>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    ["Reading", 78],
                    ["Listening", 65],
                    ["Speaking", 88],
                    ["Writing", 72]
                  ].map(([label, value]) => (
                    <div key={label} className="space-y-2">
                      <div className="flex justify-between text-xs uppercase tracking-[0.3em] text-[color:var(--ink-soft)]">
                        <span>{label}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-[rgba(28,36,49,0.08)]">
                        <div
                          className="h-3 rounded-full bg-[linear-gradient(90deg,var(--brand),var(--brand-2))]"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: BookOpenText,
                    title: "TELC",
                    copy: "Everyday communication tasks with level-based reading and listening drills."
                  },
                  {
                    icon: AudioLines,
                    title: "Goethe",
                    copy: "Sharper language and exam timing for structured listening and writing practice."
                  },
                  {
                    icon: Mic,
                    title: "fide",
                    copy: "Practical Swiss daily-life scenarios for spoken German and useful responses."
                  }
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-[var(--line)] bg-white/60 p-5"
                  >
                    <item.icon className="h-5 w-5 text-[color:var(--brand)]" />
                    <p className="mt-4 text-sm font-semibold text-[color:var(--foreground)]">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--ink-soft)]">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionTitle
          eyebrow="Featured Exams"
          title="Choose the exam style that matches your next goal"
          description="Browse exam packs by provider, skill, and level. The library starts with realistic sample sets so you can build confidence before the real test day."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {sampleExams.map((exam) => (
            <ExamCard key={exam.slug} exam={exam} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-3 lg:px-8">
        {[
          {
            title: "Collect better materials",
            copy: "Upload useful PDFs, notes, and worksheets so the library feels closer to the exams people really take.",
            href: "/upload"
          },
          {
            title: "Support free access",
            copy: "Optional support helps us keep practice open while expanding exam types and study tools.",
            href: "/support"
          },
          {
            title: "Build your routine",
            copy: "Use an account to track attempts, compare scores, and stay consistent from A2 through C1.",
            href: "/practice"
          }
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="editorial-card rounded-[2rem] p-8 transition hover:-translate-y-1"
          >
            <p className="text-2xl font-semibold text-[color:var(--foreground)]">{item.title}</p>
            <p className="mt-4 text-[color:var(--ink-soft)]">{item.copy}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
