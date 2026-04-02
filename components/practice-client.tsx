"use client";

import { useState } from "react";

type PracticeClientProps = {
  examId: string;
  title: string;
  questions: Array<{
    _id: string;
    prompt: string;
    type: string;
    options: string[];
    answer: string;
    explanation: string;
  }>;
};

export function PracticeClient({
  examId,
  title,
  questions
}: PracticeClientProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<null | { score: number }>(null);
  const [message, setMessage] = useState("");

  const correct = questions.filter(
    (question) => answers[question._id] === question.answer
  ).length;
  const score = Math.round((correct / questions.length) * 100);

  async function submit() {
    const payload = {
      examId,
      score,
      answers: questions.map((question) => ({
        questionId: question._id,
        answer: answers[question._id] || "",
        correct: answers[question._id] === question.answer
      }))
    };

    const response = await fetch("/api/practice/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as { score?: number; error?: string };

    if (!response.ok) {
      setMessage(data.error || "Please log in to save your score.");
      return;
    }

    setResult({ score: data.score || score });
    setMessage("Your practice result was saved.");
  }

  return (
    <div className="space-y-6">
      <div className="editorial-card rounded-[2rem] p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--brand)]">
          Practice Mode
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">
          {title}
        </h1>
        <p className="mt-3 text-[color:var(--ink-soft)]">
          Work through each task, then save your result when you finish.
        </p>
      </div>

      {questions.map((question, index) => (
        <section
          key={question._id}
          className="editorial-card rounded-[2rem] p-8"
        >
          <p className="text-sm text-[color:var(--brand)]">Question {index + 1}</p>
          <h2 className="mt-2 text-xl font-medium text-[color:var(--foreground)]">
            {question.prompt}
          </h2>

          <div className="mt-5 space-y-3">
            {question.type === "multiple-choice" ? (
              question.options.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[var(--line)] bg-white/60 px-4 py-3 text-[color:var(--foreground)] transition hover:border-[color:var(--brand)]/50"
                >
                  <input
                    type="radio"
                    name={question._id}
                    value={option}
                    checked={answers[question._id] === option}
                    onChange={(event) =>
                      setAnswers((current) => ({
                        ...current,
                        [question._id]: event.target.value
                      }))
                    }
                  />
                  {option}
                </label>
              ))
            ) : (
              <textarea
                rows={4}
                value={answers[question._id] || ""}
                onChange={(event) =>
                  setAnswers((current) => ({
                    ...current,
                    [question._id]: event.target.value
                  }))
                }
                className="w-full rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3 text-[color:var(--foreground)] outline-none focus:border-[color:var(--brand)]"
                placeholder="Write your answer here"
              />
            )}
          </div>
        </section>
      ))}

      <div className="editorial-card rounded-[2rem] p-8">
        <button
          onClick={submit}
          className="rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-3 text-sm font-semibold text-white"
        >
          Save result
        </button>
        {result ? (
          <p className="mt-4 text-lg font-medium text-[color:var(--accent)]">
            Score: {result.score}%
          </p>
        ) : null}
        {message ? (
          <p className="mt-3 text-sm text-[color:var(--ink-soft)]">{message}</p>
        ) : null}
      </div>
    </div>
  );
}
