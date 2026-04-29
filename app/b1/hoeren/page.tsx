import Link from "next/link";
import { ArrowLeft, Headphones } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { getQuizzesByType } from "@/data/index";

export default function HoerenPage() {
  const quizList = getQuizzesByType('hoeren', 'B1');
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[color:var(--ink-soft)] hover:text-[color:var(--foreground)] transition mb-8">
          <ArrowLeft className="h-4 w-4" /> Zurück zur Übersicht
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <Headphones className="h-8 w-8 text-[color:var(--ink-soft)]" />
          <div>
            <h1 className="text-3xl font-bold text-[color:var(--foreground)] font-serif">Hören</h1>
            <p className="mt-1 text-[color:var(--ink-soft)]">Richtig oder Falsch? Markieren Sie die richtige Antwort.</p>
          </div>
        </div>
        <div className="editorial-card rounded-[2rem] p-2">
          {quizList.map((quiz, i) => (
            <Link key={quiz.id} href={`/quiz/hoeren/${quiz.id}`}
              className="flex items-center justify-between rounded-[1.5rem] px-6 py-5 transition hover:bg-[color:var(--surface-soft)] group">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--ink-soft)] text-sm font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-medium text-[color:var(--foreground)]">{quiz.title}</p>
                  <p className="text-sm text-[color:var(--ink-soft)]">
                    {(quiz as any).exercises?.reduce((sum: number, e: any) => sum + e.questions.length, 0) || 0} Aussagen
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-[color:var(--ink-soft)] group-hover:translate-x-1 transition">Quiz {quiz.id} →</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
