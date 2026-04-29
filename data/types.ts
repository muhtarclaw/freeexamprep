export type QuizLevel = 'B1' | 'B2';

export type QuizType =
  | 'lesen-t1'
  | 'lesen-t2'
  | 'lesen-t3'
  | 'sprachbausteine-t1'
  | 'sprachbausteine-t2'
  | 'sprachbausteine-t3'
  | 'hoeren';

export interface BaseQuiz {
  id: number;
  level: QuizLevel;
  type: QuizType;
  title: string;
  subtitle?: string;
}

// Lesen T1: N text sections + 10 options → match each section to an option
export interface LesenT1Quiz extends BaseQuiz {
  type: 'lesen-t1';
  sections: { id: number; text: string }[];
  options: string[]; // 10 options as strings (a-j)
  // sectionId (1-indexed) → option index (0-indexed)
  correctAnswers: number[];
}

// Lesen T2: long text + 5 questions with 3 options each
export interface LesenT2Quiz extends BaseQuiz {
  type: 'lesen-t2';
  text: string;
  questions: {
    id: number;
    text: string;
    options: string[];
  }[];
  // index 0-2 for each question
  correctAnswers: number[];
}

// Lesen T3: match 10 situations to ads
export interface LesenT3Quiz extends BaseQuiz {
  type: 'lesen-t3';
  ads: { id: string; text: string }[];
  situations: { id: number; text: string }[];
  // situationId → adId
  correctAnswers: Record<number, string>;
}

// Sprachbausteine T1: Lückentext with numbered gaps
export interface SprachbausteineT1Quiz extends BaseQuiz {
  type: 'sprachbausteine-t1';
  text: string;
  blanks: {
    id: number;
    options: string[];
    correctAnswer: number; // index in options
  }[];
}

// Sprachbausteine T2/3: Wortbank
export interface SprachbausteineT2Quiz extends BaseQuiz {
  type: 'sprachbausteine-t2' | 'sprachbausteine-t3';
  text: string;
  blanks: {
    id: number;
    options: string[];
    correctAnswer: number;
  }[];
}

// Hören: Richtig/Falsch
export interface HoerenQuiz extends BaseQuiz {
  type: 'hoeren';
  exercises: {
    title: string;
    questions: {
      id: number;
      statement: string;
      correct: boolean;
    }[];
  }[];
}

export type Quiz =
  | LesenT1Quiz
  | LesenT2Quiz
  | LesenT3Quiz
  | SprachbausteineT1Quiz
  | SprachbausteineT2Quiz
  | HoerenQuiz;
