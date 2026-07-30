import { Injectable } from '@angular/core';
import { VocabWord } from '@core/models/vocab.model';
import { QuizMode, QuizQuestion, QuizOption } from '@core/models/quiz.model';

@Injectable({ providedIn: 'root' })
export class QuizService {
  generate(words: VocabWord[], mode: QuizMode, count = 10): QuizQuestion[] {
    switch (mode) {
      case 'sentence-fill':
        return this.generateSentenceFill(words, count);
      case 'vocab-reading':
      case 'vocab-meaning':
      default:
        return this.generateMultipleChoice(words, count);
    }
  }

  generateMultipleChoice(words: VocabWord[], count = 10): QuizQuestion[] {
    const shuffled = this.shuffle([...words]);
    return shuffled.slice(0, count).map((word) => this.buildMeaningQuestion(word, words));
  }

  generateSentenceFill(words: VocabWord[], count = 10): QuizQuestion[] {
    const fillable = words.filter((word) => this.findFillSentence(word) !== null);
    if (fillable.length < 4) {
      return this.generateMultipleChoice(words, count);
    }

    const shuffled = this.shuffle([...fillable]);
    return shuffled.slice(0, count).map((word) => this.buildSentenceFillQuestion(word, fillable));
  }

  private buildMeaningQuestion(word: VocabWord, allWords: VocabWord[]): QuizQuestion {
    const distractors = this.shuffle(allWords.filter((w) => w.id !== word.id)).slice(0, 3);

    const correct: QuizOption = {
      id: `${word.id}-correct`,
      text: word.meaning,
      isCorrect: true,
    };

    const options: QuizOption[] = this.shuffle([
      correct,
      ...distractors.map((d, i) => ({
        id: `${word.id}-wrong-${i}`,
        text: d.meaning,
        isCorrect: false,
      })),
    ]);

    return {
      id: `q-${word.id}`,
      type: 'multiple-choice',
      mode: 'vocab-meaning',
      level: word.level,
      prompt: word.kanji,
      furigana: word.furigana,
      options,
      correctAnswer: correct.id,
      explanation: word.sentences[0]
        ? `「${word.kanji}」（${word.furigana}）的意思是「${word.meaning}」。\n例句：${word.sentences[0].jp} → ${word.sentences[0].zh}`
        : `「${word.kanji}」（${word.furigana}）的意思是「${word.meaning}」。`,
      sourceWordId: word.id,
      audio: word.audio,
    };
  }

  private buildSentenceFillQuestion(word: VocabWord, allWords: VocabWord[]): QuizQuestion {
    const fillSentence = this.findFillSentence(word);
    if (!fillSentence) {
      return this.buildMeaningQuestion(word, allWords);
    }

    const distractors = this.shuffle(
      allWords.filter((candidate) => candidate.id !== word.id && candidate.kanji !== word.kanji),
    ).slice(0, 3);

    const correct: QuizOption = {
      id: `${word.id}-correct`,
      text: word.kanji,
      isCorrect: true,
    };

    const options: QuizOption[] = this.shuffle([
      correct,
      ...distractors.map((distractor, index) => ({
        id: `${word.id}-wrong-${index}`,
        text: distractor.kanji,
        isCorrect: false,
      })),
    ]);

    return {
      id: `q-fill-${word.id}`,
      type: 'multiple-choice',
      mode: 'sentence-fill',
      level: word.level,
      prompt: '請選出最適合填入空格的單字',
      questionText: fillSentence.sentenceWithBlank,
      questionTranslation: fillSentence.translation,
      furigana: word.furigana,
      options,
      correctAnswer: correct.id,
      explanation: `這一題應填入「${word.kanji}」（${word.furigana}），意思是「${word.meaning}」。\n原句：${fillSentence.original} → ${fillSentence.translation}`,
      sourceWordId: word.id,
      audio: word.audio,
    };
  }

  private findFillSentence(word: VocabWord): {
    original: string;
    sentenceWithBlank: string;
    translation: string;
  } | null {
    const candidates = [word.kanji, word.furigana].filter((value, index, array) =>
      Boolean(value) && array.indexOf(value) === index,
    );

    for (const sentence of word.sentences) {
      for (const candidate of candidates) {
        if (!candidate || candidate.length < 1 || !sentence.jp.includes(candidate)) {
          continue;
        }

        return {
          original: sentence.jp,
          sentenceWithBlank: sentence.jp.replace(candidate, '＿＿＿'),
          translation: sentence.zh,
        };
      }
    }

    return null;
  }

  private shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
