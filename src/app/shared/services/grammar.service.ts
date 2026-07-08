import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { GrammarPattern } from '@shared/models/grammar-pattern.model';
import { JlptLevel } from '@shared/models/vocab.model';

@Injectable({ providedIn: 'root' })
export class GrammarService {
  readonly availableLevels: readonly JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

  private http = inject(HttpClient);
  private cache = new Map<JlptLevel, Observable<GrammarPattern[]>>();

  hasLevelData(level: JlptLevel): boolean {
    return this.availableLevels.includes(level);
  }

  getPatterns(level: JlptLevel): Observable<GrammarPattern[]> {
    if (!this.cache.has(level)) {
      const level$ = this.http
        .get<GrammarPattern[]>(`assets/data/grammar-${level.toLowerCase()}.json`)
        .pipe(shareReplay(1));
      this.cache.set(level, level$);
    }
    return this.cache.get(level)!;
  }
}
