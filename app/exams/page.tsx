import { sampleExams } from "@/lib/sample-data";
import { ExamCard } from "@/components/exam-card";
import { SectionTitle } from "@/components/section-title";

export default async function ExamsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionTitle
        eyebrow="Exam Library"
        title="Public exam packs, premium-style practice flow"
        description="Users can browse exam collections without creating an account. When they log in, they can keep results and build consistency."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {sampleExams.map((exam) => (
          <ExamCard key={exam.slug} exam={exam} />
        ))}
      </div>
    </div>
  );
}
