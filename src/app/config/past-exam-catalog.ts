import { JlptLevel } from '../models/vocab.model';

export interface PastExamSection {
  id: string;
  sectionLabel: string;
  category: 'vocabulary' | 'grammar' | 'reading';
  questionType: 'sentence-fill' | 'multiple-choice';
  questionCount: number;
  path: string;
}

export interface PastExamEntry {
  id: string;
  year: number;
  month: number;
  level: JlptLevel;
  examLabel: string;
  sections: PastExamSection[];
}

export const PAST_EXAM_CATALOG: readonly PastExamEntry[] = [
  {
    id: 'n3-2020-12',
    year: 2020,
    month: 12,
    level: 'N3',
    examLabel: '2020年12月 N3',
    sections: [
      {
        id: 'n3-2020-12-grammar',
        sectionLabel: '文法問題1',
        category: 'grammar',
        questionType: 'sentence-fill',
        questionCount: 13,
        path: 'assets/exams/past/n3-2020-12-grammar.json',
      },
    ],
  },
  {
    id: 'n3-2021-07',
    year: 2021,
    month: 7,
    level: 'N3',
    examLabel: '2021年7月 N3',
    sections: [
      {
        id: 'n3-2021-07-vocab',
        sectionLabel: '語彙（問題1〜5）',
        category: 'vocabulary',
        questionType: 'sentence-fill',
        questionCount: 35,
        path: 'assets/exams/past/n3-2021-07-vocab.json',
      },
      {
        id: 'n3-2021-07-grammar',
        sectionLabel: '文法（問題1〜2）',
        category: 'grammar',
        questionType: 'sentence-fill',
        questionCount: 18,
        path: 'assets/exams/past/n3-2021-07-grammar.json',
      },
      {
        id: 'n3-2021-07-reading',
        sectionLabel: '読解（問題3〜7）',
        category: 'reading',
        questionType: 'multiple-choice',
        questionCount: 20,
        path: 'assets/exams/past/n3-2021-07-reading.json',
      },
    ],
  },
  {
    id: 'n3-2021-12',
    year: 2021,
    month: 12,
    level: 'N3',
    examLabel: '2021年12月 N3',
    sections: [
      {
        id: 'n3-2021-12-vocab',
        sectionLabel: '語彙（問題1〜5）',
        category: 'vocabulary',
        questionType: 'sentence-fill',
        questionCount: 35,
        path: 'assets/exams/past/n3-2021-12-vocab.json',
      },
      {
        id: 'n3-2021-12-grammar',
        sectionLabel: '文法（問題1〜2）',
        category: 'grammar',
        questionType: 'sentence-fill',
        questionCount: 18,
        path: 'assets/exams/past/n3-2021-12-grammar.json',
      },
      {
        id: 'n3-2021-12-reading',
        sectionLabel: '読解（問題3〜7）',
        category: 'reading',
        questionType: 'multiple-choice',
        questionCount: 20,
        path: 'assets/exams/past/n3-2021-12-reading.json',
      },
    ],
  },
  {
    id: 'n3-2022-07',
    year: 2022,
    month: 7,
    level: 'N3',
    examLabel: '2022年7月 N3',
    sections: [
      {
        id: 'n3-2022-07-vocab',
        sectionLabel: '語彙（問題1〜5）',
        category: 'vocabulary',
        questionType: 'sentence-fill',
        questionCount: 34,
        path: 'assets/exams/past/n3-2022-07-vocab.json',
      },
      {
        id: 'n3-2022-07-grammar',
        sectionLabel: '文法（問題1〜2）',
        category: 'grammar',
        questionType: 'sentence-fill',
        questionCount: 18,
        path: 'assets/exams/past/n3-2022-07-grammar.json',
      },
      {
        id: 'n3-2022-07-reading',
        sectionLabel: '読解（問題3〜7）',
        category: 'reading',
        questionType: 'multiple-choice',
        questionCount: 20,
        path: 'assets/exams/past/n3-2022-07-reading.json',
      },
    ],
  },
];
