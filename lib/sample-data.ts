export type SampleExam = {
  title: string;
  slug: string;
  provider: string;
  level: string;
  category: string;
  durationMinutes: number;
  description: string;
  isPremium: boolean;
  questionCount: number;
};

export type SampleQuestion = {
  examSlug: string;
  prompt: string;
  type: string;
  options: string[];
  answer: string;
  explanation: string;
};

export const sampleExams: SampleExam[] = [
  {
    title: "TELC B1 Alltag Lesen",
    slug: "telc-b1-reading-essentials",
    provider: "TELC",
    level: "B1",
    category: "Reading",
    durationMinutes: 45,
    description:
      "Work through notices, emails, and short articles with the pacing and structure learners expect from TELC-style reading tasks.",
    isPremium: false,
    questionCount: 12
  },
  {
    title: "Goethe B2 Horen Fokus",
    slug: "goethe-b2-listening-focus",
    provider: "Goethe",
    level: "B2",
    category: "Listening",
    durationMinutes: 35,
    description:
      "Build confidence with short dialogues, announcements, and detail questions inspired by Goethe listening sections.",
    isPremium: false,
    questionCount: 10
  },
  {
    title: "fide Speaking Alltag Schweiz",
    slug: "fide-speaking-alltag-schweiz",
    provider: "fide",
    level: "A2-B1",
    category: "Speaking",
    durationMinutes: 25,
    description:
      "Practice everyday Swiss scenarios, short role-plays, and clear spoken responses in a fide-inspired format.",
    isPremium: false,
    questionCount: 8
  },
  {
    title: "Goethe C1 Schreiben Klarheit",
    slug: "goethe-c1-writing-clarity",
    provider: "Goethe",
    level: "C1",
    category: "Writing",
    durationMinutes: 50,
    description:
      "Train argument structure, register, and cohesion with essay prompts designed for advanced exam preparation.",
    isPremium: true,
    questionCount: 6
  }
];

export const sampleQuestions: SampleQuestion[] = [
  {
    examSlug: "telc-b1-reading-essentials",
    prompt: "Read the notice. When does the library close on Fridays?",
    type: "multiple-choice",
    options: ["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"],
    answer: "6:00 PM",
    explanation: "The notice states that Friday opening hours end at 18:00."
  },
  {
    examSlug: "goethe-b2-listening-focus",
    prompt: "What is the speaker's main reason for calling the hotel?",
    type: "multiple-choice",
    options: [
      "To cancel a reservation",
      "To ask about parking",
      "To request a late check-in",
      "To book breakfast"
    ],
    answer: "To request a late check-in",
    explanation: "The speaker mentions arriving after 11 PM and asks the hotel to note it."
  },
  {
    examSlug: "fide-speaking-alltag-schweiz",
    prompt: "At the Gemeinde office, explain that you need help understanding a form and ask what documents you must bring.",
    type: "open-ended",
    options: [],
    answer: "Answers vary",
    explanation:
      "A strong response is polite, clearly explains the problem, and asks focused follow-up questions."
  },
  {
    examSlug: "goethe-c1-writing-clarity",
    prompt: "Write a structured response discussing whether remote work improves productivity in modern companies.",
    type: "open-ended",
    options: [],
    answer: "Answers vary",
    explanation:
      "A strong answer should present a clear position, supporting evidence, and a balanced conclusion."
  }
];
