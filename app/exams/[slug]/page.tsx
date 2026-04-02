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
      <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">
          {exam.provider} {exam.level}
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">{exam.title}</h1>
        <p className="mt-4 max-w-3xl text-slate-300">{exam.description}</p>

        <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
          <span className="rounded-full border border-white/10 px-3 py-1">
            {exam.category}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            {exam.durationMinutes} min
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            {questions.length} sample questions
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/register"
            className="rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-3 text-sm font-semibold text-slate-950"
          >
            Log in for full practice
          </Link>
          <Link
            href={`/practice?exam=${exam.slug}`}
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white"
          >
            Practice now
          </Link>
        </div>
      </div>

      <div className="mt-10 space-y-6">
        {questions.map((question, index) => (
          <section
            key={`${question.prompt}-${index}`}
            className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-8"
          >
            <p className="text-sm text-amber-200">Preview question {index + 1}</p>
            <h2 className="mt-2 text-2xl font-medium text-white">{question.prompt}</h2>
            {question.options.length > 0 ? (
              <ul className="mt-5 space-y-3 text-slate-300">
                {question.options.map((option) => (
                  <li key={option} className="rounded-2xl border border-white/10 px-4 py-3">
                    {option}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-slate-300">
                This is an open response question for speaking or writing practice.
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
