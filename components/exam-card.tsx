import Link from "next/link";
import { ArrowRight, Clock3, LockKeyhole, Sparkles } from "lucide-react";

type ExamCardProps = {
  exam: {
    title: string;
    slug: string;
    provider: string;
    level: string;
    category: string;
    description: string;
    durationMinutes: number;
    questionCount: number;
    isPremium: boolean;
  };
};

export function ExamCard({ exam }: ExamCardProps) {
  return (
    <article className="editorial-card group relative overflow-hidden rounded-[2rem] p-6 transition hover:-translate-y-1">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand)]/70 to-transparent" />
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[rgba(207,95,63,0.14)] bg-[rgba(207,95,63,0.08)] px-3 py-1 text-xs font-medium text-[color:var(--brand)]">
            {exam.provider}
          </span>
          <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-medium text-[color:var(--foreground)]">
            {exam.level}
          </span>
        </div>
        {exam.isPremium ? (
          <span className="inline-flex items-center gap-2 text-xs text-[color:var(--brand)]">
            <LockKeyhole className="h-4 w-4" />
            Advanced set
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 text-xs text-[color:var(--accent)]">
            <Sparkles className="h-4 w-4" />
            Free access
          </span>
        )}
      </div>

      <h3 className="mt-5 text-2xl font-semibold text-[color:var(--foreground)]">
        {exam.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[color:var(--ink-soft)]">
        {exam.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-3 text-sm text-[color:var(--ink-soft)]">
        <span className="rounded-full border border-[var(--line)] px-3 py-1">
          {exam.category}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1">
          <Clock3 className="h-4 w-4 text-[color:var(--brand)]" />
          {exam.durationMinutes} min
        </span>
        <span className="rounded-full border border-[var(--line)] px-3 py-1">
          {exam.questionCount} questions
        </span>
      </div>

      <Link
        href={`/exams/${exam.slug}`}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:scale-[1.01] hover:shadow-lg hover:shadow-[color:var(--brand)]/15"
      >
        Open exam
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
