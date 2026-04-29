import { notFound } from "next/navigation";
import { quizzes } from "@/data/quizzes";
import QuizClient from "@/components/QuizClient";

type Props = {
  params: Promise<{ type: string; id: string }>;
};

export default async function QuizPage({ params }: Props) {
  const { type, id } = await params;
  const quizId = parseInt(id, 10);
  const quiz = quizzes.find(q => q.type === type && q.id === quizId);

  if (!quiz) {
    notFound();
  }

  return <QuizClient quiz={quiz} />;
}

export function generateStaticParams() {
  return quizzes.map(q => ({
    type: q.type,
    id: String(q.id),
  }));
}
