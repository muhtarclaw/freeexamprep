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
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
                Your dashboard
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Recent progress
              </h2>
              <div className="mt-5 space-y-3">
                {attempts.length > 0 ? (
                  attempts.map((attempt, index) => (
                    <div
                      key={`${attempt.createdAt}-${index}`}
                      className="rounded-2xl border border-white/10 px-4 py-3"
                    >
                      <p className="text-sm text-white">{attempt.score}% score</p>
                      <p className="text-xs text-slate-400">{attempt.createdAt}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-300">
                    No saved attempts yet. Finish one practice set to start.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
            Practice access
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            Practice is better with an account
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Visitors can view public exam questions, but login lets you save scores,
            compare results, and build a personal exam routine.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Create free account
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
