import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { VocabWord, JlptLevel } from '@core/models/vocab.model';

@Injectable({ providedIn: 'root' })
export class VocabService {
  readonly availableLevels: readonly JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1', 'GEN'];

  private http = inject(HttpClient);
  private cache = new Map<JlptLevel, Observable<VocabWord[]>>();

  hasLevelData(level: JlptLevel): boolean {
    return this.availableLevels.includes(level);
  }

  getWords(level: JlptLevel): Observable<VocabWord[]> {
    if (!this.cache.has(level)) {
      const level$ = this.http
        .get<VocabWord[]>(`assets/data/${level.toLowerCase()}.json`)
        .pipe(shareReplay(1));
      this.cache.set(level, level$);
    }
    return this.cache.get(level)!;
  }
}
