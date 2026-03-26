import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { ExamSet } from '../models/exam-question.model';
import { JlptLevel } from '../models/vocab.model';

@Injectable({ providedIn: 'root' })
export class ExamService {
  private http = inject(HttpClient);
  private cache = new Map<string, Observable<ExamSet>>();

  private readonly availableExamSets: Record<string, readonly JlptLevel[]> = {
    'grammar/sentence-fill': ['N5', 'N4'],
  };

  hasExamSet(category: string, type: string, level: JlptLevel): boolean {
    return this.availableExamSets[`${category}/${type}`]?.includes(level) ?? false;
  }

  getExamSet(category: string, type: string, level: JlptLevel): Observable<ExamSet> {
    const key = `${category}/${type}/${level}`;

    if (!this.cache.has(key)) {
      const examSet$ = this.http
        .get<ExamSet>(`assets/exams/${category}/${level.toLowerCase()}-${type}.json`)
        .pipe(shareReplay(1));
      this.cache.set(key, examSet$);
    }

    return this.cache.get(key)!;
  }
}
