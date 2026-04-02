import Link from "next/link";

import { getSession } from "@/lib/auth";
import { sampleExams, sampleQuestions } from "@/lib/sample-data";
import { PracticeClient } from "@/components/practice-client";
import { createClient } from "@/utils/supabase/server";

type PracticePageProps = {
  searchParams: Promise<{ exam?: string }>;
};

export default async function PracticePage({ searchParams }: PracticePageProps) {
  const session = await getSession();
  const { exam: examSlug } = await searchParams;

  const selectedExam =
    sampleExams.find((item) => item.slug === examSlug) || sampleExams[0];
  let questions = sampleQuestions
    .filter((item) => item.examSlug === selectedExam.slug)
    .map((question, index) => ({
      _id: `${selectedExam.slug}-${index}`,
      ...question
    }));
  let attempts: Array<{ score: number; createdAt: string }> = [];

  if (session) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("attempts")
        .select("score, created_at")
        .eq("user_id", session.userId)
        .order("created_at", { ascending: false })
        .limit(5);

      attempts =
        data?.map((row) => ({
          score: row.score as number,
          createdAt: new Date(String(row.created_at)).toLocaleDateString()
        })) || [];
    } catch {
      attempts = [];
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      {session ? (
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <PracticeClient
            examId={selectedExam.slug}
            title={selectedExam.title}
            questions={questions}
          />

          <aside className="space-y-6">
            <div className="editorial-card rounded-[2rem] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--brand)]">
                Your dashboard
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
                Recent progress
              </h2>
              <div className="mt-5 space-y-3">
                {attempts.length > 0 ? (
                  attempts.map((attempt, index) => (
                    <div
                      key={`${attempt.createdAt}-${index}`}
                      className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3"
                    >
                      <p className="text-sm text-[color:var(--foreground)]">
                        {attempt.score}% score
                      </p>
                      <p className="text-xs text-[color:var(--ink-soft)]">{attempt.createdAt}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[color:var(--ink-soft)]">
                    No saved attempts yet. Finish one practice set to start.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="editorial-card rounded-[2.5rem] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--brand)]">
            Practice access
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-[color:var(--foreground)]">
            Save your TELC, fide, and Goethe practice history
          </h1>
          <p className="mt-4 max-w-2xl text-[color:var(--ink-soft)]">
            You can browse the exam library without an account, but signing in lets
            you keep scores, compare attempts, and turn random study sessions into a
            real plan.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-3 text-sm font-semibold text-white"
            >
              Create free account
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-[var(--line)] bg-white/60 px-5 py-3 text-sm font-semibold text-[color:var(--foreground)]"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
