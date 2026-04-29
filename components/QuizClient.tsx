"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Quiz, LesenT1Quiz, LesenT2Quiz, LesenT3Quiz, SprachbausteineT1Quiz, SprachbausteineT2Quiz, HoerenQuiz } from "@/data/types";

type Props = { quiz: Quiz };

export default function QuizPage({ quiz }: Props) {
  const typeLabels: Record<string, string> = {
    "lesen-t1": "Lesen Teil 1",
    "lesen-t2": "Lesen Teil 2",
    "lesen-t3": "Lesen Teil 3",
    "sprachbausteine-t1": "Sprachbausteine Teil 1",
    "sprachbausteine-t2": "Sprachbausteine Teil 2",
    "sprachbausteine-t3": "Sprachbausteine Teil 3",
    "hoeren": "Hören",
  };

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[color:var(--ink-soft)] hover:text-[color:var(--foreground)] transition mb-6">
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-full bg-[color:var(--brand)] px-3 py-1 text-xs font-bold text-white">
              {quiz.level}
            </span>
            <span className="text-xs text-[color:var(--ink-soft)]">
              {typeLabels[quiz.type] || quiz.type}
            </span>
            <span className="text-xs text-[color:var(--ink-soft)]">· Quiz {quiz.id}</span>
          </div>
          <h1 className="text-3xl font-bold text-[color:var(--foreground)] font-serif">
            {quiz.title}
          </h1>
          {quiz.subtitle && (
            <p className="mt-1 text-[color:var(--ink-soft)]">{quiz.subtitle}</p>
          )}
        </div>

        <QuizBody quiz={quiz} />
      </main>
    </div>
  );
}

// ---- Quiz Body ----
function QuizBody({ quiz }: Props) {

  // ---- Lesen T1 ----
  if (quiz.type === "lesen-t1") {
    return <LesenT1Body quiz={quiz as LesenT1Quiz} />;
  }

  // ---- Lesen T2 ----
  if (quiz.type === "lesen-t2") {
    return <LesenT2Body quiz={quiz as LesenT2Quiz} />;
  }

  // ---- Lesen T3 ----
  if (quiz.type === "lesen-t3") {
    return <LesenT3Body quiz={quiz as LesenT3Quiz} />;
  }

  // ---- Sprachbausteine T1 ----
  if (quiz.type === "sprachbausteine-t1") {
    return <SprachT1Body quiz={quiz as SprachbausteineT1Quiz} />;
  }

  // ---- Sprachbausteine T2/3 ----
  if (quiz.type === "sprachbausteine-t2" || quiz.type === "sprachbausteine-t3") {
    return <SprachT2Body quiz={quiz as SprachbausteineT2Quiz} />;
  }

  // ---- Hören ----
  if (quiz.type === "hoeren") {
    return <HoerenBody quiz={quiz as HoerenQuiz} />;
  }

  return <p className="text-[color:var(--ink-soft)]">Quiz-Typ wird nicht unterstützt.</p>;
}

// ---- Lesen T1 ----
function LesenT1Body({ quiz }: { quiz: LesenT1Quiz }) {
  const [selected, setSelected] = useState<number[]>(Array(quiz.sections.length).fill(-1));
  const [revealed, setRevealed] = useState(false);
  const loggedRef = useRef(false);

  useEffect(() => {
    if (!revealed || loggedRef.current) return;
    loggedRef.current = true;
    const correct = selected.filter((s, i) => s === quiz.correctAnswers[i]).length;
    fetch("/api/quiz/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizType: quiz.type, quizId: String(quiz.id), correctCount: correct, totalCount: quiz.sections.length }),
    }).catch(() => {});
  }, [revealed]);

  return (
    <div className="space-y-6">
      <p className="text-sm font-medium text-[color:var(--ink-soft)]">Ordnen Sie jeden Textausschnitt einer der zehn Antworten zu.</p>
      {quiz.sections.map((section, si) => (
        <div key={si} className="editorial-card rounded-[1.5rem] p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--brand)] mb-3">Text {si + 1}</p>
          <p className="text-sm leading-relaxed text-[color:var(--foreground)] whitespace-pre-wrap">{section.text}</p>
          <div className="mt-4 space-y-2">
            {quiz.options.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => {
                  const next = [...selected];
                  next[si] = oi;
                  setSelected(next);
                }}
                className={`w-full text-left rounded-xl px-4 py-3 text-sm border transition ${
                  selected[si] === oi
                    ? revealed
                      ? oi === quiz.correctAnswers[si]
                        ? "border-[color:var(--status-success)] bg-[color:var(--option-correct-bg)] text-[color:var(--status-success)]"
                        : "border-[color:var(--status-danger)] bg-[color:var(--option-wrong-bg)] text-[color:var(--status-danger)]"
                      : "border-[color:var(--brand)] bg-[color:var(--brand)]/15 text-[color:var(--brand)]"
                    : "border-[var(--line)] bg-[color:var(--option-bg)] hover:bg-[color:var(--option-hover)]"
                }`}
              >
                <span className="font-bold mr-2">{String.fromCharCode(97 + oi)}.</span>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="flex gap-4">
        <button
          onClick={() => setRevealed(true)}
          className="flex-1 rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] py-3 text-sm font-semibold text-white"
        >
          Antworten zeigen
        </button>
        <button
          onClick={() => { setSelected(Array(quiz.sections.length).fill(-1)); setRevealed(false); }}
          className="rounded-full border border-[var(--line)] px-6 py-3 text-sm font-medium"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// ---- Lesen T2 ----
function LesenT2Body({ quiz }: { quiz: LesenT2Quiz }) {
  const [selected, setSelected] = useState<number[]>(Array(quiz.questions.length).fill(-1));
  const [revealed, setRevealed] = useState(false);
  const loggedRef = useRef(false);

  useEffect(() => {
    if (!revealed || loggedRef.current) return;
    loggedRef.current = true;
    const correct = selected.filter((s, i) => s === quiz.correctAnswers[i]).length;
    fetch("/api/quiz/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizType: quiz.type, quizId: String(quiz.id), correctCount: correct, totalCount: quiz.questions.length }),
    }).catch(() => {});
  }, [revealed]);

  return (
    <div className="space-y-6">
      <div className="editorial-card rounded-[1.5rem] p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--brand)] mb-3">Text</p>
        <p className="text-sm leading-relaxed text-[color:var(--foreground)] whitespace-pre-wrap">{quiz.text}</p>
      </div>
      {quiz.questions.map((question, qi) => (
        <div key={qi} className="editorial-card rounded-[1.5rem] p-6">
          <p className="text-sm font-semibold text-[color:var(--foreground)] mb-4">
            {qi + 1}. {question.text}
          </p>
          <div className="space-y-2">
            {question.options.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => {
                  const next = [...selected];
                  next[qi] = oi;
                  setSelected(next);
                }}
                className={`w-full text-left rounded-xl px-4 py-3 text-sm border transition ${
                  selected[qi] === oi
                    ? revealed
                      ? oi === quiz.correctAnswers[qi]
                        ? "border-[color:var(--status-success)] bg-[color:var(--option-correct-bg)] text-[color:var(--status-success)]"
                        : "border-[color:var(--status-danger)] bg-[color:var(--option-wrong-bg)] text-[color:var(--status-danger)]"
                      : "border-[color:var(--brand)] bg-[color:var(--brand)]/15 text-[color:var(--brand)]"
                    : "border-[var(--line)] bg-[color:var(--option-bg)] hover:bg-[color:var(--option-hover)]"
                }`}
              >
                <span className="font-bold mr-2">{String.fromCharCode(97 + oi)}.</span>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="flex gap-4">
        <button onClick={() => setRevealed(true)}
          className="flex-1 rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] py-3 text-sm font-semibold text-white">
          Antworten zeigen
        </button>
        <button onClick={() => { setSelected(Array(quiz.questions.length).fill(-1)); setRevealed(false); }}
          className="rounded-full border border-[var(--line)] px-6 py-3 text-sm font-medium">
          Reset
        </button>
      </div>
    </div>
  );
}

// ---- Lesen T3 ----
function LesenT3Body({ quiz }: { quiz: LesenT3Quiz }) {
  const [selected, setSelected] = useState<Record<number, string>>({});

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--brand)] mb-3">Situationen</p>
          <div className="space-y-3">
            {quiz.situations.map((sit) => (
              <div key={sit.id} className="editorial-card rounded-[1.2rem] p-4">
                <p className="text-xs font-bold text-[color:var(--brand)] mb-1">Situation {sit.id}</p>
                <p className="text-sm text-[color:var(--foreground)]">{sit.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--accent)] mb-3">Anzeigen</p>
          <div className="space-y-3">
            {quiz.ads.map((ad) => (
              <button
                key={ad.id}
                className="w-full text-left editorial-card rounded-[1.2rem] p-4 border-2 border-transparent hover:border-[color:var(--accent)] transition cursor-pointer"
              >
                <p className="text-xs font-bold text-[color:var(--accent)] mb-1">Anzeige {ad.id}</p>
                <p className="text-sm text-[color:var(--foreground)] whitespace-pre-wrap">{ad.text}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="editorial-card rounded-[1.5rem] p-6">
        <p className="text-sm font-medium text-[color:var(--ink-soft)] mb-4">
          Klicken Sie auf eine Anzeige, um sie einer Situation zuzuordnen.
        </p>
      </div>
    </div>
  );
}

// ---- Sprachbausteine T1 ----
function SprachT1Body({ quiz }: { quiz: SprachbausteineT1Quiz }) {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState(false);

  function renderText() {
    let text = quiz.text;
    const blankRegex = /____\d*____|____|__(_\d+__)__/g;
    let blankNum = 0;
    return text.replace(/____\d*____|____/g, () => {
      blankNum++;
      const sel = selected[blankNum];
      const b = quiz.blanks.find(b => b.id === blankNum);
      if (!b) return `__${blankNum}__`;
      const correctOpt = b.options[b.correctAnswer];
      let display = `__${blankNum}__`;
      if (sel !== undefined && sel >= 0) {
        const chosen = b.options[sel];
        display = revealed
          ? chosen === correctOpt
            ? `✅ **${chosen}**`
            : `❌ **${chosen}** (richtig: ${correctOpt})`
          : `**${chosen}**`;
      }
      return `__[${display}]__`;
    });
  }

  return (
    <div className="space-y-6">
      <div className="editorial-card rounded-[1.5rem] p-6">
        <p className="text-sm font-medium text-[color:var(--ink-soft)] mb-4">
          Füllen Sie die Lücken mit dem richtigen Wort.
        </p>
        <p className="text-sm leading-relaxed text-[color:var(--foreground)] whitespace-pre-wrap">{renderText()}</p>
      </div>

      <div className="space-y-4">
        {quiz.blanks.map((blank) => {
          const sel = selected[blank.id];
          const revealed2 = revealed;
          return (
            <div key={blank.id} className="editorial-card rounded-[1.5rem] p-5">
              <p className="text-xs font-bold text-[color:var(--accent)] mb-3">Lücke {blank.id}</p>
              <div className="flex flex-wrap gap-2">
                {blank.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => setSelected(prev => ({ ...prev, [blank.id]: oi }))}
                    className={`rounded-full px-4 py-2 text-sm border font-medium transition ${
                      sel === oi
                        ? revealed2
                          ? opt === blank.options[blank.correctAnswer]
                            ? "border-[color:var(--status-success)] bg-[color:var(--option-correct-bg)] text-[color:var(--status-success)]"
                            : "border-[color:var(--status-danger)] bg-[color:var(--option-wrong-bg)] text-[color:var(--status-danger)]"
                          : "border-[color:var(--accent)] bg-[color:var(--accent)]/10 text-[color:var(--accent)]"
                        : "border-[var(--line)] bg-[color:var(--option-bg)] hover:bg-[color:var(--option-hover)] text-[color:var(--foreground)]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {revealed2 && sel !== undefined && (
                <p className="mt-2 text-sm">
                  {sel === blank.correctAnswer
                    ? <span className="text-[color:var(--status-success)]">✅ Richtig!</span>
                    : <span className="text-[color:var(--status-danger)]">❌ Richtig: <strong>{blank.options[blank.correctAnswer]}</strong></span>
                  }
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        <button onClick={() => setRevealed(true)}
          className="flex-1 rounded-full bg-[linear-gradient(135deg,var(--accent),#4a9a8a)] py-3 text-sm font-semibold text-white">
          Antworten zeigen
        </button>
        <button onClick={() => { setSelected({}); setRevealed(false); }}
          className="rounded-full border border-[var(--line)] px-6 py-3 text-sm font-medium">
          Reset
        </button>
      </div>
    </div>
  );
}

// ---- Sprachbausteine T2/3 ----
function SprachT2Body({ quiz }: { quiz: SprachbausteineT2Quiz }) {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState(false);
  const loggedRef = useRef(false);

  useEffect(() => {
    if (!revealed || loggedRef.current) return;
    loggedRef.current = true;
    const correct = Object.values(selected).filter((s, blankId) => {
      const blank = quiz.blanks.find(b => b.id === Number(blankId));
      return blank && s === blank.correctAnswer;
    }).length;
    fetch("/api/quiz/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizType: quiz.type, quizId: String(quiz.id), correctCount: correct, totalCount: quiz.blanks.length }),
    }).catch(() => {});
  }, [revealed]);

  return (
    <div className="space-y-6">
      <div className="editorial-card rounded-[1.5rem] p-6">
        <p className="text-sm font-medium text-[color:var(--ink-soft)] mb-4">
          Füllen Sie die Lücken mit den richtigen Wörtern aus der Wortbank.
        </p>
        <p className="text-sm leading-relaxed text-[color:var(--foreground)] whitespace-pre-wrap">{quiz.text}</p>
      </div>
      {quiz.blanks.length === 0 ? (
        <div className="editorial-card rounded-[1.5rem] p-6 text-center">
          <p className="text-[color:var(--ink-soft)]">Wortbank-Daten werden gerade aufbereitet.</p>
        </div>
      ) : (
        quiz.blanks.map((blank) => (
          <div key={blank.id} className="editorial-card rounded-[1.5rem] p-5">
            <p className="text-xs font-bold text-[color:var(--accent)] mb-3">Lücke {blank.id}</p>
            <div className="flex flex-wrap gap-2">
              {blank.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => setSelected(prev => ({ ...prev, [blank.id]: oi }))}
                  className={`rounded-full px-4 py-2 text-sm border font-medium transition ${
                    selected[blank.id] === oi
                      ? revealed
                        ? opt === blank.options[blank.correctAnswer]
                          ? "border-[color:var(--status-success)] bg-[color:var(--option-correct-bg)] text-[color:var(--status-success)]"
                          : "border-[color:var(--status-danger)] bg-[color:var(--option-wrong-bg)] text-[color:var(--status-danger)]"
                        : "border-[color:var(--accent)] bg-[color:var(--accent)]/10 text-[color:var(--accent)]"
                      : "border-[var(--line)] bg-[color:var(--option-bg)] hover:bg-[color:var(--option-hover)] text-[color:var(--foreground)]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
      <div className="flex gap-4">
        <button onClick={() => setRevealed(true)}
          className="flex-1 rounded-full bg-[linear-gradient(135deg,var(--accent),#4a9a8a)] py-3 text-sm font-semibold text-white">
          Antworten zeigen
        </button>
        <button onClick={() => { setSelected({}); setRevealed(false); }}
          className="rounded-full border border-[var(--line)] px-6 py-3 text-sm font-medium">
          Reset
        </button>
      </div>
    </div>
  );
}

// ---- Hören ----
function HoerenBody({ quiz }: { quiz: HoerenQuiz }) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-6">
      <p className="text-sm font-medium text-[color:var(--ink-soft)]">
        Hören Sie die Aussagen und markieren Sie Richtig oder Falsch.
      </p>
      {quiz.exercises.map((exercise, ei) => (
        <div key={ei} className="editorial-card rounded-[1.5rem] p-6">
          <p className="text-sm font-bold text-[color:var(--ink-soft)] mb-4">{exercise.title}</p>
          <div className="space-y-3">
            {exercise.questions.map((q2) => (
              <div key={q2.id} className="flex items-start gap-3">
                <span className="text-xs font-bold text-[color:var(--brand)] mt-0.5 shrink-0">{q2.id}</span>
                <p className="flex-1 text-sm text-[color:var(--foreground)]">{q2.statement}</p>
                <div className="flex gap-2 shrink-0">
                  {([true, false] as const).map(val => (
                    <button
                      key={String(val)}
                      onClick={() => setAnswers(prev => ({ ...prev, [`${ei}-${q2.id}`]: val }))}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition ${
                        answers[`${ei}-${q2.id}`] === val
                          ? val === q2.correct
                            ? "border-[color:var(--status-success)] bg-[color:var(--option-correct-bg)] text-[color:var(--status-success)]"
                            : "border-[color:var(--status-danger)] bg-[color:var(--option-wrong-bg)] text-[color:var(--status-danger)]"
                          : "border-[var(--line)] bg-[color:var(--option-bg)] hover:bg-[color:var(--option-hover)] text-[color:var(--foreground)]"
                      }`}
                    >
                      {val ? "Richtig" : "Falsch"}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}