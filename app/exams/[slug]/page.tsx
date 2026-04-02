import Link from "next/link";
import { notFound } from "next/navigation";

import { sampleExams, sampleQuestions } from "@/lib/sample-data";

type ExamDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ExamDetailPage({ params }: ExamDetailPageProps) {
  const { slug } = await params;
  const fallbackExam = sampleExams.find((item) => item.slug === slug);
  const fallbackQuestions = sampleQuestions.filter((item) => item.examSlug === slug);

  const exam = fallbackExam;
  const questions = fallbackQuestions;

  if (!exam) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <div className="editorial-card rounded-[2.5rem] p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--brand)]">
          {exam.provider} {exam.level}
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[color:var(--foreground)]">
          {exam.title}
        </h1>
        <p className="mt-4 max-w-3xl text-[color:var(--ink-soft)]">{exam.description}</p>

        <div className="mt-8 flex flex-wrap gap-3 text-sm text-[color:var(--ink-soft)]">
          <span className="rounded-full border border-[var(--line)] px-3 py-1">
            {exam.category}
          </span>
          <span className="rounded-full border border-[var(--line)] px-3 py-1">
            {exam.durationMinutes} min
          </span>
          <span className="rounded-full border border-[var(--line)] px-3 py-1">
            {questions.length} sample questions
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/register"
            className="rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-3 text-sm font-semibold text-white"
          >
            Log in for full practice
          </Link>
          <Link
            href={`/practice?exam=${exam.slug}`}
            className="rounded-full border border-[var(--line)] bg-white/60 px-5 py-3 text-sm font-semibold text-[color:var(--foreground)]"
          >
            Practice now
          </Link>
        </div>
      </div>

      <div className="mt-10 space-y-6">
        {questions.map((question, index) => (
          <section
            key={`${question.prompt}-${index}`}
            className="editorial-card rounded-[2rem] p-8"
          >
            <p className="text-sm text-[color:var(--brand)]">Preview question {index + 1}</p>
            <h2 className="mt-2 text-2xl font-medium text-[color:var(--foreground)]">
              {question.prompt}
            </h2>
            {question.options.length > 0 ? (
              <ul className="mt-5 space-y-3 text-[color:var(--ink-soft)]">
                {question.options.map((option) => (
                  <li
                    key={option}
                    className="rounded-2xl border border-[var(--line)] bg-white/65 px-4 py-3"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-[color:var(--ink-soft)]">
                This is an open response question for speaking or writing practice.
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
