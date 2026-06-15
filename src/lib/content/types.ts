export type ExamDomain = 1 | 2 | 3 | 4;

/**
 * CLF-C02 exam domains and their official weightings:
 * 1 = Cloud Concepts (24%)
 * 2 = Security and Compliance (30%)
 * 3 = Cloud Technology and Services (34%)
 * 4 = Billing, Pricing and Support (12%)
 */
export const DOMAIN_LABELS: Record<ExamDomain, string> = {
  1: "Cloud Concepts",
  2: "Security & Compliance",
  3: "Cloud Technology & Services",
  4: "Billing, Pricing & Support",
};

export interface StudySection {
  id: string;
  number: number;
  title: string;
  summary: string;
  domain: ExamDomain;
  estMinutes: number;
  content: string;
}

export interface Flashcard {
  id: string;
  sectionId: string;
  front: string;
  back: string;
}

export interface QuizQuestion {
  id: string;
  sectionId: string;
  domain: ExamDomain;
  question: string;
  options: string[];
  correct: number[];
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface SectionBundle {
  section: StudySection;
  flashcards: Flashcard[];
  questions: QuizQuestion[];
}
