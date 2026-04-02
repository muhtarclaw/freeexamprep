import { sampleExams } from "@/lib/sample-data";
import { ExamCard } from "@/components/exam-card";
import { SectionTitle } from "@/components/section-title";

export default async function ExamsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionTitle
        eyebrow="Exam Library"
        title="Practice packs for TELC, fide, Goethe, and more"
        description="Explore by exam family, level, and skill area so you can choose the right format for your next speaking test, listening paper, or writing task."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {sampleExams.map((exam) => (
          <ExamCard key={exam.slug} exam={exam} />
        ))}
      </div>
    </div>
  );
}
