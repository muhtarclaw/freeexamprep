import Link from "next/link";
import { ArrowRight, FileText, HeartHandshake, ShieldCheck } from "lucide-react";

import { ExamCard } from "@/components/exam-card";
import { SectionTitle } from "@/components/section-title";
import { sampleExams } from "@/lib/sample-data";

export default function HomePage() {
  return (
    <div className="pb-24">
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-24">
          <div>
            <p className="inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">
              100% free TELC-style learning
            </p>
            <h1 className="mt-8 max-w-3xl font-[family-name:var(--font-space-grotesk)] text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Free exam practice for everyone, with no paywall and no subscription.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              ExamFlow lets everyone browse TELC-style questions for free. Logging
              in simply unlocks saved attempts and better progress tools. The core
              learning experience stays free for every student.
            </p>

            <div className="mt-8 max-w-2xl rounded-[1.75rem] border border-emerald-400/20 bg-emerald-400/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                Completely Free
              </p>
              <p className="mt-3 text-base font-medium leading-7 text-white">
                No subscription. No hidden upgrade. No locked question bank. The
                platform is completely free to use.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/exams"
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Start free practice
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-amber-300 hover:text-amber-200"
              >
                Create account
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ["Always free", "Open access to exam packs without payment or login"],
                ["Optional account", "Logged-in users save results, but practice stays free"],
                ["Community-powered", "Learners upload documents and supporters keep it free"]
              ].map(([title, copy]) => (
                <div key={title} className="mesh-panel rounded-[1.5rem] border border-white/10 p-5">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="mesh-panel rounded-[2.5rem] border border-white/10 p-6 shadow-2xl shadow-black/30">
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-200">
                    Weekly momentum
                  </p>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">
                    +18%
                  </span>
                </div>

                <div className="mt-8 space-y-4">
                  {[78, 65, 88, 72].map((value, index) => (
                    <div key={value} className="space-y-2">
                      <div className="flex justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                        <span>Set 0{index + 1}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-white/10">
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
                    icon: ShieldCheck,
                    title: "No paywall",
                    copy: "Visitors can open exam packs immediately for free."
                  },
                  {
                    icon: FileText,
                    title: "Document upload",
                    copy: "Students share notes and sample materials."
                  },
                  {
                    icon: HeartHandshake,
                    title: "Free by support",
                    copy: "Optional donations help us keep learning open for everyone."
                  }
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
                  >
                    <item.icon className="h-5 w-5 text-amber-300" />
                    <p className="mt-4 text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.copy}</p>
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
          title="Start with free TELC-style sets"
          description="Anyone can open the questions, read the format, and practice right away. Accounts only add progress tracking, not a paywall."
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
            title: "Upload useful documents",
            copy: "Students can send PDFs, notes, or worksheets that help us expand the library.",
            href: "/upload"
          },
          {
            title: "Keep it free",
            copy: "The website is free for learners, and optional support helps cover hosting and future content.",
            href: "/support"
          },
          {
            title: "Track your improvement",
            copy: "Login turns free practice into a progress system with stored results and personal dashboards.",
            href: "/practice"
          }
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="mesh-panel rounded-[2rem] border border-white/10 p-8 transition hover:-translate-y-1"
          >
            <p className="text-2xl font-semibold text-white">{item.title}</p>
            <p className="mt-4 text-slate-300">{item.copy}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
