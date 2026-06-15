import { group01 } from "./sections/group-01";
import { group02 } from "./sections/group-02";
import { group03 } from "./sections/group-03";
import { group04 } from "./sections/group-04";
import { group05 } from "./sections/group-05";
import { group06 } from "./sections/group-06";
import { group07 } from "./sections/group-07";
import { group08 } from "./sections/group-08";
import type { ExamDomain, Flashcard, QuizQuestion, SectionBundle, StudySection } from "./types";

export * from "./types";

export const sectionBundles: SectionBundle[] = [
  ...group01,
  ...group02,
  ...group03,
  ...group04,
  ...group05,
  ...group06,
  ...group07,
  ...group08,
].sort((a, b) => a.section.number - b.section.number);

export const studySections: StudySection[] = sectionBundles.map((b) => b.section);

export const allFlashcards: Flashcard[] = sectionBundles.flatMap((b) => b.flashcards);

export const allQuestions: QuizQuestion[] = sectionBundles.flatMap((b) => b.questions);

export function getSectionById(id: string): StudySection | undefined {
  return studySections.find((s) => s.id === id);
}

export function getSectionBundle(id: string): SectionBundle | undefined {
  return sectionBundles.find((b) => b.section.id === id);
}

export function getFlashcardsBySection(sectionId: string): Flashcard[] {
  return allFlashcards.filter((f) => f.sectionId === sectionId);
}

export function getQuestionsBySection(sectionId: string): QuizQuestion[] {
  return allQuestions.filter((q) => q.sectionId === sectionId);
}

export function getQuestionsByDomain(domain: ExamDomain): QuizQuestion[] {
  return allQuestions.filter((q) => q.domain === domain);
}

/**
 * Official CLF-C02 domain weightings, used to proportionally sample
 * questions for full-length exam simulators.
 */
export const DOMAIN_WEIGHTS: Record<ExamDomain, number> = {
  1: 0.24,
  2: 0.3,
  3: 0.34,
  4: 0.12,
};

/**
 * Deterministic pseudo-random number generator (mulberry32) so that
 * a given seed always produces the same shuffled order - lets us
 * generate a stable set of "simulator" exams that don't change on
 * every render, while still allowing a fresh shuffle per seed.
 */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const rng = mulberry32(seed);
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Build a domain-weighted exam of `total` questions using a seed for
 * deterministic shuffling (e.g., seed = simulator number or attempt id).
 */
export function buildExam(total: number, seed: number): QuizQuestion[] {
  const exam: QuizQuestion[] = [];
  const domains: ExamDomain[] = [1, 2, 3, 4];

  const counts = domains.map((d) => Math.round(total * DOMAIN_WEIGHTS[d]));
  const diff = total - counts.reduce((a, b) => a + b, 0);
  counts[counts.length - 1] += diff;

  domains.forEach((domain, idx) => {
    const pool = seededShuffle(getQuestionsByDomain(domain), seed + domain * 1000);
    const count = counts[idx];
    for (let i = 0; i < count; i++) {
      exam.push(pool[i % pool.length]);
    }
  });

  return seededShuffle(exam, seed);
}

export const TOTAL_STUDY_MINUTES = studySections.reduce((sum, s) => sum + s.estMinutes, 0);
