import type { Quiz } from './types';
import { quizzes } from './quizzes';

export function getQuizzesByType(type: string, level?: string): Quiz[] {
  return quizzes.filter(q => q.type === type && (level ? q.level === level : true));
}

export function getQuizById(id: number): Quiz | undefined {
  return quizzes.find(q => q.id === id);
}

export function getQuizzesByLevel(level: string): Quiz[] {
  return quizzes.filter(q => q.level === level);
}

export const sectionMeta: Record<string, { title: string; description: string; icon: string }> = {
  'lesen-t1': { title: 'Lesen Teil 1', description: 'Ordne jeden Text einer der zehn Antworten zu.' , icon: '📖' },
  'lesen-t2': { title: 'Lesen Teil 2', description: 'Lies den langen Text und beantworte die fünf Fragen.' , icon: '📄' },
  'lesen-t3': { title: 'Lesen Teil 3', description: 'Ordne jede Situation der richtigen Anzeige zu.' , icon: '📋' },
  'sprachbausteine-t1': { title: 'Sprachbausteine Teil 1', description: 'Fülle die Lückentexte mit den richtigen Wörtern.' , icon: '✏️' },
  'sprachbausteine-t2': { title: 'Sprachbausteine Teil 2', description: 'Wähle aus der Wortbank das richtige Wort für jede Lücke.' , icon: '📝' },
  'sprachbausteine-t3': { title: 'Sprachbausteine Teil 3', description: 'Wortbank-Übungen.' , icon: '📝' },
  'hoeren': { title: 'Hören', description: 'Richtig oder Falsch? Höre die Aussagen und markiere.' , icon: '🎧' },
};