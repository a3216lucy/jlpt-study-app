import { Injectable } from '@angular/core';
import {
  GrammarPattern,
  GrammarQuizMode,
  GrammarQuizQuestion,
  GrammarQuizOption,
} from '../models/grammar-pattern.model';

@Injectable({ providedIn: 'root' })
export class GrammarQuizService {

  /** 純選義（看文型選中文意思） */
  generateMeaningChoice(patterns: GrammarPattern[], count = 10): GrammarQuizQuestion[] {
    const shuffled = this.shuffle([...patterns]);
    return shuffled.slice(0, count).map(p => this.buildMeaningQuestion(p, patterns));
  }

  /** 純填空（看例句選填入的文型） */
  generateSentenceFill(patterns: GrammarPattern[], count = 10): GrammarQuizQuestion[] {
    const fillable = patterns.filter(p => this.findBlank(p) !== null);
    if (fillable.length < 4) {
      // 可用題目不足時回退為選義
      return this.generateMeaningChoice(patterns, count);
    }
    const shuffled = this.shuffle([...fillable]);
    return shuffled.slice(0, count).map(p => this.buildFillQuestion(p, fillable));
  }

  /** 混合模式（盡量1:1，不足時補選義） */
  generateMixed(patterns: GrammarPattern[], count = 10): GrammarQuizQuestion[] {
    const fillable = patterns.filter(p => this.findBlank(p) !== null);
    const half = Math.floor(count / 2);

    const fillCount = Math.min(half, fillable.length);
    const meaningCount = count - fillCount;

    const fillQuestions = fillCount > 0
      ? this.shuffle([...fillable]).slice(0, fillCount).map(p => this.buildFillQuestion(p, fillable))
      : [];

    // 選義用沒被填空挑到的題目
    const usedIds = new Set(fillQuestions.map(q => q.sourcePatternId));
    const remaining = patterns.filter(p => !usedIds.has(p.id));
    const meaningQuestions = this.shuffle([...remaining])
      .slice(0, meaningCount)
      .map(p => this.buildMeaningQuestion(p, patterns));

    return this.shuffle([...fillQuestions, ...meaningQuestions]);
  }

  generate(patterns: GrammarPattern[], mode: GrammarQuizMode, count = 10): GrammarQuizQuestion[] {
    switch (mode) {
      case 'meaning-choice': return this.generateMeaningChoice(patterns, count);
      case 'sentence-fill':  return this.generateSentenceFill(patterns, count);
      case 'mixed':          return this.generateMixed(patterns, count);
    }
  }

  // ─── Private builders ──────────────────────────────────────────

  private buildMeaningQuestion(pattern: GrammarPattern, allPatterns: GrammarPattern[]): GrammarQuizQuestion {
    const distractors = this.shuffle(
      allPatterns.filter(p => p.id !== pattern.id)
    ).slice(0, 3);

    const correct: GrammarQuizOption = { id: `${pattern.id}-correct`, text: pattern.meaning, isCorrect: true };
    const options = this.shuffle([
      correct,
      ...distractors.map((d, i) => ({ id: `${pattern.id}-wrong-${i}`, text: d.meaning, isCorrect: false })),
    ]);

    const ex = pattern.examples[0];
    return {
      id: `gq-m-${pattern.id}`,
      level: pattern.level,
      mode: 'meaning-choice',
      prompt: pattern.pattern,
      structure: pattern.structure,
      hint: pattern.notes ?? '',
      options,
      correctAnswer: correct.id,
      explanation: ex
        ? `【${pattern.pattern}】${pattern.meaning}\n結構：${pattern.structure}\n例句：${ex.jp} → ${ex.zh}`
        : `【${pattern.pattern}】${pattern.meaning}\n結構：${pattern.structure}`,
      examples: pattern.examples,
      sourcePatternId: pattern.id,
    };
  }

  private buildFillQuestion(pattern: GrammarPattern, fillablePatterns: GrammarPattern[]): GrammarQuizQuestion {
    const blank = this.findBlank(pattern)!;
    const ex = pattern.examples.find(e => {
      const b = e.highlight ?? this.autoDetectBlank(pattern);
      return b && e.jp.includes(b);
    }) ?? pattern.examples[0];

    const sentenceWithBlank = ex.jp.replace(blank, '＿＿＿');
    const sentenceTranslation = ex.zh;

    // 干擾選項：同樣可填空、但 blank 文字不同的文型
    const distractors = this.shuffle(
      fillablePatterns.filter(p => {
        if (p.id === pattern.id) return false;
        const b = this.findBlank(p);
        return b !== null && b !== blank;
      })
    ).slice(0, 3);

    const correct: GrammarQuizOption = { id: `${pattern.id}-correct`, text: blank, isCorrect: true };
    const options = this.shuffle([
      correct,
      ...distractors.map((d, i) => ({
        id: `${pattern.id}-wrong-${i}`,
        text: this.findBlank(d)!,
        isCorrect: false,
      })),
    ]);

    return {
      id: `gq-f-${pattern.id}`,
      level: pattern.level,
      mode: 'sentence-fill',
      prompt: pattern.pattern,
      structure: pattern.structure,
      hint: pattern.notes ?? '',
      options,
      correctAnswer: correct.id,
      explanation: `【${pattern.pattern}】${pattern.meaning}\n結構：${pattern.structure}\n正確填入：${blank}`,
      examples: pattern.examples,
      sourcePatternId: pattern.id,
      sentenceWithBlank,
      sentenceTranslation,
    };
  }

  // ─── Blank detection ───────────────────────────────────────────

  /**
   * 優先使用 examples[].highlight；否則自動從 pattern 字串偵測。
   * 回傳 null 代表此文型不適合做填空題。
   */
  findBlank(pattern: GrammarPattern): string | null {
    // 1. 找有 highlight 且真的在句子中的 example
    for (const ex of pattern.examples) {
      if (ex.highlight && ex.jp.includes(ex.highlight)) return ex.highlight;
    }
    // 2. 嘗試自動偵測
    const auto = this.autoDetectBlank(pattern);
    if (!auto) return null;
    // 確認至少一個例句含有此文字
    const found = pattern.examples.some(e => e.jp.includes(auto));
    return found ? auto : null;
  }

  /**
   * 從 pattern 字串（如「〜てください」）提取可能的空格文字。
   * 取 〜 分割後最長且長度 >= 2 的片段。
   */
  private autoDetectBlank(pattern: GrammarPattern): string | null {
    const parts = pattern.pattern
      .split('〜')
      .map(p => p.replace(/[（）。、！？「」『』【】〔〕]/g, '').trim())
      .filter(p => p.length >= 2);

    if (parts.length === 0) return null;

    // 最長的片段最具區別性
    parts.sort((a, b) => b.length - a.length);
    return parts[0];
  }

  private shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
