import Link from "next/link";
import { ArrowLeft, PenTool } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { getQuizzesByType } from "@/data/index";

export default function SprachT2Page() {
  const quizList = getQuizzesByType('sprachbausteine-t2', 'B1');
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[color:var(--ink-soft)] hover:text-[color:var(--foreground)] transition mb-8">
          <ArrowLeft className="h-4 w-4" /> Zurück zur Übersicht
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <PenTool className="h-8 w-8 text-[color:var(--accent)]" />
          <div>
            <h1 className="text-3xl font-bold text-[color:var(--foreground)] font-serif">Sprachbausteine Teil 2</h1>
            <p className="mt-1 text-[color:var(--ink-soft)]">Wortbank — Wählen Sie das richtige Wort aus der Wortbank.</p>
          </div>
        </div>
        <div className="editorial-card rounded-[2rem] p-8 text-center">
          <p className="text-[color:var(--ink-soft)]">Diese Sektion wird gerade aufgebaut.</p>
        </div>
      </main>
    </div>
  );
}
