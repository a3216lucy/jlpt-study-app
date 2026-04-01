import { JlptLevel } from '../models/vocab.model';

export interface ExamSetCatalogItem {
  id: string;
  groupId: string;
  groupLabel: string;
  groupDescription: string;
  category: string;
  type: string;
  level: JlptLevel;
  title: string;
  description: string;
  path: string;
}

export const EXAM_CATALOG: readonly ExamSetCatalogItem[] = [
  {
    id: 'grammar-n5-sentence-fill',
    groupId: 'standard-sentence-fill',
    groupLabel: '句子填空',
    groupDescription: '以完整句子挖空，四個選項中選出最適合的文型。',
    category: 'grammar',
    type: 'sentence-fill',
    level: 'N5',
    title: 'N5 句子填空',
    description: '以完整句子挖空，四個選項中選出最適合的文型。',
    path: 'assets/exams/grammar/n5-sentence-fill.json',
  },
  {
    id: 'grammar-n4-sentence-fill',
    groupId: 'standard-sentence-fill',
    groupLabel: '句子填空',
    groupDescription: '以完整句子挖空，四個選項中選出最適合的文型。',
    category: 'grammar',
    type: 'sentence-fill',
    level: 'N4',
    title: 'N4 句子填空',
    description: '以完整句子挖空，四個選項中選出最適合的文型。',
    path: 'assets/exams/grammar/n4-sentence-fill.json',
  },
  {
    id: 'grammar-n3-sentence-fill',
    groupId: 'standard-sentence-fill',
    groupLabel: '句子填空',
    groupDescription: '以完整句子挖空，四個選項中選出最適合的文型。',
    category: 'grammar',
    type: 'sentence-fill',
    level: 'N3',
    title: 'N3 句子填空',
    description: '以完整句子挖空，四個選項中選出最適合的文型。',
    path: 'assets/exams/grammar/n3-sentence-fill.json',
  },
  {
    id: 'grammar-n2-sentence-fill',
    groupId: 'standard-sentence-fill',
    groupLabel: '句子填空',
    groupDescription: '以完整句子挖空，四個選項中選出最適合的文型。',
    category: 'grammar',
    type: 'sentence-fill',
    level: 'N2',
    title: 'N2 句子填空',
    description: '以完整句子挖空，四個選項中選出最適合的文型。',
    path: 'assets/exams/grammar/n2-sentence-fill.json',
  },
  {
    id: 'grammar-n1-sentence-fill',
    groupId: 'standard-sentence-fill',
    groupLabel: '句子填空',
    groupDescription: '以完整句子挖空，四個選項中選出最適合的文型。',
    category: 'grammar',
    type: 'sentence-fill',
    level: 'N1',
    title: 'N1 句子填空',
    description: '以完整句子挖空，四個選項中選出最適合的文型。',
    path: 'assets/exams/grammar/n1-sentence-fill.json',
  },
  {
    id: 'grammar-n3-day25-particles',
    groupId: 'n3-grammar-materials',
    groupLabel: 'N3文法整理',
    groupDescription: '彙整 N3 文法教材整理內容的句型填空題庫，可持續擴充。',
    category: 'grammar',
    type: 'sentence-fill',
    level: 'N3',
    title: 'N3文法整理',
    description: '彙整 N3 文法教材整理內容的句型填空題庫，可持續擴充。',
    path: 'assets/exams/grammar/n3-day25-particles-sentence-fill.json',
  },
];
